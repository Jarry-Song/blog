# LiveData实战与应用

## 前言

上一节内容我们已经充分介绍了LiveData组件，我们可以发现在**使用LiveData分发数据的时候，是不会耦合任何Context独享的**，所以这个机制就从框架层避免了NPE,OOM等问题。但与此同时我们也发现了一些问题，比如LiveData无法取消黏性事件。如果之前发送的时间，而后注册的观察者也能接受到这条消息，那么是有可能会给我们带来麻烦的。

本节我们就要以一种优雅的方式去解决这个黏性事件的问题，与此同时还要基于LiveData打造一款消息分发总线，支持跨页面的数据发送与监听，从而彻底抛弃EventBus。

## 需求分析

  * 基于LiveData组件
  * 保证内存不会泄露
  * 不用反注册消息总线
  * 支持黏性事件

上面几点就是我们要最终实现的效果。用法上和EventBus非常相像，但我们的优势不用手动反注册，不用担心内存泄露了。

```java
HiDataBus.with("eventName").observer(lifecycleOwner,sticky,new    Observer<String>{
   void onChanged(String data){
   
   }
})
```

## 疑难解惑

消息分发核心方法：

```java
void considerNotify(ObserverWrapper observer) {
      //观察者没有处于活跃状态,则不分发。
       if (!observer.shouldBeActive()) {
           observer.activeStateChanged(false);
           return;
       }
       //观察者接收的消息的次数>=livedata发送消息的次数,不分发。
       //如果之前已经发送过数据了，新注册的observer也能接收到最后一条数据。
       if (observer.mLastVersion >= mVersion) {
           return;
       }
  
      //根本原因在于ObserverWrapper的version字段在创建时=-1,没有主动和LiveData的mVersion字段对齐
       observer.mLastVersion = mVersion;
       observer.mObserver.onChanged((T) mData);
}
```

控制黏性事件的突破口在于观察者的version字段，我们要在注册一个新的Observer时把它的**mLastVersion字段和LiveData.mVersion字段主动保持一致**就可以了。

但是上面这个version字段我们都是拿不到也无法修改的，网络上有种方案使用反射强行让Observer的mLastVersion和LiveData.mVersion对齐，但是不够优雅。

所以我们的做法是使用代理设计模式，从而修改掉新注册Observer的行为，下面来看代码：

```java
class StickyObserver<T> implements Observer<T> {
       private StickyLiveData<T> mLiveData;
       private Observer<T> mObserver;
       private boolean mSticky;

      //标记该observer已经接收几次数据了，用以过滤老数据重复接收
      private int mLastVersion = 0;

      public StickyObserver(StickyLiveData liveData, Observer<T> observer, boolean sticky) {
             //比如先使用StickyLiveData发送了一条数据。StickyLiveData#version=1
             //那当我们创建WrapperObserver注册进去的时候
             //需要把它的version和 StickyLiveData的version保持一致
             //用以过滤老数据，否则 岂不是会收到老的数据？
               mLastVersion = mLiveData.mVersion;
            }

      @Override
      public void onChanged(T t) {
              
                if (mLastVersion >= mLiveData.mVersion) {
                    //但如果当前observer它是关心 黏性事件的，则给他。
                    if (mSticky && mLiveData.mStickyData != null) {
                        mObserver.onChanged(mLiveData.mStickyData);
                    }
                    return;
                }

                mLastVersion = mLiveData.mVersion;
                mObserver.onChanged(t);
      }
}
```

支持黏性事件订阅、分发的StickyLiveData，自己管控消息分发的时机，相比于网络盛传的使用反射修改LiveData.mVersion字段的方式优雅的太多了

```java
public static class StickyLiveData<T> extends LiveData<T> {
      private String mEventName;
      private T mStickyData;
      private int mVersion = 0;
      public StickyLiveData(String eventName) {
          mEventName = eventName;
      }

      @Override
      public void setValue(T value) {
          //每次发送消息，版本号就需要+1，因为我们需要通过这个version管控，要不要分发黏性事件。
          mVersion++;
          super.setValue(value);
      }

      @Override
      public void postValue(T value) {
          super.postValue(value);
      }

      public void setStickyData(T stickyData) {
          //同步的方式发送黏性消息
          this.mStickyData = stickyData;
          setValue(stickyData);
      }

      public void postStickyData(T stickyData) {
          //异步的形式发送消息
          this.mStickyData = stickyData;
          postValue(stickyData);
      }

      @Override
      public void observe(@NonNull LifecycleOwner owner, @NonNull Observer<? super T> observer) {
          observerSticky(owner, observer, false);
      }

      public void observerSticky(LifecycleOwner owner, Observer<? super T> observer, boolean sticky) {
          super.observe(owner, new WrapperObserver(this, observer, sticky));
          owner.getLifecycle().addObserver(new LifecycleEventObserver() {
              @Override
              public void onStateChanged(@NonNull LifecycleOwner source, @NonNull Lifecycle.Event event) {
                  if (event == Lifecycle.Event.ON_DESTROY) {
                      //自动反注册
                      mHashMap.remove(mEventName);
                  }
              }
          });
      }
}
```

## 总结

通过对LiveData的实战应用，我们再一次巩固了LiveData的消息分发机制实现原理。日常开发中，如果有跨页面的消息分发需求的话已经不需要我们再引入其他任何框架了。

