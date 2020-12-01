# DataBinding组件架构应用
## 前言

在DataBinding出现之前，我们始终无法找到一个完美的解决方案，我们需要先监听数据的变化，然后再将变化后的数据同步更新到UI上，这样的步骤我们一直在重复，这样的重复性代码我们写了一次又一次。而DataBinding就是为了解决这个问题而存在的，我们只需要将数据绑定到UI元素上，更新数据时UI就会跟着改变，反之亦然，大大节省了我们的代码。


## 提纲

- 什么是DataBinding；
- DataBinding的优势；
- 如何引入DataBinding;
- DataBinding如何使用；
- DataBinding如何扩展View属性；
- DataBinding使用的一些建议；
- ViewBinding又是什么？它俩有什么关系？

## 什么是DataBinding？

简单来说，DataBinding可以理解为只是一种工具，它解决的是View和数据之间的双向绑定问题。


## DataBinding的优势

**双向数据绑定**

数据发生改变后，DataBinding会自动通知UI刷新页面，不再需要人工绑定最新数据到View上。UI改变后也能同步给数据。

**减少模板代码**

有了DataBinding，从此不用再写findViewById，setOnClickListener等枯燥生硬的代码，大大提高工作效率。从此ButterKnife靠边站。

**释放Activity/Fragment**

以前，我们在Activity，Fragment或Presenter中计算数据再绑定到View组件上，导致View层很臃肿，现在这部分工作我们可以直接在xml布局文件中完成。Activity，Fragment让它更加只关注核心业务。

**数据绑定空安全**

在xml中绑定数据它是空安全的，因为DataBinding在数据绑定上回自动装箱和空判断，所以大大减少了数据绑定带来的空指针问题。


## 如何引入DataBinding？

只需要在使用DataBinding模块的build.gradle文件中添加下面的配置。
```xml
// 每个使用dataBinding的模块都应该在build.gradle中添加如下配置
 android {
  ...
  dataBinding {
      enabled = true
  }
}
```
## DataBinding如何使用？

在布局文件中，选中根布局的标签，按住Alt+回车键，点击 Convert to databinding layout，即可转换成DataBinding布局（见下方代码段）、

转换后的布局，最外层变成了layout标签，里面包裹了data标签和常规的布局元素。**data元素用来声明在此布局用使用到的变量和变量的类型**，以及类引用。

**那么是不是所有属性都能用DataBinding来绑定呢？**

当然不是！如果一个属性xxx，在该类中有setXxx方法，我们才能使用DataBinding来绑定。例如android:layout_width,android_layout_height就不能使用DataBinding来绑定数据。而android:paddingLeft, android:textSize都是可以的。

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    <data>
        //这里可以使用variable定义多个变量，该变量需要通过外界赋值
        <variable
            name="user"
            type="org.devio.as.main.User" />
        //通过import导入需要用到的类
        <import type="android.view.View"/>
        <import type="org.devio.as.main.UserManager"/>
    </data>
    
    <androidx.constraintlayout.widget.ConstraintLayout>
        <TextView
            android:id="@+id/tvName"
            android:layout_width="200dp"  //不能使用dataBinding动态绑定
            android:text="@{user.name}"  //单向绑定,数据变更自动刷新UI
            android:textSize="@{@dimen/16sp}"//资源引用
            android:text="@{user.name+@string/suffix}"  //字符串的拼接需要引用资源 
            android:text="@{UserManager.getUserName()}" //调用静态方法,类必须先导入
            android:onClick="@{()-> UserManager.login()}"//事件绑定
          />

      <EditText
            //双向绑定数据变更自动更新UI，UI变更了也能自动更新user中name的数据，比单向绑定多个=
           // android:text="@{user.name}"等价于tvName.text = user.name这样就将数据和View相关联了
            android:text="@={user.name}" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

**绑定传递数据源**

给DataBinding中的User对象赋值
```java
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    //此时可以通过DataBindingUtil来设置Activity的页面布局。此时会返回一个ActivityMainBinding对象。这个是编译时根据xml布局文件中的数据绑定自动生成的实现类。
    ActivityMainBinding  binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
    binding.lifecycleOwner = this
    binding.user = User('张三') //完成数据绑定
    
    //如果是在列表中使用，则可以如下编写 。ActivityMainBinding是根据activity_main布局文件自动生成的
    val binding = ActivityMainBinding.inflate(layoutInflater, null, false)
    binding.user = User('张三') 
}
```

**如何实现数据变化的视图自动更新呢？**

想要实现数据变化的视图自动更新我们只需要让实体类User集成BaseObservable。当User中字段发生变更，只需要调用user.notifyPropertyChanged就可以让UI刷新。
```java
public class User extends BaseObservable  {
    public String name;
    //当使用name字段发生变更后，若想UI自动刷新，我们需要给它写个get方法并且标记Bindable注解。
   
    @Bindable                   
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
         //最后调用notifyPropertyChanged方法即可
         //该字段变更了，通知UI刷新数据
        notifyPropertyChanged(org.devio.as.main.BR.user);
    }
    
    //除此之外也可以使用ObserverableBoolean...observerableInt来监听数据的变化
    ObserverableBoolean<Boolean> success = new   ObserverableBoolean<>();
}
```

DataBinding也支持在布局文件中使用数组、List、Set和Map，且在布局文件中都可以通过List[index]的形式来获取元素。因为xml的特性，在声明List<String>之类的数据类型时，需要使用尖括号的转义字符，来看下面的代码：
```xml
<?xml version="1.0" encoding="utf-8"?>
<layout >
    <data>
        <import type="java.util.List" /> <import type="java.util.Map" />
        <import type="java.util.Set" /> <import type="android.util.SparseArray" />
        <variable
            name="array"
            type="String[]" />
        <variable
            name="list"
            type="List<String>" />            //List<String> 其中< 和  >俩字符需要转义
        <variable
            name="map"
            type="Map<String, String>" />     //Map<String>
        <variable
            name="set"
            type="Set<String>" />             //Set<String>
        <variable
            name="sparse"
            type="SparseArray<String>" />     //SparseArray<String>
        <variable
            name="index"
            type="int" />
        <variable
            name="key"
            type="String" />
    </data>

    <LinearLayout>
        <TextView
            android:text="@{array[1]}" />

        <TextView
            android:text="@{sparse[index]}" />

        <TextView
            android:text="@{list[index]}" />

        <TextView
            android:text="@{map[key]}" />

        <TextView
            android:text='@{map["慕课jetpack"]}' />

        <TextView
            android:text='@{set.contains("xxx")?"慕课jetpack":key}' />
    </LinearLayout>
</layout>

```

DataBinding在xml中数据绑定支持的语法表达式也是非常丰富的，支付在布局文件中使用一下运算符、表达式和关键字：

  * 算术运算符：+ - * / %；
  * 字符串连接运算符：+；
  * 逻辑运算符：&& ||；
  * 二元运算符：& | ^；
  * 一元运算符： + - ! ~；
  * 位移运算符： >> >>> <<；
  * 比较运算符： == > < >= <= (需要被转义)；
  * 判断是否是类的实例：instanceof；
  * 分组运算符：();
  * 字面量运算符 - 字符，字符串、数据、null；
  * 类型转换、方法调用；
  * 字段访问；
  * 数组访问： [];
  * 三元运算符：?:；
  * 不支持以下操作：this super new 显示泛型调用。

## BataBinding如何扩展View属性

我们知道，以前想要给ImageView增加几个属性，必须要写个自定义的ImageView在构造函数中一顿解析。那看看使用DataBinding如何扩展View属性。

```java
public class HiImageView extends ImageView{

   //需要使用BindingAdapter注解并标记在public static方法上。
    //value中的字段随意添加和方法参数一一对应即可。
   @BindingAdapter(value = {"image_url", "isCircle"})
    public static void setImageUrl(PPImageView view, String imageUrl, boolean isCircle) {
        view.setImageUrl(view, imageUrl, isCircle, 0);
    }
    //requireAll = false代表是否以下三个属性在xml中同时使用才会调用到该方法
    //为false的话，只要有一个属性被使用就能调用到该方法
    @BindingAdapter(value = {"image_url", "isCircle", "radius"}, requireAll = false)
    public static void setImageUrl(PPImageView view, String imageUrl, boolean isCircle, int radius) {
       ......
      }
   }

//在布局文件中如下使用，便能实现图片圆角和资源Url绑定的功能
 <org.devio.as.main.HiImageView
            .......
            app:image_url ="@{user.avatar}"
            app:radius="@{50}">
</org.devio.as.main.HiImageView>
```

## DataBinding使用的建议
- 如fragment_layout_my.xml布局，在编译时会生成FragmentLayoutMyImpl.java实现类，我们可以搜索这种类debug跟进解决问题。

- 不建议在列表中乱用，因为DataBinding数据绑定是延迟一帧的，如果列表中的ItemView的宽高需要计算后才能正确展示，不建议使用DataBinding操作。否则会看到列表ItemView明显的撑开动画，体验不好。
    
    **此处可以使用dataBinding.executePendingBindings()快速渲染布局解决**
    
- 实体类配合BaseObservable可以友好的解决数据双向绑定的问题。



## ViewBinding又是什么？
Android Studio更新到3.6之后，多了一个ViewBinding的功能，看到这个名字就感觉和DataBinding很相似，那么它们有什么区别呢？

- DataBinding可以将View和界面上的数据进行双向绑定，ViewBinding不行，也就是不能再xml中绑定数据，若要使用则需要在Gradle中开启如下配置：
   ```java
    viewBinding {
        enabled = true
    }
   ```
  
- 如果你想要实现双向数据绑定，那么可以选择DataBinding；
- ViewBinding主要是帮我们省却了findViewById的过程，但是它在编译阶段比DataBinding耗时更短；
- 如果你已经使用了Kotlin，那其实ViewBinding就没必要使用了。


 ## 总结
在使用DataBinding的时候，很多同学会误以为不方便调试，但是那是在5年前了，现在DataBinding跟Room一样，在编译阶段也会有丰富的错误提示，在运行阶段，我们可以根据布局文件找到实现类，跟进去断点排查问题。

DataBinding经常出现在MVVM开发模式中，用以减轻Activity/Fragment的压力，可它并不是MVVM必须的一环。