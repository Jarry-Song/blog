# 链表
## 链表的结构介绍
## LinkList
- LinkList的接口设计
  - 将ArrayList和LinkList抽象为一个接口List；
  - 将List需要实现的功能代码抽象为AbstractList
- Clear
```java
 size = 0;
 firstNode = null;
```
-  add（int index,E element）
```java
Node<E> node(int index)
```
- remove(int index) 
- indexOf(E element)
- toString
- 练习，删除节点
- 网站：https://visualgo.net/zh
- leecode做题类的建立
- 删除节点remove（Node e）
- 反转链表
- 循环链表
- 补充：
  - LinkList的remove和add要进行检查
  - 环形指针快慢指针每次缩小1的差距，快指针走2步，慢指针走1步，这样是非常安全的；
  - 
  

#### 虚拟头节点
让代码更精简，优化LinkList

#### 分析ArrayList和LinkList的复杂度
- get
- set
- add
- remove

#### 均摊复杂度

链表的添加、删除的复杂度是O（1）是指添加和删除的那一刻，其实整体的复杂度还是O(N)
但是链表的内存空间会有优势；

#### 动态数组ArrayList的缩容操作
申请一块新的空间，然后复制数组中的数据
剩余空间占总容量的一半时进行缩容，这里可以按照自己调整；
缩容的最小值是defaultCapacity
新建一个容器，将老的数据复制到新容器中。

#### 复杂度震荡
如果扩容倍数、缩容时机设计不得当，有可能会导致复杂度震荡
比如扩容为2倍，缩容为一半，刚对原来长度的数组进行添加和删除，每次添加设删除的复杂度都是O(n)
解决方案：扩容*缩容！=1，原理：错开扩容和缩容的时机。

#### 双向链表
提升链表的综合性能；
frist和last,两个方向寻找，效率更高；
LinkedList

- node(int index);如果index<size,从first开始找，否则从last开始找；
- clear：如果只是清除first和last size=0就可以，在java中如果对象不被gc root对象指向的就会被回收；

如果被调用了finlize就会被释放了；

- add(int index,E element)
next pre
特殊处理：pre==null first = node
添加最后一个元素last处理
一开始什么都没有，last ==nul
- remove 考虑第一个和最后一个；
- 

缩容的时机：remove、clear

#### 双向链表和单向链表对比
- 删除操作:单向n/2;双向n/4
- 
动态数组：开辟和销毁内存空间的次数较少，但会造成内存空间的浪费（可以通过缩容来解决）
双向链表：开辟和销毁内存空间的次数较多，但不会造成内存空间的浪费

如果频繁在头部和尾部添加删除操作，动态数组和双向链表都可以选择
如果频繁在头部和尾部添加删除操作，建议选择双向链表
如果频繁在任意位置添加删除操作，建议选择双向链
如果频繁的查询操作，（随机访问操作），建议使用动态数组

如果有了双向链表，单向链表是否没有什么用处了？
并非如此，在哈希表的设计中就用到了单向链表。原因在后面的哈希表中解析；