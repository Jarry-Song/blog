# 链表

## [203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

### 题目

删除链表中等于给定值 **val** 的所有节点。

**示例:**

```
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```



### 思路

![image-20201023083718261](https://gitee.com/jarrysong/img/raw/master/img/image-20201023083718261.png)

**通过对原来链表进行扫描，然后组装一个新的链表，不是对原来的链表进行操作。**

![image-20201023084127971](https://gitee.com/jarrysong/img/raw/master/img/image-20201023084127971.png)

head：用来扫描链表的节点

newHead：新链表的头结点

cur：新链表的最后一个节点

![image-20201023084255866](https://gitee.com/jarrysong/img/raw/master/img/image-20201023084255866.png)

***注意：***newHead比一定是原来链表的头结点，应该进行扫描之后判断再赋值。



### 实现

```java
public class ListNode {
	 int val;
	 ListNode next;
	 ListNode(int x) { val = x; }
	 @Override
	public String toString() {
		return val + " -> " + next;
	}
}
```

方式一：

```java
public ListNode removeElements(ListNode head, int val) {
		if (head == null) return null;
		
		// 新链表的头结点
		ListNode newHead = null;
		// 新链表的尾结点
		ListNode newTail = null;
		
		while (head != null) {
			if (head.val != val) {
				// 将head拼接到newTail的后面
				if (newTail == null) {
					newHead = head;
					newTail = head;
				} else {
                      newTail.next = head;
					newTail = head;
				}
			}
			head = head.next;
		}
		if (newTail == null) {
			return null;
		} else {
			// 尾结点的next要清空
			newTail.next = null;
		}
		return newHead;
	}
```

方式二：

```java
public ListNode removeElements(ListNode head, int val) {
		if (head == null) return null;
		// 新链表的头结点
		ListNode newHead = new ListNode(0);
		// 新链表的尾结点
		ListNode newTail = newHead;
		while (head != null) {
			if (head.val != val) {
				newTail.next = head;
				newTail = head;
			}
			head = head.next;
		}
		newTail.next = null;
		return newHead.next;
	}
```



## [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

### 题目

给出两个 **非空** 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个节点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例：**

```
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

### 思路

![image-20201023090432614](https://gitee.com/jarrysong/img/raw/master/img/image-20201023090432614.png)

### 实现

```java
public class _0002_两数相加 {
	public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
		if (l1 == null) return l2;
		if (l2 == null) return l1;
		
		ListNode dummyHead = new ListNode(0);
		ListNode last = dummyHead;
		// 进位值
		int carry = 0;
		while (l1 != null || l2 != null) {
			int v1 = 0;
			if (l1 != null) {
				v1 = l1.val;
				l1 = l1.next;
			}
			int v2 = 0;
			if (l2 != null) {
				v2 = l2.val;
				l2 = l2.next;
			}
			int sum = v1 + v2 + carry;
			// 设置进位值
			carry = sum / 10;
			// sum的个位数作为新节点的值
			last.next = new ListNode(sum % 10);
			last = last.next;
		}
		
		// 检查最后的进位
		if (carry > 0) {
			// carry == 1
			last.next = new ListNode(carry);
		}
		
		return dummyHead.next;
	}
}
```





## 3.[160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

### 题目

编写一个程序，找到两个单链表相交的起始节点。

如下面的两个链表：

[![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

在节点 c1 开始相交。

示例 1：

[![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_1.png)](https://assets.leetcode.com/uploads/2018/12/13/160_example_1.png)

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```


示例 2：

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_2.png)

```
输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Reference of the node with value = 2
输入解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
```


示例 3：

![](https://assets.leetcode.com/uploads/2018/12/13/160_example_3.png)

```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
解释：这两个链表不相交，因此返回 null。
```


注意：

- 如果两个链表没有交点，返回 null.
- 在返回结果后，两个链表仍须保持原有的结构。
- 可假定整个链表结构中没有循环。
- 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。

同样的题目 

- [面试题 02.07. 链表相交](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)
- [剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

### 思路







![image-20201027082133237](https://gitee.com/jarrysong/img/raw/master/img/image-20201027082133237.png)



![image-20201027082016511](https://gitee.com/jarrysong/img/raw/master/img/image-20201027082016511.png)

### 实现

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
		if (headA == null || headB == null) return null;
		ListNode curA = headA, curB = headB;
		while (curA != curB) {
			curA = (curA == null) ? headB : curA.next;
			curB = (curB == null) ? headA : curB.next;
			// 这段代码在两个链表不相交的时候会死循环
			// curA = (curA.next == null) ? headB : curA.next;
			// curB = (curB.next == null) ? headA : curB.next;
		}
		return curA;
	}
```



## 4.[86. 分隔链表](https://leetcode-cn.com/problems/partition-list/)

### 题目

给定一个链表和一个特定值 *x*，对链表进行分隔，使得所有小于 *x* 的节点都在大于或等于 *x* 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

**示例:**

```
输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5
```

时间复杂度：O(n)、空间复杂度：O(1)
如果要分隔成 3 部分呢？ 

- 小于 x 的节点都在 x 左边 
- 等于 x 的节点都在中间 
- 大于 x 的节点都在 x 右边

相似的题目：[面试题 02.04. 分割链表](https://leetcode-cn.com/problems/partition-list-lcci/)（不要求保留两个分区中每个节点的初始相对位置）

### 思路

1.创建两个链表：iHead和rHead

2.遍历原来的链表，然后将大于分割值的放在rHead中，小于的放在iHead中；

3.将两个链表串联起来，同时将右边链表的尾部指向空；

![image-20201027084220128](https://gitee.com/jarrysong/img/raw/master/img/image-20201027084220128.png)

### 实现

```java
public ListNode partition(ListNode head, int x) {
		if (head == null) return null;
		ListNode lHead = new ListNode(0);
		ListNode lTail = lHead;
		ListNode rHead = new ListNode(0);
		ListNode rTail = rHead;
		while (head != null) {
			if (head.val < x) { // 放在lTail后面
				lTail.next = head;
				lTail = head;
			} else { // 放在rTail后面
				rTail.next = head;
				rTail = head;
			}
			head = head.next;
		}
		// 这句代码不能少
        /* 
         * 因为可能出现这样的情况:
         * 原链表倒数第N个节点A的值是>=x的，A后面所有节点的值都是<x的
         * 然后rTail.next最终其实就是A.next
         */
		rTail.next = null;
		// 将rHead.next拼接在lTail后面
		lTail.next = rHead.next;
		return lHead.next;
	}
```

## 5.[234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

### 题目

请判断一个链表是否为回文链表。

**示例 1:**

```
输入: 1->2
输出: false
```

**示例 2:**

```
输入: 1->2->2->1
输出: true
```

**进阶：**
你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

时间复杂度：O(n)、空间复杂度：O(1) 

同样的题目：[面试题 02.06. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list-lcci/)
如果要求不能破坏链表的原来结构呢？

### 思路

![image-20201105214222660](https://gitee.com/jarrysong/img/raw/master/img/image-20201105214222660.png)

1.找到链表中间的位置，然后将后半部分的链表进行反转；

2.反转之后两个链表依次进行遍历，对比每一个链表节点进行对比，如果不一样则表示不是回文链表；

3.如果要保持链表原来的结构不变，则最后将之前反转的链表再次反转；

如果找到中间节点？

> 利用快慢指针得到中间节点
>
> fast = fast.next.next;
>
> slow = slow.next;
>
> 当快指针结束的时候（即快指针无法再跳下一步的时候，fast.next == null 或者 fast.next.next == null）,那么slow节点就是中间节点。

![image-20201105214808815](https://gitee.com/jarrysong/img/raw/master/img/image-20201105214808815.png)

![image-20201105214856861](https://gitee.com/jarrysong/img/raw/master/img/image-20201105214856861.png)



反转：

![image-20201105215236715](https://gitee.com/jarrysong/img/raw/master/img/image-20201105215236715.png)

### 实现

```java
public class _0234_回文链表 {
    public boolean isPalindrome(ListNode head) {
    	if (head == null || head.next == null) return true; 
    	if (head.next.next == null) return head.val == head.next.val;
    	
    	// 找到中间节点
    	ListNode mid = middleNode(head);
    	// 翻转右半部分（中间节点的右边部分）
    	ListNode rHead = reverseList(mid.next);
    	ListNode lHead = head;
    	ListNode rOldHead = rHead;
    	
    	// 从lHead、rHead出发，判断是否为回文链表
    	boolean result = true;
    	while (rHead != null) {
    		if (lHead.val != rHead.val) {
    			result = false;
    			break;
    		}
    		rHead = rHead.next;
    		lHead = lHead.next;
    	}
    	
    	// 恢复右半部分（对右半部分再次翻转）
    	reverseList(rOldHead);
    	return result;
    }

    /**
     * 找到中间节点（右半部分链表头结点的前一个节点）
     * 比如 1>2>3>2>1中的3是中间节点
     * 比如 1>2>2>1中左边第一个2是中间节点
     * @param head
     * @return
     */
	private ListNode middleNode(ListNode head) {
		ListNode fast = head;
		ListNode slow = head;
		while (fast.next != null && fast.next.next != null) {
			slow = slow.next;
			fast = fast.next.next;
		}
		return slow;
	}
	
	/**
	 * 翻转链表
	 * @param head 原链表的头结点
	 * 比如原链表：1>2>3>4>null，翻转之后是：4>3>2>1>null
	 * @return 翻转之后链表的头结点（返回4）
	 */
	private ListNode reverseList(ListNode head) {
		ListNode newHead = null;
		while (head != null) {
			ListNode tmp = head.next;
			head.next = newHead;
			newHead = head;
			head = tmp;
		}
		return newHead;
	}
	
	public static void main(String[] args) {
		ListNode head = new ListNode(1);
		head.next = new ListNode(2);
		head.next.next = new ListNode(3);
		head.next.next.next = new ListNode(2);
//		head.next.next.next.next = new ListNode(1);
		System.out.println(head);
		
		_0234_回文链表 obj = new _0234_回文链表();
		obj.isPalindrome(head);
		
		System.out.println(head);
	}
}
```

## 5.思考题 [138. 复制带随机指针的链表](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

### 题目

给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。

要求返回这个链表的 深拷贝。 

我们用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：


	val：一个表示 Node.val 的整数。
	random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。

**示例 1：**

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png)

```
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**示例 2：**

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e2.png)

```
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
```

**示例 3：**

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e3.png)

```
输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

**示例 4：**

```
输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
```

**提示：**

- `-10000 <= Node.val <= 10000`
- `Node.random` 为空（null）或指向链表中的节点。
- 节点数目不超过 1000 。

时间复杂度：O(n)、空间复杂度：O(1)

同样的题目：[剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

### 思路

### 实现



## 6.思考题 [循环有序列表的插入](https://leetcode-cn.com/problems/insert-into-a-sorted-circular-linked-list/)

![image-20201105220124003](https://gitee.com/jarrysong/img/raw/master/img/image-20201105220124003.png)

时间复杂度：O(n)、空间复杂度：O(1)

## 7.思考题 [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

### 题目

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

**示例：**

给你这个链表：1->2->3->4->5

当 k = 2 时，应当返回: 2->1->4->3->5

当 k = 3 时，应当返回: 3->2->1->4->5

说明：


	你的算法只能使用常数的额外空间。
	你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

时间复杂度：O(n)、空间复杂度：O(1) 

相似的题目：[24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

### 思路

### 实现

## 作业
-  [237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)（第一季中讲过）

- [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)（第一季中讲过）

- [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)、[剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)（第一季中讲过）

- [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)（每周一到算法题中讲过）

- [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)（每周一到算法题中讲过）