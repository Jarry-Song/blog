# 动态规划（Dynamic Programming）

动态规划，简称DP 

- 是求解最优化问题的一种常用策略

通常的使用套路（一步一步优化）

- ① 暴力递归（自顶向下，出现了重叠子问题） 
- ② 记忆化搜索（自顶向下） 
- ③ 递推（自底向上）

## 动态规划的常规步骤

动态规划中的“动态”可以理解为是“会变化的状态”

- ① 定义状态（状态是原问题、子问题的解） 
  - ✓比如定义 dp(i) 的含义
- ② 设置初始状态（边界） 
  - ✓比如设置 dp(0) 的值
- ③ 确定状态转移方程 
  - ✓比如确定 dp(i) 和 dp(i – 1) 的关系

## 动态规划的一些相关概念

来自维基百科的解释 

- Dynamic Programming is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions. 
- ① 将复杂的原问题拆解成若干个简单的子问题 
- ② 每个子问题仅仅解决1次，并保存它们的解 
- ③ 最后推导出原问题的解

**可以用动态规划来解决的问题，通常具备2个特点：**

1.最优子结构（最优化原理）：通过求解子问题的最优解，可以获得原问题的最优解 

2.无后效性 

- ✓某阶段的状态一旦确定，则此后过程的演变不再受此前各状态及决策的影响（未来与过去无关） 
- ✓在推导后面阶段的状态时，只关心前面阶段的具体状态值，不关心这个状态是怎么一步步推导出来的

### 无后效性

![](https://gitee.com/jarrysong/img/raw/master/img/20201005101326.png)

从起点（0, 0）走到终点（4, 4）一共有多少种走法？只能向右、向下走

假设 dp(i, j) 是从（0, 0）走到（i, j）的走法 

- dp(i, 0) = dp(0, j) = 1 
- dp(i, j) = dp(i, j – 1) + dp(i – 1, j)

◼ 无后效性 

- 推导 dp(i, j) 时只需要用到 dp(i, j – 1)、dp(i – 1, j) 的值
- 不需要关心 dp(i, j – 1)、dp(i – 1, j) 的值是怎么求出来的 

### 有后效性

![](https://gitee.com/jarrysong/img/raw/master/img/20201005101326.png)

如果可以向左、向右、向上、向下走，并且同一个格子不能走 2 次

◼ 有后效性 

 - dp(i, j) 下一步要怎么走，还要关心上一步是怎么来的
 - ✓也就是还要关心 dp(i, j – 1)、dp(i – 1, j) 是怎么来的？ 

## 练习1 – 找零钱

leetcode_322_零钱兑换：https://leetcode-cn.com/problems/coin-change/

假设有25分、20分、5分、1分的硬币，现要找给客户41分的零钱，如何办到硬币个数最少？ 

- 此前用贪心策略得到的并非是最优解（贪心得到的解是 5 枚硬币）

假设 dp(n) 是凑到 n 分需要的最少硬币个数 

- 如果第 1 次选择了 25 分的硬币，那么 dp(n) = dp(n – 25) + 1
- 如果第 1 次选择了 20 分的硬币，那么 dp(n) = dp(n – 20) + 1
- 如果第 1 次选择了 5 分的硬币，那么 dp(n) = dp(n – 5) + 1
- 如果第 1 次选择了 1 分的硬币，那么 dp(n) = dp(n – 1) + 1
- 所以 dp(n) = min { dp(n – 25), dp(n – 20), dp(n – 5), dp(n – 1) } + 1

### 暴力递归

```java
public static void main(String[] args) {
	System.out.println(coins(41, new int[] {1, 5, 25, 20}));
}


/**
* 暴力递归（自顶向下的调用，出现了重叠子问题）
*/
static int coins(int n) {
	if (n < 1) return Integer.MAX_VALUE;
	if (n == 25 || n == 20 || n == 5 || n == 1) return 1;
	int min1 = Math.min(coins(n - 25), coins(n - 20));
	int min2 = Math.min(coins(n - 5), coins(n - 1));
	return Math.min(min1, min2) + 1;
}
```

类似于斐波那契数列的递归版，会有大量的重复计算，时间复杂度较高

### 记忆化搜索

```java
/**
* 记忆化搜索（自顶向下的调用）
*/
static int coins2(int n) {
	if (n < 1) return -1;
	int[] dp = new int[n + 1];
	int[] faces = {1, 5, 20, 25};
	for (int face : faces) {
		if (n < face) break;
		dp[face] = 1;
	}
	return coins2(n, dp);
}
	
static int coins2(int n, int[] dp) {
	if (n < 1) return Integer.MAX_VALUE;
	if (dp[n] == 0) {
		int min1 = Math.min(coins2(n - 25, dp), coins2(n - 20, dp));
		int min2 = Math.min(coins2(n - 5, dp), coins2(n - 1, dp));
		dp[n] = Math.min(min1, min2) + 1;
	}
	return dp[n];
}
```

### 递推

```java
/**
 * 递推（自底向上）
 */
static int coins3(int n) {
	if (n < 1) return -1;
	int[] dp = new int[n + 1];
	for (int i = 1; i <= n; i++) {
		int min = dp[i - 1];
		if (i >= 5) min = Math.min(dp[i - 5], min);
		if (i >= 20) min = Math.min(dp[i - 20], min);
		if (i >= 25) min = Math.min(dp[i - 25], min);
		dp[i] = min + 1;
	}
	return dp[n];
}
```

时间复杂度、空间复杂度：O(n)

思考题：请输出找零钱的具体方案（具体是用了哪些面值的硬币） 

```java
static int coins4(int n) {
	if (n < 1) return -1;
	int[] dp = new int[n + 1];
	// faces[i]是凑够i分时最后那枚硬币的面值
	int[] faces = new int[dp.length];
	for (int i = 1; i <= n; i++) {
		int min = dp[i - 1];
		faces[i] = 1;
		if (i >= 5 && dp[i - 5] < min) {
			min = dp[i - 5];
			faces[i] = 5;
		}
		if (i >= 20 && dp[i - 20] < min) {
			min = dp[i - 20];
			faces[i] = 20;
		}
		if (i >= 25 && dp[i - 25] < min) {
			min = dp[i - 25];
			faces[i] = 25;
		}
		dp[i] = min + 1;
		print(faces, i);
	}
//	print(faces, n);
	return dp[n];
}
	
static void print(int[] faces, int n) {
	System.out.print("[" + n + "] = ");
	while (n > 0) {o
		System.out.print(faces[n] + " ");
		n -= faces[n];
	}
	System.out.println();
}
```

### 通用实现

```java
public static void main(String[] args) {
	System.out.println(coins(41, new int[] {1, 5, 25, 20}));
	// fib(40)
	
	// dp(i) 第i项斐波那契数
	// dp(i) = dp(i - 1) + dp(i - 2)

	// dp(41) = 凑够41需要的最少硬币数量 = min { dp(40), dp(36), dp(16), dp(21) } + 1
	// dp(41 - 1) = dp(40) = 凑够40需要的最少硬币数量
	// dp(41 - 5) = dp(36) = 凑够36需要的最少硬币数量
	// dp(41 - 25) = dp(16) = 凑够16需要的最少硬币数量
	// dp(41 - 20) = dp(21) = 凑够21需要的最少硬币数量
	// min { dp(40), dp(36), dp(16), dp(21) } + 1
}

static int coins(int n, int[] faces) {
	if (n < 1 || faces == null || faces.length == 0) return -1;
	int[] dp = new int[n + 1];
	for (int i = 1; i <= n; i++) {
		int min = Integer.MAX_VALUE;
		for (int face : faces) {
			if (i < face) continue;
			int v = dp[i - face];
			if (v < 0 || v >= min) continue;
			min = v;
		}
		if (min == Integer.MAX_VALUE) {
			dp[i] = -1;
		} else {
			dp[i] = min + 1;
		}
	}
	return dp[n];
}
```



## 练习2 – 最大连续子序列和

给定一个长度为 n 的整数序列，求它的最大连续子序列和

- 比如 –2、1、–3、4、–1、2、1、–5、4 的最大连续子序列和是 4 + (–1) + 2 + 1 = 6

### 状态定义

假设 dp(i) 是以 nums[i] 结尾的最大连续子序列和（nums是整个序列） 

- ✓以 nums[0] –2 结尾的最大连续子序列是 –2，所以 dp(0) = –2 
- ✓以 nums[1] 1 结尾的最大连续子序列是 1，所以 dp(1) = 1
- ✓以 nums[2] –3 结尾的最大连续子序列是 1、–3，所以 dp(2) = dp(1) + (–3) = –2 
- ✓以 nums[3] 4 结尾的最大连续子序列是 4，所以 dp(3) = 4 
- ✓以 nums[4] –1 结尾的最大连续子序列是 4、–1，所以 dp(4) = dp(3) + (–1) = 3 
- ✓以 nums[5] 2 结尾的最大连续子序列是 4、–1、2，所以 dp(5) = dp(4) + 2 = 5 
- ✓以 nums[6] 1 结尾的最大连续子序列是 4、–1、2、1，所以 dp(6) = dp(5) + 1 = 6 
- ✓以 nums[7] –5 结尾的最大连续子序列是 4、–1、2、1、–5，所以 dp(7) = dp(6) + (–5) = 1 
- ✓以 nums[8] 4 结尾的最大连续子序列是 4、–1、2、1、–5、4，所以 dp(8) = dp(7) + 4 = 5

### 状态转移方程和初始状态

状态转移方程 

- 如果 dp(i – 1) ≤ 0，那么 dp(i) = nums[i] 
- 如果 dp(i – 1) > 0，那么 dp(i) = dp(i – 1) + nums[i]

初始状态 

- dp(0) 的值是 nums[0]

最终的解 

- 最大连续子序列和是所有 dp(i) 中的最大值 max { dp(i) }，i ∈ [0, nums.length)

### 动态规划 – 实现

```java
public static void main(String[] args) {
	System.out.println(maxSubArray(new int[] {-2,1,-3,4,-1,2,1,-5,4}));
}
	
static int maxSubArray(int[] nums) {
		if (nums == null || nums.length == 0) return 0;
		int[] dp = new int[nums.length];
		dp[0] = nums[0];
		int max = dp[0];
		for (int i = 1; i < dp.length; i++) {
			int prev = dp[i - 1];
			if (prev <= 0) {
				dp[i] = nums[i];
			} else {
				dp[i] = prev + nums[i];
			}
			max = Math.max(dp[i], max);
		}
		return max;
	}
```



空间复杂度：O(n)，时间复杂度：O(n)

### 动态规划 – 优化实现

```java
public static void main(String[] args) {
	System.out.println(maxSubArray(new int[] {-2,1,-3,4,-1,2,1,-5,4}));
}
	
static int maxSubArray(int[] nums) {
	if (nums == null || nums.length == 0) return 0;
	int dp = nums[0];
	int max = dp;
	for (int i = 1; i < nums.length; i++) {
		if (dp <= 0) {
			dp = nums[i];
		} else {
			dp = dp + nums[i];
		}
		max = Math.max(dp, max);
	}
	return max;
}
```

空间复杂度：O(1)，时间复杂度：O(n)

## 练习3 – 最长上升子序列（LIS）

最长上升子序列（最长递增子序列，Longest Increasing Subsequence，LIS）

leetcode_300_最长上升子序列： https://leetcode-cn.com/problems/longest-increasing-subsequence/

给定一个无序的整数序列，求出它最长上升子序列的长度（要求严格上升） 

- 比如 [10, 2, 2, 5, 1, 7, 101, 18] 的最长上升子序列是 [2, 5, 7, 101]、[2, 5, 7, 18]，长度是 4

### 动态规划 – 状态定义

假设数组是 nums， [10, 2, 2, 5, 1, 7, 101, 18] 

dp(i) 是以 nums[i] 结尾的最长上升子序列的长度，i ∈ [0, nums.length) 

- ✓以 nums[0] 10 结尾的最长上升子序列是 10，所以 dp(0) = 1 
- ✓以 nums[1] 2 结尾的最长上升子序列是 2，所以 dp(1) = 1 
- ✓以 nums[2] 2 结尾的最长上升子序列是 2，所以 dp(2) = 1 
- ✓以 nums[3] 5 结尾的最长上升子序列是 2、5，所以 dp(3) = dp(1) + 1 = dp(2) + 1 = 2 
- ✓以 nums[4] 1 结尾的最长上升子序列是 1，所以 dp(4) = 1 
- ✓以 nums[5] 7 结尾的最长上升子序列是 2、5、7，所以 dp(5) = dp(3) + 1 = 3 
- ✓以 nums[6] 101 结尾的最长上升子序列是 2、5、7、101，所以 dp(6) = dp(5) + 1 = 4 
- ✓以 nums[7] 18 结尾的最长上升子序列是 2、5、7、18，所以 dp(7) = dp(5) + 1 = 4

最长上升子序列的长度是所有 dp(i) 中的最大值 max { dp(i) }，i ∈ [0, nums.length)

### 动态规划 – 状态转移方程

遍历 j ∈ [0, i) 

当 nums[i] > nums[j] 

- ✓nums[i] 可以接在 nums[j] 后面，形成一个比 dp(j) 更长的上升子序列，长度为 dp(j) + 1 
- ✓dp(i) = max { dp(i), dp(j) + 1 }

当 nums[i] ≤ nums[j] 

- ✓nums[i] 不能接在 nums[j] 后面，跳过此次遍历（continue）

状态的初始值 

- dp(0) = 1 
- 所有的 dp(i) 默认都初始化为 1

### 动态规划 – 实现

```java
public static void main(String[] args) {
	System.out.println(lengthOfLIS(new int[] {10, 2, 2, 5, 1, 7, 101, 18}));
}

/**
 * 动态规划
 */
static int lengthOfLIS(int[] nums) {
	if (nums == null || nums.length == 0) return 0;
	int[] dp = new int[nums.length];
	int max = dp[0] = 1;
	for (int i = 1; i < dp.length; i++) {
		dp[i] = 1;
		for (int j = 0; j < i; j++) {
			if (nums[i] <= nums[j]) continue;
			dp[i] = Math.max(dp[i], dp[j] + 1);
		}
		max = Math.max(dp[i], max);
	}
	return max;
}
```

- 空间复杂度：O(n)
- 时间复杂度：O (n^2)

### 二分搜索牌顶-实现

![image-20201012132854423](https://gitee.com/jarrysong/img/raw/master/img/image-20201012132854423.png)

把每个数字看做是一张扑克牌，从左到右按顺序处理每一个扑克牌 

- 将它压在（从左边数过来）第一个牌顶 ≥ 它的牌堆上面 
- 如果找不到牌顶 ≥ 它的牌堆，就在最右边新建一个牌堆，将它放入这个新牌堆中

![image-20201012133101749](https://gitee.com/jarrysong/img/raw/master/img/image-20201012133101749.png)

当处理完所有牌，最终牌堆的数量就是最长上升子序列的长度

#### 普通牌顶实现

```java
/**
 * 牌顶
 */
static int lengthOfLIS2(int[] nums) {
	if (nums == null || nums.length == 0) return 0;
	// 牌堆的数量
	int len = 0;
	// 牌顶数组
	int[] top = new int[nums.length];
	// 遍历所有的牌
	for (int num : nums) {
		int j = 0;
		while (j < len) {
			// 找到一个>=num的牌顶
			if (top[j] >= num) {
				top[j] = num;
				break;
			}
			// 牌顶 < num
			j++;
		}
		if (j == len) { // 新建一个牌堆
			len++;
			top[j] = num;
		}
	}
	return len;
}
```

#### 二分搜索牌顶实现

**思路（假设数组是 nums，也就是最初的牌数组）**

- top[i] 是第 i 个牌堆的牌顶，len 是牌堆的数量，初始值为 0 
- 遍历每一张牌 num 
  - ✓利用二分搜索找出 num 最终要放入的牌堆位置 index 
  - ✓num 作为第 index 个牌堆的牌顶，top[index] = num 
  - ✓如果 index 等于 len，相当于新建一个牌堆，牌堆数量 +1，也就是 len++

```java
/**
 * 牌顶
 */
static int lengthOfLIS(int[] nums) {
	if (nums == null || nums.length == 0) return 0;
	// 牌堆的数量
	int len = 0;
	// 牌顶数组
	int[] top = new int[nums.length];
	// 遍历所有的牌
	for (int num : nums) {
		int begin = 0;
		int end = len;
		while (begin < end) {
			int mid = (begin + end) >> 1;
			if (num <= top[mid]) {
				end = mid;
			} else {
				begin = mid + 1;
			}
		}
		// 覆盖牌顶
		top[begin] = num;
		// 检查是否要新建一个牌堆
		if (begin == len) len++;
	}
	return len;
}
```

- 空间复杂度：O(n)
- 时间复杂度：O(nlogn)



## 练习4 – 最长公共子序列（LCS）

最长公共子序列（Longest Common Subsequence，LCS）

- leetcode_1143_最长公共子序列：https://leetcode-cn.com/problems/longest-common-subsequence/

求两个序列的最长公共子序列长度 

- [1, 3, 5, 9, 10] 和 [1, 4, 9, 10] 的最长公共子序列是 [1, 9, 10]，长度为 3 

- ABCBDAB 和 BDCABA 的最长公共子序列长度是 4，可能是 

> ✓ABCBDAB 和 BDCABA > BDAB 
>
> ✓ABCBDAB 和 BDCABA > BDAB 
>
> ✓ABCBDAB 和 BDCABA > BCAB 
>
> ✓ABCBDAB 和 BDCABA > BCB

### 思路

假设 2 个序列分别是 nums1、nums2 

- i ∈ [1, nums1.length] 
- j ∈ [1, nums2.length]

![image-20201009080651201](https://gitee.com/jarrysong/img/raw/master/img/image-20201009080651201.png)

假设 dp(i, j) 是【nums1 前 i 个元素】与【nums2 前 j 个元素】的最长公共子序列长度 

- dp(i, 0)、dp(0, j) 初始值均为 0 
- 如果 nums1[i – 1] = nums2[j – 1]，那么 dp(i, j) = dp(i – 1, j – 1) + 1 
- 如果 nums1[i – 1] ≠ nums2[j – 1]，那么 dp(i, j) = max { dp(i – 1, j), dp(i, j – 1) }

![image-20201009081529435](https://gitee.com/jarrysong/img/raw/master/img/image-20201009081529435.png)

### 递归实现

```java
public static void main(String[] args) {
	int len = lcs(new int[] {1, 3, 5, 9, 10}, new int[] {1, 4, 9, 10});
	System.out.println(len);
}

static int lcs(int[] nums1, int[] nums2) {
	if (nums1 == null || nums1.length == 0) return 0;
	if (nums2 == null || nums2.length == 0) return 0;
	return lcs1(nums1, nums1.length, nums2, nums2.length);
}
	
/**
 * 求nums1前i个元素和nums2前j个元素的最长公共子序列长度
 * @param nums1
 * @param i
 * @param nums2
 * @param j
 */
static int lcs(int[] nums1, int i, int[] nums2, int j) {
	if (i == 0 || j == 0) return 0;
	if (nums1[i - 1] == nums2[j - 1]) {
		return lcs(nums1, i - 1, nums2, j - 1) + 1;
	}
	return Math.max(lcs(nums1, i - 1, nums2, j), 
					lcs(nums1, i, nums2, j - 1));
}
```

空间复杂度：O(k) , k = min{n,m}，n、m 是 2 个序列的长度 

时间复杂度：O(2^n)，当 n = m 时

### 递归实现分析

![image-20201009082243217](https://gitee.com/jarrysong/img/raw/master/img/image-20201009082243217.png)

出现了重复的递归调用

### 非递归实现

```java
static int lcs2(int[] nums1, int[] nums2) {
	if (nums1 == null || nums1.length == 0) return 0;
	if (nums2 == null || nums2.length == 0) return 0;
	int[][] dp = new int[nums1.length + 1][nums2.length + 1];
	for (int i = 1; i <= nums1.length; i++) {
		for (int j = 1; j <= nums2.length; j++) {
			if (nums1[i - 1] == nums2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}
	return dp[nums1.length][nums2.length];
}
```

- 空间复杂度：O(n ∗ m)
- 时间复杂度：O(n ∗ m）

dp 数组的计算结果如下所示

![image-20201009085550077](https://gitee.com/jarrysong/img/raw/master/img/image-20201009085550077.png)

### 非递归实现 – 滚动数组

可以使用滚动数组优化空间复杂

```java
static int lcs3(int[] nums1, int[] nums2) {
		if (nums1 == null || nums1.length == 0) return 0;
		if (nums2 == null || nums2.length == 0) return 0;
		int[][] dp = new int[2][nums2.length + 1];
		for (int i = 1; i <= nums1.length; i++) {
			int row = i & 1;
			int prevRow = (i - 1) & 1;
			for (int j = 1; j <= nums2.length; j++) {   
				if (nums1[i - 1] == nums2[j - 1]) {
					dp[row][j] = dp[prevRow][j - 1] + 1;
				} else {
					dp[row][j] = Math.max(dp[prevRow][j], dp[row][j - 1]);
				}
			}
		}
		return dp[nums1.length & 1][nums2.length];
	}
```

### 非递归实现 – 一维数组

可以将 二维数组 优化成 一维数组，进一步降低空间复杂度

```java
static int lcs4(int[] nums1, int[] nums2) {
	if (nums1 == null || nums1.length == 0) return 0;
	if (nums2 == null || nums2.length == 0) return 0;
	int[] dp = new int[nums2.length + 1];
	for (int i = 1; i <= nums1.length; i++) {
		int cur = 0;
		for (int j = 1; j <= nums2.length; j++) {
			int leftTop = cur;
			cur = dp[j];
			if (nums1[i - 1] == nums2[j - 1]) {
				dp[j] = leftTop + 1;
			} else {
				dp[j] = Math.max(dp[j], dp[j - 1]);
			}
		}
	}
	return dp[nums2.length];
}
```

可以空间复杂度优化至 O(k) , k = min{n,m}

将数组长度小的作为一维数组的长度，进一步优化

```java
static int lcs(int[] nums1, int[] nums2) {
		if (nums1 == null || nums1.length == 0) return 0;
		if (nums2 == null || nums2.length == 0) return 0;
		int[] rowsNums = nums1, colsNums = nums2;
		if (nums1.length < nums2.length) {
			colsNums = nums1;
			rowsNums = nums2;
		}
		int[] dp = new int[colsNums.length + 1];
		for (int i = 1; i <= rowsNums.length; i++) {
			int cur = 0;
			for (int j = 1; j <= colsNums.length; j++) {
				int leftTop = cur;
				cur = dp[j];
				if (rowsNums[i - 1] == colsNums[j - 1]) {
					dp[j] = leftTop + 1;
				} else {
					dp[j] = Math.max(dp[j], dp[j - 1]);
				}
			}
		}
		return dp[colsNums.length];
}
```

字符串

```java
public int longestCommonSubsequence(String text1, String text2) {
		if (text1 == null || text2 == null) return 0;
		char[] chars1 = text1.toCharArray();  
		if (chars1.length == 0) return 0;
		char[] chars2 = text2.toCharArray();  
		if (chars2.length == 0) return 0;
		char[] rowsChars = chars1, colsChars = chars2;
		if (chars1.length < chars2.length) {
			colsChars = chars1;
			rowsChars = chars2;
		}
		int[] dp = new int[colsChars.length + 1];
		for (int i = 1; i <= rowsChars.length; i++) {
			int cur = 0;
			for (int j = 1; j <= colsChars.length; j++) {
				int leftTop = cur;
				cur = dp[j];
				if (rowsChars[i - 1] == colsChars[j - 1]) {
					dp[j] = leftTop + 1;
				} else {
					dp[j] = Math.max(dp[j], dp[j - 1]);
				}
			}
		}
		return dp[colsChars.length];
}
```



## 练习5 – 最长公共子串

最长公共子串（Longest Common Substring） 

- 子串是连续的子序列

求两个字符串的最长公共子串长度 

- ABCBA 和 BABCA 的最长公共子串是 ABC，长度为3

###  思路

假设 2 个字符串分别是 str1、str2 

- i ∈ [1, str1.length] 
- j ∈ [1, str2.length]

假设 dp(i, j) 是以 str1[i – 1]、str2[j – 1] 结尾的最长公共子串长度

- dp(i, 0)、dp(0, j) 初始值均为 0 
- 如果 str1[i – 1] = str2[j – 1]，那么 dp(i, j) = dp(i – 1, j – 1) + 1 
- 如果 str1[i – 1] ≠ str2[j – 1]，那么 dp(i, j) = 0

最长公共子串的长度是所有 dp(i, j) 中的最大值 max { dp(i, j) }

 ### 实现

```java
public static void main(String[] args) {
		System.out.println(lcs("ABDCBA", "ABBA"));
}

static int lcs1(String str1, String str2) {
		if (str1 == null || str2 == null) return 0;
		char[] chars1 = str1.toCharArray();
		if (chars1.length == 0) return 0;
		char[] chars2 = str2.toCharArray();
		if (chars2.length == 0) return 0;
		int[][] dp = new int[chars1.length + 1][chars2.length + 1];
		int max = 0;
		for (int i = 1; i <= chars1.length; i++) {
			for (int j = 1; j <= chars2.length; j++) {
				if (chars1[i - 1] != chars2[j - 1]) continue;
				dp[i][j] = dp[i - 1][j - 1] + 1;
				max = Math.max(dp[i][j], max);
			}
		}
		return max;
}
```

- 空间复杂度：O(n ∗ m)
- 时间复杂度：O(n ∗ m)

 dp 数组的计算结果如下所示

 ![image-20201010084841911](https://gitee.com/jarrysong/img/raw/master/img/image-20201010084841911.png)


### 一维数组实现

```java
static int lcs2(String str1, String str2) {
	if (str1 == null || str2 == null) return 0;
	char[] chars1 = str1.toCharArray();
	if (chars1.length == 0) return 0;
	char[] chars2 = str2.toCharArray();
	if (chars2.length == 0) return 0;
	char[] rowsChars = chars1, colsChars = chars2;
	if (chars1.length < chars2.length) {
		colsChars = chars1;
		rowsChars = chars2;
	}
		
	int[] dp = new int[colsChars.length + 1];
	int max = 0;
	for (int row = 1; row <= rowsChars.length; row++) {
		int cur = 0;
		for (int col = 1; col <= colsChars.length; col++) {
			int leftTop = cur;
			cur = dp[col];
			if (chars1[row - 1] != chars2[col - 1]) {
				dp[col] = 0;
			} else {
				dp[col] = leftTop + 1;
				max = Math.max(dp[col], max);
			}
		}
	}
	return max;
} 
```

- 空间复杂度：O k , k = min{n,m} 
- 时间复杂度：O(n ∗ m）

优化-由大到小

```java
static int lcs(String str1, String str2) {
	if (str1 == null || str2 == null) return 0;
	char[] chars1 = str1.toCharArray();
	if (chars1.length == 0) return 0;
	char[] chars2 = str2.toCharArray();
	if (chars2.length == 0) return 0;
	char[] rowsChars = chars1, colsChars = chars2;
	if (chars1.length < chars2.length) {
		colsChars = chars1;
		rowsChars = chars2;
	}
		
	int[] dp = new int[colsChars.length + 1];
	int max = 0;
	for (int row = 1; row <= rowsChars.length; row++) {
		for (int col = colsChars.length; col >= 1; col--) {
			if (chars1[row - 1] != chars2[col - 1]) {
				dp[col] = 0;
			} else {
				dp[col] = dp[col - 1] + 1;
				max = Math.max(dp[col], max);
			}
		}
	}
	return max;	
}
```

## 练习6 – 0-1背包

前面用贪心策略，但是还有不足

有 n 件物品和一个最大承重为 W 的背包，每件物品的重量是 𝑤i、价值是 𝑣i

- 在保证总重量不超过 W 的前提下，选择某些物品装入背包，背包的最大总价值是多少？ 
- 注意：每个物品只有 1 件，也就是每个物品只能选择 0 件或者 1 件

假设 values 是价值数组，weights 是重量数组 

- 编号为 k 的物品，价值是 values[k]，重量是 weights[k]，k ∈ [0, n)

假设 dp(i, j) 是 **最大承重为 j、有前 i 件物品可选** 时的最大总价值，i ∈ [1, n]，j ∈ [1, W] 

- dp(i, 0)、dp(0, j) 初始值均为 0 
- 如果 j < weights[i – 1]，那么 dp(i, j) = dp(i – 1, j) 
- 如果 j ≥ weights[i – 1]，那么 dp(i, j) = max { dp(i – 1, j), dp(i – 1, j – weights[i – 1]) + values[i – 1] }

### 非递归实现 

```java
public static void main(String[] args) {
		int[] values = {6, 3, 5, 4, 6};
		int[] weights = {2, 2, 6, 5, 4};
		int capacity = 10;
		System.out.println(maxValue1(values, weights, capacity));
}
	
static int maxValue1(int[] values, int[] weights, int capacity) {
		if (values == null || values.length == 0) return 0;
		if (weights == null || weights.length == 0) return 0;
		if (values.length != weights.length || capacity <= 0) return 0;
		int[][] dp = new int[values.length + 1][capacity + 1];
		for (int i = 1; i <= values.length; i++) {
			for (int j = 1; j <= capacity; j++) {
				if (j < weights[i - 1]) {
					dp[i][j] = dp[i - 1][j];
				} else {
					dp[i][j] = Math.max(
							dp[i - 1][j], 
							values[i - 1] + dp[i - 1][j - weights[i - 1]]);
				}
			}
		}
		return dp[values.length][capacity];
}
```



dp 数组的计算结果如下所示

![image-20201012081935459](https://gitee.com/jarrysong/img/raw/master/img/image-20201012081935459.png)

### 非递归实现 – 一维数组

dp(i, j) 都是由 dp(i – 1, k) 推导出来的，也就是说，第 i 行的数据是由它的上一行第 i – 1 行推导出来的 

- 因此，可以使用一维数组来优化 
- 另外，由于 k ≤ j ，所以 j 的遍历应该由大到小，否则导致数据错乱

```java
static int maxValue2(int[] values, int[] weights, int capacity) {
		if (values == null || values.length == 0) return 0;
		if (weights == null || weights.length == 0) return 0;
		if (values.length != weights.length || capacity <= 0) return 0;
		int[] dp = new int[capacity + 1];
		for (int i = 1; i <= values.length; i++) {
			for (int j = capacity; j >= 1; j--) {
				if (j < weights[i - 1]) continue;
				dp[j] = Math.max(dp[j], values[i - 1] + dp[j - weights[i - 1]]);
			}
		}
		return dp[capacity];
}
```



### 非递归实现 – 一维数组优化

观察二维数组表，得出结论：j 的下界可以从 1 改为 weights[i – 1]

```java
static int maxValue(int[] values, int[] weights, int capacity) {
		if (values == null || values.length == 0) return 0;
		if (weights == null || weights.length == 0) return 0;
		if (values.length != weights.length || capacity <= 0) return 0;
		int[] dp = new int[capacity + 1];
		for (int i = 1; i <= values.length; i++) {
			for (int j = capacity; j >= weights[i - 1]; j--) {
				dp[j] = Math.max(dp[j], values[i - 1] + dp[j - weights[i - 1]]);
			}
		}
		return dp[capacity];
}
```



###  恰好装满

有 n 件物品和一个最大承重为 W 的背包，每件物品的重量是 𝑤i、价值是 𝑣i 

- 在保证总重量恰好等于 W 的前提下，选择某些物品装入背包，背包的最大总价值是多少？ 
- 注意：每个物品只有 1 件，也就是每个物品只能选择 0 件或者 1 件

dp(i, j) 初始状态调整 

- dp(i, 0) = 0，总重量恰好为 0，最大总价值必然也为 0 
- dp(0, j) = –∞（负无穷），j ≥ 1，负数在这里代表无法恰好装满

![image-20201012084110669](https://gitee.com/jarrysong/img/raw/master/img/image-20201012084110669.png)

```java
/**
 * @return 如果返回-1，代表没法刚好凑到capacity这个容量
 */
static int maxValueExactly(int[] values, int[] weights, int capacity) {
	if (values == null || values.length == 0) return 0;
	if (weights == null || weights.length == 0) return 0;
	if (values.length != weights.length || capacity <= 0) return 0;
	int[] dp = new int[capacity + 1];
	for (int j = 1; j <= capacity; j++) {
		dp[j] = Integer.MIN_VALUE;
	}
	for (int i = 1; i <= values.length; i++) {
		for (int j = capacity; j >= weights[i - 1]; j--) {
			dp[j] = Math.max(dp[j], values[i - 1] + dp[j - weights[i - 1]]);
		}
	}
	return dp[capacity] < 0 ? -1 : dp[capacity];
}
```

























