# 二叉树
## [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

### 题目

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/最近公共祖先/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”

例如，给定如下二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/binarytree.png)

 

**示例 1:**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

**示例 2:**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
```

 

**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉树中。

一样的题目：[剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

### 思路

通过递归的方式在左右两边去找对应的节点；

去以root为根节点的二叉树中查找p、q的最近公共祖先

- ① 如果p、q同时存在于这棵二叉树中，就能成功返回它们的最近公共祖先
- ② 如果p、q都不存在于这棵二叉树中，返回null
- ③ 如果只有p存在于这棵二叉树中，返回p
- ④ 如果只有q存在于这棵二叉树中，返回q

### 实现

```java
 /**
     * 去以root为根节点的二叉树中查找p、q的最近公共祖先
     * ① 如果p、q同时存在于这棵二叉树中，就能成功返回它们的最近公共祖先
     * ② 如果p、q都不存在于这棵二叉树中，返回null
     * ③ 如果只有p存在于这棵二叉树中，返回p
     * ④ 如果只有q存在于这棵二叉树中，返回q
     */
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        // 去以root.left为根节点的二叉树中查找p、q的最近公共祖先
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        // 去以root.right为根节点的二叉树中查找p、q的最近公共祖先
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return (left != null) ? left : right;
    }
```



## [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)

### 题目

给你二叉搜索树的根节点 `root` ，该树中的两个节点被错误地交换。请在不改变其结构的情况下，恢复这棵树。

**进阶：**使用 O(*n*) 空间复杂度的解法很容易实现。你能想出一个只使用常数空间的解决方案吗？

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/28/recover1.jpg)

```
输入：root = [1,3,null,null,2]
输出：[3,1,null,null,2]
解释：3 不能是 1 左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/10/28/recover2.jpg)

```
输入：root = [3,1,4,null,null,2]
输出：[2,1,4,null,null,3]
解释：2 不能在 3 的右子树中，因为 2 < 3 。交换 2 和 3 使二叉搜索树有效。
```

 

**提示：**

- 树上节点的数目在范围 `[2, 1000]` 内
- `-231 <= Node.val <= 231 - 1`



### 思路

#### 1.中序遍历

![image-20201113131516272](https://gitee.com/jarrysong/img/raw/master/img/image-20201113131516272.png)

 中序遍历的结果是升序的：11、17、18、22、28、37、42、44、62



![image-20201113131630550](https://gitee.com/jarrysong/img/raw/master/img/image-20201113131630550.png)

中序遍历的结果：11、17、18、28、22、37、42、44、62

![image-20201113131645562](https://gitee.com/jarrysong/img/raw/master/img/image-20201113131645562.png)

中序遍历的结果：11、17、44、22、28、37、42、18、62

**第 1 个错误节点：第 1 个逆序对中的较大节点**

**第 2个错误节点：最后 2 个逆序对中的较小节点**

#### 2.二叉树的 Morris 遍历

使用 Morris 方法遍历二叉树，可以实现时间复杂度 O(n)、空间复杂度 O(1)

这里只演示二叉树的 Morris 中序遍历。前序遍历、后序遍历在此基础上做一些调整即可

![image-20201113205110929](https://gitee.com/jarrysong/img/raw/master/img/image-20201113205110929.png)



执行步骤（假设遍历到当前节点是 N） 

① 如果 N.left != null，找到 N 的前驱节点 P

- 如果 P.right == null
> ✓P.right = N
>
> ✓ N = N.left
>
> ✓回到①

- 如果P.right == N
> ✓P.right = null
>
> ✓打印N
>
> ✓N = N.right
>
> ✓回到①

②如果N.left == null 
> 打印N
>
> N = N.right
>
> 回到①

③重复①、②直到Ｎ == null

### 实现

```java
public class _99_恢复二叉搜索树 {
    // 中序遍历：时间复杂度O(n)、空间复杂度O(1)
    /**
     * 上一次中序遍历过的节点
     */
    private TreeNode prev;
    /**
     * 第一个错误节点
     */
    private TreeNode first;
    /**
     * 第二个错误节点
     */
    private TreeNode second;

    private void find(TreeNode node) {
        // 出现了逆序对
        if (prev != null && prev.val > node.val) {
            // 第2个错误节点：最后一个逆序对中较小的那个节点
            second = node;

            // 第1个错误节点：第一个逆序对中较大的那个节点
            if (first != null) return;
            first = prev;
        }
        prev = node;
    }
    
      /**
      * Morris遍历
      */
      public void recoverTree(TreeNode root) {
        TreeNode node = root;
        while (node != null) {
            if (node.left != null) {
                // 找到前驱节点(predecessor)、后继节点(successor)
                TreeNode pred = node.left;
                while (pred.right != null && pred.right != node) {
                    pred = pred.right;
                }

                if (pred.right == null) {
                    pred.right = node;
                    node = node.left;
                } else { // pred.right == node
                    find(node);
                    pred.right = null;
                    node = node.right;
                }
            } else {
                find(node);
                node = node.right;
            }
        }

        // 交换2个错误节点的值
        int tmp = first.val;
        first.val = second.val;
        second.val = tmp;
    }
    


    /**
     * @param root 是一棵错误的二叉搜索树（有2个节点被错误交换）
     * 递归的方式中序遍历
     */
    public void recoverTree1(TreeNode root) {
        findWrongNodes(root);
        // 交换2个错误节点的值
        int tmp = first.val;
        first.val = second.val;
        second.val = tmp;
    }

    private void findWrongNodes(TreeNode root) {
        if (root == null) return;
        findWrongNodes(root.left);
        find(root);
        findWrongNodes(root.right);
    }
}
```

```java
public class TestMorris {
    private static class MorrisTree extends BinarySearchTree<Integer> {
        /**
         * 利用Morris进行中序遍历
         */
        public void inorder() {
            Node<Integer> node = root;
            while (node != null) {
                if (node.left != null) {
                    // 找到前驱节点(predecessor)、后继节点(successor)
                    Node<Integer> pred = node.left;
                    while (pred.right != null && pred.right != node) {
                        pred = pred.right;
                    }

                    if (pred.right == null) {
                        pred.right = node;
                        node = node.left;
                    } else { // pred.right == node
                        System.out.print(node.element + " ");
                        pred.right = null;
                        node = node.right;
                    }
                } else {
                    System.out.print(node.element + " ");
                    node = node.right;
                }
            }
        }
    }

    public static void main(String[] args) {
        MorrisTree tree = new MorrisTree();
        for (int i = 0; i < 10; i++) {
            tree.add(new Random().nextInt(100));
        }
        BinaryTrees.println(tree);
        System.out.println("------------------");
        tree.inorder();
        System.out.println("------------------");
        BinaryTrees.println(tree);
    }
}

```



## [333.最大BST子树](https://leetcode-cn.com/problems/largest-bst-subtree/)

### 题目

给定一个二叉树，找出其中最大的二叉搜索树（BST）子树，其中最大指的子树节点最多的。

注意：子树必须包含所有后代。

```  
输入：[10,5,15,1,8,null,7]
     10
     /\
   5   15
  /\     \
 1  8     7   
输出：3
解释：高亮部分为最大的BST子树。返回值3在这个样例中为子树大小。
```

![image-20201116091625570](https://gitee.com/jarrysong/img/raw/master/img/image-20201116091625570.png)



输出：7（以16为根节点的子树）

你能想出用O(n)的时间浮躁度解决这个问题吗？

### 思路

#### 自顶向下

```java
public int func(TreeNode root);
```

func的作用：返回以 root 为根节点的二叉树的最大BST子树的节点数量

func的实现：

- 如果以 root 为根节点的二叉树 S 是 BST，就返回 S 的节点数量 

- 否则，就返回 func(root.left)、func(root.right) 中的最大值

时间复杂度分析：

- func使用了前序遍历，时间复杂度是 O(n)
- 判断一棵树是否为 ，时间复杂度是 O(n)
- 所以，总体时间复杂度是O(n^2)

如何优化？

- 由于是自顶向下的遍历方式，所以在判断一棵树是否为BST方便，存在重复的遍历判断
- 可以考虑改为自底向上的遍历方式：后续遍历

#### 自底向上

```java
private Info getInfo(TreeNMode tree);

private static class Info()｛
    /** 根节点*/
    public TreeNode root;
     /** 节点总数*/
    public int size = 1;
     /** 最大值*/
    public int max;
     /** 最小值*/
    public int min;
｝
```

getInfo 的作用：返回以root为根节点的二叉树的最大BST子树的信息

getInfo的实现

- 计算 li = getInfo(root.left),ri = getInfo(root.right)

- 如果下面的条件成立，说明以root为根节点的二叉树就是最大BST子树

  > li == null || (li.root == root.left && li.max < root.val)
  >
  > ri == null || (ri.root == root.right && ri.min > root.val)

- 如果li != null && ri !=null

  > 如果li.size > ri.size，返回 li；否则返回ri

- 如果li != null，返回li；否则返回ri

### 实现

```java
public class _333_最大BST子树 {

    public int largestBSTSubtree(TreeNode root) {
        return (root == null) ? 0 : getInfo(root).size;
    }

    /**
     * 返回以root为根节点的二叉树的最大BST子树信息
     * @param root
     * @return
     */
    private Info getInfo(TreeNode root) {
        if (root == null) return null;
        // li(left info)：左子树的最大BST子树信息
        Info li = getInfo(root.left);

        // ri(right info)：右子树的最大BST子树信息
        Info ri = getInfo(root.right);

        /*
        有4种情况，以root为根节点的二叉树就是一棵BST，最大BST子树就是其本身
        ① li != null && ri != null
        && li.root == root.left && root.val > li.max
        && ri.root == root.right && root.val < ri.min

        ② li != null && ri == null
        && li.root == root.left && root.val > li.max

        ③ li == null && ri != null
        && ri.root == root.right && root.val < ri.min

        ④ li == null && ri == null
         */

        int leftBstSize = -1, rightBstSize = -1, max = root.val, min = root.val;
        if (li == null) {
            leftBstSize = 0;
        } else if (li.root == root.left && root.val > li.max) {
            leftBstSize = li.size;
            min = li.min;
        }

        if (ri == null) {
            rightBstSize = 0;
        } else if (ri.root == root.right && root.val < ri.min) {
            rightBstSize = ri.size;
            max = ri.max;
        }

        if (leftBstSize >= 0 && rightBstSize >= 0) {
            return new Info(root, 1 + leftBstSize + rightBstSize, max, min);
        }

        // 以root为根节点的二叉树并不是BST

        // 返回最大BST子树的节点数量较多的那个Info
        if (li != null && ri != null) return (li.size > ri.size) ? li : ri;

        // 返回li、ri中不为null的那个Info
        return (li != null) ? li : ri;
    }

    /**
     * 最大BST子树的信息
     */
    private static class Info {
        /** 根节点 */
        public TreeNode root;
        /** 节点总数 */
        public int size;
        /** 最大值 */
        public int max;
        /** 最小值 */
        public int min;

        public Info(TreeNode root, int size, int max, int min) {
            this.root = root;
            this.size = size;
            this.max = max;
            this.min = min;
        }
    }

//    private boolean isBST(TreeNode root) {
//        return false;
//    }
//
//    private int nodesCount(TreeNode root) {
//        return 0;
//    }
//
//    public int largestBSTSubtree(TreeNode root) {
//        if (root == null) return 0;
//        if (isBST(root)) return nodesCount(root);
//        return Math.max(largestBSTSubtree(root.left), largestBSTSubtree(root.right));
//    }

}
```



## 作业
- [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)（第一季中讲过）
-  [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)（第一季中讲过）
- [230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)
- [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)
- [108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)
- [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)（第一季中讲过）
- [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)（第一季中讲过） 

## 思考题
- [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
- [297. 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)
- [449. 序列化和反序列化二叉搜索树](https://leetcode-cn.com/problems/serialize-and-deserialize-bst/)

