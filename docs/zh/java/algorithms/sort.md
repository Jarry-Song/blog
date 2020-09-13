# 排序

## 初识排序

什么叫排序？ 

- 排序前：3,1,6,9,2,5,8,4,7 
- 排序后：1,2,3,4,5,6,7,8,9（升序） 或者 9,8,7,6,5,4,3,2,1（降序）

排序的应用无处不在


![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913232847.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913232934.png)

## 10大排序算法

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233009.png)

以上表格是基于数组进行排序的一般性结论

冒泡、选择、插入、归并、快速、希尔、堆排序，属于比较排序（Comparison Sorting） 

## 冒泡排序（Bubble Sort）

冒泡排序也叫做起泡排序

执行流程（本课程统一以升序为例子） 

### 原始实现

① 从头开始比较每一对相邻元素，如果第1个比第2个大，就交换它们的位置 
- ✓执行完一轮后，最末尾那个元素就是最大的元素

② 忽略 ① 中曾经找到的最大元素，重复执行步骤 ①，直到全部元素有序

```java
for (int end = array.length - 1; end > 0; end--) {
	for (int begin = 1; begin <= end; begin++) {
		if (array[begin] < array[begin - 1]) {
			int tmp = array[begin];
			array[begin] = array[begin - 1];
			array[begin - 1] = tmp;
		}
	}
}
```



### 冒泡排序 – 优化①

如果序列已经完全有序，可以提前终止冒泡排序

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233101.png)

```java
for (int end = array.length - 1; end > 0; end--) {
	boolean sorted = true;
	for (int begin = 1; begin <= end; begin++) {
		if (array[begin] < array[begin - 1]) {
			int tmp = array[begin];
			array[begin] = array[begin - 1];
			array[begin - 1] = tmp;
			sorted = false;
			}
		}
	if (sorted) break;
}
```

### 冒泡排序 – 优化② 

如果序列尾部已经局部有序，可以记录最后1次交换的位置，减少比较次数

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233124.png)

最后1次交换的位置是 6



```java
for (int end = array.length - 1; end > 0; end--) {
	// sortedIndex的初始值在数组完全有序的时候有用
	int sortedIndex = 1;
	for (int begin = 1; begin <= end; begin++) {
		if (array[begin] < array[begin - 1]) {
			int tmp = array[begin];
			array[begin] = array[begin - 1];
			array[begin - 1] = tmp;
			sortedIndex = begin;
		}
	}
	end = sortedIndex;
}
```

### 复杂度分析

1.最坏、平均时间复杂度：O(n2) 

2.最好时间复杂度：O(n) 

3.空间复杂度：O(1)

## 排序算法的稳定性（Stability） 

1.如果相等的2个元素，在排序前后的相对位置保持不变，那么这是稳定的排序算法 

- 排序前：5, 1, 3𝑎, 4, 7, 3𝑏 
- 稳定的排序： 1, 3𝑎, 3𝑏, 4, 5, 7 
- 不稳定的排序：1, 3𝑏, 3𝑎, 4, 5, 7

2.对自定义对象进行排序时，稳定性会影响最终的排序效果

3.冒泡排序属于稳定的排序算法 

- 稍有不慎，稳定的排序算法也能被写成不稳定的排序算法，比如下面的冒泡排序代码是不稳定的

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233222.png)

### 原地算法（In-place Algorithm）

何为原地算法？ 

- 不依赖额外的资源或者依赖少数的额外资源，仅依靠输出来覆盖输入 

- 空间复杂度为 𝑂(1) 的都可以认为是原地算法

非原地算法，称为 Not-in-place 或者 Out-of-place

冒泡排序属于 In-place

## 选择排序（Selection Sort）

### 执行流程

① 从序列中找出最大的那个元素，然后与最末尾的元素交换位置 

- ✓执行完一轮后，最末尾的那个元素就是最大的元素

② 忽略 ① 中曾经找到的最大元素，重复执行步骤 ①

```java
for (int end = array.length - 1; end > 0; end--) {
		int maxIndex = 0;
		for (int begin = 1; begin <= end; begin++) {
			if (array[maxIndex] <= array[begin]) {
					maxIndex = begin;
			}
		}
		int tmp = array[maxIndex];
		array[maxIndex] = array[end];
		array[end] = tmp;
}
```

### 复杂度分析

1.选择排序的交换次数要远远少于冒泡排序，平均性能优于冒泡排序

2.最好、最坏、平均时间复杂度：O(n2)，空间复杂度：O(1)，属于不稳定排序

**思考** 

选择排序是否还有优化的空间？ 

- ✓使用堆来选择最大值

## 堆排序（Heap Sort）
堆排序可以认为是对选择排序的一种优化

### 执行流程

① 对序列进行原地建堆（heapify）

② 重复执行以下操作，直到堆的元素数量为 1 

✓交换堆顶元素与尾元素 

✓堆的元素数量减 1 

✓对 0 位置进行 1 次 siftDown 操

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233256.png)

### 实现

```java
public class HeapSort<T extends Comparable<T>> extends Sort<T> {
	private int heapSize;

	@Override
	protected void sort() {
		// 原地建堆
		heapSize = array.length;
		for (int i = (heapSize >> 1) - 1; i >= 0; i--) {
			siftDown(i);
		}
		
		while (heapSize > 1) {
			// 交换堆顶元素和尾部元素
			swap(0, --heapSize);

			// 对0位置进行siftDown（恢复堆的性质）
			siftDown(0);
		}
	}
	
	private void siftDown(int index) {
		T element = array[index];
		
		int half = heapSize >> 1;
		while (index < half) { // index必须是非叶子节点
			// 默认是左边跟父节点比
			int childIndex = (index << 1) + 1;
			T child = array[childIndex];
			
			int rightIndex = childIndex + 1;
			// 右子节点比左子节点大
			if (rightIndex < heapSize && 
					cmp(array[rightIndex], child) > 0) { 
				child = array[childIndex = rightIndex];
			}
			
			// 大于等于子节点
			if (cmp(element, child) >= 0) break;
			
			array[index] = child;
			index = childIndex;
		}
		array[index] = element;
	}
}

```
### 复杂度分析

最好、最坏、平均时间复杂度：O(nlogn)，空间复杂度：O(1)，属于不稳定排序

### 泛型

### 稳定性

```

```




## 插入排序（Insertion Sort）

插入排序非常类似于扑克牌的排序

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233356.png)

### 执行流程

① 在执行过程中，插入排序会将序列分为2部分
-  ✓头部是已经排好序的，尾部是待排序的

② 从头开始扫描每一个元素 
- ✓每当扫描到一个元素，就将它插入到头部合适的位置，使得头部数据依然保持有序

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233413.png)

### 实现

```java
protected void sort() {
		for (int begin = 1; begin < array.length; begin++) {
			int cur = begin;
			while (cur > 0 && cmp(cur, cur - 1) < 0) {
				swap(cur, cur - 1);
				cur--;
			}
		}
	}
```



### 插入排序 – 逆序对（Inversion）

什么是逆序对？ 

- 数组 <2,3,8,6,1> 的逆序对为：<2,1> <3,1> <8,1> <8,6> <6,1>，共5个逆序对(两个组成对，前面的比后面的大)

**插入排序的时间复杂度与逆序对的数量成正比关系**

- 逆序对的数量越多，插入排序的时间复杂度越高

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913233439.png)

1.最坏、平均时间复杂度：O(n2) 

2.最好时间复杂度：O(n)

3.空间复杂度：O(1) 

4.属于稳定排序

5.当逆序对的数量极少时，插入排序的效率特别高

- 甚至速度比 O nlogn 级别的快速排序还要快

6.数据量不是特别大的时候，插入排序的效率也是非常好的

### 插入排序 – 优化
**思路:** 将【交换】转为【挪动

① 先将待插入的元素备份

② 头部有序数据中比待插入元素大的，都朝尾部方向挪动1个位置

③ 将待插入元素放到最终的合适位置

```java
for (int begin = 1; begin < array.length; begin++) {
	int cur = begin;
	T v = array[cur];
	while (cur > 0 && cmp(v, array[cur - 1]) < 0) {
		array[cur] = array[cur - 1];
		cur--;
	}
	array[cur] = v;
}
```



![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000221.png)



## 二分搜索（Binary Search）

如何确定一个元素在数组中的位置？（假设数组里面全都是整数） 

- 如果是无序数组，从第 0 个位置开始遍历搜索，平均时间复杂度：O(n)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000251.png)

如果是有序数组，可以使用二分搜索，最坏时间复杂度：O(logn）

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000312.png)

### 思路

- 假设在 [begin, end) 范围内搜索某个元素 v，mid == (begin + end) / 2
- 如果 v < m，去 [begin, mid) 范围内二分搜索 
-  如果 v > m，去 [mid + 1, end) 范围内二分搜索
- 如果 v == m，直接返回 mid

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000333.png)





**例子**

搜索10

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000355.png)

搜索3

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000416.png)



### 实现

```java
/**
* 查找v在有序数组array中的位置
*/
public static int indexOf(int[] array, int v) {
	if (array == null || array.length == 0) return -1;
	int begin = 0;
	int end = array.length;
	while (begin < end) {
		int mid = (begin + end) >> 1;
		if (v < array[mid]) {
			end = mid;
		} else if (v > array[mid]) {
			begin = mid + 1;
		} else {
			return mid;
		}
	}
	return -1;
}
```

**思考**

如果存在多个重复的值，返回的是哪一个？ ✓不确

### 插入排序-二分搜索优化

在元素 v 的插入过程中，可以先二分搜索出合适的插入位置，然后再将元素 v 插入

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000442.png)

要求二分搜索返回的插入位置：**第1个大于 v 的元素位置**

- 如果 v 是 5，返回 2 
- 如果 v 是 1，返回 0 
- 如果 v 是 15，返回 7 
- 如果 v 是 8，返回 5

###  二分搜索优化 

**思路**

- 假设在 [begin, end) 范围内搜索某个元素 v，mid == (begin + end) / 2 
- 如果 v < m，去 [begin, mid) 范围内二分搜索 
- 如果 v ≥ m，去 [mid + 1, end) 范围内二分搜

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000518.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000534.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000552.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000615.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000632.png)

```java
/**
* 查找v在有序数组array中待插入位置
*/
public static int search(int[] array, int v) {
	if (array == null || array.length == 0) return -1;
	int begin = 0;
	int end = array.length;
	while (begin < end) {
		int mid = (begin + end) >> 1;
		if (v < array[mid]) {
			end = mid;
		} else {
			begin = mid + 1;
		}
	}
	return begin;
}
```

### 插入排序-二分搜索优化-实现

```java   
protected void sort() {
	for (int begin = 1; begin < array.length; begin++) {
		insert(begin, search(begin));
	}
}
	
/**
* 将source位置的元素插入到dest位置
* @param source
* @param dest
*/
private void insert(int source, int dest) {
	T v = array[source];
	for (int i = source; i > dest; i--) {
		array[i] = array[i - 1];
	}
	array[dest] = v;
}
	
/**
* 利用二分搜索找到 index 位置元素的待插入位置
* 已经排好序数组的区间范围是 [0, index)
* @param index
* @return
*/
private int search(int index) {
	int begin = 0;
	int end = index;
	while (begin < end) {
		int mid = (begin + end) >> 1;
		if (cmp(array[index], array[mid]) < 0) {
			end = mid;
		} else {
			begin = mid + 1;
		}
	}
return begin;
```



需要注意的是，使用了二分搜索后，只是减少了比较次数，但插入排序的平均时间复杂度依然是 O(n2)

## 归并排序（Merge Sort）

1945年由约翰·冯·诺伊曼（John von Neumann）首次提出

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000655.png)

### 执行流程

① 不断地将当前序列平均分割成2个子序列

- ✓直到不能再分割（序列中只剩1个元素） 

② 不断地将2个子序列合并成一个有序序列

- ✓直到最终只剩下1个有序序列

### divide实现

```java
	@Override
	protected void sort() {
		leftArray = (T[]) new Comparable[array.length >> 1];
		sort(0, array.length);
	}
	
	// T(n) = T(n/2) + T(n/2) + O(n)
	
	/**
	 * 对 [begin, end) 范围的数据进行归并排序
	 */
	private void sort(int begin, int end) {
		if (end - begin < 2) return;
		
		int mid = (begin + end) >> 1;
		sort(begin, mid);
		sort(mid, end);
		merge(begin, mid, end);
	}
```



### merge

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000752.png)

merge细节

需要 merge 的 2 组序列存在于同一个数组中，并且是挨在一起的

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000816.png)

为了更好地完成 merge 操作，最好将其中 1 组序列备份出来，比如 [begin, mid)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000845.png)



![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914000931.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001003.png)

merge – 左边先结束

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001032.png)

merge – 右边先结束

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001053.png)

merge实现

```java
/**
	 * 将 [begin, mid) 和 [mid, end) 范围的序列合并成一个有序序列
	 */
	private void merge(int begin, int mid, int end) {
		int li = 0, le = mid - begin;
		int ri = mid, re = end;
		int ai = begin;
		
		// 备份左边数组
		for (int i = li; i < le; i++) {
			leftArray[i] = array[begin + i];
		}
		
		// 如果左边还没有结束
		while (li < le) { 
			if (ri < re && cmp(array[ri], leftArray[li]) < 0) {
				array[ai++] = array[ri++];
			} else {
				array[ai++] = leftArray[li++];
			}
		}
	}
```



### 复杂度分析

归并排序花费的时间
- T(n)= 2 ∗ T(n/2)+ O(n) 
- T(1) = O(1) 
- T(n)/n = T(n/2)/(n/2)+ O(1)

2.令S(n)= T(n)/n 

- S(1)= O(1) 
- S(n) = S(n/2) + O(1) = S(n/4) + O(2) = S(n/8)+ O(3) = S (n/2k) + O(k) = S(1)+ O(logn) = O(logn)
- T(n) = n ∗ S(n) = O(nlogn)

3.由于归并排序总是平均分割子序列，所以最好、最坏、平均时间复杂度都是 O(nlogn) ，属于稳定排序

4.从代码中不难看出：归并排序的空间复杂度是 O(n/2+ logn) = O(n)

- n/2 用于临时存放左侧数组，logn 是因为递归调用

## 常见的递推式与复杂度

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001118.png)



## 作业

合并两个有序数组

- https://leetcode-cn.com/problems/merge-sorted-array/

合并两个有序链表 

- https://leetcode-cn.com/problems/merge-two-sorted-lists/comments/

合并K个有序链表

- https://leetcode-cn.com/problems/merge-k-sorted-lists/

解题教程 

- https://ke.qq.com/course/436549



## 快速排序（Quick Sort）

1960年由查尔斯·安东尼·理查德·霍尔（Charles Antony Richard Hoare，缩写为C. A. R. Hoare）提出 

- 昵称为东尼·霍尔（Tony Hoare)

### 执行流程
① 从序列中选择一个轴点元素（pivot）
- ✓假设每次选择 0 位置的元素为轴点元素

② 利用 pivot 将序列分割成 2 个子序列 
- ✓将小于 pivot 的元素放在pivot前面（左侧）
- ✓将大于 pivot 的元素放在pivot后面（右侧）
- ✓等于pivot的元素放哪边都可以

③ 对子序列进行 ① ② 操作
- ✓直到不能再分割（子序列中只剩下1个元素）

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001146.png)

 快速排序的本质：逐渐将每一个元素都转换成轴点元素

### 轴点构造

 ![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001224.png)

### 时间复杂度

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001243.png)

1.在轴点左右元素数量比较均匀的情况下，同时也是最好的情况 
- T(n) = 2 ∗ T(n/2)+ O(n) = O(nlogn)

2.如果轴点左右元素数量极度不均匀，最坏情况 

 T(n) = T(n) − 1 + O(n) = O(n2）

3.为了降低最坏情况的出现概率，一般采取的做法是

- 随机选择轴点元素

4.最好、平均时间复杂度：O(nlogn) 

5.最坏时间复杂度：O(n2) 

6.由于递归调用的缘故，空间复杂度：O(logn) 

7.属于不稳定排



### 实现
```java
@Override
	protected void sort() {
		sort(0, array.length);
	}

	/**
	 * 对 [begin, end) 范围的元素进行快速排序
	 * @param begin
	 * @param end
	 */
	private void sort(int begin, int end) { 
		if (end - begin < 2) return;
		
		// 确定轴点位置 O(n)
		int mid = pivotIndex(begin, end);
		// 对子序列进行快速排序
		sort(begin, mid); 
		sort(mid + 1, end); 
	} 
	
	/**
	 * 构造出 [begin, end) 范围的轴点元素
	 * @return 轴点元素的最终位置
	 */
	private int pivotIndex(int begin, int end) {
		// 随机选择一个元素跟begin位置进行交换
		swap(begin, begin + (int)(Math.random() * (end - begin)));
		
		// 备份begin位置的元素
		T pivot = array[begin];
		// end指向最后一个元素
		end--;
		
		while (begin < end) {
			while (begin < end) {
				if (cmp(pivot, array[end]) < 0) { // 右边元素 > 轴点元素
					end--;
				} else { // 右边元素 <= 轴点元素
					array[begin++] = array[end];
					break;
				}
			}
			while (begin < end) {
				if (cmp(pivot, array[begin]) > 0) { // 左边元素 < 轴点元素
					begin++;
				} else { // 左边元素 >= 轴点元素
					array[end--] = array[begin];
					break;
				}
			}
		}
		
		// 将轴点元素放入最终的位置
		array[begin] = pivot;
		// 返回轴点元素的位置
		return begin;
	}
```
### 与轴点相等的元素

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001316.png)


如果序列中的所有元素都与轴点元素相等，利用目前的算法实现，轴点元素可以将序列分割成 2 个均匀的子序列

**思考：**cmp 位置的判断分别改为 ≤、≥ 会起到什么效果？

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001338.png)



轴点元素分割出来的子序列极度不均匀 

- 导致出现最坏时间复杂度 O(n2)

## 希尔排序（Shell Sort）
1959年由唐纳德·希尔（Donald Shell）提出

希尔排序把序列看作是一个矩阵，分成 𝑚 列，逐列进行排序
- m从某个整数逐渐减为1 
- 当 𝑚 为1时，整个序列将完全有序

因此，希尔排序也被称为递减增量排序（Diminishing Increment Sort）

矩阵的列数取决于步长序列（step sequence） 
- ✓比如，如果步长序列为{1,5,19,41,109,...}，就代表依次分成109列、41列、19列、5列、1列进行排序 
- ✓不同的步长序列，执行效率也不

### 希尔排序 – 实例
希尔本人给出的步长序列是 𝑛/2𝑘，比如 𝑛 为16时，步长序列是{1, 2, 4, 8}


![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001358.png)

分成8列进行排序
![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001433.png)

分成4列进行排序
![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001453.png)

分成2列进行排序
![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001513.png)

1列排序之后
![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001605.png)

不难看出来，从8列 变为 1列的过程中，逆序对的数量在逐渐减少
- 因此希尔排序底层一般使用插入排序对每一列进行排序，也很多资料认为希尔排序是插入排序的改进版 


### 希尔排序的实例

 假设有11个元素，步长序列是{1, 2, 5}

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001623.png)


 假设元素在第 col 列、第 row 行，步长（总列数）是 step 
 - 那么这个元素在数组中的索引是 col + row * step 
 - 比如 9 在排序前是第 2 列、第 0 行，那么它排序前的索引是 2 + 0 * 5 = 2 
 - 比如 4 在排序前是第 2 列、第 1 行，那么它排序前的索引是 2 + 1 * 5 = 7

### 希尔排序 – 实现
```java
protected void sort() {
	List<Integer> stepSequence = sedgewickStepSequence();
	for (Integer step : stepSequence) {
			sort(step);
	}
}
	
/**
* 分成step列进行排序
*/
private void sort(int step) {
	// col : 第几列，column的简称
	for (int col = 0; col < step; col++) { // 对第col列进行排序
		// col、col+step、col+2*step、col+3*step
		for (int begin = col + step; begin < array.length; begin += step) {
			int cur = begin;
			while (cur > col && cmp(cur, cur - step) < 0) {
				swap(cur, cur - step);
				cur -= step;
			}
		}
	}
}

/**
*获取步长
*/
private List<Integer> shellStepSequence() {
	List<Integer> stepSequence = new ArrayList<>();
	int step = array.length;
	while ((step >>= 1) > 0) {
		stepSequence.add(step);
	}		
	return stepSequence;
}
```
最好情况是步长序列只有1，且序列几乎有序，时间复杂度为 O(n)
- 空间复杂度为O(1)，属于不稳定排序

### 希尔排序 – 步长序列
- 希尔本人给出的步长序列，最坏情况时间复杂度是 O(n2)
- 目前已知的最好的步长序列，最坏情况时间复杂度是 O(n4/3) ，1986年由Robert Sedgewick提出

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001648.png)
```java
private List<Integer> sedgewickStepSequence() {
	List<Integer> stepSequence = new LinkedList<>();
	int k = 0, step = 0;
	while (true) {
		if (k % 2 == 0) {
			int pow = (int) Math.pow(2, k >> 1);
			step = 1 + 9 * (pow * pow - pow);
		} else {
			int pow1 = (int) Math.pow(2, (k - 1) >> 1);
			int pow2 = (int) Math.pow(2, (k + 1) >> 1);
			step = 1 + 8 * pow1 * pow2 - 6 * pow2;
		}
		if (step >= array.length) break;
		stepSequence.add(0, step);
		k++;
	}
	return stepSequence;
}
```

## 计数排序（Counting Sort）
1.之前学习的冒泡、选择、插入、归并、快速、希尔、堆排序，都是基于比较的排序

- 平均时间复杂度目前最低是 O(nlogn)

2.计数排序、桶排序、基数排序，都不是基于比较的排序

- 它们是典型的用空间换时间，在某些时候，平均时间复杂度可以比 O nlogn 更低

3.计数排序于1954年由Harold H. Seward提出，适合对一定范围内的整数进行排序

4.计数排序的核心思想 

- 统计每个**整数**在序列中出现的次数，进而推导出每个整数在有序序列中的索

### 最简单的实现

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001707.png)

```java
protected void sort() {
		// 找出最大值
		int max = array[0];
		for (int i = 1; i < array.length; i++) {
			if (array[i] > max) {
				max = array[i];
			}
		} // O(n)
		
		// 开辟内存空间，存储每个整数出现的次数
		int[] counts = new int[1 + max];
		// 统计每个整数出现的次数
		for (int i = 0; i < array.length; i++) {
			counts[array[i]]++;
		} // O(n)
		
		// 根据整数的出现次数，对整数进行排序
		int index = 0;
		for (int i = 0; i < counts.length; i++) {
			while (counts[i]-- > 0) {
				array[index++] = i;
			}
		} // O(n)
	}	
```



这个版本的实现存在以下问题

- 无法对负整数进行排序
- 极其浪费内存空间
- 是个不稳定的排序
- ......

### 改进思路

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001726.png)

1.假设array中的最小值是 min 

2.array中的元素 k 对应的 counts 索引是 k – min 

3.array中的元素 k 在有序序列中的索引 

- counts[k – min] – p
- p 代表着是倒数第几个 k 

4.比如元素 8 在有序序列中的索引 

- counts[8 – 3] – 1，结果为 7

5.倒数第 1 个元素 7 在有序序列中的索引 

- counts[7 – 3] – 1，结果为 6

6.倒数第 2 个元素 7 在有序序列中的索引 

- counts[7 – 3] – 2，结果为 5

### 改进实现

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001744.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001759.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001815.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001836.png)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200914001904.png)

```java
protected void sort() {
		// 找出最值
		int max = array[0];
		int min = array[0];
		for (int i = 1; i < array.length; i++) {
			if (array[i] > max) {
				max = array[i];
			}
			if (array[i] < min) {
				min = array[i];
			}
		}
		
		// 开辟内存空间，存储次数
		int[] counts = new int[max - min + 1];
		// 统计每个整数出现的次数
		for (int i = 0; i < array.length; i++) {
			counts[array[i] - min]++;
		}
		// 累加次数
		for (int i = 1; i < counts.length; i++) {
			counts[i] += counts[i - 1];
		}
		
		// 从后往前遍历元素，将它放到有序数组中的合适位置
		int[] newArray = new int[array.length];
		for (int i = array.length - 1; i >= 0; i--) {
			newArray[--counts[array[i] - min]] = array[i];
		}
		
		// 将有序数组赋值到array
		for (int i = 0; i < newArray.length; i++) {
			array[i] = newArray[i];
		}
	}
```





### 复杂度分析

最好、最坏、平均时间复杂度：O(n + k) ◼ 空间复杂度：O(n + k)

- k 是整数的取值范围
- 属于稳定排序



### 对自定义对象进行排序

如果自定义对象可以提供用以排序的整数类型，依然可以使用计数排序 

```java
public void sort() {
		Person[] persons = new Person[] {
				new Person(20, "A"),
				new Person(-13, "B"),
				new Person(17, "C"),
				new Person(12, "D"),
				new Person(-13, "E"),
				new Person(20, "F")
		};
		
		// 找出最值
		int max = persons[0].age;
		int min = persons[0].age;
		for (int i = 1; i < persons.length; i++) {
			if (persons[i].age > max) {
				max = persons[i].age;
			}
			if (persons[i].age < min) {
				min = persons[i].age;
			}
		}
		
		// 开辟内存空间，存储次数
		int[] counts = new int[max - min + 1];
		// 统计每个整数出现的次数
		for (int i = 0; i < persons.length; i++) {
			counts[persons[i].age - min]++;
		}
		// 累加次数
		for (int i = 1; i < counts.length; i++) {
			counts[i] += counts[i - 1];
		}
		
		// 从后往前遍历元素，将它放到有序数组中的合适位置
		Person[] newArray = new Person[persons.length];
		for (int i = persons.length - 1; i >= 0; i--) {
			newArray[--counts[persons[i].age - min]] = persons[i];
		}
		
		// 将有序数组赋值到array
		for (int i = 0; i < newArray.length; i++) {
			persons[i] = newArray[i];
		}
		
		for (int i = 0; i < persons.length; i++) {
			System.out.println(persons[i]);
		}
	}
	
	private  class Person {
		int age;
		String name;
		Person(int age, String name) {
			this.age = age;
			this.name = name;
		}
		@Override
		public String toString() {
			return "Person [age=" + age 
					+ ", name=" + name + "]";
		}
	}
```



排序之后的结果

 ① Person [age=-13, name=B] 

② Person [age=-13, name=E]

 ③ Person [age=12, name=D] 

④ Person [age=17, name=C] 

⑤ Person [age=20, name=A]

 ⑥ Person [age=20, name=F]

## 基数排序（Radix Sort）

基数排序非常适合用于整数排序（尤其是非负整数），因此本课程只演示对非负整数进行基数排序

### 执行流程
依次对个位数、十位数、百位数、千位数、万位数...进行排序（从低位到高位）

![image-20200901084157977](https://gitee.com/jarrysong/img/raw/master/img/image-20200901084157977.png)

个位数、十位数、百位数的取值范围都是固定的0~9，可以使用计数排序对它们进行排序

**思考：**如果先对高位排序，再对低位排序，是否可行？

### 实现

```java
protected void sort() {
		// 找出最大值
		int max = array[0];
		for (int i = 1; i < array.length; i++) {
			if (array[i] > max) {
				max = array[i];
			}
		}
		
		// 个位数: array[i] / 1 % 10 = 3
		// 十位数：array[i] / 10 % 10 = 9
		// 百位数：array[i] / 100 % 10 = 5
		// 千位数：array[i] / 1000 % 10 = ...

		for (int divider = 1; divider <= max; divider *= 10) {
			countingSort(divider);
		}
	}
	
	protected void countingSort(int divider) {
		// 开辟内存空间，存储次数
		int[] counts = new int[10];
		// 统计每个整数出现的次数
		for (int i = 0; i < array.length; i++) {
			counts[array[i] / divider % 10]++;
		}
		// 累加次数
		for (int i = 1; i < counts.length; i++) {
			counts[i] += counts[i - 1];
		}
		
		// 从后往前遍历元素，将它放到有序数组中的合适位置
		int[] newArray = new int[array.length];
		for (int i = array.length - 1; i >= 0; i--) {
			newArray[--counts[array[i] / divider % 10]] = array[i];
		}
		
		// 将有序数组赋值到array
		for (int i = 0; i < newArray.length; i++) {
			array[i] = newArray[i];
		}
	}
```

 ### 复杂度

最好、最坏、平均时间复杂度：O(d ∗ (n + k))，d 是最大值的位数，k 是进制。属于稳定排序

空间复杂度：O(n + k)，k 是进制

### 另一种思路

![image-20200901085836524](https://gitee.com/jarrysong/img/raw/master/img/image-20200901085836524.png)

![image-20200901090112980](https://gitee.com/jarrysong/img/raw/master/img/image-20200901090112980.png)

空间复杂度是 O(kn + k)，时间复杂度是 O(dn) 

d 是最大值的位数，k 是进制



​    

## 桶排序（Bucket Sort）

 ### 执行流程

① 创建一定数量的桶（比如用数组、链表作为桶）

② 按照一定的规则（不同类型的数据，规则不同），将序列中的元素均匀分配到对应的桶 

③ 分别对每个桶进行单独排序 

④ 将所有非空桶的元素合并成有序序列 

![image-20200901090351915](https://gitee.com/jarrysong/img/raw/master/img/image-20200901090351915.png)

元素在桶中的索引 

元素值 * 元素数量

### 实现

![image-20200901090425970](https://gitee.com/jarrysong/img/raw/master/img/image-20200901090425970.png)

![image-20200901090636618](https://gitee.com/jarrysong/img/raw/master/img/image-20200901090636618.png)



## 史上“最强”排序 – 休眠排序 

![image-20200901090714902](https://gitee.com/jarrysong/img/raw/master/img/image-20200901090714902.png)