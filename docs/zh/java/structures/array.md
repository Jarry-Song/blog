# 动态数组
## 线性表

线性表示具有n个相同类型元素的有限序列（n>0）

#### 常见的线性表：

- 数组
- 链表
- 栈
- 队列
- 哈希表（散列表）

## 数组

#### 什么是数组

数组是一种顺序存储的线性表，所有元素的地址是连续的；

```java
int[] array = new int[]{1,2,3};
```

动态数组需要实现的接口方法：

```Java
int size();  //元素数量
boolean isEmpty();//是否为空
boolean contains(E element);  //是否包含某个元素
void add(E element);  //添加一个元素
void add(int index, E element);  //往index位置添加元素
E remove(int index);  //删除index位置对应的元素
E remove(E element);   //删除某个元素
E get(int index);  //获取index位置对应的元素
E set(int index, E element);  //设置index位置的元素
int indexOf(E element);   //查看元素的位置
void clear();  //清除所有元素
```



#### 实现一个ArrayList

- 接口设计

```java
public interface List<E> {

    int size();  //元素数量

    boolean isEmpty();//是否为空

    boolean contains(E element);  //是否包含某个元素

    void add(E element);  //添加一个元素

    void add(int index, E element);  //往index位置添加元素

    E remove(int index);  //删除index位置对应的元素

    E remove(E element);   //删除某个元素

    E get(int index);  //获取index位置对应的元素

    E set(int index, E element);  //设置index位置的元素

    int indexOf(E element);   //查看元素的位置

    void clear();  //清除所有元素

}

```

-  添加元素
-  删除元素
-  简单实现
-  下标越界
-  添加
-  扩容
-  泛型（抽象对象）
-  内存管理问题（数组中放的是对象地址）
-  Clear的细节（销毁地址）以前设置size = 0；现在要销毁数组中内存地址
   提醒JVM进行垃圾回收
   System.gc();
-  remove
-  equal 让对象自己去比较
-  null处理 是否可以存储空数据
-  补充
   - Arraylist源码分析
   - remove for循环的细节优化；
   - modCount
   - remove(E element)接口
   - equal实现的细节：判断类型
   - 不要关注语法，关注设计思路
   - 

```Java
public class ArrayList<E> implements List<E> {

    private E[] elements;
    private int size;
    private static final int DEFAULT_CAPACITY = 10;
    private static final int ELEMENT_NOT_FOUND = -1;

    public ArrayList() {
        this(DEFAULT_CAPACITY);
    }

    public ArrayList(int capacity) {
        capacity = capacity < DEFAULT_CAPACITY ? DEFAULT_CAPACITY : capacity;
        elements = (E[]) new Object[capacity];
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public boolean contains(E element) {
        return indexOf(element) != ELEMENT_NOT_FOUND;
    }

    @Override
    public void add(E element) {
        add(size, element);
    }

    @Override
    public void add(int index, E element) {
        rangeCheckForAdd(index);
        //扩容
        ensureCapacity(size + 1);
        for (int i = size; i > index; i--) {
            elements[i] = elements[i - 1];
        }
        elements[index] = element;
        size++;
    }


    @Override
    public E remove(int index) {
        rangeCheck(index);
        E oldElement = elements[index];
        //缩容
        for (int i = index + 1; i < size; i++) {
            elements[i - 1] = elements[i];
        }
        elements[size--] = null;
        return oldElement;
    }

    @Override
    public E remove(E element) {
        int index = indexOf(element);
        if (index != ELEMENT_NOT_FOUND) {
            return remove(indexOf(element));
        }
        return null;
    }

    @Override
    public E get(int index) {
        rangeCheck(index);
        return elements[index];
    }

    @Override
    public E set(int index, E element) {
        rangeCheck(index);
        E oldElement = get(index);
        elements[index] = element;
        return oldElement;
    }

    @Override
    public int indexOf(E element) {
        if (element == null) {
            for (int i = 0; i < size; i++) {
                if (elements[i] == null) return i;
            }
        } else {
            for (int i = 0; i < size; i++) {
                if (element.equals(elements[i]))
                    return i;
            }
        }
        return ELEMENT_NOT_FOUND;
    }

    @Override
    public void clear() {
        for (int i = 0; i < size; i++) {
            elements[size] = null;
        }
        size = 0;
    }


    private void rangeCheck(int index) {
        if (index < 0 || index >= size) {
            outOfBounds(index);
        }
    }

    private void rangeCheckForAdd(int index) {
        if (index < 0 || index > size) {
            outOfBounds(index);
        }
    }

    private void outOfBounds(int index) {
        throw new IndexOutOfBoundsException("index:" + index + ",size:" + size);
    }

    /**
     * 扩容
     *
     * @param capacity
     */
    private void ensureCapacity(int capacity) {
        int oldCapacity = elements.length;
        if (oldCapacity > capacity) {
            return;
        }
        //新容量扩充为原来的1.5倍
        int newCapacity = oldCapacity + oldCapacity >> 1;
        E[] newElements = (E[]) new Object[newCapacity];
        for (int i = 0; i < oldCapacity; i++) {
            newElements[i] = elements[i];
        }
        elements = newElements;
        System.out.println(oldCapacity + " 扩容为：" + newCapacity);
    }

    @Override
    public String toString() {
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("size=").append(size).append(" [");
        for (int i = 0; i < size; i++) {
            if (i != 0) {
                stringBuffer.append(",");
            }
            stringBuffer.append(elements[i].toString());
        }
        stringBuffer.append("]");
        return stringBuffer.toString();
    }
}
```

#### 链表的翻转

