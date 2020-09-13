# 图

## 数据结构回顾
[toc]
![image.png](https://upload-images.jianshu.io/upload_images/1128757-081bc221ba48646b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 图（Graph）

图由顶点（vertex）和边（edge）组成，通常表示为 G = (V, E) 

- G表示一个图，V是顶点集，E是边集 
- 顶点集V有穷且非空 
- 任意两个顶点之间都可以用边来表示它们之间的关系，边集E可以空的

![image.png](https://upload-images.jianshu.io/upload_images/1128757-14b314568af26f31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 图的应用举例

图结构的应用极其广泛

 - 社交网络
 - 地图导航
 - 游戏开发 
 - .....

![image.png](https://upload-images.jianshu.io/upload_images/1128757-85edc940e7fc71be.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 有向图（Directed Graph）
有向图的边是有明确方向的

![image.png](https://upload-images.jianshu.io/upload_images/1128757-908dc3376d3285d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 有向无环图（Directed Acyclic Graph，简称 DAG） 

- 如果一个有向图，从任意顶点出发无法经过若干条边回到该顶点，那么它就是一个有向无环图



![image.png](https://upload-images.jianshu.io/upload_images/1128757-6edab11f957140bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 出度、入度
出度、入度适用于有向图

出度（Out-degree） 

- 一个顶点的出度为 x，是指有 x 条边以该顶点为起点 
- 顶点11的出度是3

入度（In-degree） 

- 一个顶点的入度为 x，是指有 x 条边以该顶点为终点
- 顶点11的入度是2

![image.png](https://upload-images.jianshu.io/upload_images/1128757-501566661c16c4b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 无向图（Undirected Graph）
无向图的边是无方向的

![image.png](https://upload-images.jianshu.io/upload_images/1128757-188d31f5edd3f627.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 效果类似于下面的有向图

![image.png](https://upload-images.jianshu.io/upload_images/1128757-db29dc7e3d55bc64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 混合图（Mixed Graph）
混合图的边可能是无向的，也可能是有向的

![image.png](https://upload-images.jianshu.io/upload_images/1128757-ba4be2d4fdf6ad97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 简单图、多重图

平行边 在无向图中，关联一对顶点的无向边如果多于1条，则称这些边为平行边

- 在有向图中，关联一对顶点的有向边如果多于1条，并且它们的的方向相同，则称这些边为平行边

多重图（Multigraph） 

- 有平行边或者有自环的图

简单图（Simple Graph） 

- 既没有平行边也不没有自环的图 
- 课程中讨论的基本都是简单图

![image.png](https://upload-images.jianshu.io/upload_images/1128757-29b060a6c95196dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 无向完全图（Undirected Complete Graph）

无向完全图的任意两个顶点之间都存在边

- n 个顶点的无向完全图有 n(n − 1)/2 条边 

- ✓ n − 1 + n − 2 + n − 3 + ⋯+ 3 + 2 + 1

![image.png](https://upload-images.jianshu.io/upload_images/1128757-3309a010ab4538cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 有向完全图（Directed Complete Graph）

有向完全图的任意两个顶点之间都存在方向相反的两条边

- n 个顶点的有向完全图有 n(n − 1) 条边

![image.png](https://upload-images.jianshu.io/upload_images/1128757-da44decaed5a8827.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

稠密图（Dense Graph）：边数接近于或等于完全图

稀疏图（Sparse Graph）：边数远远少于完全图



### 有权图（Weighted Graph）
有权图的边可以拥有权值（Weight)

![image.png](https://upload-images.jianshu.io/upload_images/1128757-6c619cb6e4a75d08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 连通图（Connected Graph）

如果顶点 x 和 y 之间存在可相互抵达的路径（直接或间接的路径），则称 x 和 y 是连通的

如果无向图 G 中任意2个顶点都是连通的，则称G为连通图

![image.png](https://upload-images.jianshu.io/upload_images/1128757-6597f6d0f4c94f0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 连通分量（Connected Component）

连通分量：无向图的极大连通子图 

- 连通图只有一个连通分量，即其自身；非连通的无向图有多个连通分量

下面的无向图有3个连通分量

![image.png](https://upload-images.jianshu.io/upload_images/1128757-8296818269b00cc5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 强连通图（Strongly Connected Graph）
如果有向图 G 中任意2个顶点都是连通的，则称G为强连通图

![image.png](https://upload-images.jianshu.io/upload_images/1128757-fe13421b10ed01c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 强连通分量（Strongly Connected Component）
强连通分量：有向图的极大强连通子图 

- 强连通图只有一个强连通分量，即其自身；非强连通的有向图有多个强连通分量

![image.png](https://upload-images.jianshu.io/upload_images/1128757-4bfc588395218731.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 图的实现方案
图有2种常见的实现方案
- 邻接矩阵（Adjacency Matrix）
- 邻接表（Adjacency List)

### 邻接矩阵（Adjacency Matrix）
邻接矩阵的存储方式 
- 一维数组存放顶点信息 
- 二维数组存放边信息

邻接矩阵比较适合稠密图 
- 不然会比较浪费n内存

![image-20200904081037310](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200904081037310.png)

  

##### 邻接矩阵 – 有权图

![image-20200904081203057](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200904081203057.png)

#### 邻接表（Adjacency List）

![image-20200904081412347](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200904081412347.png)

##### 邻接表-有权图

![image-20200904081506434](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200904081506434.png)

### 图的基础接口

```java
public abstract int edgesSize();   //边数量
public abstract int verticesSize();  //顶点的数量
	
public abstract void addVertex(V v);   //添加顶点
public abstract void addEdge(V from, V to);  //添加边
public abstract void addEdge(V from, V to, E weight);  //添加边
	
public abstract void removeVertex(V v);  //删除顶点
public abstract void removeEdge(V from, V to);  //删除边
```



### 顶点的定义

```java
private static class Vertex<V, E> {
		V value;
		Set<Edge<V, E>> inEdges = new HashSet<>();
		Set<Edge<V, E>> outEdges = new HashSet<>();
		Vertex(V value) {
			this.value = value;
		}
		@Override
		public boolean equals(Object obj) {
			return Objects.equals(value, ((Vertex<V, E>)obj).value);
		}
		@Override
		public int hashCode() {
			return value == null ? 0 : value.hashCode();
		}
		@Override
		public String toString() {
			return value == null ? "null" : value.toString();
		}
	}
```



### 边的定义

```java
private static class Edge<V, E> {
		Vertex<V, E> from;
		Vertex<V, E> to;
		E weight;
		
		Edge(Vertex<V, E> from, Vertex<V, E> to) {
			this.from = from;
			this.to = to;
		}
		
		EdgeInfo<V, E> info() {
			return new EdgeInfo<>(from.value, to.value, weight);
		}
		
		@Override
		public boolean equals(Object obj) {
			Edge<V, E> edge = (Edge<V, E>) obj;
			return Objects.equals(from, edge.from) && Objects.equals(to, edge.to);
		}
		@Override
		public int hashCode() {
			return from.hashCode() * 31 + to.hashCode();
		}

		@Override
		public String toString() {
			return "Edge [from=" + from + ", to=" + to + ", weight=" + weight + "]";
		}
	}
```

### 简单实现

```java
public void print() {
		System.out.println("[顶点]-------------------");
		vertices.forEach((V v, Vertex<V, E> vertex) -> {
			System.out.println(v);
			System.out.println("out-----------");
			System.out.println(vertex.outEdges);
			System.out.println("in-----------");
			System.out.println(vertex.inEdges);
		});

		System.out.println("[边]-------------------");
		edges.forEach((Edge<V, E> edge) -> {
			System.out.println(edge);
		});
	}

	@Override
	public int edgesSize() {
		return edges.size();
	}

	@Override
	public int verticesSize() {
		return vertices.size();
	}
```



#### 添加顶点

```java
	@Override
	public void addVertex(V v) {
		if (vertices.containsKey(v)) return;
		vertices.put(v, new Vertex<>(v));
	}
```

#### 添加边

```java
    @Override
	public void addEdge(V from, V to) {
		addEdge(from, to, null);
	}

	@Override
	public void addEdge(V from, V to, E weight) {
		Vertex<V, E> fromVertex = vertices.get(from);
		if (fromVertex == null) {
			fromVertex = new Vertex<>(from);
			vertices.put(from, fromVertex);
		}
		
		Vertex<V, E> toVertex = vertices.get(to);
		if (toVertex == null) {
			toVertex = new Vertex<>(to);
			vertices.put(to, toVertex);
		}

		Edge<V, E> edge = new Edge<>(fromVertex, toVertex);
		edge.weight = weight;
		if (fromVertex.outEdges.remove(edge)) {
			toVertex.inEdges.remove(edge);
			edges.remove(edge);
		}
		fromVertex.outEdges.add(edge);
		toVertex.inEdges.add(edge);
		edges.add(edge);
	}
```



#### 删除边

```java
@Override
	public void removeEdge(V from, V to) {
		Vertex<V, E> fromVertex = vertices.get(from);
		if (fromVertex == null) return;
		
		Vertex<V, E> toVertex = vertices.get(to);
		if (toVertex == null) return;
		
		Edge<V, E> edge = new Edge<>(fromVertex, toVertex);
		if (fromVertex.outEdges.remove(edge)) {
			toVertex.inEdges.remove(edge);
			edges.remove(edge);
		}
	}
```



#### 删除顶点

```java
    @Override
	public void removeVertex(V v) {
		Vertex<V, E> vertex = vertices.remove(v);
		if (vertex == null) return;

		for (Iterator<Edge<V, E>> iterator = vertex.outEdges.iterator(); iterator.hasNext();) {
			Edge<V, E> edge = iterator.next();
			edge.to.inEdges.remove(edge);
			// 将当前遍历到的元素edge从集合vertex.outEdges中删掉
			iterator.remove(); 
			edges.remove(edge);
		}

		for (Iterator<Edge<V, E>> iterator = vertex.inEdges.iterator(); iterator.hasNext();) {
			Edge<V, E> edge = iterator.next();
			edge.from.outEdges.remove(edge);
			// 将当前遍历到的元素edge从集合vertex.inEdges中删掉
			iterator.remove(); 
			edges.remove(edge);
		}
	}
```

## 遍历
图的遍历

- 从图中某一顶点出发访问图中其余顶点，且每一个顶点仅被访问一次

图有2种常见的遍历方式（有向图、无向图都适用）
- 广度优先搜索（Breadth First Search，BFS），又称为宽度优先搜索、横向优先搜索
- 深度优先搜索（Depth First Search，DFS） 
- ✓发明“深度优先搜索”算法的2位科学家在1986年共同获得计算机领域的最高奖：图灵奖


### 广度优先搜索（Breadth First Search）
之前所学的二叉树层序遍历就是一种广度优先搜索

![image-20200907084627659](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200907084627659.png)

![image-20200907084751321](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200907084751321.png)

#### 思路

![image-20200907085239597](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200907085239597.png)

#### 实现

```java
//接口
public abstract class Graph<V, E> {
	protected WeightManager<E> weightManager;
	public Graph() {}
	
	public Graph(WeightManager<E> weightManager) {
		this.weightManager = weightManager;
	}

	
	public abstract void bfs(V begin, VertexVisitor<V> visitor);  //广度遍历
	public abstract void dfs(V begin, VertexVisitor<V> visitor);  //深度遍历
}


//广度遍历实现
@Override
	public void bfs(V begin, VertexVisitor<V> visitor) {
		if (visitor == null) return;
		Vertex<V, E> beginVertex = vertices.get(begin);
		if (beginVertex == null) return;
		
		Set<Vertex<V, E>> visitedVertices = new HashSet<>();
		Queue<Vertex<V, E>> queue = new LinkedList<>();
		queue.offer(beginVertex);
		visitedVertices.add(beginVertex);
		
		while (!queue.isEmpty()) {
			Vertex<V, E> vertex = queue.poll();
			if (visitor.visit(vertex.value)) return;
			
			for (Edge<V, E> edge : vertex.outEdges) {
				if (visitedVertices.contains(edge.to)) continue;
				queue.offer(edge.to);
				visitedVertices.add(edge.to);
			}
		}
}
```



### 深度优先搜索（Depth First Search）



之前所学的二叉树前序遍历就是一种深度优先搜

#### 递归实现

```java
	public void dfs(V begin) {
		Vertex<V, E> beginVertex = vertices.get(begin);
		if (beginVertex == null) return;
		dfs2(beginVertex, new HashSet<>());
	}
	
	private void dfs(Vertex<V, E> vertex, Set<Vertex<V, E>> visitedVertices) {
		System.out.println(vertex.value);
		visitedVertices.add(vertex);

		for (Edge<V, E> edge : vertex.outEdges) {
			if (visitedVertices.contains(edge.to)) continue;
			dfs(edge.to, visitedVertices);
		}
	}
```





#### 非递归思路

![image-20200908085401613](D:\Users\80254882\AppData\Roaming\Typora\typora-user-images\image-20200908085401613.png)

#### 非递归实现

```java
@Override
	public void dfs(V begin, VertexVisitor<V> visitor) {
		if (visitor == null) return;
		Vertex<V, E> beginVertex = vertices.get(begin);
		if (beginVertex == null) return;

		Set<Vertex<V, E>> visitedVertices = new HashSet<>();
		Stack<Vertex<V, E>> stack = new Stack<>();
		
		// 先访问起点
		stack.push(beginVertex);
		visitedVertices.add(beginVertex);
		if (visitor.visit(begin)) return;
		
		while (!stack.isEmpty()) {
			Vertex<V, E> vertex = stack.pop();
	
			for (Edge<V, E> edge : vertex.outEdges) {
				if (visitedVertices.contains(edge.to)) continue;
				
				stack.push(edge.from);
				stack.push(edge.to);
				visitedVertices.add(edge.to);
				if (visitor.visit(edge.to.value)) return;
				
				break;
			}
		}
	}
```



## AOV网（Activity On Vertex Network）
◼ 一项大的工程常被分为多个小的子工程 ✓子工程之间可能存在一定的先后顺序，即某些子工程必须在其他的一些子工程完成后才能开始
◼ 在现代化管理中，人们常用有向图来描述和分析一项工程的计划和实施过程，子工程被称为活动（Activity） ✓以顶点表示活动、有向边表示活动之间的先后关系，这样的图简称为 AOV 网
◼ 标准的AOV网必须是一个有向无环图（Directed Acyclic Graph，简称 DAG）





