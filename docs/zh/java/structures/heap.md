# 二插堆

## 思考

设计一种数据结构，用来存放整数，要求提供 3 个接口 

- 添加元素 
- 获取最大值 
- 删除最大值

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081128302.png)

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081157913.png)


有没有更优的数据结构？ 

- 堆 
  - ✓获取最大值：O(1)、删除最大值：O(logn)、添加元素：O(logn)

## Top K问题

什么是 Top K 问题 

- 从海量数据中找出前 K 个数据

比如 

- 从 100 万个整数中找出最大的 100 个整数

Top K 问题的解法之一：可以用数据结构“堆”来解决



## 堆（Heap）

堆（Heap）也是一种树状的数据结构（不要跟内存模型中的“堆空间”混淆），常见的堆实现有 

- 二叉堆（Binary Heap，完全二叉堆） 
- 多叉堆（D-heap、D-ary Heap） 
- 索引堆（Index Heap） 
- 二项堆（Binomial Heap） 
- 斐波那契堆（Fibonacci Heap） 
- 左倾堆（Leftist Heap，左式堆） 
- 斜堆（Skew Heap）
  ![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081215615.png)


堆的一个重要性质：任意节点的值总是 ≥（ ≤ ）子节点的值 

- 如果任意节点的值总是 ≥ 子节点的值，称为：最大堆、大根堆、大顶堆 
- 如果任意节点的值总是 ≤ 子节点的值，称为：最小堆、小根堆、小顶堆

由此可见，堆中的元素必须具备可比较性（跟二叉搜索树一样）


#### 堆的基本接口设计

◼ int size(); // 元素的数量
◼ boolean isEmpty(); // 是否为空 
◼ void clear(); // 清空 
◼ void add(E element); // 添加元素 
◼ E get(); // 获得堆顶元素 
◼ E remove(); // 删除堆顶元素 
◼ E replace(E element); // 删除堆顶元素的同时插入一个新元素


## 二叉堆（Binary Heap）

二叉堆的逻辑结构就是一棵完全二叉树，所以也叫完全二叉堆 

鉴于完全二叉树的一些特性，二叉堆的底层（物理结构）一般用数组实现即可

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081235966.png)

索引 i 的规律（ n 是元素数量） 

- 如果 i = 0 ，它是根节点
- 如果 i > 0 ，它的父节点的索引为 floor( (i – 1) / 2 )
- 如果 2i + 1 ≤ n – 1，它的左子节点的索引为 2i + 1 
- 如果 2i + 1 > n – 1 ，它无左子节点
- 如果 2i + 2 ≤ n – 1 ，它的右子节点的索引为 2i + 2 
- 如果 2i + 2 > n – 1 ，它无右子节点

## 实现

#### 基本接口实现

#### 添加

#### 获取最大值


#### 最大堆 – 添加

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081256114.png)


#### 最大堆 – 添加 – 总结

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081313159.png)

循环执行以下操作（图中的 80 简称为 node） 

- 如果 node ＞ 父节点 ✓与父节点交换位置
- 如果 node ≤ 父节点，或者 node 没有父节点 
  - ✓退出循环

这个过程，叫做上滤（Sift Up）

- 时间复杂度：O(logn)

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081331383.png)

```java
	private void siftUp(int index) {
		E e = elements[index];
		while (index > 0) {
			int pindex = (index - 1) >> 1;
			E p = elements[pindex];
			if (compare(e, p) <= 0) return;
			// 交换index、pindex位置的内容
			E tmp = elements[index];
			elements[index] = elements[pindex];
 			elements[pindex] = tmp;
			
			// 重新赋值index
			index = pindex;
		}
	}
```



#### 最大堆 – 添加 – 交换位置的优化

一般交换位置需要3行代码，可以进一步优化 

- 将新添加节点备份，确定最终位置才摆放上去

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081357246.png)

```java
private void siftUp(int index) {
		E element = elements[index];
		while (index > 0) {
			int parentIndex = (index - 1) >> 1;
			E parent = elements[parentIndex];
			if (compare(element, parent) <= 0) break;
			
			// 将父元素存储在index位置
			elements[index] = parent;
			
			// 重新赋值index
			index = parentIndex;
		}
		elements[index] = element;
	}
```



仅从交换位置的代码角度看 

- 可以由大概的 3 * O(logn) 优化到 1 * O(logn) + 1 



## 抽取父类



## 删除

#### 最大堆 – 删除

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081415016.png)

#### 最大堆 – 删除 – 总结

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081433073.png)

1.用最后一个节点覆盖根节点 
2.删除最后一个节点 
3.循环执行以下操作（图中的 43 简称为 node） 

- 如果 node < 最大的子节点 
- ✓与最大的子节点交换位置
- 如果 node ≥ 最大的子节点， 或者 node 没有子节点 ✓退出循环

这个过程，叫做下滤（Sift Down），时间复杂度：O(logn)

同样的，交换位置的操作可以像添加那样进行优化

```java
	@Override
	public E remove() {
		emptyCheck();
		
		int lastIndex = --size;
		E root = elements[0];
		elements[0] = elements[lastIndex];
		elements[lastIndex] = null;
		
		siftDown(0);
		return root;
	}
```

```java
/**
	 * 让index位置的元素下滤
	 * @param index
	 */
	private void siftDown(int index) {
		E element = elements[index];
		int half = size >> 1;
		// 第一个叶子节点的索引 == 非叶子节点的数量
		// index < 第一个叶子节点的索引
		// 必须保证index位置是非叶子节点
		while (index < half) { 
			// index的节点有2种情况
			// 1.只有左子节点
			// 2.同时有左右子节点
			
			// 默认为左子节点跟它进行比较
			int childIndex = (index << 1) + 1;
			E child = elements[childIndex];
			
			// 右子节点
			int rightIndex = childIndex + 1;
			
			// 选出左右子节点最大的那个
			if (rightIndex < size && compare(elements[rightIndex], child) > 0) {
				child = elements[childIndex = rightIndex];
			}
			
			if (compare(element, child) >= 0) break;

			// 将子节点存放到index位置
			elements[index] = child;
			// 重新设置index
			index = childIndex;
		}
		elements[index] = element;
	}
```





## replace

```java
@Override
	public E replace(E element) {
		elementNotNullCheck(element);
		
		E root = null;
		if (size == 0) {
			elements[0] = element;
			size++;
		} else {
			root = elements[0];
			elements[0] = element;
			siftDown(0);
		}
		return root;
	}
```




## 最大堆 – 批量建堆（Heapify）

批量建堆，有 2 种做法 

- 自上而下的上滤
- 自下而上的下滤

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081457432.png)

####  自上而下的上滤

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081518718.png)

```java
// 自上而下的上滤
for (int i = 1; i < size; i++) {
	siftUp(i);
}
```

以二叉树的维度是层序遍历每一个节点，进行上滤处理。

#### 自下而上的下滤

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081534775.png)

```java
// 自下而上的下滤
for (int i = (size >> 1) - 1; i >= 0; i--) {
	siftDown(i);
}
```

从最后一个非叶子节点开始，反向一次对层序遍历的节点进行下滤处理。每一个节点下滤处理之后，都是一个最大堆。

#### 效率对比

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081556829.png)

1.所有节点的深度之和 

- 仅仅是叶子节点，就有近 n/2 个，而且每一个叶子节点的深度都是 O(logn) 级别的 

- 因此，在叶子节点这一块，就达到了 O(nlogn) 级别 
- O(nlogn) 的时间复杂度足以利用排序算法对所有节点进行全排序

2.所有节点的高度之和 

- 假设是满树，节点总个数为 n，树高为 h，那么 n = 2h − 1 
- 所有节点的树高之和 H(n) = 20 ∗ h − 0 + 21 ∗ h − 1 + 22 ∗ h − 2 + ⋯+ 2h −1 ∗ h − h − 1 
- H(n) = h ∗ 20 + 21 + 22 + ⋯+ 2h −1 − 1 ∗ 21 + 2 ∗ 22 + 3 ∗ 23 + ⋯+ h − 1 ∗ 2h−1 
- H(n) = h ∗ 2h − 1 − h − 2 ∗ 2h + 2 
- H(n) = h ∗ 2h − h − h ∗ 2h + 2h+1 − 2 
- H(n) = 2h+1 − h − 2 = 2 ∗ (2h − 1) − h = 2n − h = 2n − log2(n + 1) = O(n)

3.公式推导

> S(h) = 1 ∗ 21 + 2 ∗ 22 + 3 ∗ 23 + ⋯+ h − 2 ∗ 2h−2 + h − 1 ∗ 2h−1
>
> 2S(h) = 1 ∗ 22 + 2 ∗ 23 + 3 ∗ 24 + ⋯+ h − 2 ∗ 2h−1 + h − 1 ∗ 2h
>
> S(h) – 2S(h) = [21 + 22 + 23 + ⋯+ 2h−1] − h − 1 ∗ 2h = (2h − 2) − h − 1 ∗ 2h
>
> S(h) = h − 1 ∗ 2h − (2h − 2) = h − 2 ∗ 2h + 2


## 疑惑

以下方法可以批量建堆么 

![img](https://gitee.com/jarrysong/img/raw/master/img/1240-20200916081622463.png)

- 自上而下的下滤 
- 自下而上的上滤

上述方法不可行，为什么？ 

- 认真思考【自上而下的上滤】、【自下而上的下滤】的本质

#### 实现

```java
public BinaryHeap(E[] elements, Comparator<E> comparator)  {
		super(comparator);
		
		if (elements == null || elements.length == 0) {
			this.elements = (E[]) new Object[DEFAULT_CAPACITY];
		} else {
			size = elements.length;
			int capacity = Math.max(elements.length, DEFAULT_CAPACITY);
			this.elements = (E[]) new Object[capacity];
			for (int i = 0; i < elements.length; i++) {
				this.elements[i] = elements[i];
			}
			heapify();
		}
}
	
public BinaryHeap(E[] elements)  {
	this(elements, null);
}
	
public BinaryHeap(Comparator<E> comparator) {
	this(null, comparator);
}
	
public BinaryHeap() {
	this(null, null);
}

/**
	 * 批量建堆
	 */
private void heapify() {
// 自上而下的上滤
//   for (int i = 1; i < size; i++) {
//	   siftUp(i);
//   }
		
// 自下而上的下滤
   for (int i = (size >> 1) - 1; i >= 0; i--) {
	  siftDown(i);
   }
}
```

## 批量建堆

如何构建一个小顶堆？

修改comparator


## Top K问题

1.从 n 个整数中，找出最大的前 k 个数（ k 远远小于 n ）

2.如果使用排序算法进行全排序，需要 O(nlogn) 的时间复杂度

3.如果使用二叉堆来解决，可以使用 O(nlogk) 的时间复杂度来解决 

- 新建一个小顶堆 
- 扫描 n 个整数 
  - ✓先将遍历到的前 k 个数放入堆中 
  - ✓从第 k + 1 个数开始，如果大于堆顶元素，就使用 replace 操作（删除堆顶元素，将第 k + 1 个数添加到堆中）

- 扫描完毕后，堆中剩下的就是最大的前 k 个数

4.如果是找出最小的前 k 个数呢？ 

- 用大顶堆 
- 如果小于堆顶元素，就使用 replace 操作

```java
// 新建一个小顶堆
		BinaryHeap<Integer> heap = new BinaryHeap<>(new Comparator<Integer>() {
			public int compare(Integer o1, Integer o2) {
				return o2 - o1;
			}
		});
		
		// 找出最大的前k个数
		int k = 3;
		Integer[] data = {51, 30, 39, 92, 74, 25, 16, 93, 
				91, 19, 54, 47, 73, 62, 76, 63, 35, 18, 
				90, 6, 65, 49, 3, 26, 61, 21, 48};
		for (int i = 0; i < data.length; i++) {
			if (heap.size() < k) { // 前k个数添加到小顶堆
				heap.add(data[i]); // logk
			} else if (data[i] > heap.get()) { // 如果是第k + 1个数，并且大于堆顶元素
				heap.replace(data[i]); // logk
			}
		}
		// O(nlogk)
		BinaryTrees.println(heap);
```



## 作业

1.了解和实现堆排序

2.使用堆排序将一个无序数组转换成一个升序数组

- 空间复杂度能否下降至 O(1)？

