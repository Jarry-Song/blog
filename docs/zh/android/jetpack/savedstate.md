# SaveState组件架构原理解析

## 前言

在拥抱了Jetpack之后，我们通常使用ViewModel组件来管理数据，但ViewModel只能当页面因配置变更而重建时才能复用，但如果是内存不足或者电量不足等**系统原因**导致的页面被回收时ViewModel是不会被复用的。

我们都知道Activity有着一套 onSaveInstanceState-onRestoreInstanceState 状态保存机制，旨在页面因**系统原因**被回收时可以保存转改，页面重建后，可以恢复之前的状态，为用户提供更好的体验。

**但是ViewModel是无法直接感知onSaveInstanceState被处罚的时机的。**

于是乎，SavedState这个中间组件就诞生了，它能够帮助开发者在ViewModel中处理Activity和fragment状态保存和恢复。


## 什么是SavedState？

在页面即将被销毁的时候，每个使用SavedState的ViewModel都会**创建一个Bundle来存储自己的这份数据**，最后这些Bundle会被汇总到一个Bundle中，然后再保存到onSaveInstanceState(Bundle outState)的outState中。

当页面回复的时候，**会从onCreate(Bundle savedInstanceState)中的savedInstanceState中取出原来存放的总的那个Bundle，然后再取出一个个的术语ViewModel的子Bundle**，于是我们就能愉快的在ViewModel中复用之前存储的数据了。

其实就是利用Bundle可以保存另一个Bundle这么一个特点，分层分区保存数据，让数据之间相互分离，进而方便整存整取。

## SavedState的用法

首先还是添加依赖：
```java
androidx.lifecycle:lifecycle-viewmodel-savedstate:2.2.0
```

**ViewModel搭配SavedState实现数据复用**

当Activity的onSaveInstanceState方法被执行的时候，这个实际会触发SavedStateHandle的Bundle saveState()方法，所以它的数据才能被存储。

当Activity被恢复的时候，在新建ViewModel实例对象的时候，会从Activity的savedInstanceState中提取之前存储数据，然后构造SavedStateHandle对象并把恢复的数据赋值给它，随后把SavedStateHandle传递到ViewModel中。所以它的数据才能被复用。
```java
//我们只需要在构造函数上添加SavedStateHandle参数即可。其他不变
  class HiViewModel(val savedState: SavedStateHandle) : ViewModel() {
    private val KEY_HOME_PAGE_DATA="key_home_page_data"
    private val initData = MutableLiveData<List<GoodsModel>>()
    fun loadInitData():LiveData<List<GoodsModel>> {
       if(initData.value==null){
            //1.from memory .
            //加载数据的时候，先从savedState中尝试读取,如果有直接内存复用
            val memoryData =savedState.get<List<GoodsModel>>(KEY_HOME_PAGE_DATA)
            if(memoryData!=null){
             initData.postValue(memoryData)
          }else{
             //2.from remote
             val remoteData = fetchDataFromRemote()
             //然后存储在savedState以备不时之需,数据模型需要使用parceable接口
             //这种写法,即便页面因配置变更，内存不足被回收
             //页面重建后，我们都能第一时间复用之前的数据，从而快速渲染页面
             //这种能力，对于一级页面尤其首页是至为重要的
             savedState.set(KEY_HOME_PAGE_DATA,remoteData)
             initData.postValue(remoteData)
          }
        }
      return initData
    }
  }
```
问题是：**我们为什么可以直接在ViewModel构造函数上直接添加SavedStateHandle参数呢?** 这个问题我们后面回答。

## SavedState数据存储&复用实现原理

从上面介绍上来理解的话，我认为SavedState还是比较简单，思路清晰的，但是谷歌搞了一堆设计模式，这个流程原理会涉及到几个类。所以先捋一捋各种关系，以及它们各自的职责：
- SavedStateRegistryOwner：用于获取SavedStatedRegistry对象；
- SavedStateRegistryController：用于创建SavedStatedRegistry，用于连接Activity/Fragment和SavedStateRegistry；
- SavedStateRegistry：数据存储、恢复中心；
- SavedStateHandleController： 用于从数据中心提出数据并创建SavedStateHandle的；
- SavedStateHandle：单个ViewModel用于数据存储和恢复的地方。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128214633.png)

### SavedStateRegistry模型

一个总Bundle，以key-value形式存储着每个ViewModel对应的子Bundle。这是为了方便整存整取。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128214725.png)

### SavedState数据存储流程

逐一调用每个SavedStateHandle保存自己的数据。汇总成一个总的Bundle，再存储到Activity的SavedState对象中。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128214909.png)

### SavedStateHandle参数是如何被传递到ViewModel的？

现在我们来回答刚才提出的问题，为什么可以直接在ViewModel构造函数上直接添加SavedStateHandle参数呢？，这里分成两部，先看下面两张流程图。

**SavedState数据复用流程**

从Activity的onCreate(Bundle savedState)恢复所有ViewModel的数据到SavedStateRegistry。这一部只是提取出存储的Bundle数据对象，但还没有被复用。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128215227.png)

**SavedState数据复用流程（2）**

创建ViewModel实例的时候会从SavedStateRegistry获取当前ViewModel之前存储的数据并赋值给SavedStateHandle对象。并将SavedStateHandle以参数的形式传递到ViewModel完成复用。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128215343.png)

接下来是源码分析，这一切还要从ViewModelProvider构造函数说起：

```java
class ViewModelProvider{
      public ViewModelProvider(@NonNull ViewModelStoreOwner owner) {
      //这里他会判断我们的Activity/Fragment是不是 HasDefaultViewModelProviderFactory类型的
      //而恰巧我们的Activity/Fragment都是实现了这个接口的，并且返回的都是SavedStateViewModelFactory实例对象
      //所以，当我们调用这个构造函数创建ViewModelProvider,来获取ViewModel的时候
      //都是由SavedStateViewModelFactory负责具体的创建以及参数传递的。
            this(owner.getViewModelStore(), owner instanceof HasDefaultViewModelProviderFactory
                ? ((HasDefaultViewModelProviderFactory) owner).getDefaultViewModelProviderFactory()
                : NewInstanceFactory.getInstance());
    }
}
```

**getDefaultViewModelProviderFactory**默认返回SavedStateViewModelFactory

```java
class ComponentActivity extends HasDefaultViewModelProviderFactory{
 public ViewModelProvider.Factory getDefaultViewModelProviderFactory() {
        if (getApplication() == null) {
            throw new IllegalStateException("Your activity is not yet attached to the "
                    + "Application instance. You can't request ViewModel before onCreate call.");
        }
        if (mDefaultFactory == null) {
            mDefaultFactory = new SavedStateViewModelFactory(
                    getApplication(),
                    this,
                    getIntent() != null ? getIntent().getExtras() : null);
        }
        return mDefaultFactory;
    }
}
```

**SavedStateViewModelFactory：**创建ViewModel实例的工作

```java
public <T extends ViewModel> T create(@NonNull String key, @NonNull Class<T> modelClass) {
//1.首先判断我们的viewmodel 是不是 AndroidViewModel的子类
        boolean isAndroidViewModel = AndroidViewModel.class.isAssignableFrom(modelClass);
        Constructor<T> constructor;
        if (isAndroidViewModel) {
          //2.如果是AndroidViewModel的子类，那么尝试查找它是否拥有(Application,SavedStateHandle)两个参数的构造函数
            constructor = findMatchingConstructor(modelClass, ANDROID_VIEWMODEL_SIGNATURE);
        } else {
            //3.否则查找它是否拥有(SavedStateHandle)一个参数的构造函数
            constructor = findMatchingConstructor(modelClass, VIEWMODEL_SIGNATURE);
        }
        // doesn't need SavedStateHandle
        if (constructor == null) {
            //4. 如果上面两种方式都没找到，说明我们的viewmodel没有声明以上两种类型    
            //此时这里使用AndroidViewModelFactory创建viewmodel实例
            //可以无参数，也可以携带一个(Application)参数
            return mFactory.create(modelClass);
        }

        //5. 走到这里，那么就说明构造函数上存在savedSateHandle参数
        //这里会首先构建出SavedStateHandleController对象
        //这个类的作用是 从SavedStateRegistry提取出该ViewModel的Bundle数据对象，创建savedSateHandle对象
        SavedStateHandleController controller = SavedStateHandleController.create(
                mSavedStateRegistry, mLifecycle, key, mDefaultArgs);

            T viewmodel;
            if (isAndroidViewModel) {
                //这里反射构造ViewModel实例对象的时候，把参数一同传递了进去。 
                viewmodel = constructor.newInstance(mApplication, controller.getHandle());
            } else {
            //和上面唯一的不同就是没有Application参数。
                viewmodel = constructor.newInstance(controller.getHandle());
            }
             //返回新创建的ViewModel实例对象
             return viewmodel;
    }
```

SavedStateHandleController**提取旧数据并创建**SavedStateHandle：

```java
static SavedStateHandleController create(SavedStateRegistry registry, Lifecycle lifecycle,
            String key, Bundle defaultArgs) {
        //从数据中心SavedStateRegistry提出出该ViewModel的Bundle数据对象    
        Bundle restoredState = registry.consumeRestoredStateForKey(key);
        //构建SavedStateHandle对象，并把restoredState中的数据再拆分出来，存储到mRegular这个 map集合中。
        SavedStateHandle handle = SavedStateHandle.createHandle(restoredState, defaultArgs);
        SavedStateHandleController controller = new SavedStateHandleController(key, handle);
        //.....
        return controller;
    }
SavedStateHandle getHandle() {
        return mHandle;
    }
```

## 总结

- ViewModel搭配SavedState组件，可以实现非**正常关闭情况的数据存储与复用**，这对于一级页面，尤其是**首页模块及其重要**。
- SavedState本质是利用了onSaveInstanceState的时机。每个ViewModel的数据单独存储在一个Bundle中，再合并成一个整体。再存放到outBundle中。所以它也不能存超过**1M**的数据。