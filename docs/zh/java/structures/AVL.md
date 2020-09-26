# 平衡搜索树_AVL树

## 平衡二叉树

#### 二叉搜索树的复杂度分析

如果是按照 7、4、9、2、5、8、11 的顺序添加节点：
![image.png](https://upload-images.jianshu.io/upload_images/1128757-a3b9c276aa2d6726.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果是从小到大添加节点：
![image.png](https://upload-images.jianshu.io/upload_images/1128757-e401d1c11f6e853c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

◼ 当 n 比较大时，两者的性能差异比较大

◼ 比如 n = 1000000 时，二叉搜索树的最低高度是 20 

#### 退化成链表的另一种情况

删除节点时也可能会导致二叉搜索树退化成链表

添加、删除节点时，都可能会导致二叉搜索树退化成链表

有没有办法防止二叉搜索树退化成链表？ 让添加、删除、搜索的复杂度维持在 O(logn)

#### 平衡（Balance）

- 平衡：当节点数量固定时，左右子树的高度越接近，这棵二叉树就越平衡（高度越低)
  ![image.png](https://upload-images.jianshu.io/upload_images/1128757-5416fc74613ae987.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**理想平衡**

- 最理想的平衡，就是像完全二叉树、满二叉树那样，高度是最小的

![image.png](https://upload-images.jianshu.io/upload_images/1128757-b32ec3e4d661c60a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 如何改进二叉搜索树？ 

- 首先，节点的添加、删除顺序是无法限制的，可以认为是随机的
- 所以，改进方案是：在节点的添加、删除操作之后，想办法让二叉搜索树恢复平衡（减小树的高度）
![image.png](https://upload-images.jianshu.io/upload_images/1128757-3658357d27bb5580.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 如果接着继续调整节点的位置，完全可以达到理想平衡，但是付出的代价可能会比较大 
   - 比如调整的次数会比较多，反而增加了时间复杂度
- 总结来说，比较合理的改进方案是：用尽量少的调整次数达到适度平衡即可 
- 一棵达到适度平衡的二叉搜索树，可以称之为：平衡二叉搜索树

#### 平衡二叉搜索树（Balanced Binary Search Tree）

英文简称为：BBST
经典常见的平衡二叉搜索树有 

- AVL树 
  - ✓Windows NT 内核中广泛使用
- 红黑树 ✓C++ STL（比如 map、set ） 
  - ✓Java 的 TreeMap、TreeSet、HashMap、HashSet
  - ✓Linux 的进程调度
  - ✓Ngix 的 timer 管理
- 一般也称它们为：自平衡的二叉搜索树（Self-balancing Binary Search Tree）

## AVL树 

#### AVL简介

1.AVL树是最早发明的自平衡二叉搜索树之一

2.AVL 取名于两位发明者的名字

 - G. M. Adelson-Velsky 和 E. M. Landis（来自苏联的科学家）

3.Something interesting 

- 有人把AVL树念做“艾薇儿树” 
- 加拿大女歌手，几首不错的歌：《Complicated》、《When You're Gone》、《Innocence》

#### 平衡因子（Balance Factor）

某结点的左右子树的高度差

#### AVL树的特点 

- 每个节点的平衡因子只可能是 1、0、-1（绝对值 ≤ 1，如果超过 1，称之为“失衡”） 
- 每个节点的左右子树高度差不超过 1 
- 搜索、添加、删除的时间复杂度是 O(logn）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-58e8f5e93d63430c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 平衡对比

输入数据：35, 37, 34, 56, 25, 62, 57, 9, 74, 32, 94, 80, 75, 100, 16, 82

![image.png](https://upload-images.jianshu.io/upload_images/1128757-aad95c51a97896b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 简单的继承结构

![image.png](https://upload-images.jianshu.io/upload_images/1128757-5bed0d4ec65bbad6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 添加导致的失衡

示例：往下面这棵子树中添加 13

![image.png](https://upload-images.jianshu.io/upload_images/1128757-53986635e6bb40e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 最坏情况：可能会导致所有祖先节点都失衡
- 父节点、非祖先节点，都不可能失衡

#### LL – 右旋转（单旋）

- g.left = p.right
- p.right = g 
- 让p成为这棵子树的根节点
- 仍然是一棵二叉搜索树：T0 < n < T1 < p < T2 < g < T3
- 整棵树都达到平衡

![image.png](https://upload-images.jianshu.io/upload_images/1128757-65ed3b329c258c49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

还需要注意维护的内容

- T2、p、g 的 parent 属性 
- 先后更新 g、p 的高度

#### RR – 左旋转（单旋）

- g.right = p.left
- p.left = g 
- 让p成为这棵子树的根节点 
- 仍然是一棵二叉搜索树：T0 < g < T1 < p < T2 < n < T3
- 整棵树都达到平衡

![image.png](https://upload-images.jianshu.io/upload_images/1128757-f90bd9959ccd4280.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

还需要注意维护的内容

- T1、p、g 的 parent 属性 
- 先后更新 g、p 的高度

#### LR – RR左旋转，LL右旋转（双旋）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-8792ee23d878f9d2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### RL – LL右旋转，RR左旋转（双旋）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-3c71543aa6b76b58.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### zig、zag

有些教程里面 
- 把右旋转叫做zig，旋转之后的状态叫做zigged
- 把左旋转叫做zag，旋转之后的状态叫做zagged

#### 添加\删除之后的修复

```java
    @Override
    public void afterAdd(Node<E> node) {
        while ((node = node.parent) != null) {
            if (isBalanced(node)) {  //如果平衡没有被打破，更新高度，否则恢复平衡
                updateHeight(node);
            } else {
                rebalance(node);
            }
        }
    }
    
    @Override
    public void afterRemove(Node<E> node) {
        while ((node = node.parent) != null) {
            if (isBalanced(node)) {  //如果平衡没有被打破，更新高度，否则恢复平衡
                updateHeight(node);
            } else {
                rebalance(node);
            }
        }
    }

    /**
     * 是否平衡
     *
     * @param node
     * @return
     */
    private boolean isBalanced(Node<E> node) {
        return Math.abs(((AVLNode<E>) node).balanceFactor()) <= 1;
    }

    /**
     * 更新高度
     *
     * @param node
     */
    private void updateHeight(Node<E> node) {
        ((AVLNode<E>) node).updateHeight();
    }

```
AVLNode
```java
private static class AVLNode<E> extends Node<E> {
        //高度
        int height = 1;

        public AVLNode(E element, Node<E> parent) {
            super(element, parent);
        }


        /**
         * 平衡因子
         *
         * @return
         */
        public int balanceFactor() {
            int leftHeight = left == null ? 0 : ((AVLNode<E>) left).height;
            int rightHeight = right == null ? 0 : ((AVLNode<E>) right).height;
            return leftHeight - rightHeight;
        }

        /**
         * 更新node的高度
         */
        public void updateHeight() {
            int leftHeight = left == null ? 0 : ((AVLNode<E>) left).height;
            int rightHeight = right == null ? 0 : ((AVLNode<E>) right).height;
            height = 1 + Math.max(leftHeight, rightHeight);
        }

        /**
         * 高度更高的子节点
         *
         * @return
         */
        public Node<E> tallerChild() {
            int leftHeight = left == null ? 0 : ((AVLNode<E>) left).height;
            int rightHeight = right == null ? 0 : ((AVLNode<E>) right).height;
            if (leftHeight > rightHeight) return left;
            if (leftHeight < rightHeight) return right;
            return isLeftChild() ? left : right;
        }

        @Override
        public String toString() {
            String parentString = "null";
            if (parent != null) {
                parentString = parent.element.toString();
            }
            return element + "_p(" + parentString + ")_h(" + height + ")";
        }

    }
```
回复平衡方式一

```java
/**
     * 回复平衡
     *
     * @param grand
     */
    private void rebalance(Node<E> grand) {
        Node<E> parent = ((AVLNode<E>) grand).tallerChild();
        Node<E> node = ((AVLNode<E>) parent).tallerChild();
        if (parent.isLeftChild()) {  //L
            if (node.isLeftChild()) {//LL  ---G右旋转
                rotateRight(grand);
            } else {  //LR  --P左旋转，然后G右旋转
                rotateLeft(parent);
                rotateRight(grand);
            }
        } else {//R
            if (node.isLeftChild()) { //RL  ---P右旋转，然后G左旋转
                rotateRight(parent);
                rotateLeft(grand);
            } else {  //RR  ----G左旋转
                rotateLeft(grand);
            }
        }
    }

    /**
     * 左旋转
     * @param grand
     */
    private void rotateLeft(Node<E> grand) {
        Node<E> parent = grand.right;
        Node<E> child = parent.left;
        grand.right = child;
        parent.left = grand;
        afterRotate(grand, parent, child);
    }

    /**
     * 右旋转
     * @param grand
     */
    private void rotateRight(Node<E> grand) {
        Node<E> parent = grand.left;
        Node<E> child = parent.right;   //先把parent的right拿出来
        grand.left = child;  //
        parent.right = grand;
        afterRotate(grand, parent, child);
    }

    /**
     * 旋转后更新parent关系和高度
     *
     * @param grand
     * @param parent
     * @param child
     */
    private void afterRotate(Node<E> grand, Node<E> parent, Node<E> child) {
        // 1.让parent称为子树的根节点
        parent.parent = grand.parent;
        //2.更新grand的父节点
        if (grand.isLeftChild()) {
            grand.parent.left = parent;
        } else if (grand.isRightChild()) {
            grand.parent.left = parent;
        } else {
            root = parent;
        }
        //3.更新child
        if (child != null) child.parent = grand;
        //4.更新grand
        grand.parent = parent;
        //5.更新高度
        updateHeight(grand);
        updateHeight(parent);
    }
```

#### 示例

输入数据：13, 14, 15, 12, 11, 17, 16, 8, 9, 1

![image.png](https://upload-images.jianshu.io/upload_images/1128757-ec6a4f55da63c144.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1128757-7bec02ce730c9e3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 统一所有旋转操作（补充代码）
![image.png](https://upload-images.jianshu.io/upload_images/1128757-9e7651757bdf1c45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```java

```



#### 独立出AVLNode
![image.png](https://upload-images.jianshu.io/upload_images/1128757-c2e815c8d8aec27c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 删除导致的失衡

示例：删除子树中的 16 

可能会导致父节点或祖先节点失衡（只有1个节点会失衡），其他节点，都不可能失衡

![image.png](https://upload-images.jianshu.io/upload_images/1128757-b54c67182b9e4181.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




1.LL – 右旋转（单旋）

- 如果绿色节点不存在，更高层的祖先节点可能也会失衡，需要再次恢复平衡，然后又可能导致更高层的祖先节点失衡...
- 极端情况下，所有祖先节点都需要进行恢复平衡的操作，共 O(logn) 次调整 

![image.png](https://upload-images.jianshu.io/upload_images/1128757-1e5d86220052e689.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


2.RR – 左旋转（单旋

![image.png](https://upload-images.jianshu.io/upload_images/1128757-12b11581ff11f0bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3.LR – RR左旋转，LL右旋转（双旋）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-88f4e06308232389.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


4.RL – LL右旋转，RR左旋转（双旋
![image.png](https://upload-images.jianshu.io/upload_images/1128757-bd480e0d52eb84a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 删除之后的修复


#### 总结

1.添加 

- 可能会导致所有祖先节点都失衡
- 只要让高度最低的失衡节点恢复平衡，整棵树就恢复平衡【仅需 O(1) 次调整】

2.删除

- 可能会导致父节点或祖先节点失衡（只有1个节点会失衡）
- 恢复平衡后，可能会导致更高层的祖先节点失衡【最多需要 O(logn) 次调整】

3.平均时间复杂度

- 搜索：O(logn) 
- 添加：O(logn)，仅需 O(1) 次的旋转操作 
- 删除：O(logn)，最多需要 O(logn) 次的旋转操作

#### 作业

平衡二叉树：https://leetcode-cn.com/problems/balanced-binary-tree/