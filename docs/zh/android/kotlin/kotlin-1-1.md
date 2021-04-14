# Kotlin与Java的异同 

## 打印日志

java

```java
System.out.print("hello world"); 
System.out.println("hello world");
```

Kotlin

```kotlin
print("hello world") 
println("hello world")
```

## 定义变量与常量常

java

```java
String name = "hello world"; 
final String name = "hello world";
```

kotlin

```kotlin
var name = "hello world" 
val name = "hello world"
```

## null声明

java

```java
String otherName; 
otherName = null;
```

Kotlin

```kotlin
var otherName : String? 
otherName = null
```

## 空判断

Java

```java
if (text != null) {
    int length = text.length();
}
```

Kotlin

```Kotlin
text?.let {
    val length = text.length
}
// or simply
val length = text?.length
```

## 字符串拼接

Java

```java
String firstName = "Android";
String lastName = "Architect";
String message = "My name is: " + firstName + " " + lastName;
```

Kotlin

```Kotlin
val firstName = "Android"
val lastName = "Architect"
val message = "My name is: $firstName $lastName"
```

## 换行

Java

```java
String text = "First Line\n" +
              "Second Line\n" +
              "Third Line";
```

Kotlin

```Kotlin
val text = """
        |First Line
        |Second Line
        |Third Line
        """.trimMargin()
```

## 三元表达式

Java

```java
String text = x > 5 ? "x > 5" : "x <= 5";
```

Kotlin

```Kotlin
val text = if (x > 5)
              "x > 5"
           else "x <= 5"
```

## 操作符

Java

```java
final int andResult  = a & b;
final int orResult   = a | b;
final int xorResult  = a ^ b;
final int rightShift = a >> 2;
final int leftShift  = a << 2;
final int unsignedRightShift = a >>> 2;
```

Kotlin

```Kotlin
val andResult  = a and b
val orResult   = a or b
val xorResult  = a xor b
val rightShift = a shr 2
val leftShift  = a shl 2
val unsignedRightShift = a ushr 2
```

## 类型判断和转换 (声明式)

Java

```java
Car car = (Car) object;
```

Kotlin

```Kotlin
var car = object as Car
```

## 类型判断和转换 (隐式)

Java

```java
if (object instanceof Car) {
   Car car = (Car) object;
}
```

Kotlin

```Kotlin
if (object is Car) {
   var car = object // 自动识别
}
```

## 多重条件

Java

```java
if (score >= 0 && score <= 300) { }
```

Kotlin

```Kotlin
if (score in 0..300) { }
```

## 更灵活的case语句

Java

```java
int score = // some score;
String grade;
switch (score) {
    case 10:
    case 9:
        grade = "Excellent";
        break;
    case 8:
    case 7:
    case 6:
        grade = "Good";
        break;
    case 5:
    case 4:
        grade = "OK";
        break;
    case 3:
    case 2:
    case 1:
        grade = "Fail";
        break;
    default:
        grade = "Fail";
}
```

Kotlin

```Kotlin
var score = // some score
var grade = when (score) {
    9, 10 -> "Excellent"
    in 6..8 -> "Good"
    4, 5 -> "OK"
    in 1..3 -> "Fail"
    else -> "Fail"
}
```

## for循环

Java

```java
for (int i = 1; i <= 10 ; i++) { }

for (int i = 1; i < 10 ; i++) { }

for (int i = 10; i >= 0 ; i--) { }

for (int i = 1; i <= 10 ; i+=2) { }

for (int i = 10; i >= 0 ; i-=2) { }

for (String item : collection) { }

for (Map.Entry<String, String> entry: map.entrySet()) { }
```

Kotlin

```Kotlin
for (i in 1..10) { }

for (i in 1 until 10) { }

for (i in 10 downTo 0) { }

for (i in 1..10 step 2) { }

for (i in 10 downTo 0 step 2) { }

for (item in collection) { }

for ((key, value) in map) { }var score = // some score

```

## 更方便的集合操作

Java

```java
final List<Integer> listOfNumber = Arrays.asList(1, 2, 3, 4);

final Map<Integer, String> keyValue = new HashMap<Integer, String>();
map.put(1, "Android");
map.put(2, "Ali");
map.put(3, "Mindorks");
```

java9

```java
final List<Integer> listOfNumber = List.of(1, 2, 3, 4);

final Map<Integer, String> keyValue = Map.of(1, "Android",
                                             2, "Ali",
                                             3, "Mindorks");
```

Kotlin

```Kotlin
val listOfNumber = listOf(1, 2, 3, 4)
val keyValue = mapOf(1 to "Android",
                     2 to "Ali",
                     3 to "Mindorks")
```

## 遍历

Java7

```java
for (Car car : cars) {
  System.out.println(car.speed);
}
```

Java8+

```java
cars.forEach(car -> System.out.println(car.speed));
```

java7 and below

```java
for (Car car : cars) {
  if (car.speed > 100) {
    System.out.println(car.speed);
  }
}
```

Java8+

```java
cars.stream().filter(car -> car.speed > 100).forEach(car -> System.out.println(car.speed));
```

Kotlin

```Kotlin
cars.forEach {
    println(it.speed)
}

cars.filter { it.speed > 100 }
      .forEach { println(it.speed)}
```

## 方法定义

Java

```java
void doSomething() {
   // logic here
}

void doSomething(int... numbers) {
   // logic here
}
```

Kotlin

```Kotlin
fun doSomething() {
   // logic here
}

fun doSomething(vararg numbers: Int) {
   // logic here
}
```

## 带返回值的方法

Java

```java
int getScore() {
   // logic here
   return score;
}
```

Kotlin

```Kotlin
fun getScore(): Int {
   // logic here
   return score
}

// as a single-expression function

fun getScore(): Int = score
```

## constructor 构造器

Java

```java
public class Utils {

    private Utils() {
      // This utility class is not publicly instantiable
    }

    public static int getScore(int value) {
        return 2 * value;
    }

}
```

Kotlin

```Kotlin
class Utils private constructor() {

    companion object {

        fun getScore(value: Int): Int {
            return 2 * value
        }

    }
}

// another way

object Utils {

    fun getScore(value: Int): Int {
        return 2 * value
    }

}
```

## Get Set 构造器

Java

```java
public class Developer {

    private String name;
    private int age;

    public Developer(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

Kotlin

```Kotlin
data class Developer(val name: String, val age: Int)
```