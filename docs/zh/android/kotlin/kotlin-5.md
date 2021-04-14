# Kotlin方法进阶

经过上一节的学习，相信大家已经能对Kotlin的方法有了一定的认识。那在这一节呢，我们将更进一步的学习Kotlin的一些高级特性。

## 高阶方法（函数）

高阶函数是将函数用作参数或返回值的函数。Kotlin支持高阶函数这样是Kotlin函数式编程的一大特性。

Kotlin源码中使用了大量的高阶函数，下面经常用到的apply 高阶函数的源码，它的主要作用是调用某对象的apply 函数，在函数范围内，可以任意调用该对象的任意方法，并返回该对象。

```kotlin
public inline fun <T> T.apply(block: T.() -> Unit): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block()
    return this
}
```

apply是一个T泛型的扩展函数，因为它接受一个函数类型的 block参数，所以它也是高阶函数。

### 函数作为参数

> 需求：实现一个能够对集合元素进行求和的高阶函数，并且每遍历一个集合元素要有回调

```kotlin
fun List<Int>.sum(callback: (Int) -> Unit): Int {
    var result = 0
    for (v in this) {
        result += v
        callback(v)
    }
    return result;
}
```

这是一个求List元素和的扩展函数（后面课程会重点接受），它因为接受一个函数类型的callback参数而被成为高阶函数。

```kotlin
val list = listOf(1, 2, 3, 4, 5)
val result = list.sum {
    println(it)
}
println("计算结果：${result}")
```

### 函数作为返回值

> 需求：实现一个能够对集合元素进行求和的高阶函数，并且返回一个 声明为(scale: Int) -> Float的函数

```kotlin
fun List<String>.toIntSum(): (scale: Int) -> Float {
    println("第一层函数")
    return fun(scale): Float {
        var result = 0f
        for (v in this) {
            result += v.toInt() * scale
        }
        return result
    }
}
```

这是一个求List元素和的扩展，它返回一个(scale: Int) -> Float 函数而被成为高阶函数

```kotlin
val listString = listOf("1", "2", "3")
val result2 = listString.toIntSum()(2)
println("计算结果：${result2}")
```

## 闭包（Closure）

方法与闭包的特性可以算是 Kotlin 语言最大的特性了。

> 其实在 Kotlin 中与其说一等公民是方法，不如说一等公民是闭包。

闭包（Closure）是词法闭包（Lexical Closure）的简称，闭包可以理解为**能够读取其他方法内部变量的方法**。 例如在JavaScript中，只有方法内部的子方法才能读取局部变量，所以闭包可以理解成“定义在一个方法内部的方法“。在本质上，**闭包是将方法内部和方法外部连接起来的桥梁**。

### 闭包的特性

- 方法可以作为另一个方法的返回值或参数，还可以作为一个变量的值。
- 方法可以嵌套定义，即在一个方法内部可以定义另一个方法。

### 闭包的好处

- 加强模块化：闭包有益于模块化编程，它能以简单的方式开发较小的模块，从而提高开发速度和程序的可复用性
- 抽象：闭包是数据和行为的组合，这使得闭包具有较好抽象能力
- 灵活：闭包的应用是的编程更加的灵活
- 简化代码：闭包还能简化代码


> 需求：实现一个接受一个| testClosure | 方法，该方法要接受一个Int类型的v1参数，同时能够返回一个声明为|(v2: Int, (Int) -> Unit)|的函数，并且这个函数能够计算v1与v2的和

```kotlin
fun testClosure(v1: Int): (Int, (Int) -> Unit) -> Unit {
    return fun(v2: Int, printer: (Int) -> Unit) {
        printer(v1 + v2)
    }
}
testClosure(1)(2) {
    println(it)
}
```

- testClosure接收一个Int类型的参数，返回一个带有如下参数的方法|(Int,(Int) -> Unit)|，该方法第一个参数是Int类型，第二个参数是一个接收Int类型参数的方法。
- testClosure也是高阶方法

## 解构声明

有时把一个对象 解构 成很多变量会很方便，例如:

```kotlin
var result = Result("success", 0)
val (msg, code) = result
println("msg:${msg}")
println("code:${code}")
```

这种语法称为解构声明。一个解构声明同时创建多个变量。

结构方法的返回值：

```kotlin
fun testDeco() {
    var result = result()
    val (msg, code) = result
    println("msg:${msg}")
    println("code:${code}")
}

fun result(): Result {
    return Result("good", 1)
}
```

## 匿名方法

顾名思义，没有方法名的方法：

```kotlin
fun(x: Int, y: Int): Int = x + y
```

匿名方法看起来非常像一个常规方法声明，除了其名称省略了。其方法体可以是表达式或代码块：

```kotlin
fun(x: Int, y: Int): Int {
    return x + y
}
```

> 上文中，我们在闭包的实例中返回的方法就是一个匿名方法。

## Kotlin方法字面值

方法字面值（量），可以理解为未声明的方法，即一段方法文本，说白了就是一段代码，可以当作参数来传递。

方法字面量是匿名的，它们在默认情况下没有名称，但是你可以通过将它们绑定到一个变量来给它们一个名字，在 Kotlin 中，Lambda 表达式、匿名方法，都是一种 方法字面值。

```kotlin
//定义了一个变量 tmp，而该变量的类型就是 (Int) -> Boolean
var tmp: ((Int) -> Boolean)? = null

fun literal() {
    // { num -> (num > 10) }即是一个方法字面值
    tmp = { num -> (num > 10) }
}
```

lambda 表达式可以用作带接收者的方法字面值。