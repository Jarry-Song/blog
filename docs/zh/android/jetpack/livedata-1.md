# LiveData架构组件原理解析

## 前言

这一节我们将学习LiveData组件，学完本节之后，同学们不仅可以掌握LiveData的使用场景，消息分发原理，黏性事件产生的原理，哪怕遇到了任何问题，都可以有迹可循。

## 提纲
  * 什么是LiveData
  * LiveData衍生类
  * LiveData核心方法
  * LiveData事件分发实现原理
 ## 什么是LiveData
LiveData组件是Jetpack新推出基于观察者的消息订阅/分发组件，具有宿主（Activity/Fragment）生命周期感知能力，这种感知能力可**确保LiveData仅分发消息给处于活跃状态的观察者，既只有处于活跃状态的观察者才能收到消息。**

> 活跃状态：通常情况下等于Observer所在宿主处于started、resumed状态，如果使用observeForever注册的，则一直处于活跃状态。

LiveData的消息分发机制，是以往的Handler、EventBus、RxJavaBus无法比拟的，它们不会顾及当前页面是否可见，一股脑的有消息就转发。导致即便**应用在后台页面不可见的情况下还在做一些无用的工作抢占资源**。举个例子，细心的同学可以发现微信消息列表是在页面可见状态时才会更新列表最新信息的。

LiveData的出现解决了以往使用callback回调可能带来的NPE，生命周期越界，后台任务抢占资源等问题。

从代码的角度来看一看LiveData与传统消息分发组件的不同：

```java
class MainActivity extends AppcompactActivity{
    public void onCreate(Bundle bundle){

     Handler handler = new Handler(){
        @Override
        public void handleMessage(@NonNull Message msg) {
             //无论页面可见不可见，都会去执行页面刷新,IO。更有甚者弹出对话框
        }
      };
     //1.无论当前页面是否可见,这条消息都会被分发。----消耗资源
     //2.无论当前宿主是否还存活,这条消息都会被分发。---内存泄漏
    handler.sendMessage(msg)

    liveData.observer(this,new Observer<User>){
         void onChanged(User user){
           
         }
     }
    //1.减少资源占用---          页面不可见时不会派发消息
    //2.确保页面始终保持最新状态---页面可见时,会立刻派发最新的一条消息给所有观察者--保证页面最新状态
    //3.不再需要手动处理生命周期---避免NPE
    //4.可以打造一款不用反注册,不会内存泄漏的消息总线---取代eventbus
    liveData.postValue(data);
  }
}
```

## LiveData的优势

**确保页面符合数据状态**

LiveData遵循观察者模式。当生命周期状态发生变化时，LiveData会通知Observer对象并把最新数据派发给它。观察者可以在收到onChanged事件时更新界面，而不是每次数据发生更改时立即更新界面。

**不再需要手动处理生命周期**

只需要观察相关数据。不用手动停止或回复观察。LiveData会自动管理Observer的反注册，因为它能感知宿主生命周期的变化，并在宿主生命周期的onDestory自动进行反注册。因为使用LiveData做消息分发不会发生内存泄露。

**数据始终保持最新状态**

如果宿主的生命周期变为非活跃状态，它会在再次变为活跃状态时接收最新的数据。例如，曾经在后台的Activity会在返回前台后立即接收最新的数据。

**支持黏性事件的分发**

即先发送一条数据，后注册一个观察者，默认是能够收到之前发送的那条数据

**共享资源**

我们可以使用单例模式拓展LiveData，实现全局的消息分发总线


## LiveData的几种用法

使用LiveData之前需要先添加依赖：

```java
//通常情况下，只需要添加appcompat就可以了
 api 'androidx.appcompat:appcompat:1.1.0'
 //如果想单独使用，可引入下面依赖
 api 'androidx.lifecycle:lifecycle-livedata:2.0.0'
```

**MutableLiveData**

我们在使用LiveData做消息分发的时候，需要使用这个子类。之所以这么设计，是考虑到*单一开闭原则*，只有拿到MutableLive对象才可以发送消息，Livedata对象只能接受消息，*避免拿到LiveData对象时既能发消息也能收消息的混乱使用*。

```java
public class MutableLiveData<T> extends LiveData<T> {
      @Override
      public void postValue(T value) {
        super.postValue(value);
      }

      @Override
      public void setValue(T value) {
          super.setValue(value);
      }
   }
```

**MediatorLiveData**

  * 可以统一观察多个LiveData发射的数据进行统一的处理。
  * 同时也可以做为一个LiveData，被其他Observer观察。

```java
//创建两个长得差不多的LiveData对象
LiveData<Integer> liveData1 =  new MutableLiveData();
LiveData<Integer> liveData2 = new MutableLiveData();

 //再创建一个聚合类MediatorLiveData
 MediatorLiveData<Integer> liveDataMerger = new MediatorLiveData<>();
 //分别把上面创建LiveData 添加进来。
liveDataMerger.addSource(liveData1, observer);
liveDataMerger.addSource(liveData2, observer);

Observer observer = new Observer<Integer>() {
  @Override
 public void onChanged(@Nullable Integer s) {
      titleTextView.setText(s);
 }
//一旦liveData1或liveData2发送了新的数据 ，observer便能观察的到，以便统一处理更新UI
```

**Transformations.map 操作符**

可以对LiveData的数据进行变化，并且返回一个新的LiveData对象，这一点了解即可。
```java
MutableLiveData<Integer> data = new MutableLiveData<>();

//数据转换
LiveData<String> transformData = Transformations.map(data, input ->   String.valueOf(input));
//使用转换后生成的transformData去观察数据
transformData.observe( this, output -> {

});

//使用原始的livedata发送数据
data.setValue(10);
```

**LiveData核心方法**

方法名 	| 作用
---|---
observe(LifecycleOwner owner,Observer observer) |	注册和宿主生命周期相关的观察者
observeForever(Observer observer) 	|注册观察者，不会反注册，需自行维护
setValue(T data) 	|发送数据，没有活跃的观察者时不分发，只能在主线程
postValue(T data) 	|和setValue一样，不受线程环境限制
onActive 	|当且仅当有一个活跃的观察者时才触发
inActivie 	|不存在活跃的观察者时才触发

## LiveData实现原理

黏性消息分发流程，即新注册的observer也能接受到前面发送的最后一条数据。原因就在于LiveData每次发送一条数据它的mVersion都会+1。但是新注册的Observer的lastVersion=0，图中的considerNotity方法就会把前面发送的数据分发给信注册的Observer了。

消息分发这个流程还是比较简单的，我就不用文字赘述了，看图就能懂：

![](https://gitee.com/jarrysong/img/raw/master/img/20201128120541.png)

**LiveData注册观察者触发消息分发流程原理分析**

observe注册时，可以主动跟宿主生命周期绑定，不用反注册：

```java
public void observe(@NonNull LifecycleOwner owner, @NonNull Observer<? super T> observer) {
        //1. 首先来个断言，这个方法只能在主线程调用，observeForever也是。
        assertMainThread("observe");
        //2.其次把注册进来的observer包装成 一个具有生命周边边界的观察者
        //它能监听宿主被销毁的事件，从而主动的把自己反注册，避免内存泄漏
        //此时观察者是否处于活跃状态就等于宿主是否可见
        LifecycleBoundObserver wrapper = new LifecycleBoundObserver(owner, observer);
        //3.接着会判断该观察是否已经注册过了，如果是则抛异常,所以要注意，不允许重复注册
        ObserverWrapper existing = mObservers.putIfAbsent(observer, wrapper);
        if (existing != null && !existing.isAttachedTo(owner)) {
            throw new IllegalArgumentException("Cannot add the same observer"
                    + " with different lifecycles");
        }
        //4.这一步才是关键
        //利用Lifecycle，把观察者注册到进去，才能监听到宿主生命周期状态的变化，对不对？
        //根据上节的分析，一旦一个新的观察者被添加，Lifecycle也会同步它的状态和宿主一致对不对？此时会触发观察者的onStateChanged方法
        owner.getLifecycle().addObserver(wrapper);
    }
```

LifecycleBoundObserver监听宿主的生命周期，并且宿主不可见时不分发任何数据：

```java
class LifecycleBoundObserver extends ObserverWrapper implements LifecycleEventObserver {
        LifecycleBoundObserver(@NonNull LifecycleOwner owner, Observer<? super T> observer) {
            super(observer);
        }

        @Override
        boolean shouldBeActive() {
        //使用observer方法注册的观察者都会被包装成LifecycleBoundObserver
        //观察者是否活跃就等于宿主 的状态是否大于等于STARTED，
        //如果页面当前不可见，你发送了一条消息，此时是不会被分发的，可以避免后台任务抢占资源,当页面恢复可见才会分发。
        //注意：如果使用observerForever注册的观察者，
        //会被包装成AlwaysActiveObserver,它的shouldBeActive一致返回true.即便在页面不可见也能收到数据
            return mOwner.getLifecycle().getCurrentState().isAtLeast(STARTED);
        }
    
        @Override
        public void onStateChanged(@NonNull LifecycleOwner source,
                @NonNull Lifecycle.Event event) {
                //在这里如果监听到宿主被销毁了，则主动地把自己从livedata的观察者中移除掉
            if (mOwner.getLifecycle().getCurrentState() == DESTROYED) {
                removeObserver(mObserver);
                return;
            }
            //否则说明宿主的状态发生了变化，此时会判断宿主是否处于活跃状态
            activeStateChanged(shouldBeActive());
        }
    }
```

ObserverWarpper状态变更后，如果观察者处于活跃状态会触发数据的分发流程：

```java
abstract class ObserverWrapper{
        final Observer<? super T> mObserver;
        boolean mActive;
        int mLastVersion = START_VERSION//这里就等于-1,没有主动和LiveData的mVersion对齐，为黏性事件埋下了伏笔
        
        void activeStateChanged(boolean newActive) {
            if (newActive == mActive) {
                return;
            }
            //更改观察者的状态
            mActive = newActive;
            boolean wasInactive = LiveData.this.mActiveCount == 0;
            //如果此时有且只有一个活跃的观察者则触发onActive
            LiveData.this.mActiveCount += mActive ? 1 : -1;
            if (wasInactive && mActive) {
                onActive();
            }
            //没有任何一个活跃的观察者则触发onInactive
            //利用这个方法被触发的时机，可以做很多事，比如懒加载，资源释放等
            if (LiveData.this.mActiveCount == 0 && !mActive) {
                onInactive();
            }
            //如果此时观察者处于活跃状态,下面就开始分发数据了
            //请注意，这里传递了this = observer
            if (mActive) {
                dispatchingValue(this);
            }
        }
} 
```

dispatchingValue数据分发流程控制：

```java
void dispatchingValue(@Nullable ObserverWrapper initiator) {
        if (mDispatchingValue) {
            mDispatchInvalidated = true;
            return;
        }
        mDispatchingValue = true;
        do {
            mDispatchInvalidated = false;
            if (initiator != null) {
            //如果传递的观察者不为空，则把数据分发给他自己。这个流程是新注册观察者的时候会被触发
                considerNotify(initiator);
                initiator = null;
            } else {
                //否则遍历集合中所有已注册的的观察者，逐个调用considerNotify，分发数据
                for (Iterator<Map.Entry<Observer<? super T>, ObserverWrapper>> iterator =
                        mObservers.iteratorWithAdditions(); iterator.hasNext(); ) {
                    considerNotify(iterator.next().getValue());
                    if (mDispatchInvalidated) {
                        break;
                    }
                }
            }
        } while (mDispatchInvalidated);
        mDispatchingValue = false;
    }
```

considerNotity数据真正分发的地方，需要满足三个条件：

```java
private void considerNotify(ObserverWrapper observer) {
        //观察者当前状态不活跃不分发
        if (!observer.mActive) {
            return;
        }
        //观察者所在宿主是否处于活跃状态,否则不分发，并且更改观察者的状态为false
        if (!observer.shouldBeActive()) {
            observer.activeStateChanged(false);
            return;
        }
        //此处判断观察者接收消息的次数是否大于等于 发送消息的次数
        //但是observer被创建之初verison=-1 
        //如果此时LiveData已经发送过数据了。这里就不满足了，就出现黏性事件了，后注册的观察者收到了前面发送的消息。
        if (observer.mLastVersion >= mVersion) {
            return;
        }
        //每分发一次消息，则把观察者和LiveData的version对齐，防止重复发送
        observer.mLastVersion = mVersion;
        //最后的数据传递
        observer.mObserver.onChanged((T) mData);
    }
```

普通消息分发流程。即调用postValue，setValue才会触发消息的分发：

![](https://gitee.com/jarrysong/img/raw/master/img/20201128121109.png)

## 总结

我们经常会使用observer()，observerForever()去注册观察者，它俩有什么区别呢？

  * **observer()**：不需要手动反注册，并且宿主不可见时收不到消息，当宿主回复可见时，会立刻受到最新的数据；
  * **observeForever()**：需要自行手动反注册，并且无论宿主是否可见，都能够收到消息；
  * 可以充分利用onActive()方法被激活的时机，来实现一些数据懒加载的功能。

留下个思考， 既然我们已经知道了LiveData产生黏性事件的原因？那么如何去解决呢？请看下回分解