# 贪心（Greedy）
贪心策略，也称为贪婪策略
- 每一步都采取当前状态下最优的选择（局部最优解），从而希望推导出全局最优解

贪心的应用 
- 哈夫曼树 
- 最小生成树算法：Prim、Kruskal 
- 最短路径算法：Dijkstra



## 练习1 – 最优装载问题（加勒比海盗）

在北美洲东南部，有一片神秘的海域，是海盗最活跃的加勒比海 

- 有一天，海盗们截获了一艘装满各种各样古董的货船，每一件古董都价值连城，一旦打碎就失去了它的价值 
- 海盗船的载重量为 W，每件古董的重量为 𝑤i，海盗们该如何把尽可能多数量的古董装上海盗船？ 
- 比如 W 为 30，𝑤i 分别为 3、5、4、10、7、14、2、11

**贪心策略：每一次都优先选择重量最小的古董**

> ① 选择重量为 2 的古董，剩重量 28 
>
> ② 选择重量为 3 的古董，剩重量 25 
>
> ③ 选择重量为 4 的古董，剩重量 21 
>
> ④ 选择重量为 5 的古董，剩重量 16
>
> ⑤ 选择重量为 7 的古董，剩重量 9 

最多能装载 5 个古董

```java
public class Pirate {
	public static void main(String[] args) {
		int[] weights = {3, 5, 4, 10, 7, 14, 2, 11};
		Arrays.sort(weights);
		int capacity = 30, weight = 0, count = 0;
		for (int i = 0; i < weights.length && weight < capacity; i++) {
			int newWeight = weight + weights[i];
			if (newWeight <= capacity) {
				weight = newWeight;
				count++;
				System.out.println(weights[i]);
			}
		}
		System.out.println("一共选了" + count + "件古董");
	}
}
```



## 练习2 – 零钱兑换

### 零件兑换-例子1

假设有 25 分、10 分、5 分、1 分的硬币，现要找给客户 41 分的零钱，如何办到硬币个数最少？

**贪心策略：每一次都优先选择面值最大的硬币**

> ① 选择 25 分的硬币，剩 16 分 
>
> ② 选择 10 分的硬币，剩 6 分 
>
> ③ 选择 5 分的硬币，剩 1 分 
>
> ④ 选择 1 分的硬币 

最终的解是共 4 枚硬币

> 25 分、10 分、5 分、1 分硬币各一枚

```java
static void coinChange() {
	int[] faces = {25, 5, 10, 1};
	Arrays.sort(faces); // 1, 5, 10, 25
	int money = 41, coins = 0;
	for (int i = faces.length - 1; i >= 0; i--) {
		if (money < faces[i]) {
			continue;
		}
	    System.out.println(faces[i]);
	    money -= faces[i];
			coins++;
			i = faces.length;
	}
	System.out.println(coins);
}
```

优化为while

```java
public static void main(String[] args) {
	coinChange(new Integer[] {25, 10, 5, 1}, 41);
}

//从大到小：25 10 5 1
static void coinChange(Integer[] faces, int money) {
	Arrays.sort(faces, (Integer f1, Integer f2) -> f2 - f1); 
	int coins = 0, i = 0;
	while (i < faces.length) {
		if (money < faces[i]) {
			i++;
			continue;
	}
	System.out.println(faces[i]);
	money -= faces[i];
	coins++;
	}
	System.out.println(coins);
}

//从小到大：1 5 10 25
static void coinChange(Integer[] faces, int money) { 
	Arrays.sort(faces);
	int coins = 0, idx = faces.length - 1;
	while (idx >= 0) {
		while (money >= faces[idx]) {
			System.out.println(faces[idx]);
			money -= faces[idx];
			coins++;
		}
		idx--;
	}
	System.out.println(coins);
}
```

### 零件兑换-例子2

假设有 25 分、20 分、5 分、1 分的硬币，现要找给客户 41 分的零钱，如何办到硬币个数最少？

**贪心策略：每一步都优先选择面值最大的硬币**

> ① 选择 25 分的硬币，剩 16 分
>
> ② 选择 5 分的硬币，剩 11 分
>
> ③ 选择 5 分的硬币，剩 6 分 
>
> ④ 选择 5 分的硬币，剩 1 分
>
> ⑤ 选择 1 分的硬币

最终的解是 1 枚 25 分、3 枚 5 分、1 枚 1 分的硬币，共 5 枚硬币

实际上本题的最优解是：2 枚 20 分、1 枚 1 分的硬币，共 3 枚硬币

## 优缺点

贪心策略并不一定能得到全局最优解 

- 因为一般没有测试所有可能的解，容易过早做决定，所以没法达到最佳解 
- 贪图眼前局部的利益最大化，看不到长远未来，走一步看一步

**优点：** 简单、高效、不需要穷举所有可能，通常作为其他算法的辅助算法来使用

**缺点：** 鼠目寸光，不从整体上考虑其他可能，每次采取局部最优解，不会再回溯，因此很少情况会得到最优

## 练习3 – 0-1背包
有 n 件物品和一个最大承重为 W 的背包，每件物品的重量是 𝑤i、价值是 𝑣i 

- 在保证总重量不超过 W 的前提下，将哪几件物品装入背包，可以使得背包的总价值最大？ 
- 注意：每个物品只有 1 件，也就是每个物品只能选择 0 件或者 1 件，因此称为 0-1背包问题

如果采取贪心策略，有3个方案 

- ① 价值主导：优先选择价值最高的物品放进背包 
- ② 重量主导：优先选择重量最轻的物品放进背包
- ③ 价值密度主导：优先选择价值密度最高的物品放进背包（价值密度 = 价值 ÷ 重量

### 0-1背包 – 实例
 假设背包最大承重150，7个物品如表格所示

![image-20200925083449044](https://gitee.com/jarrysong/img/raw/master/img/image-20200925083449044.png)

> ① 价值主导：放入背包的物品编号是 4、2、6、5，总重量 130，总价值 165
>
> ② 重量主导：放入背包的物品编号是 6、7、2、1、5，总重量 140，总价值 155
>
> ③ 价值密度主导：放入背包的物品编号是 6、2、7、4、1，总重量 150，总价值 170 

### 0-1背包 – 实现

```java
public class Article {
	public int weight;
	public int value;
	public double valueDensity;
	public Article(int weight, int value) {
		this.weight = weight;
		this.value = value;
		valueDensity = value * 1.0 / weight;
	}
	@Override
	public String toString() {
		return "Article [weight=" + weight + ", value=" + value + ", valueDensity=" + valueDensity + "]";
	}
}

public class Knapsack {
	public static void main(String[] args) {
		select("价值主导", (Article a1, Article a2) -> {
			return a2.value - a1.value;
		});
		select("重量主导", (Article a1, Article a2) -> {
			return a1.weight - a2.weight;
		});
		select("价值密度主导", (Article a1, Article a2) -> {
			return Double.compare(a2.valueDensity, a1.valueDensity);
		});
	}
	
	static void select(String title, Comparator<Article> cmp) {
		Article[] articles = new Article[] {
			new Article(35, 10), new Article(30, 40),
			new Article(60, 30), new Article(50, 50),
			new Article(40, 35), new Article(10, 40),
			new Article(25, 30)
		};
		Arrays.sort(articles, cmp);
		
		int capacity = 150, weight = 0, value = 0;
		List<Article> selectedArticles = new LinkedList<>();
		for (int i = 0; i < articles.length && weight < capacity; i++) {
			int newWeight = weight + articles[i].weight;
			if (newWeight <= capacity) {
				weight = newWeight;
				value += articles[i].value;
				selectedArticles.add(articles[i]);
			}
		}
		
		System.out.println("【" + title + "】");
		System.out.println("总价值：" + value);
		for (int i = 0; i < selectedArticles.size(); i++) {
			System.out.println(selectedArticles.get(i));
		}
		System.out.println("-----------------------------");
	}
}
```

## 作业

分发饼干 

- https://leetcode-cn.com/problems/assign-cookies/

用最少数量的箭引爆气球 

- https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/

买卖股票的最佳时机 II 

- https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/

种花问题 

- https://leetcode-cn.com/problems/can-place-flowers/

分发糖果

- https://leetcode-cn.com/problems/candy/