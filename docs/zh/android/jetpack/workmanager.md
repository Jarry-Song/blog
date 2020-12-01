# WorkManager组件架构应用

## 前言

前面的内容中我们已经介绍了很多Jetpack中的架构组件，可以说每一种组件的出现都是为了更好的解决现在存在的问题。同样的，WorkManager的出现也是为了解决某一问题，试想这样一个场景：在做开发的时候总避免不了做些后台任务，好比我们的业务埋点的上传，正常我们用定时器也可以实现，但是一旦用户退出了应用，我们的应用到了后台，一旦遇到系统内存吃紧的情况，应用进程就会被杀掉了，遇到这种情况我们的埋点就没法上传了。

但是WorkManager的出现基本解决了这种问题，它可以**在应用退出的时候依然执行一些异步任务。**

用官方的话来讲就是：WorkManager旨在用于可**延迟运行**（即不需要立即运行）并且**在应用退出或设备重启时必须能够可靠运行的任务。**


## 提纲

- 什么是WorkManager
- 如何使用WorkManager
- WorkManager与Service
- WorkManager工作原理


## 什么是WorkManager？

WorkManager是新一代后台任务的管理者，可以以轻松简单的方式实现复杂的后台任务控制。大量应用程序都有在后台执行任务的需求。根据需求的不同，Android为后台任务提供了多种解决方案，如JobScheduler，Loader，Service等。如果这些API没用被适当地使用，可能会消耗大量的电量。Android在解决应用程序耗电问题上做了各种尝试，从Doze到App Standby，通过各种方式限制和管理应用程序，以保证应用程序不会在后台过量消耗设备电量。WorkManager的出现，则是为应用程序中那些不需要及时完成的任务，提供统一的解决方案，以便在设备电量和用户体验之间达到一个比较好的平衡。

**WorkManager的优势**

- Workmanager确保任务可以被执行，在条件满足的时候会**即便应用程序不在运行中也可以执行任务**；
- WorkManager拥有丰富的任务控制手段和任务状态反馈，它提供多种方式控制任务是否继续执行，任务运行的每种状态都会以观察者的形式反馈；
- 多任务串联，例如执行任务A之前需要任务B和C先行完成，将会非常方便；
- 向前兼容支持到Api14，但会**受到系统后台任务的限制管理以节省电量**，例如APP进行Doze Mode的时候，任务将不会被执行。

## 如何使用WorkManager？

使用WorkManager之前同样要先添加依赖：
```java
implementation "androidx.work:work-runtime:2.4.0"
```

WorkManager的关键几个类介绍

由于该组件设计到的类比较多，所以在使用Work之前我们先来看一下Work组件中的几个关键类：

- **Worker：** 任务的执行者，是一个抽象类，需要继承它实现要执行的任务；
- **WorkRequest：** 每个任务在执行时都需要对构建一个WorkRequest对象，才能加入队列。有两个常用的子类OneTimeWorkRequest（任务只执行一遍）、PeriodicWorkRequest（任务周期性的执行）。
- **WorkManager：** 管理任务请求和任务队列，发起的WorkRequest会进行它的任务队列；
- **WorkStatus：** 包含有任务的状态和任务的信息，以LiveData的形式提供给观察者。

### 执行文件上传的任务

文件上传的场景每个APP都会遇到，按照之间的写法，是非常麻烦的。但如果使用WorkManager将会非常轻松。

**第一步，构建执行任务的类UploadFileWork**
```java
public class UploadFileWorker extends Worker {
    //需要让他继承自SDK提供的Worker父类
    public UploadFileWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

    @NonNull
    @Override
    public Result doWork() {
        //任务的执行是在这里完成的，注意这里已经是运行在子线程里面的了
        //getInputData方法可以获取 执行任务时传递的参数Data对象，本质是hashMap的进一步封装，但是Data类传递的参数不能超过10Kb,而且只支持基本数据类型和他们的数组。
        Data inputData = getInputData();
        //从入参中取出文件路径
        String filePath = inputData.getString("file");
        //执行文件上传，得到文件的Url
        String fileUrl = FileUploadManager.upload(filePath);
        
        //任务执行完，无论是成功失败，都需要返回Result对象。
        //此时它可以接收一个Data对象。用来承载文件上传得到的url
        Data outputData = new Data.Builder().putString("fileUrl", fileUrl)
                    .build();
        return Result.success(outputData);  //Result.failure()
    }
}
```

**第二步，构建WorkRequest，可以使用下面的这两个子类来构建不同的Request对象**

* OneTimeWorkRequest类：用以构建一次性任务的Request；
* PeriodicWorkRequest类：用以构建周期性执行的任务Request，任务间隔最少是15分钟，所以保活就别想了。

在构建Request对象的时候，提供了非常多的可选参数，可参考下面每个参数的作用。其中Builder（UploadFileWorker.class）必须指定。

```java
private OneTimeWorkRequest makeOneTimeWorkRequest(String filePath) {
         //构建任务的入参对象
        Data inputData = new Data.Builder()
                .putString("file", filePath)
                .build();
         //在构建request对象的时候，提供了非常多的参数，可以参考下面每个参数的作用
//       Constraints constraints = new Constraints();
//        //设备存储空间充足的时候 才能执行 ,>15%
//        constraints.setRequiresStorageNotLow(true);
//        //必须在执行的网络条件下才能好执行,不计流量 ,wifi
//        constraints.setRequiredNetworkType(NetworkType.UNMETERED);
//        //设备的充电量充足的才能执行 >15%
//        constraints.setRequiresBatteryNotLow(true);
//        //只有设备在充电的情况下 才能允许执行
//        constraints.setRequiresCharging(true);
//        //只有设备在空闲的情况下才能被执行 比如息屏，cpu利用率不高
//        constraints.setRequiresDeviceIdle(true);
//        //workmanager利用contentObserver监控传递进来的这个uri对应的内容是否发生变化,当且仅当它发生变化了我们的任务才会被触发执行，
//        以下三个api是关联的
//        constraints.setContentUriTriggers(Uri.from('file'));
//        //设置从content变化到被执行中间的延迟时间，如果在这期间。content发生了变化，延迟时间会被重新计算
        //这个content就是指 我们设置的setContentUriTriggers uri对应的内容
//        constraints.setTriggerContentUpdateDelay(0);
//        //设置从content变化到被执行中间的最大延迟时间
        //这个content就是指 我们设置的setContentUriTriggers uri对应的内容
//        constraints.setTriggerMaxContentDelay(0);
      
        OneTimeWorkRequest request = new OneTimeWorkRequest
                 //执行任务的class对象
                .Builder(UploadFileWorker.class)
                //传递任务执行的入参
                .setInputData(inputData)
//                .setConstraints(constraints)
//                //设置一个拦截器，在任务执行之前 可以做一次拦截，去修改入参的数据然后返回新的数据交由worker使用
//                .setInputMerger(null)
//                //当一个任务被调度失败后，所要采取的重试策略，可以通过BackoffPolicy来执行具体的策略
//                .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 10, TimeUnit.SECONDS)
//                //任务被调度执行的延迟时间
//                .setInitialDelay(10, TimeUnit.SECONDS)
//                //设置该任务尝试执行的最大次数
//                .setInitialRunAttemptCount(2)
//                //设置这个任务开始执行的时间  System.currentTimeMillis()
//                .setPeriodStartTime(0, TimeUnit.SECONDS)
//                //当一个任务执行状态变成finish时，又没有后续的观察者来消费这个结果，难么workamnager会在
//                //内存中保留一段时间的该任务的结果。超过这个时间，这个结果就会被存储到数据库中
//                //下次想要查询该任务的结果时，会触发workmanager的数据库查询操作，可以通过uuid来查询任务的状态
//                .keepResultsForAtLeast(10, TimeUnit.SECONDS)
                .build();
        return request;
    }
```

**第三步，把任务加入工作队列**

```java
//1.把任务加入队列，在合适的时机会被执行
WorkManager.getInstance().enqueue(request)

//2.如果多个任务之间存在依赖关系，此时可以使用如下方式
//此时 是requestA 和 requestB都执行完才会去执行requestC,requestC执行完才会去执行requestD
WorkContinuation chain = WorkManager.getInstance(application).beginWith(requestA,requestB);
chain.then(requestC).then(requestD)
chain.enqueue();

//3.再来个复杂点的  requestA->requestB--\
//                                   >>> requestE.
//                requestC->requestD--/  
//这个场景是 A,C同时并发执行，A执行完执行B，C执行完执行D，BD同时执行完才执行E.
val chainAB = WorkManager.getInstance()
        .beginWith(requestA)
        .then(requestB)
val chainCD = WorkManager.getInstance()
        .beginWith(requestC)
        .then(requestD)
val chain = WorkContinuation
        .combine(chainAB, chainCD)
        .then(requestE)
chain.enqueue()
//可以看到尽管任务链关系很复杂，但是workmanager可以轻易实现。
```

###　任务状态监听

每个任务加入队列之后，都会有以下7种状态：

  * *BLOCKED：*任务阻塞中；
  * *ENQUEUED：*队列等待中；
  * *RUNNING：*任务执行中；
  * *SUCCESSED：*任务执行成功；
  * *CANCELED：*任务取消；
  * *FAILED：*任务失败；
  * *FINISHED：*任务结束。

![](https://gitee.com/jarrysong/img/raw/master/img/5196125-1f5d2e7f28781369.png)

```java
//根据UUID获取任务  并监听它的状态。uuid可以通过request.getId()得到。
//可以把该uuid存储本地，以至于在任意页面都可以查询任务的执行状态
 WorkManager.getInstance(this).getWorkInfoById(uuid).observer()
 //根据任务的tag获取一组任务，并监听他们的状态
 WorkManager.getInstance(this).getWorkInfosByTag().observer()
 
//得到队列中所有的任务 并获取他们的状态
workContinuation.getWorkInfosLiveData().observe(PublishActivity.this, new Observer<List<WorkInfo>>() {
            @Override
            public void onChanged(List<WorkInfo> workInfos) {
                //任务的状态有六种分别是：
                //block runing enuqued failed susscess finish
                for (WorkInfo workInfo : workInfos) {
                    WorkInfo.State state = workInfo.getState();
                    Data outputData = workInfo.getOutputData();
                    UUID uuid = workInfo.getId();
                    if (state == WorkInfo.State.FAILED) {
                        // if (uuid==coverUploadUUID)是错的，
                        //coverUploadUUID = request,getId()得到
                        if (uuid.equals(coverUploadUUID)) {
                           
                        }  else if (state == WorkInfo.State.SUCCEEDED) {
                           
                        }
                      
            }
        });
```

### 任务控制

- 取消所有任务；
    ```java
    WorkManager.getInstance(this).cancelAllWork()
    ```

- 根据任务的tag取消，如果多个任务拥有同一个tag，那么它们都会被取消；
  ```java
  WorkManager.getInstance(this).cancelAllWorkByTag("tag")
  ```

- 根据任务名称取消任务；
  ```java
  WorkManager.getInstance(this).cancelUniqueWork("uploadfile")
  ```
- 根据任务的UUID取消某个任务。

  ```java
  WorkManager.getInstance(this).cancelWorkById()
  ```

## WorkManager与Service

WorkManager区别于异步任务，它更像是**一个系统级的后台服务。** 基本上，Workmanager能做的，Service也能做；但反观Service，泛滥的Service后台任务可能是引起Android系统卡顿的主要原因，这几年Google也对Service也做了一些限制：

- **休眠模式：** Android 6.0(API 23)在关闭手机屏幕后，系统会禁止应用的后台任务网络请求等功能；
- **后台启动：** Android 8.0(API 26)在后台不允许启动Service，会抛异常。

而WorkManager作为一个更合理的后台任务管理库，我们可以将一些诸如埋点、日志上报等费劲及执行的后台任务转义到WorkManager来实现。

## WorkManager工作原理

我们使用WorkManager构建的这些任务，在**加入任务队列之后都会被保存到数据库**，所以哪怕程序退出了，这些任务也能够被执行。如果在**调度任务时我们的APP在运行中，此时会选择线程池来执行**，如果在调度任务时我们的APP没有运行，在**5.0及以上版本会选择JobScheduler来调度，5.0以下会使用AlarmManager来调度任务。** 任务执行的**状态和结果都会被持久化到数据库。** APP下次启动时，也可以去查询任务的执行结果。

![](https://gitee.com/jarrysong/img/raw/master/img/5196125-2804d083edd19a98.png)


## 总结

对于需要立刻执行的任务还是不能使用WorkManager来调度，因为WorkManager的任务调度会收到系统当前状态的影响。虽然官方说即便应用退出了，也能保障任务得到执行，这一点在模拟器和Pixel手机上是得到验证的。但是国内手机Rom版本众多，还需要亲自验证才能知道。