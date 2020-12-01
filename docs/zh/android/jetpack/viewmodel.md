# ViewModel 组件架构原理解析

## 前言

ViewModel作为Jetpack组件库首屈一指的高频组件之一，我们有必要去了解他背后的工作原理，才能真正掌握它是如何实现存储数据的。它的出现释放了
Activity/Fragment管理数据的压力，ViewModel经常会搭配LiveData一起用于MVVM的开发模式。


## 提纲

- 什么是ViewModel；
- ViewModel的用法；
- ViewModel数据存储实现原理；

## 什么是ViewModel？

ViewModel具备宿主生命后期感知能力的数据存储组件，使用ViewModel保存的数据，在页面因**配置变更导致页面销毁重建**之后依然也是存在的。
>  Tips：配置变更主要是指：横竖屏切换、分辨率调整、权限变更、系统字体样式变更...

## ViewModel的优势
**页面配置更改数据不丢失**

当设备因配置更改导致Activiy/Fragment重建，ViewModel中的数据并不会因此丢失，配合LiveData可以在页面重建后立马能收到最新保存的数据用以重新渲染页面。

**生命周期感应**

在ViewModel中难免会做一些网络请求或数据的处理，可以复写onCleared()方法，终止清理一些操作，释放内存，该方法在宿主onDestory时被调用。


**数据共享**

对于单Activity对Fragment的页面，可以使用ViewModel实现页面之间的数据共享，实际上不同的Activity也可以实现数据共享。

## ViewModel的用法

使用ViewModel之前需要先添加依赖：
```java
//通常情况下，只需要添加appcompat就可以了
api 'androidx.appcompat:appcompat:1.1.0'
//如果想单独使用，可引入下面的依赖
api 'androidx.lifecycler:lifecycle-viewmodel:2.0.0'
```

**基本用法**

存储的数据**只能当页面因为配置变更导致的销毁再重建时刻复用**，复用的是ViewModel的实例对象整体：

```kotlin
class HiViewModel() : ViewModel() {
    val liveData = MutableLiveData<List<GoodsModel>>()
    fun loadInitData():LiveData<List<GoodsModel>> {
        //from remote
        //为了适配因配置变更而导致的页面重建, 重复利用之前的数据,加快  新页面渲染，不再请求接口
        if(liveData.value==null){
           val remoteData = fetchDataFromRemote()
           liveData.postValue(remoteData)
        }
        return liveData
    }
}

//通过ViewModelProvider来获取viewmodel对象
//如果在单Activity,多Fragment的页面，只需要都传递所在的Activity对象就可以获取到同一个ViewModel实例，从而实现数据共享。。
val viewModel = ViewModelProvider(Activity/Fragment).get(HiViewModel::class.java)

viewModel.loadPageData().observer(this,Observer{
      //渲染列表  
})

```

**ViewModel实现跨页面不同的（Activity）的数据共享**

```kotlin
//让Application实现ViewModelStoreOwner 接口
class MyApp: Application(), ViewModelStoreOwner {
    private val appViewModelStore: ViewModelStore by lazy {
        ViewModelStore()
    }

    override fun getViewModelStore(): ViewModelStore {
        return appViewModelStore
    } 
}

val viewmodel = ViewProvider(application).get(HiViewModel::class.java)

```

## ViewModel复用实现原理

上面说到，ViewModel可以实现因**配置变更而导致页面销毁重建**之后依然可以复用。准确点来说，应该是**页面回复重建前后获取到的是同一个Viewmodel实例对象**，以至于页面恢复重建后还能接着复用。那么这是为什么呢？

获取ViewModel实例的方式如下：

ViewModelProvider本质是从传递进去的ViewModelStore来获取实例。如果没有传递，则利用factory去创建一个新的，并存储到ViewModelStore。

```kotlin
val viewmodel =  ViewModelProvider(viewModelStore).get(HiViewModel::class.java)
//或者指定factory
val viewmodel =  ViewModelProvider(viewModelStore,factory).get(HiViewModel::class.java) 
```

不同的ViewModelFactory创建Viewmodel实例的方式不同：

![](https://gitee.com/jarrysong/img/raw/master/img/20201128174926.png)

**ViewModelProvider获取ViewModel实例源码分析**

```java
class ViewModelProvider{
    
  private static final String DEFAULT_KEY ="androidx.lifecycle.ViewModelProvider.DefaultKey";

  //根据传递的modelClass 构建一个默认的Key
  public <T extends ViewModel> T get(Class<T> modelClass) {
        String canonicalName = modelClass.getCanonicalName();
        return get(DEFAULT_KEY + ":" + canonicalName, modelClass);
  }

  //获取viewmodel实例时，也可以自行指定Key
  public <T extends ViewModel> T get(String key, Class<T> modelClass) {
        ViewModel viewModel = mViewModelStore.get(key);
        if (mFactory instanceof KeyedFactory) {
            viewModel = ((KeyedFactory) (mFactory)).create(key, modelClass);
        } else {
            viewModel = (mFactory).create(modelClass);
        }
        mViewModelStore.put(key, viewModel);
        return (T) viewModel;
  }
}
```

>   ViewModelStore 一个真正用来存储ViewModel实例的集合。本质上是HashMap<String,ViewModel>

**getViewModelStore源码分析**

关键点来，想要ViewModel实例对象不随着宿主重建而销毁，那就要保证ViewModelStore实例对象不随着宿主重建而销毁。

```java
class ComponentActivity extends ViewModelStoreOwner{
    static final class NonConfigurationInstances {
        Object custom;
        ViewModelStore viewModelStore;
    }
    public ViewModelStore getViewModelStore() {
       if (mViewModelStore == null) {
       //从源码上可以看出，会首先从`NonConfigurationInstances`来获取`ViewModelStore`实例对象，
       //如果不为空那是不是就能做到复用了 ？
       //所以重点在于`ViewModelStore`何时被存储到`NonConfigurationInstances`里面的.
           NonConfigurationInstances nc =
                   (NonConfigurationInstances) getLastNonConfigurationInstance();
           if (nc != null) {
               mViewModelStore = nc.viewModelStore;
           }
           if (mViewModelStore == null) {
               mViewModelStore = new ViewModelStore();
           }
       }
     
       return mViewModelStore;
    }
   }
}
```

**onRetainNonConfigurationInstance源码分析**

因系统原因页面被回收时，会触发该方法，所以ViewModelStore对象此时会被存储在NonConfigurationInstance中。在页面恢复重建时，会再次把这个NonConfigurationInstance 对象传递到新的Activity中实现对象复用。

```java
class ComponentActivity{
public final Object onRetainNonConfigurationInstance() {
      Object custom = onRetainCustomNonConfigurationInstance();
      ViewModelStore viewModelStore = mViewModelStore;
      if (viewModelStore == null) {
          // 如果NonConfigurationInstance保存了viewModelStore，把它取出来
          NonConfigurationInstances nc =
                  (NonConfigurationInstances) getLastNonConfigurationInstance();
          if (nc != null) {
              viewModelStore = nc.viewModelStore;
          }
      }

      if (viewModelStore == null && custom == null) {
          return null;
      }

      NonConfigurationInstances nci = new NonConfigurationInstances();
      nci.custom = custom; 
        //把viewModelStore放到NonConfigurationInstances中并返回
      nci.viewModelStore = viewModelStore;
       //这样当页面被销毁时ViewModelStore就被保存起来了。
      return nci;
   }
}
```

## 总结

ViewModel和onSaveInstanceState方法有什么区别？

- onSavedInstanceState只能存储轻量级的key-value键值对数据，非配置变更导致的页面被回收时才被触发，此时数据存储在ActivityRecord中；
-  ViewModel可以存放任意Object数据，因配置变更导致的页面被回收才有效。此时存在ActivityTheard#ActivityClientRecord中。

但是，如果是内存不足或者因为电量不足导致页面被回收，这种情况不是配置变更，所以ViewModel就无法实现复用了，**那能不能让ViewModel在这种情况下也能实现数据的存储呢？必须可以，答案就在下一节！**