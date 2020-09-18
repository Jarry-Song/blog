# 栈

####  栈的意义
- 栈是一种特殊的线性表，只能在一端进行操作 
- 往栈中添加元素的操作，一般叫做 push，入栈 
- 从栈中移除元素的操作，一般叫做 pop，出栈（只能移除栈顶元素，也叫做：弹出栈顶元素） 
- 后进先出的原则，Last In First Out，LIFO

---
- 栈的内部实现是否可以直接利用以前学过的数据结构？ 
- 动态数组、链表

 
#### 栈的接口
```java
int size(); // 元素的数量
boolean isEmpty(); // 是否为空 
void push(E element); // 入栈 
E pop(); // 出栈 
E top(); // 获取栈顶元素 
void clear(); // 清空
```

#### 栈的基本实现
```java
public class Stack<E> {

    List<E> elements = new ArrayList<>();

    public int size() {
        return elements.size();
    }

    public boolean isEmpty() {
        return elements.isEmpty();
    }


    public void push(E e) {
        elements.add(e);
    }

    public E pop() {
        return elements.remove(size() - 1);
    }


    public E peek() {
        return elements.get(size() - 1);
    }

    public void clear() {
        elements.clear();
    }
}
```
#### 栈的应用
 - 浏览器的前进和后退
 - 软件的撤销（Undo）、恢复（Redo）功能

#### 练习

判断括号：https://leetcode-cn.com/problems/valid-parentheses/solution/

#### 作业
- 括号的分数：https://leetcode-cn.com/problems/score-of-parentheses
- 逆波兰表达式求值 https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/
- 基本计算器 https://leetcode-cn.com/problems/basic-calculator/comments/
