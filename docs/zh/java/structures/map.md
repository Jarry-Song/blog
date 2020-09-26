# 映射
## 映射
 Map 在有些编程语言中也叫做字典（dictionary，比如 Python、Objective-C、Swift 等）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-e2966250033382d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 Map 的每一个 key 是唯一的

## Map的接口设计

```java
public interface Map<K, V> {
	int size();
	boolean isEmpty();
	void clear();
	V put(K key, V value);
	V get(K key);
	V remove(K key);
	boolean containsKey(K key);
	boolean containsValue(V value);
	void traversal(Visitor<K, V> visitor);
	
	public static abstract class Visitor<K, V> {
		boolean stop;
		public abstract boolean visit(K key, V value);
	}
}
```



类似 Set，Map 可以直接利用之前学习的链表、二叉搜索树（AVL树、红黑树）等数据结构来实现 

## Map 与 Set
◼ Map 的所有 key 组合在一起，其实就是一个 Set

![image.png](https://upload-images.jianshu.io/upload_images/1128757-e2966250033382d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

因此，Set 可以间接利用 Map 来作内部实现



## 实现

#### Node

#### put

#### get_remove

#### contains

#### traversal

#### 测试

## 利用Treemap实现TreeSet

#### TreeMap_TreeSet源码分析

