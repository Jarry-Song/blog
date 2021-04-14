(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{373:function(t,a,n){"use strict";n.r(a);var s=n(42),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"kotlin开发环境搭建技巧"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#kotlin开发环境搭建技巧"}},[t._v("#")]),t._v(" Kotlin开发环境搭建技巧")]),t._v(" "),n("p",[t._v("Kotlin的运行依赖于JVM，所以首先我们要确保我们的电脑已经安装JDK；然后呢我们需要一个Kotlin的IDE：")]),t._v(" "),n("ul",[n("li",[t._v("IntelliJ IDEA")]),t._v(" "),n("li",[t._v("Android Studio")]),t._v(" "),n("li",[t._v("Eclipse")])]),t._v(" "),n("p",[t._v("考虑到大家开发主要用的是Android Studio，接下来就以Android Studio为例来讲解如何创建基于Kotlin的Android项目。")]),t._v(" "),n("h2",{attrs:{id:"创建一个基于kotlin的android项目"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#创建一个基于kotlin的android项目"}},[t._v("#")]),t._v(" 创建一个基于kotlin的Android项目")]),t._v(" "),n("p",[t._v("Android Studio 3.0 及更高版本提供全面的Kotlin 支持，如果你的AS版本低于3.0则需要更新AS。接下来就让我们来创建我们的Kotlin项目吧。")]),t._v(" "),n("p",[t._v("第一步：")]),t._v(" "),n("blockquote",[n("p",[t._v("打开 Android Studio，在欢迎页面点击 Start a new Android Studio project或者 File -> New -> New project。")])]),t._v(" "),n("p",[t._v("第二步：")]),t._v(" "),n("blockquote",[n("p",[t._v('选择一个定义应用程序行为的 activity 。对于第一个 "Hello world" 应用程序，选择仅显示空白屏幕的|Empty Activity，然后点击 Next。')])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://doc.devio.org/as/book/docs/Part1/Android%E5%BC%80%E5%8F%91%E5%BF%85%E5%A4%87Kotlin%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/images/0-create-new-project.png",alt:"Choosing empty activity"}})]),t._v(" "),n("p",[t._v("在下一个对话框中，填写工程的详细信息：")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://doc.devio.org/as/book/docs/Part1/Android%E5%BC%80%E5%8F%91%E5%BF%85%E5%A4%87Kotlin%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/images/1-create-new-project.png",alt:"Project configuration"}})]),t._v(" "),n("p",[n("strong",[t._v("开发语言：选择 Kotlin")]),t._v("。")]),t._v(" "),n("p",[t._v("完成这些步骤后，Android Studio 会创建一个项目。 该项目已包含用于构建可在Android 设备或模拟器上运行的应用程序的所有代码和资源。")]),t._v(" "),n("h2",{attrs:{id:"关于kotlin的包大小"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#关于kotlin的包大小"}},[t._v("#")]),t._v(" 关于Kotlin的包大小")]),t._v(" "),n("p",[t._v("Kotlin有着极小的运行时文件体积：整个库的大小约 1298 KB（1.3.61 版本）。这意味着 Kotlin 对 apk 文件大小影响微乎其微。")]),t._v(" "),n("blockquote",[n("p",[t._v("就对比 Kotlin 与 Java所编写的程序而言，Kotlin 编译器所生成的字节码看上去几乎无差异。")])]),t._v(" "),n("h2",{attrs:{id:"为已有基于java的android项目添加kotlin支持-为已有基于java的android项目添加kotlin支持"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#为已有基于java的android项目添加kotlin支持-为已有基于java的android项目添加kotlin支持"}},[t._v("#")]),t._v(" 为已有基于java的android项目添加kotlin支持>为已有基于Java的Android项目添加Kotlin支持")]),t._v(" "),n("p",[t._v("为已有基于Java的Android项目添加Kotlin支持有两种方式：")]),t._v(" "),n("ul",[n("li",[t._v("通过AS的工具添加：")]),t._v(" "),n("li",[t._v("手动添加：")])]),t._v(" "),n("h3",{attrs:{id:"通过as的工具添加"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#通过as的工具添加"}},[t._v("#")]),t._v(" 通过AS的工具添加")]),t._v(" "),n("p",[t._v("用Android Studio打开已有的Android项目，然后菜单栏上的 Tools 选项 -> Kotlin ->  configure kotlin in project：")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://doc.devio.org/as/book/docs/Part1/Android%E5%BC%80%E5%8F%91%E5%BF%85%E5%A4%87Kotlin%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF/images/configure-kotlin-with-android-with-gradle.jpg",alt:"configure-kotlin-with-android-with-gradle"}})]),t._v(" "),n("h3",{attrs:{id:"手动添加"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#手动添加"}},[t._v("#")]),t._v(" 手动添加")]),t._v(" "),n("blockquote",[n("p",[t._v("your project/build.gradle:")])]),t._v(" "),n("div",{staticClass:"language-xml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-xml"}},[n("code",[t._v("buildscript {\n    + ext.kotlin_version = '1.3.61'\n    repositories {\n        google()\n        jcenter()\n\n    }\n    dependencies {\n        classpath 'com.android.tools.build:gradle:3.5.3'\n        + classpath \"org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version\"\n\n        // NOTE: Do not place your application dependencies here; they belong\n        // in the individual module build.gradle files\n    }\n}\n...\n")])])]),n("blockquote",[n("p",[t._v("app/build.gradle：")])]),t._v(" "),n("div",{staticClass:"language-xml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-xml"}},[n("code",[t._v("apply plugin: 'com.android.application'\napply plugin: 'kotlin-android-extensions'\napply plugin: 'kotlin-android'\n...\ndependencies {\n   ...\n    + implementation \"androidx.core:core-ktx:+\"\n    + implementation \"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version\"\n}\nrepositories {\n    mavenCentral()\n}\n")])])]),n("p",[t._v("至此，我们已经完成了为原有项目添加kotlin的支持，接下来我们来看下如何将Java 文件转成kotlin文件？")]),t._v(" "),n("h2",{attrs:{id:"将java-文件转成kotlin文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#将java-文件转成kotlin文件"}},[t._v("#")]),t._v(" 将Java 文件转成kotlin文件")]),t._v(" "),n("p",[t._v("打开一个Java文件，然后选择菜单栏上的 Code 选项 ->  convert java file to kotlin file：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("devio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("as"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hi"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("kotlin"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("demo")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("androidx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("appcompat"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("app"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")])]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AppCompatActivity")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("android"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("os"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")])]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Bundle")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MainActivity")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AppCompatActivity")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("protected")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("onCreate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Bundle")]),t._v(" savedInstanceState"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("super")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("onCreate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("savedInstanceState"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setContentView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("R")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("layout"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("activity_main"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("转换后：")]),t._v(" "),n("div",{staticClass:"language-kotlin extra-class"},[n("pre",{pre:!0,attrs:{class:"language-kotlin"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" org"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("devio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("`"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v("`"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hi"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("kotlin"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("demo\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" android"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("os"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Bundle\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" androidx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("appcompat"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("app"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("AppCompatActivity\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" MainActivity "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AppCompatActivity")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("override")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("fun")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("onCreate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("savedInstanceState"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Bundle"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("super")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("onCreate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("savedInstanceState"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setContentView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("R"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("layout"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("activity_main"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("以上便是 "),n("strong",[t._v("Kotlin开发环境搭建")]),t._v(" 部分的所有内容.")]),t._v(" "),n("p",[t._v("参考："),n("a",{attrs:{href:"https://www.kotlincn.net/docs/tutorials/getting-started.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("以 IntelliJ IDEA 入门"),n("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);