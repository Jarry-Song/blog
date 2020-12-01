# 栈_队列

回顾一下基本概念

栈 
- 先进后出
- 后进先出 dddd
- 对称

队列、双端队列 
- 先进先出，后进后出 
- 顺序d

## [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

### 题目

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

- push(x) —— 将元素 x 推入栈中。
- pop() —— 删除栈顶的元素。
- top() —— 获取栈顶元素。
- getMin() —— 检索栈中的最小元素。


示例:

```
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```


提示：


	pop、top 和 getMin 操作总是在 非空栈 上调用。

同样的题目：[面试题 03.02. 栈的最小值](https://leetcode-cn.com/problems/min-stack-lcci/)

### 思路

![](https://gitee.com/jarrysong/img/raw/master/img/20201108115340.png)

#### 最小栈

1.建立两个栈：正常栈和最小栈；

2.每次push元素的时候，正常栈按照正常的push方式；

3.push正常栈的同时，如果元素比最小栈的栈顶元素大，则负责栈顶元素，push在最小栈；如果小于等于栈顶元素，则正常push在最小栈中；

4.如果要取最小值，则取的是最小栈的栈顶元素；

5.如果要出栈，则正常栈和最小栈都正常出栈；



#### 队列

![](https://gitee.com/jarrysong/img/raw/master/img/20201108121248.png)

1.建立一个虚拟头结点的队列；

2.队列的节点是一个真实数据，一个是栈最小数据；

3.每次将数据放在头结点，先看看头结点的最小数据，新节点的最小数据是头结点和新元素的最小值；

4.对于栈，那么头结点就是栈顶元素，尾节点就是栈低元素；



### 实现

最小栈

```java
public class MinStack {

    
	/**
	 *用来存放正常数据
	 */
	private Stack<Integer> stack;
	/** 
	 * 用来存放最小数据 
	 */
	private Stack<Integer> minStack;

    /** 
	 *initialize your data structure here. 
	 */
    public MinStack() {
    	stack = new Stack<>();
    	minStack = new Stack<>();
    }
    
    public void push(int x) {
    	stack.push(x);
    	if (minStack.isEmpty()) {
    		minStack.push(x);
    	} else {
    		minStack.push(Math.min(x, minStack.peek()));
    	}
    }
    
    public void pop() {
    	stack.pop();
    	minStack.pop();
    }
    
    public int top() {
    	return stack.peek();
    }
    
    public int getMin() {
    	return minStack.peek();
    }
}
```

队列

```java
public class MinStack {
	private Node head;

    /** initialize your data structure here. */
    public MinStack() {
    	head = new Node(0, Integer.MAX_VALUE, null);
    }
    
    public void push(int x) {
    	head = new Node(x, Math.min(x, head.min), head);
    }
    
    public void pop() {
    	head = head.next;
    }
    
    public int top() {
    	return head.val;
    }
    
    public int getMin() {
    	return head.min;
    }
    
    }
    private static class Node {
    	public int val;
    	public int min;
    	public Node next;
		public Node(int val, int min, Node next) {
			this.val = val;
			this.min = min;
			this.next = next;
		}
    }
}
```

## [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

### 题目

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

进阶：

你能在线性时间复杂度内解决此题吗？

示例:

```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 

  滑动窗口的位置                最大值

---------------               -----

[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```



提示：

	1 <= nums.length <= 10^5
	-10^4 <= nums[i] <= 10^4
	1 <= k <= nums.length

时间复杂度：O(n)

同样的题目：[剑指 Offer 59 - I. 滑动窗口的最大值](https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/) 

此题还可以用【动态规划】的思路

### 思路

#### 1.暴力法

#### 2.双端队列

![image-20201108132012376](https://gitee.com/jarrysong/img/raw/master/img/image-20201108132012376.png)

1.指针i表示滑动元素的最后一个元素；指针表示滑动元素的第一个元素；

2.新建一个队列，队列存放的是索引，队列中的元素从头到尾对应的元素值是逐渐减小的；

3.如果值比从队尾中取出的指针对应的值大，那么就将尾元素删除；直到比队尾元素小，再进队（从尾部进）；

4.在li每次滑动的时候需要校验队头的元素的小标是不是已经过期了，如果过期了就需要出队；

5.如果li开始合法了，则将头部的元素值放在窗口最大值的数据对应的位置中；

![image-20201108131855828](https://gitee.com/jarrysong/img/raw/master/img/image-20201108131855828.png)

① 如果 队尾 nums[i] >= nums[队尾] ，不断删除队尾，直到 nums[队尾] > nums[i];
② 将 i 加入队尾
③ 如果 li >= 0 

- 删除失效的队头（队头 < 就代表失效）

- 更新 li 位置的窗口最大值为 nums[队头]

  

- 注意 • 队列中存放的是索引 • 从对头到对尾， 队列元素 ，是逐渐减小的

#### 3.最大值

![image-20201108142133272](https://gitee.com/jarrysong/img/raw/master/img/image-20201108142133272.png)

1.li为滑动的头结点，ri为滑动的尾节点，li从0开始；

2.从滑动的元素中找出最大的值，并标记maxIdx；那么i的位置的窗口最大值就是它；

3.ri开始往下一个滑动之后新的值，和最大值进行比较，如果小于最大值，那么maxIdx不变；如果大于最大值，那么更新最大值；

4.如果最大值已经不再滑动窗口内，那么就需要重新找出最大值；



#### 4.动态规划

### 实现

2.双端队列

```java
public int[] maxSlidingWindow_deque(int[] nums, int k) {
    	if (nums == null || nums.length == 0 || k < 1) return new int[0];
    	if (k == 1) return nums;
    	
    	int[] maxes = new int[nums.length - k + 1];
    	
    	// peek: 取值（偷偷瞥一眼）
    	// poll: 删除（削）
    	// offer: 添加（入队）
    	Deque<Integer> deque = new LinkedList<>();
    	for (int ri = 0; ri < nums.length; ri++) {
			// 只要nums[队尾] <= nums[i]，就删除队尾
    		while (!deque.isEmpty() && nums[ri] >= nums[deque.peekLast()]) {
    			// deque.pollLast();
    			deque.removeLast();
    		}
    		
    		// 将i加到队尾
    		// deque.offerLast(ri);
    		deque.addLast(ri);
    		
    		// 检查窗口的索引是否合法
    		int li = ri - k + 1;
    		if (li < 0) continue;
    		
    		// 检查队头的合法性
    		if (deque.peekFirst() < li) {
    			// 队头不合法（失效，不在滑动窗口索引范围内）
    			// deque.pollFirst();
    			deque.removeFirst();
    		}
    		
    		// 设置窗口的最大值
    		maxes[li] = nums[deque.peekFirst()];
		}
    	return maxes;
    }
```

3.最大值

```java
public int[] maxSlidingWindow(int[] nums, int k) {
    	if (nums == null || nums.length == 0 || k < 1) return new int[0];
    	if (k == 1) return nums;
    	
    	int[] maxes = new int[nums.length - k + 1];
    	// 当前滑动窗口的最大值索引
    	int maxIdx = 0;
    	// 求出前k个元素的最大值索引
    	for (int i = 1; i < k; i++) {
			if (nums[i] > nums[maxIdx]) maxIdx = i;
		}
    	
    	// li是滑动窗口的最左索引
    	for (int li = 0; li < maxes.length; li++) {
    		// ri是滑动窗口的最右索引
			int ri = li + k - 1;
			if (maxIdx < li) { // 最大值的索引不在滑动窗口的合理范围内
				// 求出[li, ri]范围内最大值的索引
				maxIdx = li;
				for (int i = li + 1; i <= ri; i++) {
					if (nums[i] > nums[maxIdx]) maxIdx = i;
				}
			} else if (nums[ri] >= nums[maxIdx]) { // 最大值的索引在滑动窗口的合理范围内
				maxIdx = ri;
			}
			maxes[li] = nums[maxIdx];
		}
    	
    	return maxes;
    }
```

## [654. 最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

### 题目

给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：

1. 二叉树的根是数组中的最大元素。
2. 左子树是通过数组中最大值左边部分构造出的最大二叉树。
3. 右子树是通过数组中最大值右边部分构造出的最大二叉树。


通过给定的数组构建最大二叉树，并且输出这个树的根节点。

示例 ：

```
输入：[3,2,1,6,0,5]
输出：返回下面这棵树的根节点：

      6
    /   \
   3     5
    \    / 
     2  0   
       \
        1

```


提示：给定的数组的大小在 [1, 1000] 之间。

时间复杂度、空间复杂度：O(0)

### 思路

递归

### 实现

```java
 public TreeNode constructMaximumBinaryTree(int[] nums) {
    	if (nums == null) return null;
    	return findRoot(nums, 0, nums.length);
    }
    
    /**
     * 找出[l, r)范围的根节点
     */
    private TreeNode findRoot(int[] nums, int l, int r) {
    	if (l == r) return null;
    	
    	// 找出[l, r)范围内最大值的索引
    	int maxIdx = l;
    	for (int i = l + 1; i < r; i++) {
			if (nums[i] > nums[maxIdx]) maxIdx = i;
		}
    	
    	TreeNode root = new TreeNode(nums[maxIdx]);
    	root.left = findRoot(nums, l, maxIdx);
    	root.right = findRoot(nums, maxIdx + 1, r);
    	return root;
    }
```



题目变种
返回一个数组，数组里面存着每个节点的父节点的索引（如果没有父节点，就存 ）

![image-20201106123010789](https://gitee.com/jarrysong/img/raw/master/img/image-20201106123010789.png)

思路

![image-20201106123332493](https://gitee.com/jarrysong/img/raw/master/img/image-20201106123332493.png)

1.建立一个栈，这个栈的元素保证是递减的；

2.依次遍历数据，如果元素比栈顶元素小，则将元素放进栈中，并且得出：元素的左边第一个比他大的就是栈顶元素；

3.如果元素比栈顶的大，则弹出栈顶元素，并且得出结论，栈顶元素右边第一个比他大的就是该元素；

实现

```java
 public int[] parentIndexes(int[] nums) {
    	if (nums == null || nums.length == 0) return null;
    	/*
    	 * 1.扫描一遍所有的元素
    	 * 2.保持栈从栈底到栈顶是单调递减的
    	 */
    	int[] lis = new int[nums.length];
    	int[] ris = new int[nums.length];
    	Stack<Integer> stack = new Stack<>();
    	// 初始化
    	for (int i = 0; i < nums.length; i++) {
			ris[i] = -1;
			lis[i] = -1;
		}
    	for (int i = 0; i < nums.length; i++) {
			while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
				ris[stack.pop()] = i;
			}
			if (!stack.isEmpty()) {
				lis[i] = stack.peek();
			}
			stack.push(i);
		}

    	int[] pis = new int[nums.length];
    	for (int i = 0; i < pis.length; i++) {
    		if (lis[i] == -1 && ris[i] == -1) {
    			// i位置的是根节点
    			pis[i] = -1;
    			continue;
    		}
    		
    		if (lis[i] == -1) {
				pis[i] = ris[i];
    		} else if (ris[i] == -1) {
				pis[i] = lis[i];
    		} else if (nums[lis[i]] < nums[ris[i]]) {
				pis[i] = lis[i];
			} else {
				pis[i] = ris[i];
			}
		}
    	return pis;
    }
```



## [739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

### 题目

请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。

例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

### 思路

#### 栈

1.就是依次遍历，找出右边第一个比它大的元素，然后下标差就是需要等待的天数。

2.利用栈找出右边第一个比它大的值；

> - ①依次遍历列表，元素比栈顶小则进栈，注意这里进栈的是下标；
> - ②如果元素比栈顶大，那么栈顶元素的右边第一个大于它的元素就是该元素；
> - ③栈顶元素的对应的位置的天数就是下标差；
> - ④栈顶元素出栈；
> - ⑤重复步骤②；
> - ⑥将元素进栈；

![image-20201106194111729](https://gitee.com/jarrysong/img/raw/master/img/image-20201106194111729.png)

#### 倒推法

![image-20201106194313283](https://gitee.com/jarrysong/img/raw/master/img/image-20201106194313283.png)

 i 用来扫描所有的元素，从右往左扫描（i 逐渐递减），一开始 i 指向倒数第 2 个元素

 对于每一个 i，一开始令 j = i + 1

- ① 如果T[i] < T[j] 那么values[i] = j - i, 然后 i--
- ② 如果values[j] == 0, 那么values[i] == 0, 然后i--
- ③ 否则，设置 j = i + values[j], 回到步骤①

![image-20201108103104976](https://gitee.com/jarrysong/img/raw/master/img/image-20201108103104976.png)

对于每一个 ，一开始令 

1.如果 T[i] < T[j] 那么 values[i] = j - i,然后 i--

2.如果T[i] == T[j]

- ① 如果 values[j] == 0,values[i] = 0,然后 i-- 
- ② 如果 values[j] != 0,values[i] = valuse[j] + j -1 ,然后 i--

3.如果 T[i] > T[j]

- ① 如果 T[j] == 0,T[i] == 0,然后 i--;
- ② 如果 T[j] != 0,j = j + T[j],重新进入①的判断

### 实现

1.栈

```java
 public int[] dailyTemperatures(int[] T) {
    	if (T == null || T.length == 0) return null;
    	int[] result = new int[T.length];
    	Stack<Integer> stack = new Stack<>();
    	for (int i = 0; i < T.length; i++) {
    		// 这里应该要写大于，不要写大于等于
			while (!stack.isEmpty() && T[i] > T[stack.peek()]) {
				result[stack.peek()] = i - stack.peek();
				stack.pop();
			}
			stack.push(i);
		}
    	return result;
    }
```

2.倒推法

```java
public int[] dailyTemperatures(int[] T) {
    	if (T == null || T.length == 0) return null;
    	int[] values = new int[T.length];
    	for (int i = T.length - 2; i >= 0; i--) {
			int j = i + 1;
			while (true) {
				if (T[i] < T[j]) {
					values[i] = j - i;
					break;
				} else if (values[j] == 0) {
					values[i] = 0;
					break;
				} else if (T[i] == T[j]) {
					values[i] = values[j] + j - i;
					break;
				} else {
					j = j + values[j];
				}
			}
		}
    	return values;
    }
```

```java
  public int[] dailyTemperatures(int[] T) {
    	if (T == null || T.length == 0) return null;
    	int[] values = new int[T.length];
    	for (int i = T.length - 2; i >= 0; i--) {
			int j = i + 1;
			while (true) {
				if (T[i] < T[j]) {
					values[i] = j - i;
					break;
				} else if (values[j] == 0) {
					values[i] = 0;
					break;
				}
				// 当T[i] == T[j]的时候
				j = j + values[j];
			}
		}
    	return values;
    }
```

## 思考题
 [42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)
## 作业
- [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)（第一季中讲过）
- [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
- [剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)
- [面试题 03.04. 化栈为队](https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci/)（第一季中讲过）


