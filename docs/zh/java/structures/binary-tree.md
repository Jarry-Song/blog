# 二叉树

## 基本概念

### 树（Tree）的基本概念

- 节点、根节点、父节点、子节点、兄弟节点 
- 一棵树可以没有任何节点，称为空树 
- 一棵树可以只有 1 个节点，也就是只有根节点
- 子树、左子树、右子树
- 节点的度（degree）：子树的个数 
- 树的度：所有节点度中的最大值 
- 叶子节点（leaf）：度为 0 的节点 
- 非叶子节点：度不为 0 的节点

![image.png](https://upload-images.jianshu.io/upload_images/1128757-9109a4928d770341.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 层数（level）：根节点在第 1 层，根节点的子节点在第 2 层，以此类推（有些教程也从第 0 层开始计算）
- 节点的深度（depth）：从根节点到当前节点的唯一路径上的节点总数
- 节点的高度（height）：从当前节点到最远叶子节点的路径上的节点总数
- 树的深度：所有节点深度中的最大值
- 树的高度：所有节点高度中的最大值
- 树的深度 等于 树的高度

![image.png](https://upload-images.jianshu.io/upload_images/1128757-dac5f02f506caf3e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 有序树、无序树、森林

1.有序树

- 树中任意节点的子节点之间有顺序关系

2.无序树

- 树中任意节点的子节点之间没有顺序关系
- 也称为“自由树”

3.森林

- 由 m（m ≥ 0）棵互不相交的树组成的集合

## 二叉树（Binary Tree）

**二叉树的特点**

1. 每个节点的度最大为 2（最多拥有 2 棵子树）
2. 左子树和右子树是有顺序的
3. 即使某节点只有一棵子树，也要区分左右子树

![image.png](https://upload-images.jianshu.io/upload_images/1128757-b4c4d9776f37d13a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1128757-12a8e679eaab38a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

*二叉树是有序树 还是 无序树？有序树*

### 二叉树的性质

1.非空二叉树的第 i 层，最多有 2i − 1 个节点（ i ≥ 1 ）

2.在高度为 h 的二叉树上最多有 2h − 1 个结点（ h ≥ 1 ）

3.对于任何一棵非空二叉树，如果叶子节点个数为 n0，度为 2 的节点个数为 n2，则有: n0 = n2 + 1 

- 假设度为 1 的节点个数为 n1，那么二叉树的节点总数 n = n0 + n1 + n2 
- 二叉树的边数 T = n1 + 2 * n2 = n – 1 = n0 + n1 + n2 – 1
- 因此 n0 = n2 + 1 

![image.png](https://upload-images.jianshu.io/upload_images/1128757-f87afce60c4d8a4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 真二叉树（Proper Binary Tree）

真二叉树：所有节点的度都要么为 0，要么为 2

![image.png](https://upload-images.jianshu.io/upload_images/1128757-e2773ee3e0f2b208.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 满二叉树（Full Binary Tree）

1.满二叉树：最后一层节点的度都为 0，其他节点的度都为 2
![image.png](https://upload-images.jianshu.io/upload_images/1128757-6da60f15179fbf23.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2.假设满二叉树的高度为 h（ h ≥ 1 ），那么

  - 第 i 层的节点数量： 2i − 1
  - 叶子节点数量： 2h − 1
  - 总节点数量 n ✓n = 2h − 1 = 20 + 21 + 22 + ⋯+ 2h−1 ✓h = log2(n + 1)

3.在同样高度的二叉树中，满二叉树的叶子节点数量最多、总节点数量最多

4.满二叉树一定是真二叉树，真二叉树不一定是满二叉树

### 完全二叉树（Complete Binary Tree）

完全二叉树：对节点从上至下、左至右开始编号，其所有编号都能与相同高度的满二叉树中的编号对应
![image.png](https://upload-images.jianshu.io/upload_images/1128757-4c75fb2eb3074e16.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 叶子节点只会出现最后 2 层，最后 1 层的叶子结点都靠左对齐
2. 完全二叉树从根结点至倒数第 2 层是一棵满二叉树
3. 满二叉树一定是完全二叉树，完全二叉树不一定是满二叉树

#### 完全二叉树的性质

![image.png](https://upload-images.jianshu.io/upload_images/1128757-f6e12284ce33684c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.度为 1 的节点只有左子树

2.度为 1 的节点要么是 1 个，要么是 0 个

3.同样节点数量的二叉树，完全二叉树的高度最小

4.假设完全二叉树的高度为 h（ h ≥ 1 ），那么

- 至少有 2h − 1 个节点 （ 20 + 21 + 22 + ⋯+ 2h−2 + 1 ） 
- 最多有 2h − 1 个节点（ 20 + 21 + 22 + ⋯+ 2h−1，满二叉树 ） 
- 总节点数量为 n
  - ✓ 2h − 1 ≤ n < 2h 
  - ✓ h − 1 ≤ log2n < h 
  - ✓ h = floor( log2n ) + 1
  - ➢floor 是向下取整，另外，ceiling 是向上取整

5.一棵有 n 个节点的完全二叉树（n > 0），从上到下、从左到右对节点从 1 开始进行编号，对任意第 i 个节点 

- 如果 i = 1 ，它是根节点
- 如果 i > 1 ，它的父节点编号为 floor( i / 2 )
- 如果 2i ≤ n ，它的左子节点编号为 2i 
- 如果 2i > n ，它无左子节点
- 如果 2i + 1 ≤ n ，它的右子节点编号为 2i + 1 
- 如果 2i + 1 > n ，它无右子节点

6.一棵有 n 个节点的完全二叉树（n > 0），从上到下、从左到右对节点从 0 开始进行编号，对任意第 i 个节点 

- 如果 i = 0 ，它是根节点
- 如果 i > 0 ，它的父节点编号为 floor( (i – 1) / 2 )
- 如果 2i + 1 ≤ n – 1 ，它的左子节点编号为 2i + 1
- 如果 2i + 1 > n – 1 ，它无左子节点
- 如果 2i + 2 ≤ n – 1 ，它的右子节点编号为 2i + 2
- 如果 2i + 2 > n – 1 ，它无右子节点

下图不是完全二叉树
![image.png](https://upload-images.jianshu.io/upload_images/1128757-8cccba9ff63714f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 面试题

1.如果一棵完全二叉树有 768 个节点，求叶子节点的个数

- n0，度为 1 的节点个数为 n1，度为 2 的节点个数为 n2
- 总结点个数 n = n0 + n1 + n2，而且 n0 = n2 + 1
  - ✓n = 2n0 + n1 – 1
- 完全二叉树的 n1 要么为 0，要么为 1 
  - ✓n1为1时，n = 2n0，n 必然是偶数 
  - ➢叶子节点个数 n0 = n / 2，非叶子节点个数 n1 + n2 = n / 2 
  - ✓n1为0时，n = 2n0 – 1，n 必然是奇数 
  - ➢叶子节点个数 n0 = (n + 1) / 2，非叶子节点个数 n1 + n2 = (n – 1) / 2
- 叶子节点个数 n0 = floor( (n + 1) / 2 ) = ceiling( n / 2 ) 
- 非叶子节点个数 n1 + n2 = floor( n / 2 ) = ceiling( (n – 1) / 2 )
- 因此叶子节点个数为 384

## 国外教材的说法

1.Full Binary Tree：完满二叉树

- 所有非叶子节点的度都为 2 
- 就的国内说的“真二叉树”

2.Perfect Binary Tree：完美二叉树 

- 所有非叶子节点的度都为 2，且所有的叶子节点都在最后一层
- 就是国内说的“满二叉树”

3.Complete Binary Tree：完全二叉树 

- 跟国内的定义一样

![image.png](https://upload-images.jianshu.io/upload_images/1128757-8fd95f8b9d54b366.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 二叉树的遍历

1.遍历是数据结构中的常见操作

- 把所有元素都访问一遍

2.线性数据结构的遍历比较简单

- 正序遍历 
- 逆序遍历

3.根据节点访问顺序的不同，二叉树的常见遍历方式有4种

- 前序遍历（Preorder Traversal） 
- 中序遍历（Inorder Traversal） 
- 后序遍历（Postorder Traversal） 
- 层序遍历（Level Order Traversal）

### 前序遍历（Preorder Traversal）

**访问顺序：** 根节点——>前序遍历左子树——>前序遍历右子树

7、4、2、1、3、5、9、8、11、10、12

![image.png](https://upload-images.jianshu.io/upload_images/1128757-4d6b22bf77b3832d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 递归

```java
/**
 * 前序遍历
 */
public void preorder(Visitor<E> visitor) {
    preorder(root, visitor);
}

/**
 * 前序遍历递归
 *
 * @param node
 */
private void preorder(Node<E> node, Visitor<E> visitor) {
    if (node == null || visitor.stop) return;
    visitor.stop = visitor.visit(node.element);
    preorder(node.left, visitor);
    preorder(node.right, visitor);
}
```

#### 非递归

![image.png](https://upload-images.jianshu.io/upload_images/1128757-be0dbc53501671a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.利用栈实现（方式一）

1. 设置 node = root 
2. 循环执行以下操作

- 如果 node != null 
  - ✓对 node 进行访问 
  - ✓将 node.right 入栈 
  - ✓设置 node = node.left 
- 如果 node == null 
  - ✓如果栈为空，结束遍历 
  - ✓如果栈不为空，弹出栈顶元素并赋值给 node

````java
public void preorder2(Visitor<E> visitor) {
		if (visitor == null || root == null) return;
		Node<E> node = root;
		Stack<Node<E>> stack = new Stack<>();
		while (true) {
			if (node != null) {
				// 访问node节点
				if (visitor.visit(node.element)) return;
				// 将右子节点入栈
				if (node.right != null) {
					stack.push(node.right);
				}
				// 向左走
				node = node.left;
			} else if (stack.isEmpty()) {
				return;
			} else { 
				// 处理右边
				node = stack.pop();
			}
		}
	}
````

2.利用栈实现（方式二）

1. 将 node入栈 
2. 循环执行以下操作，直到栈为空

- 弹出栈顶节点 top，进行访问 
- 将 top.right 入栈
- 将 top.left 入栈

```java
private void preorder(Node<E> node, Visitor<E> visitor) {
        if (node == null) return;
        //将 node入栈 
        Stack<Node<E>> stack = new Stack<>();
        stack.push(node);
        //1.每次遍历节点的时候先从栈中取出node，这个就是需要当前节点；
        //2.先入右子节点，再入左子节点。为什么？因为后进先出
        //3.栈为空表示已经遍历完成
        while (!stack.isEmpty()) {
            Node<E> top = stack.pop();
            if (visitor.visit(node.element)) return;
            if (top.right != null) {
                stack.push(top.right);
            }
            if (top.left != null) {
                stack.push(top.left);
            }
        }
    }
```

### 中序遍历（Inorder Traversal）

**访问顺序：** 中序遍历左子树——>根节点——>中序遍历右子树

1、2、3、4、5、7、8、9、10、11、12

![image.png](https://upload-images.jianshu.io/upload_images/1128757-95ba8a66884045fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果访问顺序是下面这样呢？  

中序遍历右子树——>根节点——>中序遍历左子树

 12、11、10、9、8 、7、5、4、3、2、1

*二叉搜索树的中序遍历结果是升序或者降序的*

#### 1.递归

```java
/**
 * 中序遍历
 */
public void inorder(Visitor<E> visitor) {
    inorder(root, visitor);
}

/**
 * 中旬遍历递归
 *
 * @param node
 */
private void inorder(Node<E> node, Visitor<E> visitor) {
    if (node == null || visitor.stop) return;
    inorder(node.left, visitor);
    if (visitor.stop) return;
    visitor.stop = visitor.visit(node.element);
    inorder(node.right, visitor);
}
```



#### 2.非递归

![image.png](https://upload-images.jianshu.io/upload_images/1128757-b6f2ae43d9a6d731.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**利用栈实现** 

1. 设置 node = root 

2. 循环执行以下操作:

- 如果 node != null 
  ✓将 node 入栈 
  ✓设置 node = node.left 
- 如果 node == null
  - ✓如果栈为空，结束遍历 
  - ✓如果栈不为空，弹出栈顶元素并赋值给 node
  - ➢对 node 进行访问 
  - ➢设置 node = node.right

```java
public void inorder(Visitor<E> visitor) {
		if (visitor == null || root == null) return;
		Node<E> node = root;
		Stack<Node<E>> stack = new Stack<>();
		while (true) {
			if (node != null) {
				stack.push(node);
				// 向左走
				node = node.left;
			} else if (stack.isEmpty()) {
				return;
			} else {
				node = stack.pop();
				// 访问node节点
				if (visitor.visit(node.element)) return;
				// 让右节点进行中序遍历
				node = node.right;
			}
		}
	}
```



### 后序遍历（Postorder Traversal）

**访问顺序：** 后序遍历左子树——>后序遍历右子树——>根节点

1、3、2、5、4、8、10、12、11、9、7

![image.png](https://upload-images.jianshu.io/upload_images/1128757-eaa63a8a5770fdab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 1.递归

```java
/**
 * 后序遍历
 */
public void postorder(Visitor<E> visitor) {
       postorder(root, visitor);
}

/**
* 后旬遍历-递归
*
* @param node
*/
private void postorder(Node<E> node, Visitor<E> visitor) {
       if (node == null || visitor.stop) return;
       postorder(node.left, visitor);
       postorder(node.right, visitor);
       if (visitor.stop) return;
       visitor.stop = visitor.visit(node.element);
}
```



#### 2.非递归

![image.png](https://upload-images.jianshu.io/upload_images/1128757-0364d9431c882b64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**利用栈实现**

1. 将 root 入栈
2. 循环执行以下操作，直到栈为空

- 如果栈顶节点是叶子节点 或者 上一次访问的节点是栈顶节点的子节点
  - ✓弹出栈顶节点，进行访问 
- 否则 
  - ✓将栈顶节点的right、left按顺序入栈

https://www.cnblogs.com/bigsai/p/11393609.html

```java
public void postorder(Visitor<E> visitor) {
		if (visitor == null || root == null) return;
		// 记录上一次弹出访问的节点
		Node<E> prev = null;
		Stack<Node<E>> stack = new Stack<>();
		stack.push(root);
		while (!stack.isEmpty()) {
			Node<E> top = stack.peek();
			if (top.isLeaf() || (prev != null && prev.parent == top)) {
				prev = stack.pop();
				// 访问节点
				if (visitor.visit(prev.element)) return;
			} else {
				if (top.right != null) {
					stack.push(top.right);
				}
				if (top.left != null) {
					stack.push(top.left);
				}
			}
		}
	}
```



### 层序遍历（Level Order Traversal）

**访问顺序：** 从上到下、从左到右依次访问每一个节点

7、4、9、2、5、8、11、1、3、10、12

![image.png](https://upload-images.jianshu.io/upload_images/1128757-7729780806dd48d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**实现思路：使用队列**

1.将根节点入队
2.循环执行以下操作，直到队列为空

- 将队头节点 A 出队，进行访问
- 将 A 的左子节点入队
- 将 A 的右子节点入队

```java
/**
* 层序遍历-利用队列
*
* @param visitor
*/
public void levelOrderTraversal(Visitor<E> visitor) {
        if (root == null) return;
        Queue<Node<E>> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            Node<E> node = queue.poll();
            visitor.visit(node.element);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
    }
```



## 四则运算

**四则运算的表达式可以分为3种**

- 前缀表达式（prefix expression），又称为波兰表达式 
- 中缀表达式（infix expression）
- 后缀表达式（postfix expression），又称为逆波兰表达式

![image.png](https://upload-images.jianshu.io/upload_images/1128757-8b7c9345f1dec488.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 表达式树

1.如果将表达式的操作数作为叶子节点，运算符作为父节点（假设只是四则运算） 

- 这些节点刚好可以组成一棵二叉树

- 比如表达式：

  ![image.png](https://upload-images.jianshu.io/upload_images/1128757-49a7be1a4b3a65b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.如果对这棵二叉树进行遍历 

- 前序遍历 
  - ✓ – + / A B * C D E
  - ✓ 刚好就是前缀表达式（波兰表达式） 
- 中序遍历 
  - ✓ A / B + C * D – E 
  - ✓ 刚好就是中缀表达式（波兰表达式） 
- 后序遍历
  - ✓ A B / C D * + E – 
  - ✓ 刚好就是后缀表达式（逆波兰表达式）

**思考**
如果允许外界遍历二叉树的元素？你会如何设计接口

## 增强遍历接口

## 遍历的应用

1.前序遍历

- 树状结构展示（注意左右子树的顺序）

2.中序遍历

- 二叉搜索树的中序遍历按升序或者降序处理节点

3.后序遍历

- 适用于一些先子后父的操作

4.层序遍历

- 计算二叉树的高度 
- 判断一棵树是否为完全二叉树

## 根据遍历结果重构二叉树

1.以下结果可以保证重构出唯一的一棵二叉树 

- 前序遍历 + 中序遍历
- 后序遍历 + 中序遍历

2.前序遍历 + 后序遍历

  - ✓如果它是一棵真二叉树（Proper Binary Tree），结果是唯一的 
  - ✓不然结果不唯一

**前序遍历+中序遍历重构二叉树**

- 前序遍历：4 2 1 3 6 5 
- 中序遍历：1 2 3 4 5 6

## 练习 

1.利用前序遍历树状打印二叉树 
2.翻转二叉树

- https://leetcode-cn.com/problems/invert-binary-tree/

- 请分别用递归、迭代（非递归）方式实现

  ```
  实际是遍历，将遍历的节点左右交换
  ```

  

3.计算二叉树的高度

- 递归

  ```java
  思路：从root节点开始，root的高度就是左子节点和右子节点高度的最大值。所以是求每一个节点的高度。
      
  private int height(){
      height(root);
  }
      
  private int height(Node<E> node){
      if(node == null){
          return 0;
      }
      return 1 + Math.max(node.left,node.right);
  }
  ```

  

- 迭代

  ```java
  思路：利用队列进行层序遍历。
  1.遍历每一个节点时，先出队，再子节点入队，直到队列为空,表示已经遍历完成（一开始root先入队）。
  2.记录每一层级的大小levelSize，开始遍历下一个层级时，levelSize=队列的容量；
  3.记录每一层的遍历节点前后剩余的大小，即出队时levelSize--
  4.如果levelSize = 0 表示该层级已经遍历完成。
  5.每遍历一层后，高度++
  
  
  private int height() {
          if (root == null) return 0;
          int height = 0;
          int levelSize = 1;
          Queue<Node<E>> queue = new LinkedList<>();
          queue.offer(root);
          while (!queue.isEmpty()) {
              Node<E> node = queue.poll();
              levelSize--;
              if (node.left != null) {
                queue.offer(node.left);
              }
              if (node.right != null) {
                  queue.offer(node.right);
              }
              if (levelSize == 0) {// 意味着即将要访问下一层
                  levelSize = queue.size();
                  height++;
              }
          }
          return height;
      }
  ```
  
  

4.判断一棵树是否为完全二叉树

![image.png](https://upload-images.jianshu.io/upload_images/1128757-16204574b17f0db0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 如果树为空，返回 false
- 如果树不为空，开始层序遍历二叉树（用队列） 
  - 如果 node.left!=null，将 node.left 入队 
  - 如果 node.left==null && node.right!=null，返回 false 
  - 如果 node.right!=null，将 node.right 入队 
  - 如果 node.right==null 
    - ✓那么后面遍历的节点应该都为叶子节点，才是完全二叉树 
    - ✓否则返回 false 
    - 遍历结束，返回 true

```java
  /**
     * 是否是完全二叉树
     *
     * @return
     */
    public boolean isComplete() {
        if (root == null) return false;
        Queue<Node<E>> queue = new LinkedList<>();
        queue.offer(root);
        boolean idLeaf = false;   //发现有一个节点没有right，后面的节点必须是子节点
        while (!queue.isEmpty()) {
            Node<E> node = queue.poll();
            if (idLeaf && !node.hasNoChildren()) return false;
            if (node.left != null) {
                queue.offer(node.left);
            } else if (node.right != null) {  //node.left==null&&node.right!=null
                return false;
            }
            //left!=null&&left==null
            if (node.right != null) {
                queue.offer(node.right);
            } else {// node.right == null
                idLeaf = true;
            }
        }
        return true;
    }
```



## 前驱节点（predecessor） 

![image.png](https://upload-images.jianshu.io/upload_images/1128757-73a47cc88f81ddc6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.前驱节点：中序遍历时的前一个节点 

- 如果是二叉搜索树，前驱节点就是前一个比它小的节点

2.node.left != null 

- 举例：6、13、8 
- predecessor = node.left.right.right.right... 
  - ✓ 终止条件：right 为 null

3.node.left == null && node.parent != null 

- 举例：7、11、9、1
- predecessor = node.parent.parent.parent... 
  - ✓ 终止条件：node 在 parent 的右子树中

4.node.left == null && node.parent == null 

- 那就没有前驱节点
- 举例：没有左子树的根节点

```java
 /**
     * 前驱节点
     *
     * @param e
     * @return
     */
    public E precursorElement(E e) {
        Node<E> node = node(e);
        Node<E> precursorNode = precursor(node);
        return precursorNode == null ? null : precursorNode.element;
    }

    /**
     * 前驱节点
     *
     * @param node
     * @return
     */
    private Node<E> precursor(Node<E> node) {
        if (node == null) return null;
        // 前驱节点在左子树当中（left.right.right.right....）
        Node<E> p = node.left;
        if (p != null) {
            while (p.right != null) {
                p = p.right;
            }
            return p;
        }
        //  从父节点、祖父节点中寻找前驱节点,终止在父节点的右子节点
        while (node.parent != null && node == node.parent.left) {
            node = node.parent;
        }
        return node.parent;
    }
```





## 后继节点（successor） 

![image.png](https://upload-images.jianshu.io/upload_images/1128757-bda0301ecc57413b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.后继节点：中序遍历时的后一个节点 

- 如果是二叉搜索树，后继节点就是后一个比它大的节点

2.noe.right != null 

- 举例：1、8、4 
- successor = node.right.left.left.left... 
  - ✓ 终止条件：left 为 null

3.node.right == null && node.parent != null 

- 举例：7、6、3、11 
- successor = node.parent.parent.parent... 
  - ✓ 终止条件：node 在 parent 的左子树中

4.node.right == null && node.parent == null 

- 那就没有前驱节点 
- 举例：没有右子树的根节点

```java
/**
     * 后继节点
     *
     * @param e
     * @return
     */
    public E successorElement(E e) {
        Node<E> node = node(e);
        Node<E> precursorNode = successor(node);
        return precursorNode == null ? null : precursorNode.element;
    }


    /**
     * 后继节点
     *
     * @param node
     * @return
     */
    private Node<E> successor(Node<E> node) {
        if (node == null) return null;
        // 后驱节点在右子树当中（right.left.left.left....）
        Node<E> p = node.right;
        if (p != null) {
            while (p.left != null) {
                p = p.left;
            }
            return p;
        }
        //从父节点、祖父节点中找，终止于在父节点左子节点
        while (node.parent != null && node == node.parent.right) {
            node = node.parent;
        }
        return node.parent;
    }
```



## 作业

1.二叉树的前序遍历： https://leetcode-cn.com/problems/binary-tree-preorder-traversal/ （递归+迭代）

2.二叉树的中序遍历： https://leetcode-cn.com/problems/binary-tree-inorder-traversal/ （递归+迭代）

3.二叉树的后序遍历： https://leetcode-cn.com/problems/binary-tree-postorder-traversal/ （递归+迭代）

4.二叉树的层次遍历： https://leetcode-cn.com/problems/binary-tree-level-order-traversal/ （迭代）

5.二叉树的最大深度： https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/ （递归+迭代）

6.二叉树的层次遍历II： https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/

7.二叉树最大宽度：https://leetcode-cn.com/problems/maximum-width-of-binary-tree/

8.N叉树的前序遍历： https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/

9.N叉树的后序遍历： https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/

10.N叉树的最大深度： https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/

11.二叉树展开为链表:https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/

12.从中序与后序遍历序列构造二叉树:https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

13.从前序与中序遍历序列构造二叉树:https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

14.根据前序和后序遍历构造二叉树:https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/

15.对称二叉树:https://leetcode-cn.com/problems/symmetric-tree/

作业 
1.树状形式打印二叉树 

- 比如给定一个二叉搜索树：[7, 4, 9, 2, 5, 8, 11, 1, 3, 6, 10, 12] 
- 尝试输出以下格式

2.开源项目：https://github.com/CoderMJLee/BinaryTrees

3.已知前序、中序遍历结果，求出后序遍历结果

4.已经中序、后序遍历结果，求出前序遍历结果

