# 字符串
## [面试题 01.09. 字符串轮转](https://leetcode-cn.com/problems/string-rotation-lcci/)

### 题目

字符串轮转。给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成（比如，waterbottle是erbottlewat旋转后的字符串）。

**示例1:**

```
 输入：s1 = "waterbottle", s2 = "erbottlewat"
 输出：True
```

**示例2:**

```
 输入：s1 = "aa", s2 = "aba"
 输出：False
```

**提示：**

1. 字符串长度在[0, 100000]范围内。

**说明:**

1. 你能只调用一次检查子串的方法吗？

在有些面试题中，也称 、 互为旋转词

### 思路

![image-20201109085820410](https://gitee.com/jarrysong/img/raw/master/img/image-20201109085820410.png)

1.S1进行两次拼接；

2.如果其他串是拼接后的串的子串，就表示是旋转串；

### 实现

```java
// KMP
	
	// 旋转词
	public static boolean isRevolving(String s1, String s2) {
		if (s1 == null || s2 == null) return false;
		if (s1.length() != s2.length()) return false;
		// 这里还可以考虑使用KMP算法
		return (s1 + s1).contains(s2);
	}
```

## [572. 另一个树的子树](https://leetcode-cn.com/problems/subtree-of-another-tree/)

### 题目

给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。

**示例 1:**
给定的树 s:

```
         3
        / \
       4   5
      / \
     1   2
```

给定的树 t：

```
   4 
  / \
 1   2
```


返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。

**示例 2:**
给定的树 s：
```
         3
        / \
       4   5
      / \
     1   2
```

给定的树 t：

```
   4
  / \
 1   2
```


返回 false。

### 思路

![image-20201109090714915](https://gitee.com/jarrysong/img/raw/master/img/image-20201109090714915.png)

- 非空节点：值！，空节点： #！
- 空节点也必须要序列化，才能完整地表达唯一的一棵树

**思考：如何反序列化？**

![image-20201109090846570](https://gitee.com/jarrysong/img/raw/master/img/image-20201109090846570.png)

### 实现

```java
public class _572_另一个树的子树 {

	public boolean isSubtree(TreeNode s, TreeNode t) {
		if (s == null || t == null) return false;
		return contains(postSerialize(s), postSerialize(t));
	}
	
	private boolean contains(String text, String pattern) {
		int plen = pattern.length();
		int tlen = text.length();
		if (tlen == 0 || plen == 0 || tlen < plen) return false;
		int[] next = next(pattern);
		int pi = 0, ti = 0;
		int tmax = tlen - plen;
		while (pi < plen && ti - pi <= tmax) {
			if (pi < 0 || text.charAt(ti) == pattern.charAt(pi)) {
				ti++;
				pi++;
			} else {
				pi = next[pi];
			}
		}
		return pi == plen;
	}
	
	private int[] next(String pattern) {
		int len = pattern.length();
		int[] next = new int[len];
		int i = 0; 
		int n = next[i] = -1;
		int imax = len - 1;
		while (i < imax) {
			if (n < 0 || pattern.charAt(i) == pattern.charAt(n)) {
				i++;
				n++;
				if (pattern.charAt(i) == pattern.charAt(n)) {
					next[i] = next[n];
				} else {
					next[i] = n;
				}
			} else {
				n = next[n];
			}
		}
		return next;
	}
	
	/**
	 * 利用后序遍历的方式进行序列化
	 * @param root 树的根节点
	 * @return
	 */
	private String postSerialize(TreeNode root) {
		StringBuilder sb = new StringBuilder("!");
		postSerialize(root, sb);
		return sb.toString();
	}
	
	private void postSerialize(TreeNode node, StringBuilder sb) {
		sb.append(node.val).append("!");
		if (node.left == null) {
			sb.append("#!");
		} else {
			postSerialize(node.left, sb);
		}
		if (node.right == null) {
			sb.append("#!");
		} else {
			postSerialize(node.right, sb);
		}
	}
	
	public static void main(String[] args) {
		TreeNode root = new TreeNode(12);
//		root.right = new TreeNode(5);
//		root.left = new TreeNode(4);
//		root.left.left = new TreeNode(1);
//		root.left.right = new TreeNode(2);
		BinaryTrees.println(new BinaryTreeInfo() {
			@Override
			public Object string(Object node) {
				return ((TreeNode) node).val;
			}
			
			@Override
			public Object root() {
				return root;
			}
			
			@Override
			public Object right(Object node) {
				return ((TreeNode) node).right;
			}
			
			@Override
			public Object left(Object node) {
				return ((TreeNode) node).left;
			}
		});
		
		TreeNode root2 = new TreeNode(2);
//		root2.left = new TreeNode(1);
//		root2.right = new TreeNode(2);
		BinaryTrees.println(new BinaryTreeInfo() {
			@Override
			public Object string(Object node) {
				return ((TreeNode) node).val;
			}
			
			@Override
			public Object root() {
				return root2;
			}
			
			@Override
			public Object right(Object node) {
				return ((TreeNode) node).right;
			}
			
			@Override
			public Object left(Object node) {
				return ((TreeNode) node).left;
			}
		});
		
		_572_另一个树的子树 o = new _572_另一个树的子树();
		System.out.println(o.postSerialize(root));
		System.out.println(o.postSerialize(root2));
	}
}

```



## [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)

### 题目

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

**示例 1:**

```
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例 2:**

```
输入: s = "rat", t = "car"
输出: false
```

**说明:**
你可以假设字符串只包含小写字母。

**进阶:**
如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

**相似的题目** 

- [49. 字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)

- [面试题 10.02. 变位词组](https://leetcode-cn.com/problems/group-anagrams-lcci/)

- [438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

### 思路 

分别统计 2 个单词中每个字符的数量 

哈希表（空间换时间）

1.这里如果只是小写字母，那么考虑可以不用hashmap，而是用一个长度为26的数组，每一个字母对应的下标下进行统

2.第二个字符串，通过遍历将第一步统计到的数组对应字母下标下的数字减少，最终如果不等于哦，则表示两个单词的字符不同;

3.字母对应的小标，通过ascii码来计算；

### 实现

```java
// s == anagram
    public boolean isAnagram(String s, String t) {
    	if (s == null || t == null) return false;
    	char[] schars = s.toCharArray();
    	char[] tchars = t.toCharArray();
    	if (schars.length != tchars.length) return false;
    	
    	int[] counts = new int[26];
    	for (int i = 0; i < schars.length; i++) {
			counts[schars[i] - 'a']++;
		}
    	
    	for (int i = 0; i < tchars.length; i++) {
    		if (--counts[tchars[i] - 'a'] < 0) return false;
		}
    	return true;
    	
    	/*
    	 counts['a' - 'a'] = -1
    	 counts['g' - 'a'] = 1
    	 counts['r' - 'a'] = 1
    	 counts['n' - 'a'] = 1
    	 counts['m' - 'a'] = 1
    	 counts[other] = 0
    	 */
    	
    	
    	
//    	// 字符a的数量
//    	counts[0] = xx;
//    	// 字符b的数量
//    	counts[1] = xx;
//    	// 字符c的数量
//    	counts[2] = xx;
//    	...
//    	// 字符z的数量
//    	counts[25] = xx;
    	
    	
    }
```



## [151. 翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

### 题目

给定一个字符串，逐个翻转字符串中的每个单词。

说明：

- 无空格字符构成一个 单词 。
- 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
- 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。


示例 1：

```
输入："the sky is blue"
输出："blue is sky the"
```


示例 2：

```
输入："  hello world!  "
输出："world! hello"
解释：输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
```


示例 3：

```
输入："a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
```


示例 4：

```
输入：s = "  Bob    Loves  Alice   "
输出："Alice Loves Bob"
```


示例 5：

```
输入：s = "Alice does not even like bob"
输出："bob like even not does Alice"
```


提示：


	1 <= s.length <= 104
	s 包含英文大小写字母、数字和空格 ' '
	s 中 至少存在一个 单词

进阶：

- 请选用C语言的用户尝试使用 O(1) 额外空间复杂度的原地解法。

相似的题目：[剑指 Offer 58 - I. 翻转单词顺序](https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/)

### 思路

1.消除字符串中的多余空格

![image-20201109212201301](https://gitee.com/jarrysong/img/raw/master/img/image-20201109212201301.png)

（1）i 进行扫描，cur表示可以放字符的位置；

（2）将i位置的字符复制到cur位置，cur往前移动，i往前移动；

（3）如果i位置第二次为空，那么cur不移动，i往前移动；

2.将字符串逆序，然后将空格隔开的单词进行逆序；

![image-20201109212335683](https://gitee.com/jarrysong/img/raw/master/img/image-20201109212335683.png)

指定范围的字符串逆序

![image-20201109212416983](https://gitee.com/jarrysong/img/raw/master/img/image-20201109212416983.png)

![image-20201109212505318](https://gitee.com/jarrysong/img/raw/master/img/image-20201109212505318.png)

### 实现

```java
 public static String reverseWords(String s) {
    	if (s == null) return "";
    	char[] chars = s.toCharArray();
    	
    	// 消除多余的空格
    	// 字符串最终的有效长度
    	int len = 0;
    	// 当前用来存放字符的位置
    	int cur = 0;
    	// 前一个字符是否为空格字符
    	boolean space = true;
    	for (int i = 0; i < chars.length; i++) {
			if (chars[i] != ' ') { // chars[i]是非空格字符
				chars[cur++] = chars[i];
				space = false;
			} else if (space == false) { // chars[i]是空格字符，chars[i - 1]是非空格字符
				chars[cur++] = ' ';
				space = true;
			}
		}
    	len = space ? (cur - 1) :cur;
    	if (len <= 0) return "";
    	

    	// 对整一个有效字符串进行逆序
    	reverse(chars, 0, len);
    	
    	// 对每一个单词进行逆序
    	// 前一个空格字符的位置（有-1位置有个假想的哨兵，就是一个假想的空格字符）
    	int prevSapceIdx = -1;
    	for (int i = 0; i < len; i++) {
			if (chars[i] != ' ') continue;
			// i是空格字符的位置
			reverse(chars, prevSapceIdx + 1, i);
			prevSapceIdx = i;
		}
    	// 翻转最后一个单词
    	reverse(chars, prevSapceIdx + 1, len);
    	
    	return new String(chars, 0, len);
    }
    
    /**
     * 将[li, ri)范围内的字符串进行逆序
     */
    private static void reverse(char[] chars, int li, int ri) {
    	ri--;
    	while (li < ri) {
    		char tmp = chars[li];
    		chars[li] = chars[ri];
    		chars[ri] = tmp;
    		li++;
    		ri--;
    	}
    }

   public static void main(String[] args) {
		System.out.println("666_" + reverseWords("") + "_666");
		System.out.println("666_" + reverseWords("  hello world!     ") + "_666");
		System.out.println("666_" + reverseWords("a good   example") + "_666");
		System.out.println("666_" + reverseWords("are you ok") + "_666");
	}

```

## [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

### 题目

给定一个字符串，请你找出其中不含有重复字符的 **最长子串** 的长度。

**示例 1:**

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

### 思路

![image-20201109215211913](https://gitee.com/jarrysong/img/raw/master/img/image-20201109215211913.png)

pi 是 s[i] 字符上一次出现的位置 

li 是以 s[i] 字符结尾的最长不重复子串的开始索引（最左索引）

![image-20201109220016019](https://gitee.com/jarrysong/img/raw/master/img/image-20201109220016019.png)

1.如果li在pi右边（li>pi），那么以D结尾的最长不重复子串就是[li,i]，因为 li 以前的和A重复；

2.如果li在pi右边或则在一个位置（li<=pi），那么以D结尾的最长不重复子串就是(pi,i];

### 实现

```java
public int lengthOfLongestSubstring(String s) {
    	if (s == null) return 0;
    	char[] chars = s.toCharArray();
    	if (chars.length == 0) return 0;
    	
    	// 用来保存每一个字符上一次出现的位置
    	Map<Character, Integer> prevIdxes = new HashMap<>();
    	prevIdxes.put(chars[0], 0);
    	// 以i - 1位置字符结尾的最长不重复字符串的开始索引（最左索引）
    	int li = 0;
    	int max = 1;
    	for (int i = 1; i < chars.length; i++) {
    		// i位置字符上一次出现的位置
    		Integer pi = prevIdxes.get(chars[i]);
    		if (pi != null && li <= pi) {
    			li = pi + 1;
    		}
        	// 存储这个字符出现的位置
        	prevIdxes.put(chars[i], i);
        	// 求出最长不重复子串的长度
        	max = Math.max(max, i - li + 1);
		}
    	return max;
    }
```

```java
 public int lengthOfLongestSubstring(String s) {
    	if (s == null) return 0;
    	char[] chars = s.toCharArray();
    	if (chars.length == 0) return 0;
    	
    	// 用来保存每一个字符上一次出现的位置
    	int[] prevIdxes = new int[128];
    	for (int i = 0; i < prevIdxes.length; i++) {
			prevIdxes[i] = -1;
		}
    	prevIdxes[chars[0]] = 0;
    	// 以i - 1位置字符结尾的最长不重复字符串的开始索引（最左索引）
    	int li = 0;
    	int max = 1;
    	for (int i = 1; i < chars.length; i++) {
    		// i位置字符上一次出现的位置
    		int pi = prevIdxes[chars[i]];
    		if (li <= pi) {
    			li = pi + 1;
    		}
        	// 存储这个字符出现的位置
    		prevIdxes[chars[i]] = i;
        	// 求出最长不重复子串的长度
        	max = Math.max(max, i - li + 1);
		}
    	return max;
    }
```



## 思考题
- [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

- [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)

## 作业
- [1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)（第二季中讲过）

- [32. 最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/)

- [1048. 最长字符串链](https://leetcode-cn.com/problems/longest-string-chain/)

