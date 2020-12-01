# 数组排序

## 1.[88_合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

### 题目

给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明：

- 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
- 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

**示例：**

```
输入：
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出：[1,2,2,3,5,6]
```

**提示：**

- -10^9 <= nums1[i], nums2[i] <= 10^9
- nums1.length == m + n
- nums2.length == n

### 思路

1. 记录nums1和mums2的倒序指针分别为i1和i2，要放置数据的指针cur
2. 对num2长度进行遍历，比较nums1[i1]和nums2[i2]的数据，大的放在cur位置，对应的i1或i2减少1，cur--
3. 如果num1遍历完毕了，即num2还有数据，或者num2[i2]大于num1[i1],将cur位置放num2[i2].

### 实现

```java
public void merge(int[] nums1, int m, int[] nums2, int n) {
        // nums1 = [1,3,5,0,0,0], m = 3
        // nums2 = [2,4,6],       n = 3
        int i1 = m - 1;
        int i2 = n - 1;
        int cur = nums1.length - 1;
        
        while (i2 >= 0) {
            if (i1 >= 0 && nums2[i2] < nums1[i1]) {
                nums1[cur--] = nums1[i1--];
            } else { // i1 < 0 || nums2[i2] >= nums1[i1]
                nums1[cur--] = nums2[i2--];
            }
        }
}
```

## 2.[75_颜色分类](https://leetcode-cn.com/problems/sort-colors/)

### 题目

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

**示例:**

```
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```

**进阶：**

- 一个直观的解决方案是使用计数排序的两趟扫描算法。
  首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。

- 你能想出一个仅使用常数空间的一趟扫描算法吗？



### 思路
![image-20201022085434199](https://gitee.com/jarrysong/img/raw/master/img/image-20201022085434199.png)



遇到1：跳过，红色指针++ 

遇到0：跟绿色指针交换值，绿色指针++、红色指针++ 

遇到2：跟紫色指针交换值，紫色指针--，再次对红色指针的值进行判断

### 实现

```java
/*
 * 一个只包含0、1、2的整型数组，要求对它进行【原地】排序
 * 你能想出一个仅使用常数空间的一趟扫描算法吗？
 * 
 * 空间复杂度O(1)，时间复杂度O(n)
 */
 public void sortColors(int[] nums) {
    int i = 0;
    int l = 0;
    int r = nums.length - 1;
    while (i <= r) {
        if (nums[i] == 0) {
            swap(nums, i++, l++);
        } else if (nums[i] == 1) {
            i++;
        } else {
            swap(nums, i, r--);
        }
    }
 }
    
 private void swap(int[] nums, int i, int j) {
    int tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
 }
```



## 3.[面试题_16_16_部分排序](https://leetcode-cn.com/problems/sub-sort-lcci/)

### 题目

给定一个整数数组，编写一个函数，找出索引m和n，只要将索引区间[m,n]的元素排好序，整个数组就是有序的。注意：n-m尽量最小，也就是说，找出符合条件的最短序列。函数返回值为[m,n]，若不存在这样的m和n（例如整个数组是有序的），请返回[-1,-1]。

**示例：**

```
输入： [1,2,4,7,10,11,7,12,6,7,16,18,19]
输出： [3,9]
```

**提示：**

- 0 <= len(array) <= 1000000

### 思路

![image-20201022085301947](https://gitee.com/jarrysong/img/raw/master/img/image-20201022085301947.png)

**右边临界，从左扫描到右寻找逆序对（正序：逐渐变大）**

1. 扫描过的最大值是：max；
1. 如果发现当前值小于最大值，记录它的位置rightIndex；
1. 如果发现当前值大于最大值，更新最大值；

**左边临界，从右扫描到左寻找逆序对（正序：逐渐变小）**

1. 扫描过的最小值是：min 
1. 如果发现当前值大于最小值，记录它的位置leftIndex
1. 如果发现当前值小于最小值，更新最小值

### 实现

```java
public int[] subSort(int[] nums) {
        if (nums.length == 0) return new int[] { -1, -1 };
        
        // 从左扫描到右寻找逆序对（正序：逐渐变大）
        int max = nums[0];
        // 用来记录最右的那个逆序对位置
        int r = -1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] >= max) {
                max = nums[i];
            } else {
                r = i;
            }
        }
        
        // 提前结束
        if (r == -1) return new int[] { -1, -1 };
        
        // 从右扫描到左寻找逆序对（正序：逐渐变小）
        int min = nums[nums.length - 1];
        // 用来记录最左的那个逆序对位置
        int l = -1;
        for (int i = nums.length - 2; i >= 0; i--) {
            if (nums[i] <= min) {
                min = nums[i];
            } else {
                l = i;
            }
        }
        
        return new int[] { l, r };
}
```

##  4.[思考题 164_最大间距](https://leetcode-cn.com/problems/maximum-gap/)

### 题目

给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。

如果数组元素个数小于 2，则返回 0。

**示例 1:**

```
输入: [3,6,9,1]
输出: 3
解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
```

**示例 2:**

```
输入: [10]
输出: 0
解释: 数组元素个数小于 2，因此返回 0。
```

**说明:**

- 你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
- 请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。

### 思路
参考：https://blog.csdn.net/zxzxzx0119/article/details/82889998

### 实现

```java
class Solution {
    //将 num 映射到对应的桶子
    public int mapToBucket(long num, long len, long min, long max) {
        return (int) ((num - min) * len / (max - min));
    }

    public int maximumGap(int[] nums) {
        if (nums == null || nums.length < 2)
            return 0;
        int len = nums.length;
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            min = nums[i] < min ? nums[i] : min;
            max = nums[i] > max ? nums[i] : max;
        }
        if (max == min)
            return 0;
        //准备 n + 1个桶
        boolean[] hasNum = new boolean[len + 1];
        int[] mins = new int[len + 1];
        int[] maxs = new int[len + 1];

        for (int i = 0; i < nums.length; i++) {
            int bid = mapToBucket(nums[i], len, min, max);
            mins[bid] = hasNum[bid] ? Math.min(mins[bid], nums[i]) : nums[i];
            maxs[bid] = hasNum[bid] ? Math.max(maxs[bid], nums[i]) : nums[i];
            hasNum[bid] = true;
        }
        int res = 0, preMax = maxs[0]; //第一个桶一定不空  因为一定有一个 最小值
        // 每一个非空桶 都找到 左边离它最近的非空桶  然后计算答案
        for (int i = 1; i <= len; i++) {
            if (hasNum[i]) { // 是非空的
                res = Math.max(res, mins[i] - preMax);
                preMax = maxs[i];
            }
        }
        return res;
    }
}
```



## 5.[作业 977_有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

### 题目

给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

**示例 1：**

```
输入：[-4,-1,0,3,10]
输出：[0,1,9,16,100]
```

**示例 2：**

```
输入：[-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

**提示：**

- 1 <= A.length <= 10000
- -10000 <= A[i] <= 10000
- A 已按非递减顺序排序。

### 思路

方式一：直接遍历

参考：https://blog.csdn.net/qq_36821220/article/details/109116838

方法二：双指针

略

方法三：三指针（https://blog.csdn.net/weixin_42245375/article/details/105943735）

start：头部的数据

end：尾部的数据；

i：遍历的指标。

1. 倒序遍历原数组，i = A.length-1;
2. 对比start位置和end位置的数据的平方，将大的放在新数组最后，并且修改对应的start和end位置；
3. i--

### 实现

```java
public int[] sortedSquares(int[] A) {
       if (A == null || A.length < 1) return A;
       int end = A.length;
       int start = 0;
       int i = end - 1;
       int[] nums = new int[end--];
       while (i >= 0) {
           nums[i--] = A[start] * A[start] > A[end] * A[end] ? A[start] * A[start++] : A[end] * A[end--];
       }
       return nums;
 }
```



