# 动态规划（ Dynamic Programming）
动态规划，简称 DP，是求解最优化问题的一种常用策略

## [剑指 Offer 47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)

### 题目

在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

**示例 1:**

```
输入: 
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物
```

 

提示：

- `0 < grid.length <= 200`
- `0 < grid[0].length <= 200`

类似的题目 

-  [64. 最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)
-  [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

### 思路

![image-20201112092459479](https://gitee.com/jarrysong/img/raw/master/img/image-20201112092459479.png)

假设  dp[row] [col]是走到 [row] [col]位置时的最大价值

![image-20201112092518834](https://gitee.com/jarrysong/img/raw/master/img/image-20201112092518834.png)

你是如何走到 [row] [col] 位置的？有 2 种可能 

- 从 [row] [col - 1] 位置往右走 
- 从 [row - 1] [col] 位置往下走

![image-20201112092606031](https://gitee.com/jarrysong/img/raw/master/img/image-20201112092606031.png)

所以dp[row] [col]  = max(dp[row] [col -1],dp[row-1] [col])+grid[row] [col]

### 实现

```java
 public int maxValue(int[][] grid) {
    	int rows = grid.length;
    	int cols = grid[0].length;
    	
    	int[][] dp = new int[rows][cols];
    	dp[0][0] = grid[0][0];
    	// 第0行
    	for (int col = 1; col < cols; col++) {
			dp[0][col] = dp[0][col - 1] + grid[0][col];
		}
    	// 第0列
    	for (int row = 1; row < rows; row++) {
			dp[row][0] = dp[row - 1][0] + grid[row][0];
		}
    	for (int row = 1; row < rows; row++) {
			for (int col = 1; col < cols; col++) {
				dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]) + grid[row][col];
			}
		}
    	return dp[rows - 1][cols - 1];
    }
}
```

## [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

### 题目

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**示例 2:**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

相同的题目 ：[剑指 Offer 63. 股票的最大利润](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/)

时间复杂度：O(n) ，空间复杂度：O(1)

### 思路

![image-20201112093028744](https://gitee.com/jarrysong/img/raw/master/img/image-20201112093028744.png)

动态规划

![image-20201112093053265](https://gitee.com/jarrysong/img/raw/master/img/image-20201112093053265.png)

- 第 i 天买，第 天卖的利润是 第 i ~j 天内，所有相邻两天股价差的和
- 第 1 天买，第 4 天卖的利润是(6-3)+(3-5)+(5-1) == 6-1 ==5

![image-20201112130141369](https://gitee.com/jarrysong/img/raw/master/img/image-20201112130141369.png)

- 于是，转化为了求【最大子数组和】的问题 ，也就是求【最大连续子序列和】的问题

### 实现

```java
 public int maxProfit(int[] prices) {
    	if (prices == null || prices.length == 0) return 0;
    	// 前面扫描过的最小价格
    	int minPrice = prices[0];
    	// 前面扫描过的最大利润
    	int maxProfit = 0;
    	// 扫描所有的价格
    	for (int i = 1; i < prices.length; i++) {
			if (prices[i] < minPrice) {
				minPrice = prices[i];
			} else { // 把第i天的股票卖出
				maxProfit = Math.max(maxProfit, prices[i] - minPrice);
			}
		}
    	return maxProfit;
    }
```



## [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)

### 题目

给你两个单词 `word1` 和 `word2`，请你计算出将 `word1` 转换成 `word2` 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

 

**示例 1：**

```
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

**示例 2：**

```
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```

 

**提示：**

- `0 <= word1.length, word2.length <= 500`
- `word1` 和 `word2` 由小写英文字母组成

### 思路

#### 建立转化的二维数组

![image-20201112131240066](https://gitee.com/jarrysong/img/raw/master/img/image-20201112131240066.png)

假设字符串1 （mice ）为 s1，它的长度为 n1；字符串2 （“arise ”）为 s2，它的长度为 n2

dp是大小为 (n1 +1) * （n2 + 1）的二维数组 

dp[i] [j] 是 s1[0,i)转换成 s2[0,j)的最少操作数

- s1[0,i)是由 s1的前 i 个字符组成的子串
- s2[0,j)是由 s2的前 j 个字符组成的子串

很显然， dp[n1] [n2]就是我们要的答案，就是 s1[0,n1)转换成 s2[0,n2)的最少操作数

也就是 s1转换成 s2的最少操作数

![image-20201112131734907](https://gitee.com/jarrysong/img/raw/master/img/image-20201112131734907.png)

最左上角的 dp[0] [0]：代表 s1 的空子串转换为 s2 的空子串的最少操作数

- 其实就是什么也不用做，所以：dp[0] [0] = 0

第 0 列的 dp[i] [0]：代表 s1[0,i)]转换为 s2的空子串的最少操作数

- 其实就是删除 s1[0,i)的所有字符，所以：dp[i] [0] = i

第 0 行的 dp[0] [i]：代表 s1 的空子串转换为 s2[0,j)的最少操作数

- 其实就是插入 s2[0,j)的所有字符，所以：dp[0] [j] = j

#### 推算动态规划的公式

如何求出其他位置的 dp[i] [j] = 0？

- dp[i] [j]是 s1[0,i)转换成 s2[0,j)的最少操作数
- 可以分 4种情况讨论

##### 情况① 

先删除 s1[0,i)的最后一个字符得到 s1[0,j-1)

- 然后由 s1[0,i-1) 转换为s2[0,j) 
- 这种情况下，dp[i] [j] = 1+dp[i-1] [j]

##### 情况② 

先由 s1[0,i)转换为 s2[0,j-1)，然后在最后插入字符 s2[j-1]，得到 s2[0,j-1)

- 这种情况下，dp[i] [j] = dp[i] [j-1] +1

##### 情况③ 

如果 s1[i-1] != s2[j-1]，先由 s1[0,i-1)转换为s2[0,j-1) 

- 然后将 s1[i-1]替换为 s2[j-1]，这种情况下，dp[i] [j] = dp[i-1] [j-1] + 1

##### 情况④ 

如果 s1[i-1] == s2[j-1]，由 s1[0,i-1)转换为s2[0,j-1) 后就不用再做任何操作 

- 这种情况下，dp[i] [j] = dp[i-1] [j-1]

### 实现

```java
public int minDistance(String word1, String word2) {
    	if (word1 == null || word2 == null) return 0;
    	char[] cs1 = word1.toCharArray();
    	char[] cs2 = word2.toCharArray();
    	int[][] dp = new int[cs1.length + 1][cs2.length + 1];
    	dp[0][0] = 0;
    	// 第0列
    	for (int i = 1; i <= cs1.length; i++) {
			dp[i][0] = i;
		}
    	// 第0行
    	for (int j = 1; j <= cs2.length; j++) {
			dp[0][j] = j;
		}
    	// 其他行其他列
    	for (int i = 1; i <= cs1.length; i++) {
			for (int j = 1; j <= cs2.length; j++) {
				int top = dp[i - 1][j] + 1;
				int left = dp[i][j - 1] + 1;
				int leftTop = dp[i - 1][j - 1];
				if (cs1[i - 1] != cs2[j - 1]) {
					leftTop++;
				}
				dp[i][j] = Math.min(Math.min(top, left), leftTop);
			}
		}
    	return dp[cs1.length][cs2.length];
    }
```

## [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

### 题目

给定一个字符串 `s`，找到 `s` 中最长的回文子串。你可以假设 `s` 的最大长度为 1000。

**示例 1：**

```
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```

**示例 2：**

```
输入: "cbbd"
输出: "bb"
```

### 思路

#### 暴力法

![image-20201112205209663](https://gitee.com/jarrysong/img/raw/master/img/image-20201112205209663.png)

列举出所有的子串，时间复杂度：O(n^2)

检查每一个子串是否为回文串，每一个子串所需时间复杂度： O(n)

总共时间复杂度：O(n^3)，空间复杂度：O(1)

#### 动态规划解法

- 其实是基于暴力法的优化，优化的部分：判断每个串是否为回文串 
- 时间复杂度： O(n^2)
- 空间复杂度： O(n^2)
- 空间复杂度可以优化至O(n)


![image-20201112205352965](https://gitee.com/jarrysong/img/raw/master/img/image-20201112205352965.png)

假设字符串（babad“”）为 s，它的长度为 n

dp是大小为n * n 的二维数组，dp[i] [j] 表示 s[i, j]是否为回文串，存储true 、false 

如何求出 dp[i] [j] 的值？分 2 种情况：

 ① 如果 s[i , j] 的长度(j - i +1) <= 2 时 

- 如果 s[i] 等于 s[ j ]，那么 s[i , j]是回文串，所以dp[ i ] [ j ] = s[ i ] == s[ j ] 

② 如果s[j , j]的长度(j - i +1) ＞ 2时 

- 如果 s[i+1] [j-1]是回文串，并且s[ i ] 等于 s[ j ]，那么 s[i] [j]是回文串
- 所以dp[i] [j] = dp[ i+1 ] [ j-1 ] && ( s[ i ] == s[ j ])

#### 扩展中心法

![image-20201112215630713](https://gitee.com/jarrysong/img/raw/master/img/image-20201112215630713.png)

假设字符串（ “abbaba”）的长度为 n ，那么一共有 n+（n-1） == 2n -1 个扩展中心

- 时间复杂度：O(n^2) 
- 空间复杂度：O(1)

**基于扩展中心法的优化**

![image-20201112214454908](https://gitee.com/jarrysong/img/raw/master/img/image-20201112214454908.png)

算法的核心思想：由连续的相同字符组成的子串作为扩展中心 

所以，字符串 "babbbabaa" 的扩展中心有：“b ”、“a ”、“ bbb”、“ a”、“ b”、“aa”

核心逻辑

- 找到右边第一个不等于 s [i] 的字符，记为位置 r ，i 左边位置记为1
- r 作为下一次的 i
- 由 l 开始向左、 r开始向右扩展，找到最长的回文子串

#### Mamacher（马拉车）

### 实现

1.动态规划

```java
/**
	 * 动态规划
	 */
    public String longestPalindromeDp(String s) {
    	if (s == null) return null;
    	char[] cs = s.toCharArray();
    	if (cs.length <= 1) return s;
    	// 最长回文子串的长度（至少是1）
    	int maxLen = 1;
    	// 最长回文子串的开始索引
    	int begin = 0;
    	boolean[][] dp = new boolean[cs.length][cs.length];
    	// 从下到上（i由大到小）
    	for (int i = cs.length - 1; i >= 0; i--) {
    		// 从左到右（j由小到大）
			for (int j = i; j < cs.length; j++) {
				// cs[i, j]的长度
				int len = j - i + 1;
				dp[i][j] = (cs[i] == cs[j]) && (len <= 2 || dp[i + 1][j - 1]);
				if (dp[i][j] && len > maxLen) { // 说明cs[i, j]是回文子串
					maxLen = len;
					begin = i;
				}
			}
		}
    	return new String(cs, begin, maxLen);
    }
```

2.扩展中心

```

```

3.马拉车

```

```




## 作业
- 将 [剑指 Offer 47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)、 [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)、 [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)中的二维数组优化成一维数组
- 最长公共子序列（第二季中讲过）
- 最大子序和、面试题 连续子数组的最大和（第二季中讲过）
- 零钱兑换、面试题 硬币（第二季中讲过）
- 最长上升子序列（第二季中讲过）
- 爬楼梯（第二季中讲过）
- 打家劫舍（每周一到算法题中讲过）、 打家劫舍



![image-20201113124849973](https://gitee.com/jarrysong/img/raw/master/img/image-20201113124849973.png)











