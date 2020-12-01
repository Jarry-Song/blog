# 走进Jetpack框架组件库

参考：
https://www.jianshu.com/p/5ffb9993e4e5

https://juejin.cn/post/6874886821235392519

https://github.com/mrme2014/hi_jetpack

https://doc.devio.org/as/book/docs/Part2/%E7%BA%BF%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%BC%80%E5%8F%91%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/1.thread_introduction.html

https://github.com/rivenlee0/CGhelper


## 什么是Jetpack

自从Google在2018年推出Jetpack之后，它就成为了**Android未来发展的指向标**。Google也希望通过Jetpack统一开发者的开发规范，同事它也是众多优秀Android组件的集合。Jetpack是Google为解决Android开发碎片化，打造成熟健康生态圈提出的战略规划，是Google对Android未来提出的发展方向。

> 注意：Jetpack是众多组件库的统称，AndroidX是这些组件的统一包名。

发展到今天，各个大厂以及GitHub都已经在拥抱并适配Jetpack，甚至Jetpack已经成为了Android开发工程师面试必问的一项技术，可以称它为Android开发必学的技能。

详细可以参考：https://developer.android.google.cn/jetpack

## Jetpack的优势

- Jetpack拥有基于生命周期感知的能力，可以减少NPE崩溃、内存泄露。为我们开发出健壮且流畅的程序提供强力保障；
- Jetpack可以消除大量重复样板式代码，可以加速Android的开发进程。这些组件可搭配工作，也可单独使用，同时配合Kotlin语言特性能够显著提高工作效率。
- 统一开发模式，抛弃传统的MVC、MVP。

## Jetpack组件库介绍

![img](https://gitee.com/jarrysong/img/raw/master/img/5196125-0e0834ffa48d871b.webp)



从上图中可以看到Jetpack一共有四部分组成，然而UI、Behavior、Foundation这三部分大多是对已有内容的收集整理，这四部分中最为**核心的就是本专栏着重讲解的Architecture架构部分。**

Architecture架构部分主要包含以上8个重要成员，本着面向实际开发的需要，所以专栏多以**高频用法 + 实现原理 + 面试考点 + 进阶实战**多个维度授课。让同学们充分掌握Jetpack的核心组件。

下面先对专栏的课时安排以及Ketpack核心组件进行初步的介绍让同学们对Jetpack组件库有个初步的印象，详细的我们会在每一节中再展开讨论。

![image-20201126210406985](https://gitee.com/jarrysong/img/raw/master/img/image-20201126210406985.png)

**1.Lifecycler:具备宿主生命周期感知能力的组件**

- 特性：它持有组件(如Activity或Fragment)生命周期状态的信息，并且允许其他对象观察此状态。

- 本篇主要讲解：
  - 什么是Lifecycle；
  - 如何使用Lifecycle观察宿主状态；
  - Fragment是如何实现Lifecycle的；
  - Activity是如何实现Lifecycle的；
  - Lifecycle是如何分发宿主状态的等内容。

**2.LiveData：新一代具备生命周期感知能力的数据订阅、分发组件**

- 特性：支持共享资源、支持黏性事件的分发、不再需要手动处理生命周期、确保界面符合数据状态。
- 不足：黏性事件不支持取消。
- 本篇主要介绍：
  - 什么是LiveData；
  - LiveData核心方法，
  - LiveData事件分发实现原理等内容。

**3.LiveData进阶实现**

- 本篇将着重讲解如何基于LiveData实现消息总线，并实现黏性事件可控，从而抛弃EventBus。

**4.ViewModel：具备生命周期感知能力的数据存储组件**

- 特性:
  - 1.页面因配置变更导致的重启，此时数据不丢失。
  - 2.可以实现跨页面（跨Activity）的数据共享。
- 本篇主要讲解:
  - 什么是ViewModel；
  - ViewModel的用法；
  - ViewModel复用实现原理等内容。

**5.SavedState架构组件原理解析**

- 特性：因内存不足，电量不足导致页面被回收时可以搭配ViewModel实现数据存储于恢复。
- 本篇主要讲解：
  -  什么是SavedState；
  -  SaveState的用法；
  -  SavedState数据存储与恢复实现原理等内容。

**6.Room：轻量级orm数据库，本质上是一个SQLite抽象层**
- 特性：使用简单（类似于Retrofit库），通过注解的方式实现相关功能。编译时自动生成相关实现类</li>
- 本篇主要讲解主要介绍:
  - 什么是Room；
  - Room高频用法；
  - Room数据库创建实现原理；
  - Room与LiveData的巧妙结合，数据变更监听等内容。

**7.基于Room封装APP离线缓存框架**
- 本篇主要讲解如何预计Room数据库实现离线缓存框架HiStorage，可以用于缓存任意数据结构的数据。

**8.DataBinding：只是一种工具，它解决的是View和数据之间的双向绑定。**
- 特性：支持数据与视图双向绑定、数据绑定空安全、减少模板代码、释放Activity/Fragment压力
- 本篇主要讲解:
  - 什么是DataBinding；
  - DataBinding的优势；
  - DataBinding如何使用；
  - 与ViewBinding的区别等内容。

**9.Paging：列表分页组件，可以轻松完成分页预加载以达到无限滑动的效果**
- 巧妙融合LiveData、提供多种数据源加载方式
- 不足之处：不支持列表数据增删改。列表添加HeaderView，FooterView定位不准确。这点我们会这招讲解如何解决这些问题
- 本篇主要讲解:
  - 什么是Paging；
  - 如何使用Paging；
  - Paging工作原理；
  - Paging现存问题以及如何去解决等内容。

**10.Navigation组件原理分析：端内统一路由组件**

- 不足：十分依赖xml配置文件不利于组件化，模块化，千人千面场景开发
- 本篇主要讲解:
  - 什么是Navigation；
  - Navigation如何使用；
  - Navigation工作原理；
  - Navigation现存问题。

**11.组件进阶改造**
- 本篇主要讲解基于Navigation手把手实现APP配置架构搭建

**12.WorkManager：新一代后台任务管理组件，功能十分强悍。Service能做的事情它都能做**
- 支持周期性任务调度、链式任务调度、丰富的任务约束条件、程序即便退出，依旧能保证任务的执行
- 本篇主要讲解:
  - 什么是WorkManager；
  - WorkManager的优势；
  - WorkManager如何使用；
  - WorkManager架构工作原理等内容

**13.老项目适配AndroidX**

- 本篇主要讲解老旧项目如何使用Jetpack的能力，如何迁移，以及迁移过程存在的主要问题

**14.Jetpack专栏总结：回顾全文。对本专栏做一个全面的总结与展望。**
