# 集合
## 集合（Set）
#### 集合的特点 

1.不存放重复的元素

2.常用于去重
- ✓存放新增 IP，统计新增 IP 量
- ✓存放词汇，统计词汇量
- ✓......

#### Set的接口
```java
public interface Set<E> {
	int size();
	boolean isEmpty();
	void clear();
	boolean contains(E element);
	void add(E element);
	void remove(E element);
	void traversal(Visitor<E> visitor);
	
	public static abstract class Visitor<E> {
		boolean stop;
		public abstract boolean visit(E element);
	}
}
```
思考：集合的内部实现能否直接利用以前学过的数据结构？ 
- 动态数组 
- 链表
- 二叉搜索树（AVL树、红黑树） 

## LinkSet
```java
public class ListSet<E> implements Set<E> {
	private List<E> list = new LinkedList<>();
	
	@Override
	public int size() {
		return list.size();
	}

	@Override
	public boolean isEmpty() {
		return list.isEmpty();
	}

	@Override
	public void clear() {
		list.clear();
	}

	@Override
	public boolean contains(E element) {
		return list.contains(element);
	}

	@Override
	public void add(E element) {
		int index = list.indexOf(element);
		if (index != List.ELEMENT_NOT_FOUND) { // 存在就覆盖
			list.set(index, element);
		} else { // 不存在就添加
			list.add(element);
		}
	}

	@Override
	public void remove(E element) {
		int index = list.indexOf(element);
		if (index != List.ELEMENT_NOT_FOUND) {
			list.remove(index);
		}
	}

	@Override
	public void traversal(Visitor<E> visitor) {
		if (visitor == null) return;
		
		int size = list.size();
		for (int i = 0; i < size; i++) {
			if (visitor.visit(list.get(i))) return;
		}
	}

}
```

## TreeSet

```java
public class TreeSet<E> implements Set<E> {
	private RBTree<E> tree;
	
	public TreeSet() {
		this(null);
	}
	
	public TreeSet(Comparator<E> comparator) {
		tree = new RBTree<>(comparator);
	}
	
	@Override
	public int size() {
		return tree.size();
	}

	@Override
	public boolean isEmpty() {
		return tree.isEmpty();
	}

	@Override
	public void clear() {
		tree.clear();
	}

	@Override
	public boolean contains(E element) {
		return tree.contains(element);
	}

	@Override
	public void add(E element) {
		tree.add(element);
	}

	@Override
	public void remove(E element) {
		tree.remove(element);
	}

	@Override
	public void traversal(Visitor<E> visitor) {
		tree.inorder(new BinaryTree.Visitor<E>() {
			@Override
			public boolean visit(E element) {
				return visitor.visit(element);
			}
		});
	}

}
```



## LinkSet和TreeSet的对比

主要对比add、remove、contains

|         | add  | remove | contains |
| ------- | ---- | ------ | -------- |
| LinkSet |      |        |          |
| TreeSet |   Log(n)   |     Log(n)    |      Log(n)     |



#### 复杂度

#### 性能对比

#### TreeSet的限制

元素必须有可比较性，如果没有可比较性，用哈希表；

## 作业
两个数组的交集：https://leetcode-cn.com/problems/intersection-of-two-arrays/