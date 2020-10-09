# 回溯

## 回溯（Back Tracking） 

回溯可以理解为：通过选择不同的岔路口来通往目的地（找到想要的结果） 
- 每一步都选择一条路出发，能进则进，不能进则退回上一步（回溯），换一条路再试 
树、图的深度优先搜索（DFS）、八皇后、走迷宫都是典型的回溯应用

![image-20200923075953654](https://gitee.com/jarrysong/img/raw/master/img/image-20200923075953654.png)

不难看出来，回溯很适合使用递归


## 练习 – 八皇后问题（Eight Queens） 
八皇后问题是一个古老而著名的问题 
- 在8x8格的国际象棋上摆放八个皇后，使其不能互相攻击：任意两个皇后都不能处于同一行、同一列、同一斜线上 
- 请问有多少种摆法？

![image-20200923080556400](https://gitee.com/jarrysong/img/raw/master/img/image-20200923080556400.png)

 leetcode_51_N皇后：https://leetcode-cn.com/problems/n-queens/ 
 leetcode_52_N皇后 II： https://leetcode-cn.com/problems/n-queens-ii/


### 八皇后问题的解决思路
思路一：暴力出奇迹 
- 从 64 个格子中选出任意 8 个格子摆放皇后，检查每一种摆法的可行性 
- 一共 C64 8 种摆法（大概是 4.4 ∗ 10^9 种摆法）

![image-20200923080804903](https://gitee.com/jarrysong/img/raw/master/img/image-20200923080804903.png)

思路二：根据题意减小暴力程度 

- 很显然，每一行只能放一个皇后，所以共有 8^8 种摆法（16777216 种），检查每一种摆法的可行性

思路三：回溯法 

- 回溯 + 剪枝

### 四皇后 – 回溯法
在解决八皇后问题之前，可以先缩小数据规模，看看如何解决四皇后问题

![image-20200923081403425](https://gitee.com/jarrysong/img/raw/master/img/image-20200923081403425.png)

四皇后 – 剪枝（Pruning)

![image-20200923082303229](https://gitee.com/jarrysong/img/raw/master/img/image-20200923082303229.png)

八皇后 – 回溯法1

![image-20200923081525420](https://gitee.com/jarrysong/img/raw/master/img/image-20200923081525420.png)

八皇后 – 回溯法2

![image-20200923081623320](https://gitee.com/jarrysong/img/raw/master/img/image-20200923081623320.png)

八皇后 – 回溯法3

![image-20200923081719467](https://gitee.com/jarrysong/img/raw/master/img/image-20200923081719467.png)

### 实现一

#### 1.合法性检查

```java

	/**
	 * 数组索引是行号，数组元素是列号
	 */
	int[] cols;
	/**
	 * 一共有多少种摆法
	 */
	int ways;
	
	/**
	 * 判断第row行第col列是否可以摆放皇后
	 */
	boolean isValid(int row, int col) {
		for (int i = 0; i < row; i++) {
			// 第col列已经有皇后
			if (cols[i] == col) {
				System.out.println("[" + row + "][" + col + "]=false");
				return false;
			}
			// 第i行的皇后跟第row行第col列格子处在同一斜线上
			if (row - i == Math.abs(col - cols[i])) {
				System.out.println("[" + row + "][" + col + "]=false");
				return false;
			}
		}
		System.out.println("[" + row + "][" + col + "]=true");
		return true;
	}
```



#### 2.打印

```java
void show() {
		for (int row = 0; row < cols.length; row++) {
			for (int col = 0; col < cols.length; col++) {
				if (cols[row] == col) {
					System.out.print("1 ");
				} else {
					System.out.print("0 ");
				}
			}
			System.out.println();
		}
		System.out.println("------------------------------");
	}
```



#### 3.从某一行开始摆放皇后

```java
/**
 * 从第row行开始摆放皇后
 * @param row
 */     
void place(int row) {
	if (row == cols.length) {
		ways++;
		show();
		return;
	}
		
	for (int col = 0; col < cols.length; col++) {
		if (isValid(row, col)) {
			// 在第row行第col列摆放皇后
			cols[row] = col;
			place(row + 1);
		}
	}
}
```

#### 4.摆放所有皇后 

```java
void placeQueens(int n) {
	if (n < 1) return;
	cols = new int[n];
	place(0);
	System.out.println(n + "皇后一共有" + ways + "种摆法");
}
```

#### 5.完整代码

```java
public class Queens {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new Queens().placeQueens(4);
	}
	
	/**
	 * 数组索引是行号，数组元素是列号
	 */
	int[] cols;
	/**
	 * 一共有多少种摆法
	 */
	int ways;
	  
	void placeQueens(int n) {
		if (n < 1) return;
		cols = new int[n];
		place(0);
		System.out.println(n + "皇后一共有" + ways + "种摆法");
	}
	
	/**
	 * 从第row行开始摆放皇后
	 * @param row
	 */    
	void place(int row) {
		if (row == cols.length) {
			ways++;
			show();
			return;
		}
		
		for (int col = 0; col < cols.length; col++) {
			if (isValid(row, col)) {
				// 在第row行第col列摆放皇后
				cols[row] = col;
				place(row + 1);
			}
		}
	}
	
	/**
	 * 判断第row行第col列是否可以摆放皇后
	 */
	boolean isValid(int row, int col) {
		for (int i = 0; i < row; i++) {
			// 第col列已经有皇后
			if (cols[i] == col) {
				System.out.println("[" + row + "][" + col + "]=false");
				return false;
			}
			// 第i行的皇后跟第row行第col列格子处在同一斜线上
			if (row - i == Math.abs(col - cols[i])) {
				System.out.println("[" + row + "][" + col + "]=false");
				return false;
			}
		}
		System.out.println("[" + row + "][" + col + "]=true");
		return true;
	}
	
	void show() {
		for (int row = 0; row < cols.length; row++) {
			for (int col = 0; col < cols.length; col++) {
				if (cols[row] == col) {
					System.out.print("1 ");
				} else {
					System.out.print("0 ");
				}
			}
			System.out.println();
		}
		System.out.println("------------------------------");
	}
}
```

### 实现二

#### 1.成员变量

```java
/**
	 * 数组索引是行号，数组元素是列号
	 */
	int[] queens;
	/**
	 * 标记着某一列是否有皇后
	 */
	boolean[] cols;
	/**
	 * 标记着某一斜线上是否有皇后（左上角 -> 右下角）
	 */
	boolean[] leftTop;
	/**
	 * 标记着某一斜线上是否有皇后（右上角 -> 左下角）
	 */
	boolean[] rightTop;
	/**
	 * 一共有多少种摆法
	 */
	int ways;
```

#### 2.从某一行开始摆放皇后

```java
/**
	 * 从第row行开始摆放皇后
	 * @param row
	 */
	void place(int row) {
		if (row == cols.length) {
			ways++;
			show();
			return;
		}
		
		for (int col = 0; col < cols.length; col++) {
			if (cols[col]) continue;
			int ltIndex = row - col + cols.length - 1;
			if (leftTop[ltIndex]) continue;
			int rtIndex = row +col;
			if (rightTop[rtIndex]) continue;
			
			queens[row] = col;
             //清空
			cols[col] = true;
			leftTop[ltIndex] = true;
			rightTop[rtIndex] = true;
			place(row + 1);
             //清空
			cols[col] = false;
			leftTop[ltIndex] = false;
			rightTop[rtIndex] = false;
		}
	}
```

#### 3. 摆放所有皇后

```java
void placeQueens(int n) {
		if (n < 1) return;
		queens = new int[n];
		cols = new boolean[n];
		leftTop = new boolean[(n << 1) - 1];
		rightTop = new boolean[leftTop.length];
		place(0);
		System.out.println(n + "皇后一共有" + ways + "种摆法");
	}
```

#### 4. 对角线

左上角 -> 右下角的对角线索引：row – col + 7 

右上角 -> 左下角的对角线索引：row + col 

![image-20200923221306372](https://gitee.com/jarrysong/img/raw/master/img/image-20200923221306372.png)

#### 5.完整代码

```java
public class Queens {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new Queens().placeQueens(4);
	}
	
	/**
	 * 数组索引是行号，数组元素是列号
	 */
	int[] queens;
	/**
	 * 标记着某一列是否有皇后
	 */
	boolean[] cols;
	/**
	 * 标记着某一斜线上是否有皇后（左上角 -> 右下角）
	 */
	boolean[] leftTop;
	/**
	 * 标记着某一斜线上是否有皇后（右上角 -> 左下角）
	 */
	boolean[] rightTop;
	/**
	 * 一共有多少种摆法
	 */
	int ways;
	
	void placeQueens(int n) {
		if (n < 1) return;
		queens = new int[n];
		cols = new boolean[n];
		leftTop = new boolean[(n << 1) - 1];
		rightTop = new boolean[leftTop.length];
		place(0);
		System.out.println(n + "皇后一共有" + ways + "种摆法");
	}
	
	/**
	 * 从第row行开始摆放皇后
	 * @param row
	 */
	void place(int row) {
		if (row == cols.length) {
			ways++;
			show();
			return;
		}
		
		for (int col = 0; col < cols.length; col++) {
			if (cols[col]) continue;
			int ltIndex = row - col + cols.length - 1;
			if (leftTop[ltIndex]) continue;
			int rtIndex = row +col;
			if (rightTop[rtIndex]) continue;
			
			queens[row] = col;
			cols[col] = true;
			leftTop[ltIndex] = true;
			rightTop[rtIndex] = true;
			place(row + 1);
			cols[col] = false;
			leftTop[ltIndex] = false;
			rightTop[rtIndex] = false;
		}
	}
	
	void show() {
		for (int row = 0; row < cols.length; row++) {
			for (int col = 0; col < cols.length; col++) {
				if (queens[row] == col) {
					System.out.print("1 ");
				} else {
					System.out.print("0 ");
				}
			}
			System.out.println();
		}
		System.out.println("------------------------------");
	}
}
```



### 实现三:位运算

可以利用位运算进一步压缩八皇后的空间复杂度
```java
public class Queens3 {

	public static void main(String[] args) {
         //判断某个位置是否已经有摆放
		//01111101 n
		//00000100 
		//01111001
        //int result = n & (1 << col);

		//设置某个位置被摆放，或运算
		// 01111101 n
		//&11111011  ~00000100
		// 01111001
		//cols |= 1 << col

		
		//&00100000 v
//		int n = 125;
//		for (int i = 0; i < 8; i++) {
//			int result = n & (1 << i);
//			System.out.println(i + "_" + (result != 0));
//		}
//		int col = 7;
//		int result = n & (1 << col);
//		System.out.println(result != 0);
		
//		System.out.println(Integer.toBinaryString(n));
		
		// TODO Auto-generated method stub
		new Queens3().place8Queens();
	}
	
	/**
	 * 数组索引是行号，数组元素是列号
	 */
	int[] queens;
	/**
	 * 标记着某一列是否有皇后
	 */
	byte cols;
	/**
	 * 标记着某一斜线上是否有皇后（左上角 -> 右下角）
	 */
	short leftTop;
	/**
	 * 标记着某一斜线上是否有皇后（右上角 -> 左下角）
	 */
	short rightTop;
	/**
	 * 一共有多少种摆法
	 */
	int ways;
	
	void place8Queens() {
		queens = new int[8];
		place(0);
		System.out.println("8皇后一共有" + ways + "种摆法");
	}
	
	/**
	 * 从第row行开始摆放皇后
	 * @param row
	 */
	void place(int row) {
		if (row == 8) {
			ways++;
			show();
			return;
		}
		
		for (int col = 0; col < 8; col++) {
			int cv = 1 << col;
			if ((cols & cv) != 0) continue;
			
			int lv = 1 << (row - col + 7);
			if ((leftTop & lv) != 0) continue;
			
			int rv = 1 << (row + col);
			if ((rightTop & rv) != 0) continue;
			
			queens[row] = col;
			cols |= cv;
			leftTop |= lv;
			rightTop |= rv;
			place(row + 1);
			cols &= ~cv;
			leftTop &= ~lv;
			rightTop &= ~rv;
		}
	}
	
	void show() {
		for (int row = 0; row < 8; row++) {
			for (int col = 0; col < 8; col++) {
				if (queens[row] == col) {
					System.out.print("1 ");
				} else {
					System.out.print("0 ");
				}
			}
			System.out.println();
		}
		System.out.println("------------------------------");
	}
}

```

## 练习
全排列：https://leetcode-cn.com/problems/permutations

全排列 II：https://leetcode-cn.com/problems/permutations-ii/

组合总和：https://leetcode-cn.com/problems/combination-sum/

组合总和 II：https://leetcode-cn.com/problems/combination-sum-ii/

子集：https://leetcode-cn.com/problems/subsets/

子集 II：https://leetcode-cn.com/problems/subsets-ii/