# 高频题

## [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)

### 题目

难度简单853收藏分享切换为英文接收动态反馈

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**示例:**

```
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**说明**:

1. 必须在原数组上操作，不能拷贝额外的数组。
2. 尽量减少操作次数。

### 思路

核心思想：将非0数字放在前面的0位置上

![image-20201119204722747](https://gitee.com/jarrysong/img/raw/master/img/image-20201119204722747.png)

遍历下标：i，当前非0数字最后一位的下标cur。

- 遍历数组，直到i到最后位置；
- 如果i位置的数字为0，其他不处理（比如第一个为0，）
- 如果cur和i在相同位置，说明还没遇到要移动的元素，cur++
- 一旦发现i位置是非0数字，就将i位置复制到cur位置，并将i位置赋值0；cur++

### 实现

```java
public class _283_移动零 {

    public void moveZeroes(int[] nums) {
        if (nums == null) return;
        for (int i = 0, cur = 0; i < nums.length; i++) {
            if (nums[i] == 0) continue;
            if (cur != i) {
                nums[cur] = nums[i];
                nums[i] = 0;
            }
            cur++;
        }
    }

}
```

## [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

### 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。



**示例:**

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

### 思路

暴力法 ：枚举每一对整数 

- 时间复杂度 O(n^2)
- 空间复杂度O(1)

优化

- 依次遍历所有元素，并将元素和下标分别以key-value的方式存储在哈希表中；
- 每次遍历元素时，目标值减去元素值的差值，然后将差值再哈希表中寻找key，找到了说明i和哈希表中的value就是要找的这两个值的下标。

时间复杂度 O(n)

空间复杂度O(n)

![image-20201119213427155](https://gitee.com/jarrysong/img/raw/master/img/image-20201119213427155.png)

### 实现

```java
public class _1_两数之和 {
    public int[] twoSum(int[] nums, int target) {
        if (nums == null) return null;
        // 用来存放之前扫描过的元素
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            Integer idx = map.get(target - nums[i]);
            if (idx != null) return new int[]{idx, i};
            map.put(nums[i], i);
        }
        return null;
    }
}
```

## [15. 三数之和](https://leetcode-cn.com/problems/3sum/)

### 题目

给你一个包含 *n* 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 *a，b，c ，*使得 *a + b + c =* 0 ？请你找出所有满足条件且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

 

**示例：**

```
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

### 思路

暴力法：枚举每一个三元组 

- 时间复杂度 O(n^3)
- 空间复杂度O(1)

优化

- 先将数组进行升序排序
- 分别对应的下标：遍历下标i,也就是得到的第一个元素；l：第二个元素；r：第三个元素
- 确定第一个元素后，需要第二个和第三个元素，如果找到了，并不代表不用再找其他的第二个和第三个元素，所以这里要用while循环，一直保持的条件是 l < r；但是这里其实已经是排序过的，所以也不会再找到其他情况了。
- remain = -nums[i]，当nums[l]+nums[r] == remain，则表示第二个和第三个元素已经找到了，l ++,r--
- 当nums[l] + nums[r] < remain，表示第二个元素太小，l++
- 当nums[l] + nums[r]>remain,表示第三个元素太大，r --;

![image-20201119214625076](https://gitee.com/jarrysong/img/raw/master/img/image-20201119214625076.png)

注意：要考虑去重的情况；

- 第一个元素去重，在for循环中处理；
- 在找到第二个和第三个元素的情况下，分别对l和r的后面和前面的元素判断是否相同，然后做去重处理，即跳过下一个判断，l++和r--，这里通过while循环处理；

### 实现

```java
public List<List<Integer>> threeSum(int[] nums) {
        if (nums == null) return null;
        List<List<Integer>> res = new ArrayList<>();
        if (nums.length < 3) return res;

        // 排序
        Arrays.sort(nums);

        // i用来扫描三元组的第一个元素
        int lastIdx = nums.length - 3;
        int lastR = nums.length - 1;
        for (int i = 0; i <= lastIdx; i++) {
            // 去重
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = lastR, remain = -nums[i];
            while (l < r) {
                int sumLr = nums[l] + nums[r];
                if (sumLr == remain) { // 找到了符合条件的三元组
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    // 跳过相同的值（去重）
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    // 往中间逼近
                    l++;
                    r--;
                } else if (sumLr < remain) {
                    l++;
                } else { // sumLr > remain
                    r--;
                }
            }
        }
        return res;
    }
```



## [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

### 题目

难度中等545

实现 [pow(*x*, *n*)](https://www.cplusplus.com/reference/valarray/pow/) ，即计算 x 的 n 次幂函数。

**示例 1:**

```
输入: 2.00000, 10
输出: 1024.00000
```

**示例 2:**

```
输入: 2.10000, 3
输出: 9.26100
```

**示例 3:**

```
输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
```

**说明:**

- -100.0 < *x* < 100.0
- *n* 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。

### 思路

最简单的做法：将 n 个 x 进行相乘

- 时间复杂度；O(n)
- 空间复杂度：O(1)

快速幂（分治） 

- 时间复杂度： O(logn)
- 非递归空间复杂度： O(1)
- 递归空间复杂度：O(logn)

递归

```
3^20 = 3^10 ∗ 3^10
3^21 = 3^10 ∗ 3^10 ∗3 
3^−20 = 3^−10 ∗ 3^−10 
3^−21 = 3^−10 ∗ 3^−10 ∗ 3^−1
3^−21 = 3^−11 ∗ 3^−11 ∗3
```

非递归

使用指数的二进制含义来代替10进制

![](https://gitee.com/jarrysong/img/raw/master/img/20201122000053.png)

### 实现

1.递归

```java
  public double myPow(double x, int n) {
        if (n == 0) return 1;
        if (n == -1) return 1 / x;
       
        double half = myPow(x, n >> 1);
        half *= half;
        // 是否为奇数， 正数、负数的右移都是向下取整
        return ((n & 1) == 1) ? (half * x) : half;
    }
```

2.非递归

```java
 public static double myPow(double x, int n) {
        long y = (n < 0) ? -((long) n) : n;
        double res = 1.0;
        while (y > 0) {
            if ((y & 1) == 1) {
                // 如果最后一个二进制位是1，就累乘上x
                res *= x;
            }
            x *= x;
            // 舍弃掉最后一个二进制位
            y >>= 1;
        }
        return (n < 0) ? (1 / res) : res;
    }
```

### 快速幂补充

请设计一个算法求 x 的 y 次幂模z 的结果：x^y%z

- 假设 x、y 都可能是很大的整数 
- y >= 0，z!=0

公式:（a * b）% p == ((a % p ) * (b % p)) % p

```java
public static int powMod1(int x, int y, int z) {
        if (y < 0 || z == 0) return 0;
        int res = 1 % z;
        x %= z;
        while (y > 0) {
            if ((y & 1) == 1) {
                // 如果最后一个二进制位是1，就累乘上x
                res = (res * x) % z;
            }
            x = (x * x) % z;
            // 舍弃掉最后一个二进制位
            y >>= 1;
        }
        return res;
    }

    // 2^100 % 6  = (2^50 * 2^50) % 6 = ((2^50 % 6) * (2^50 % 6)) % 6
    // 2^101 % 6 = (2^50 * 2^50 * 2) % 6 = ((2^50 % 6) * (2^50 % 6) * (2 % 6)) % 6
    public static int powMod(int x, int y, int z) {
        if (y < 0 || z == 0) return 0;
        if (y == 0) return 1 % z;
        int half = powMod(x, y >> 1, z);
        half *= half;
        if ((y & 1) == 0) { // 偶数
            return half % z;
        } else { // 奇数
            return (half * (x % z)) % z;
        }
    }
```



## [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

### 题目

0,1,,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。

例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

 

**示例 1：**

```
输入: n = 5, m = 3
输出: 3
```

**示例 2：**

```
输入: n = 10, m = 17
输出: 2
```

 

**限制：**

- `1 <= n <= 10^5`
- `1 <= m <= 10^6`

### 思路

计算公式：f(n,m) = （f(n -1 , m)+ m）% n

这其实就是著名的约瑟夫环问题 :

 有 n 个人，编号分别为 0,1, ... , n-1，每当报数到第 m 个人时，就杀掉他，求最后胜利者编号

**公式推导**

f(11,3) == 6

从 A 开始报数，最后能活下来的是G

![image-20201120131032239](https://gitee.com/jarrysong/img/raw/master/img/image-20201120131032239.png)

从 A 开始报数，杀掉 C 之后，剩下 10 个人，接下来从 D 开始报数，最后能活下来的依然是 G

![image-20201120131100084](https://gitee.com/jarrysong/img/raw/master/img/image-20201120131100084.png)

从 11 人变为 10 人，胜利者的编号由 6 变为 3，所以 f(10,3) = f(11,3) - 3

也就是说 f(11,3) = f(10,3) + 3

通用结论：f(n,m) = （f(n -1 , m)+ m）% n

最后的 % 是为了防止索引越界

### 实现

```java
public class 面试题_62_圆圈中最后剩下的数字 {
    // f(n, m) = (f(n – 1, m) + m) % n
    public int lastRemaining1(int n, int m) {
        return (n == 1) ? 0 : (lastRemaining1(n - 1, m) + m) % n;
    }

    // f(1, 3) = 0
    // f(2, 3) = (f(1, 3) + 3) % 2
    // ...
    // f(7, 3) = (f(6, 3) + 3) % 7
    // f(8, 3) = (f(7, 3) + 3) % 8
    // f(9, 3) = (f(8, 3) + 3) % 9
    // f(10, 3) = (f(9, 3) + 3) % 10
    public int lastRemaining(int n, int m) {
        int res = 0;
        for (int i = 2; i <= n; i++) { // i是数据规模，代表有多少个数字（有多少个人）
            res = (res + m) % i;
        }
        return res;
    }

    public static void main(String[] args) {
        面试题_62_圆圈中最后剩下的数字 o = new 面试题_62_圆圈中最后剩下的数字();
        System.out.println(o.lastRemaining(10, 17));
    }
}
```



**如果编号从1开始**

```java
public int lastRemaining(int n,int m){
    return f(n,m) + 1;
}

public int f(int n, int m) {
       return (n == 1) ? 0 : (lastRemaining(n - 1, m) + m) % n;
}
```

```java
public int lastRemaining(int n, int m) {
       int res = 0;
       for (int i = 2; i <= n; i++) { // i是数据规模，代表有多少个数字（有多少个人）
           res = (res + m) % i;
       }
       return res + 1;
}
```



## [54. 螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/)

### 题目

给定一个包含 *m* x *n* 个元素的矩阵（*m* 行, *n* 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

**示例 1:**

```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```

**示例 2:**

```
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

### 思路

![image-20201120102636360](https://gitee.com/jarrysong/img/raw/master/img/image-20201120102636360.png)

- top：顶行；bottom:底行；left：首列；right：尾列
- ①从左往右遍历top行，top++；
- ②从上往下遍历right列，right--;
- ③从右往左遍历bottom行,bottom--;
- ④从下往上遍历left列，left++；
- 行和列的条件需要满足：top >= bottom、left <= right;

注意：如果奇数行和奇数列，有问题

- 奇数行，说明最后一圈，只有一行(top == bottom)，那么执行完①(即遍历最后一行），top++,top > bottom，就说明应该结束。
- 奇数列，说明最后一圈，只有一列(left == right)，那么执行完①和②（即遍历了最后一列），left++,此时left  > right，就说明应该结束。

### 实现

```java
public class _54_螺旋矩阵 {
    public List<Integer> spiralOrder(int[][] matrix) {
        if (matrix == null) return null;
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;

        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            // left top -> right top
            for (int i = left; i <= right; i++) {
                res.add(matrix[top][i]);
            }
            top++;

            // right top -> right bottom
            for (int i = top; i <= bottom; i++) {
                res.add(matrix[i][right]);
            }
            right--;

            // 奇数行、偶数列的时候有问题
            if (top > bottom || left > right) break;

            // right bottom -> left bottom
            for (int i = right; i >= left; i--) {
                res.add(matrix[bottom][i]);
            }
            bottom--;

            // left bottom -> left top
            for (int i = bottom; i >= top; i--) {
                res.add(matrix[i][left]);
            }
            left++;
        }

        return res;
    }
}
```

## [146. LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/)

### 题目

运用你所掌握的数据结构，设计和实现一个 [LRU (最近最少使用) 缓存机制](https://baike.baidu.com/item/LRU) 。

实现 `LRUCache` 类：

- `LRUCache(int capacity)` 以正整数作为容量 `capacity` 初始化 LRU 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
- `void put(int key, int value)` 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

 

**进阶**：你是否可以在 `O(1)` 时间复杂度内完成这两种操作？

 

**示例：**

```
输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

 

**提示：**

- `1 <= capacity <= 3000`
- `0 <= key <= 3000`
- `0 <= value <= 104`
- 最多调用 `3 * 104` 次 `get` 和 `put`

### 思路

 LRU（Least Recently Used）：最近最少使用、最近最久未使用 

- 是操作系统常用的一种页面置换算法，选择最近最久未使用的页面予以淘汰
- LRU的常见实现方式是：**哈希表 双向链表**

![](https://gitee.com/jarrysong/img/raw/master/img/20201122113011.png)

### 实现

```java
public class LRUCache {
    private Map<Integer, Node> map;
    private int capacity;
    // 虚拟头结点
    private Node first;
    // 虚拟尾结点
    private Node last;

    public LRUCache(int capacity) {
        map = new HashMap<>(capacity);
        this.capacity = capacity;
        first = new Node();
        last = new Node();
        first.next = last;
        last.prev = first;
    }

    public int get(int key) {
        Node node = map.get(key);
        if (node == null) return -1;

        removeNode(node);
        addAfterFirst(node);

        return node.value;
    }

    /**
     * @param node 将node节点插入到first节点的后面
     */
    private void addAfterFirst(Node node) {
        // node与first.next
        node.next = first.next;
        first.next.prev = node;

        // node与first
        first.next = node;
        node.prev = first;
    }

    /**
     * @param node 从双向链表中删除node节点
     */
    private void removeNode(Node node) {
        node.next.prev = node.prev;
        node.prev.next = node.next;
    }

    public void put(int key, int value) {
        Node node = map.get(key);
        if (node != null) {
            node.value = value;
            removeNode(node);
        } else { // 添加一对新的key-value
            if (map.size() == capacity) {
                // 淘汰最近最少使用的node\
                removeNode(map.remove(last.prev.key));
//                map.remove(last.prev.key);
//                removeNode(last.prev);
            }
            map.put(key, node = new Node(key, value));
        }
        addAfterFirst(node);
    }

    private static class Node {
        public int key;
        public int value;
        public Node prev;
        public Node next;
        public Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
        public Node() {}
    }
}

```



## [7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/)

### 题目

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

**示例 1:**

```
输入: 123
输出: 321
```

 **示例 2:**

```
输入: -123
输出: -321
```

**示例 3:**

```
输入: 120
输出: 21
```

**注意:**

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231, 231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

### 思路

1.转为字符串，然后进行翻转（效率低）

2.依次取出最后一位，并将 新数据res * 10 + 最后一位  赋值给res，最终得到的res就是新数据

### 实现

```java
public class _7_整数反转 {

    public int reverse1(int x) {
        long res = 0;
        while (x != 0) {
            res = res * 10 + x % 10;
            if (res > Integer.MAX_VALUE) return 0;
            if (res < Integer.MIN_VALUE) return 0;
            x /= 10;
        }
        return (int) res;
    }

    public int reverse(int x) {
        int res = 0;
        while (x != 0) {
            int prevRes = res;
            int mod = x % 10;
            res = prevRes * 10 + mod;
            if ((res - mod) / 10 != prevRes) return 0;
            x /= 10;
        }
        return res;
    }

    public static void main(String[] args) {
//        System.out.println(Integer.MAX_VALUE);
//        System.out.println(new _7_整数反转().reverse(Integer.MAX_VALUE));
    }

}
```



## [252.会议室](https://leetcode-cn.com/problems/meeting-rooms/)

### 题目

给定一个会议时间安排的数组，每个会议时间都包括开始和结束的时间[[s1,e1],[s2,e2],[s3,e3]...] (si < ei)，请你判断一个人是否能够参加这里面的全部会议。

**示例 1:**

```
输入: [[0,30],[5,10],[15,20]]
输出: false
```

 **示例 2:**

```
输入: [[7,10],[2,4]]
输出: true
```

### 思路

1.将会议的时间区间数组进行排序；

2.从1开始依次遍历数组，如果 i 位置的元素比上一位置（i - 1）个元素小，则表示无法衔接的参加会议；

### 实现

```java
public class _252_会议室 {
    public boolean canAttendMeetings(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return true;

        // 按照会议的开始时间，从小到大排序
        Arrays.sort(intervals, (m1, m2) -> m1[0] - m2[0]);

        // 遍历每一个会议
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }

        return true;
    }
}
```

## [253.会议室Ⅱ](https://leetcode-cn.com/problems/meeting-rooms-ii/)

### 题目

给定一个会议时间安排的数组，每个会议时间都包括开始和结束的时间[[s1,e1],[s2,e2],[s3,e3]...] (si < ei)，为了避免会议冲突，同时要考虑充分利用会议室资源，请你计算至少需要多少间会议室，才能满足这些会议安排。

**示例 1:**

```
输入: [[0,30],[5,10],[15,20]]
输出: 2
```

 **示例 2:**

```
输入: [[7,10],[2,4]]
输出: 1
```

###  思路

#### 小顶堆

![image-20201124090226121](https://gitee.com/jarrysong/img/raw/master/img/image-20201124090226121.png)

1.将会议室的时间数组进行排序

2.建立一个最小堆，用于存放结束时间；

3.先将0号位置的数组的结束放进堆中；

3.从1开始遍历时间区间的数组，如果开始时间大于最小堆堆顶的数据，将堆顶元素移除；

4.将遍历的时间区间的将截止时间放入堆中；

5.遍历结束后，堆中的元素数量表示最多需要开的会议室的个数；



#### 分开排序

![image-20201124090305974](https://gitee.com/jarrysong/img/raw/master/img/image-20201124090305974.png)

1.将开始时间和结束时间分别取出来begin[]，end[]，然后进行排序；

2.遍历开始时间beginIdx,如果begin[beginIdx] >= end[endIdx] ,表示不需要开一个会议室，endIdx++;

3.如果 begin[beginIdx] < end[endIdx],表示开始时间小于当前结束时间，需要开一个新的会议室；

### 实现

1.最小堆

```java
 public int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;

        // 按照会议的开始时间，从小到大排序  nlogn
        Arrays.sort(intervals, (m1, m2) -> m1[0] - m2[0]);

        // 创建一个最小堆（存放每一个会议的结束时间）
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        // 添加0号会议的结束时间
        heap.add(intervals[0][1]);

        // 堆顶的含义：目前占用的会议室中最早结束的时间
        for (int i = 1; i < intervals.length; i++) { // nlogn
            // i号会议的开始时间 >= 堆顶
            if (intervals[i][0] >= heap.peek()) {
                heap.remove();
            }
            // 将i号会议的结束时间加入堆中
            heap.add(intervals[i][1]);
        }

        return heap.size();
    }
```

2.分开排序

```java
public int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        // 存放所有会议的开始时间
        int[] begins = new int[intervals.length];
        // 存放所有会议的结束时间
        int[] ends = new int[intervals.length];
        for (int i = 0; i < intervals.length; i++) {
            begins[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        // 排序
        Arrays.sort(begins);
        Arrays.sort(ends);

        int room = 0, endIdx = 0;
        for (int begin : begins) {
            if (begin >= ends[endIdx]) { // 能重复利用会议室
                endIdx++;
            } else { // 需要新开一个会议室
                room++;
            }
        }

        return room;
    }
```

## [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

### 题目

给你 `n` 个非负整数 `a1，a2，...，a``n`，每个数代表坐标中的一个点 `(i, ai)` 。在坐标内画 `n` 条垂直线，垂直线 `i` 的两个端点分别为 `(i, ai)` 和 `(i, 0)` 。找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

**说明：**你不能倾斜容器。

 

**示例 1：**

![img](https://gitee.com/jarrysong/img/raw/master/img/20201130234454.png)

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

**示例 3：**

```
输入：height = [4,3,2,1,4]
输出：16
```

**示例 4：**

```
输入：height = [1,2,1]
输出：2
```

 

**提示：**

- `n = height.length`
- `2 <= n <= 3 * 104`
- `0 <= height[i] <= 3 * 104`

### 思路

1.利用双指针，l和r;

2.对比l和r的元素，较小的元素往中间靠拢；

3.比较最大值；



优化：如果左右两边往里面靠拢，发现里面的比外面移动的哪个还要小，是没必要比较的，直接再往里面靠拢；



![image-20201124211754423](https://gitee.com/jarrysong/img/raw/master/img/20201130234533.png)

### 实现

```java
public class _11_盛最多水的容器 {

    public int maxArea(int[] height) {
        if (height == null || height.length == 0) return 0;

        int l = 0, r = height.length - 1, water = 0;
        while (l < r) {
            int minH = Math.min(height[l], height[r]);
            water = Math.max(water, minH * (r - l));
            while (l < r && height[l] <= minH) l++;
            while (l < r && height[r] <= minH) r--;
        }
        return water;
    }

    public int maxArea2(int[] height) {
        if (height == null || height.length == 0) return 0;

        int l = 0, r = height.length - 1, water = 0;
        while (l < r) {
            if (height[l] <= height[r]) {
                int minH = height[l];
                water = Math.max(water, (r - l) * minH);
                while (l < r && height[l] <= minH) l++;
            } else {
                int minH = height[r];
                water = Math.max(water, (r - l) * minH);
                while (l < r && height[r] <= minH) r--;
            }
        }
        return water;
    }

    public int maxArea1(int[] height) {
        if (height == null || height.length == 0) return 0;

        int l = 0, r = height.length - 1, water = 0;
        while (l < r) {
            int minH = (height[l] <= height[r]) ? height[l++] : height[r--];
            water = Math.max(water, minH * (r - l + 1));
        }
        return water;
    }

    public int maxArea0(int[] height) {
        if (height == null || height.length == 0) return 0;

        int l = 0, r = height.length - 1, water = 0;
        while (l < r) {
            if (height[l] <= height[r]) {
                water = Math.max(water, (r - l) * height[l]);
                l++;
            } else {
                water = Math.max(water, (r - l) * height[r]);
                r--;
            }
        }
        return water;
    }

}
```



## [42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

### 题目

给定 *n* 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

**示例 2：**

```
输入：height = [4,2,0,3,2,5]
输出：9
```

 

**提示：**

- `n == height.length`
- `0 <= n <= 3 * 104`
- `0 <= height[i] <= 105`

### 思路

1.思路一：每一个柱子能放多少水取决于左边和右边最大的柱子最小的值；

2.思路二：双指针l和r,对应l,只要右边有大于它的元素，就说明

### 实现

```java
public class _42_接雨水 {
    
    /**
    * 交替求左边、右边最大值（哪边小，就求哪边的最大值）
    * 只要rightMaxes[i] > leftMaxes[i],积水高度就由leftMaxes[i]决定
    * 只要rightMaxes[i] < leftMaxes[i],积水高度就由rightMaxes[i]决定
    */
    public int trap(int[] height) {
        if (height == null || height.length == 0) return 0;

        int l = 0，r = height - 1,lowerMax = 0,water = 0;
        while(l < r){
            //height[l]、height[r]中较小的那个
           int lower = height[height[l] <= height[r]? l++:r--]
           //目前为止遇到最大的那个lower
           lowerMax = Math.max(lowerMax,lower);
           water += lowerMax - lower; 
        }
        return water;
    }
    
    

    public int trap1(int[] height) {
        if (height == null || height.length == 0) return 0;

        int lastIdx = height.length - 2;

        int[] rightMaxes = new int[height.length];
        for (int i = lastIdx; i >= 1; i--) {
            rightMaxes[i] = Math.max(rightMaxes[i + 1], height[i + 1]);
        }

        // 遍历每一根柱子，看看每一根柱子上能放多少水
        int water = 0, leftMax = 0;
        for (int i = 1; i <= lastIdx; i++) {
            leftMax = Math.max(leftMax, height[i - 1]);
            // 求出左边最大、右边最大中的较小者
            int min = Math.min(leftMax, rightMaxes[i]);
            // 说明这根柱子不能放水
            if (min <= height[i]) continue;
            // 说明这根柱子能放水
            water += min - height[i];
        }

        return water;
    }

    public int trap0(int[] height) {
        if (height == null || height.length == 0) return 0;

        int lastIdx = height.length - 2;
        int[] leftMaxes = new int[height.length];
        for (int i = 1; i <= lastIdx; i++) {
            leftMaxes[i] = Math.max(leftMaxes[i - 1], height[i - 1]);
        }

        int[] rightMaxes = new int[height.length];
        for (int i = lastIdx; i >= 1; i--) {
            rightMaxes[i] = Math.max(rightMaxes[i + 1], height[i + 1]);
        }

        // 遍历每一根柱子，看看每一根柱子上能放多少水
        int water = 0;
        for (int i = 1; i <= lastIdx; i++) {
            // 求出左边最大、右边最大中的较小者
            int min = Math.min(leftMaxes[i], rightMaxes[i]);
            // 说明这根柱子不能放水
            if (min <= height[i]) continue;
            // 说明这根柱子能放水
            water += min - height[i];
        }

        return water;
    }

}
```

![image-20201124214238134](https://gitee.com/jarrysong/img/raw/master/img/20201130234605.png)

## 思考题

- [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
- [315. 计算右侧小于当前元素的个数](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/)
-  [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)
- [149. 直线上最多的点数](https://leetcode-cn.com/problems/max-points-on-a-line/)
- [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)