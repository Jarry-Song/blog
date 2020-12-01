# DFS(Depth First Search)
DFS，深度优先搜索的简称 

很多排列组合相关的问题，都可以通过 DFS 来解决 

## [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

### 题目

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png)

**示例:**

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**说明:**
 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

### 思路

![image-20201117085319859](https://gitee.com/jarrysong/img/raw/master/img/image-20201117085319859.png)



### 实现

```java
public class _17_电话号码的字母组合 {
    private char[][] lettersArray = {
            {'a', 'b', 'c'}, {'d', 'e', 'f'}, {'g', 'h', 'i'},
            {'j', 'k', 'l'}, {'m', 'n', 'o'}, {'p', 'q', 'r', 's'},
            {'t', 'u', 'v'}, {'w', 'x', 'y', 'z'}
    };
    private char[] chars;
    /** 用来存储每一层选择的字母 */
    private char[] string;
    private List<String> list;

    public List<String> letterCombinations(String digits) {
        if (digits == null) return null;
        list = new ArrayList<>();
        chars = digits.toCharArray();
        if (chars.length == 0) return list;
        string = new char[chars.length];
        dfs(0);
        return list;
    }

    /**
     * @param idx 正在搜索第idx层
     */
    private void dfs(int idx) {
        // 已经进入到最后一层了，不能再往下搜索
        if (idx == chars.length) {
            // 得到了一个正确的解
            list.add(new String(string));
            return;
        }

        // 先枚举这一层可以做的所有选择
        char[] letters = lettersArray[chars[idx] - '2'];
        for (char letter : letters) {
            string[idx] = letter;
            dfs(idx + 1);
        }
    }

}
```

```java
public class _17_电话号码的字母组合2 {
    private char[][] lettersArray = {
            {'a', 'b', 'c'}, {'d', 'e', 'f'}, {'g', 'h', 'i'},
            {'j', 'k', 'l'}, {'m', 'n', 'o'}, {'p', 'q', 'r', 's'},
            {'t', 'u', 'v'}, {'w', 'x', 'y', 'z'}
    };

    public List<String> letterCombinations(String digits) {
        if (digits == null) return null;
        List<String> list = new ArrayList<>();
        char[] chars = digits.toCharArray();
        if (chars.length == 0) return list;
        char[] string = new char[chars.length];
        dfs(0, chars, string, list);
        return list;
    }

    /**
     * @param idx 正在搜索第idx层
     */
    private void dfs(int idx, char[] chars, char[] string, List<String> list) {
        // 已经进入到最后一层了，不能再往下搜索
        if (idx == chars.length) {
            // 得到了一个正确的解
            list.add(new String(string));
            return;
        }

        // 先枚举这一层可以做的所有选择
        char[] letters = lettersArray[chars[idx] - '2'];
        for (char letter : letters) {
            string[idx] = letter;
            dfs(idx + 1, chars, string, list);
        }
    }

}
```

## [46. 全排列](https://leetcode-cn.com/problems/permutations/)

### 题目

给定一个 **没有重复** 数字的序列，返回其所有可能的全排列。

**示例:**

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

### 思路

![image-20201117091348007](https://gitee.com/jarrysong/img/raw/master/img/image-20201117091348007.png)

#### 保存每一层已经占有的位置

对每一层遍历的时候，记录每一层对应的位置已经占有，则下一层就无法再选择。但是每次回退时（即当前层的这个元素的下一层已经完成，准备当前层的下个钥元素时）需要清除该位置被占有的记录。

#### 记录结果中是否含有被包含的

通过记录遍历的结果数组中是否含有已经包含的元素，然后排除，效率不高，因为每次都要判断是否包含。

#### 数组交换

![image-20201117213407949](https://gitee.com/jarrysong/img/raw/master/img/image-20201117213407949.png)

第一层：让0号位置，分别和0、1、2进行交换 

第二层：让1号位置，分别和1、2进行交换 

第三次：让2号位置，和2进行交换

### 实现

```java
public class _46_全排列 {
    private List<List<Integer>> list;
    private int[] nums;
    /** 用来保存每一层选择的数字 */
    private int[] result;
    /** 用来标记nums中的数字是否被使用过了 */
    private boolean[] used;

    public List<List<Integer>> permute(int[] nums) {
        if (nums == null) return null;
        list = new ArrayList<>();
        if (nums.length == 0) return list;
        this.nums = nums;
        result = new int[nums.length];
        used = new boolean[nums.length];
        dfs(0);
        return list;
    }

    private void dfs(int idx) {
        // 不能再往下搜索
        if (idx == nums.length) {
            List<Integer> resultList = new ArrayList<>();
            for (int value : result) {
                resultList.add(value);
            }
            list.add(resultList);
            return;
        }

        // 枚举这一层所有可以做出的选择
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            result[idx] = nums[i];
            used[i] = true;

            dfs(idx + 1);

            // 还原现场
            used[i] = false;
        }
    }
}
```

```java
public class _46_全排列2 {
    private List<List<Integer>> list;
    private int[] nums;
    /** 用来保存每一层选择的数字 */
    private List<Integer> result;

    public List<List<Integer>> permute(int[] nums) {
        if (nums == null) return null;
        list = new ArrayList<>();
        if (nums.length == 0) return list;
        this.nums = nums;
        result = new ArrayList<>();
        dfs(0);
        return list;
    }

    private void dfs(int idx) {
        // 不能再往下搜索
        if (idx == nums.length) {
            list.add(new ArrayList<>(result));
            return;
        }

        // 枚举这一层所有可以做出的选择
        for (int num : nums) {
            if (result.contains(num)) continue;

            result.add(num);

            dfs(idx + 1);

            result.remove(result.size() - 1);
        }
    }
}
```

```java
public class _46_全排列3 {
    public List<List<Integer>> permute(int[] nums) {
        if (nums == null) return null;
        List<List<Integer>> list = new ArrayList<>();
        if (nums.length == 0) return list;
        dfs(0, nums, list);
        return list;
    }

    private void dfs(int idx, int[] nums, List<List<Integer>> list) {
        // 不能再往下搜索
        if (idx == nums.length) {
            List<Integer> result = new ArrayList<>();
            for (int value : nums) {
                result.add(value);
            }
            list.add(result);
            return;
        }

        // 枚举这一层所有可以做出的选择
        for (int i = idx; i < nums.length; i++) {
            swap(nums, idx, i);
            dfs(idx + 1, nums, list);
            swap(nums, idx, i);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```



## [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

### 题目

给定一个可包含重复数字的序列 `nums` ，**按任意顺序** 返回所有不重复的全排列。

**示例 1：**

```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**示例 2：**

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

 

**提示：**

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

### 思路

![image-20201117215126707](https://gitee.com/jarrysong/img/raw/master/img/image-20201117215126707.png)

![image-20201117215311475](https://gitee.com/jarrysong/img/raw/master/img/image-20201117215311475.png)

在上面的全排列的实现方法3中，要去除重复的元素，思路有两个：

- 将上面的全排元素在放进数组前进行去重判断，但是这种效率很低；
- 再交换的时候就判断哪些是重复的。

每一层：idx，准备和idx交换i

如果**i位置元素和idex到i之前的位置中元素中有重复的**，说明i元素和前面的元素相同，就没有必要再交换，后面的元素和之前的那个结果是一样的。

### 实现

```java
public class _47_全排列II {
    public List<List<Integer>> permuteUnique(int[] nums) {
        if (nums == null) return null;
        List<List<Integer>> list = new ArrayList<>();
        if (nums.length == 0) return list;
        dfs(0, nums, list);
        return list;
    }

    private void dfs(int idx, int[] nums, List<List<Integer>> list) {
        // 不能再往下搜索
        if (idx == nums.length) {
            List<Integer> result = new ArrayList<>();
            for (int value : nums) {
                result.add(value);
            }
            list.add(result);
            return;
        }

        // 枚举这一层所有可以做出的选择
        for (int i = idx; i < nums.length; i++) {
            // 要保证一个数字在idx位置只会出现一次
            if (isRepeat(nums, idx, i)) continue;
            swap(nums, idx, i);
            dfs(idx + 1, nums, list);
            swap(nums, idx, i);
        }
    }
    private boolean isRepeat(int[] nums, int idx, int i) {
        for (int j = idx; j < i; j++) {
            if (nums[j] == nums[i]) return true;
        }
        return false;
    }

    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }

    public static void main(String[] args) {
        _47_全排列II o = new _47_全排列II();
        int[] nums = {1, 2, 3};
        List<List<Integer>> list = o.permuteUnique(nums);
        System.out.println(list);

        nums = new int[]{1, 1, 3};
        list = o.permuteUnique(nums);
        System.out.println(list);
    }
}

```

## [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

### 题目

数字 *n* 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

**示例：**

```
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
```

### 思路

![image-20201117220423478](https://gitee.com/jarrysong/img/raw/master/img/image-20201117220423478.png)

从第一层开始（第一层只能放左括号），下一层就有两个选择，下一层放什么取决于还剩下的左、右括号的个数。

核心：如果左括号剩余的数量大于0，就一直可以放左括号；如果左括号剩余数量等于右括号数量，只能放左括号。

### 实现

```java
public class _22_括号生成 {
    public List<String> generateParenthesis(int n) {
        List<String> list = new ArrayList<>();
        if (n < 0) return list;
        dfs(0, n, n, new char[n << 1], list);
        return list;
    }

    /**
     *
     * @param idx 搜索的层号
     * @param leftRemain 左括号的剩余数量
     * @param rightRemain 右括号的剩余数量
     * @param string 用来存放每一层的选择
     */
    private void dfs(int idx, int leftRemain, int rightRemain,
                     char[] string, List<String> list) {
        if (idx == string.length) {
            list.add(new String(string));
            return;
        }

        // 枚举这一层所有可能的选择
        // 选择一种可能之后，进入下一层搜索

        // 什么情况可以选择左括号？左括号的数量 > 0
        // 选择左括号，然后进入下一层搜索
        if (leftRemain > 0) {
            string[idx] = '(';
            dfs(idx + 1, leftRemain - 1, rightRemain, string, list);
        }

        // 当左括号、右括号的数量一样时，只能选择左括号
        // 什么情况可以选择右括号？(右括号的数量 > 0) && (右括号的数量 != 左括号的数量)
        // 选择右括号，然后进入下一层搜索
        if (rightRemain > 0 && leftRemain != rightRemain) {
            string[idx] = ')';
            dfs(idx + 1, leftRemain, rightRemain - 1, string, list);
        }
    }

    public static void main(String[] args) {
        _22_括号生成 o = new _22_括号生成();
        System.out.println(o.generateParenthesis(3));
    }
}
```

## 作业

- [51. N 皇后](https://leetcode-cn.com/problems/n-queens/)（第二季中讲过）
- [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/) （第二季中讲过）
- [112. 路径总和](https://leetcode-cn.com/problems/path-sum/)
- [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

## 思考题

- [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)
- [93. 复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)