# 探秘Kotlin协程机制

- 什么是协程
- 协程的用法
- 协程的启动
- 协程挂起,恢复原理逆向剖析

## 什么是协程

### 场景1:异步回调嵌套

![coroutine_1](https://doc.devio.org/as/book/docs/Part2/%E7%BA%BF%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%BC%80%E5%8F%91%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/coroutine_1.png)

```kotlin
//客户端顺序进行三次网络异步请求，并用最终结果更新UI
request1(parameter) { value1 ->
    request2(value1) { value2 ->
        request3(value2) { value3 ->
            updateUI(value3)            
        } 
    }              
}
```

这种结构的代码无论是阅读起来还是维护起来都是极其糟糕的。**对多个回调组成的嵌套耦合，我亲切地称为 "回调地狱"。**

> 协程的写法

```kotlin
GlobalScope.launch(Dispatchers.Main){
  val value1 = request1()
  val value2 = request2(value1)
  val value3 = request2(value2）
  updateUI(value3)
}

suspend request1( )
suspend request2(..)
suspend request3(..)
```

### 场景2：并发流程控制

![coroutine2](https://doc.devio.org/as/book/docs/Part2/%E7%BA%BF%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%BC%80%E5%8F%91%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/coroutine2.png)

```kotlin
//客户端顺序并发三次网络异步请求，并用最终结果更新UI
fun request1(parameter) { value1 ->
    request2(value1) { value2 ->
      this.value2=value2   
        if(request3){
         updateUI()       
      }
    } 
  request3(value2) { value3 ->
      this.value3=value3                
        if(request2) {
        updateUI()
      }     
    }                                  
}

fun updateUI()
```

> 协程写法

```kotlin
GlobalScope.launch(Dispatchers.Main){
   val value1 =    request1()
   val deferred2 = GlobalScope.async{request2(value1)}
   val deferred3 = GlobalScope.async{request3(value2)}
   updateUI(deferred2.await(),deferred3.await())
}

suspend request1( )
suspend request2(..)
suspend request3(..)
```

**协程的目的是为了让多个任务之间更好的协作,解决异步回调嵌套。能够以同步的方式编排代码完成异步工作。将异步代码像同步代码一样直观。同时它也是一个并发流程控制的解决方案。**

协程主要是**让原来要使用“异步+回调”写出来的复杂代码, 简化成看似同步写出来的方式**,弱化了线程的概念（对线程的操作进一步抽象）

## 协程的用法

### 引入gradle依赖

```xml
//在kotlin项目中配合jetpack架构引入协程
api 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0'
api 'androidx.lifecycle:lifecycle-runtime-ktx:2.2.0'
api 'androidx.lifecycle:lifecycle-livedata-ktx:2.2.0'

//在kotlin项目但非jetpack 架构项目中引入协程
api "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.2.1"
api 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.1.1'
```

### 常用的创建协程的方法

```kotlin
//创建协程时,可以通过Dispatchers.IO,MAIN,Unconfined指定协程运行的线程
val job:Job =GlobalScope.launch(Dispatchers.Main)
val deffered:Deffered=GlobalScope.async（Dispatchers.IO）
```

Job：协程构建函数的返回值，可以把 Job 看成协程对象本身，包含了对协程的控制方法。

Deffered是Job的子类，实际上就增加了个await方法。能够让当前协程暂时挂起,暂停往下执行。当await方法有返回值后,会恢复协程,继续往下执行

| 方法     | 说明             |
| -------- | ---------------- |
| start()  | 手动启动协程     |
| join()   | 等待协程执行完毕 |
| cancel() | 取消一个协程     |

### 协程的启动

```kotlin
public fun CoroutineScope.launch(
    context: CoroutineContext = EmptyCoroutineContext,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    block: suspend CoroutineScope.() -> Unit
): Job{
  val newContext = newCoroutineContext(context)
  val coroutine =  StandaloneCoroutine(newContext, active = true)
  coroutine.start(start, coroutine, block)
}
```

CoroutineContext - 可以理解为协程的上下文，是一种key-value数据结构

| CoroutineContext       | List                      |
| ---------------------- | ------------------------- |
| get(key: Key): E       | get(int index)            |
| plus(context: Element) | add(int index, E element) |
| minusKey(key: Key<*>)  | remove(E element)         |

CoroutineDispatcher 协程运行的线程调度器

### 协程调度器

![coroutine_dispatcher](https://doc.devio.org/as/book/docs/Part2/%E7%BA%BF%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%BC%80%E5%8F%91%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/coroutine_dispatcher.png)

| 模式                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| Dispatchers.IO         | 显示指定协程运行的线程,为IO线程                              |
| Dispatchers.Main       | 指定这个协程运行在主线程                                     |
| Dispatchers.Default    | 默认的,启动携程时会启动一个线程                              |
| Dispatchers.Unconfined | 不指定，就是在当前线程运行,协程恢复后的运行的线程取决于协程挂起时所在的线程 |

### CoroutineStart - 启动模式

默认是DEAFAULT，也就是创建就启动；还有一个是LAZY，意思是等你需要它的时候，再调用启动

| 模式                      | 说明                                        |
| ------------------------- | ------------------------------------------- |
| CoroutineStart().DEAFAULT | 模式模式，创建即启动协程,可随时取消         |
| ATOMIC                    | 自动模式,同样创建即启动,但启动前不可取      |
| LAZY                      | 延迟启动模式，只有当调用start方法时才会启动 |

## 协程挂起,恢复原理逆向剖析

### 挂起函数

**被关键字|suspend|修饰的方法在编译阶段,编译器会修改方法的签名.包括返回值,修饰符,入参,方法体实现**。协程的挂起是靠挂起函数中实现的代码。

```kotlin
suspend fun request(): String {
     delay(2 * 1000)//suspend fun()
     println("after delay")
     return "result from request"
}

public static final Object request(Continuation completion) {
  ContinuationImpl requestContinuation = completion;
        if ((completion.label & Integer.MIN_VALUE) == 0) 
            requestContinuation = new ContinuationImpl(completion) {
                @Override
                Object invokeSuspend(Object o) {
                    label |= Integer.MIN_VALUE;
                    return request(this);
                }
            };
        }
        switch (requestContinuation.label) {
            case 0: {
                requestContinuation.label = 1;
                Object delay = DelayKt.delay(2000, requestContinuation);
                if (delay == COROUTINE_SUSPENDED) {
                    return COROUTINE_SUSPENDED;
                }
            }
        }
  System.out.println("after delay")
  return "result from request";
}
```

### 协程挂起与协程恢复

**协程的核心是挂起----恢复,挂起--恢复的本质是return & callback回调**

![coroutine_resume](https://doc.devio.org/as/book/docs/Part2/%E7%BA%BF%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%BC%80%E5%8F%91%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/coroutine_resume.png)

## 协程回顾

- **什么是协程**
  - 协程是一种解决方案，是一种解决嵌套,并发,弱化线程概念的方案。能让多个任务之间更好的协作,能够以同步的方式编排代码完成异步工作。将异步代码写的像同步代码一样直观。
- *协程的启动*
  - 根据创建协程指定的调度器HandlerDispatcher,DefaultScheduler,UnconfinedDispatcher来执行任务,以决定协程中的代码块运行在那个线程上。
- **协程的挂起，恢复**
  - 本质是方法的挂起，恢复。本质是return +callback。
  - 用编译时的变换处理方法间的callback，这样可以很直观地写顺序执行的异步代码。
- **协程是线程框架吗？**
  - 协程的本质是编译时return +callback。只不过在调度任务时提供了能够
    运行在IO线程的调度器。

- **什么时候使用协程**
  - 多任务并发流程控制场景使用比较好, 流程控制比较简单,不会涉及线程
    阻塞与唤醒，性能比java并发控制手段高。