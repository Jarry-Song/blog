# 图（Graph）

![image-20200917091306528](https://gitee.com/jarrysong/img/raw/master/img/image-20200917091306528.png)

## 数据结构回顾
![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200913232425.png)

## 图（Graph）

图由顶点（vertex）和边（edge）组成，通常表示为 G = (V, E) 

- G表示一个图，V是顶点集，E是边集 
- 顶点集V有穷且非空 
- 任意两个顶点之间都可以用边来表示它们之间的关系，边集E可以空的

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004100.png)

### 图的应用举例

图结构的应用极其广泛

 - 社交网络
 - 地图导航
 - 游戏开发 
 - .....

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004126.png)

### 有向图（Directed Graph）

有向图的边是有明确方向的

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004209.png)

 有向无环图（Directed Acyclic Graph，简称 DAG） 

- 如果一个有向图，从任意顶点出发无法经过若干条边回到该顶点，那么它就是一个有向无环图



![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004229.png)

#### 出度、入度

出度、入度适用于有向图

出度（Out-degree） 

- 一个顶点的出度为 x，是指有 x 条边以该顶点为起点 
- 顶点11的出度是3

入度（In-degree） 

- 一个顶点的入度为 x，是指有 x 条边以该顶点为终点
- 顶点11的入度是2

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004250.png)

### 无向图（Undirected Graph）

无向图的边是无方向的

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004310.png)

 效果类似于下面的有向图

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004332.png)

### 混合图（Mixed Graph）

混合图的边可能是无向的，也可能是有向的

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004355.png)

### 简单图、多重图

平行边 在无向图中，关联一对顶点的无向边如果多于1条，则称这些边为平行边

- 在有向图中，关联一对顶点的有向边如果多于1条，并且它们的的方向相同，则称这些边为平行边

多重图（Multigraph） 

- 有平行边或者有自环的图

简单图（Simple Graph） 

- 既没有平行边也不没有自环的图 
- 课程中讨论的基本都是简单图

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004413.png)

### 无向完全图（Undirected Complete Graph）

无向完全图的任意两个顶点之间都存在边

- n 个顶点的无向完全图有 n(n − 1)/2 条边 

- ✓ n − 1 + n − 2 + n − 3 + ⋯+ 3 + 2 + 1

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004434.png)

### 有向完全图（Directed Complete Graph）

有向完全图的任意两个顶点之间都存在方向相反的两条边

- n 个顶点的有向完全图有 n(n − 1) 条边

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004454.png)

稠密图（Dense Graph）：边数接近于或等于完全图

稀疏图（Sparse Graph）：边数远远少于完全图



### 有权图（Weighted Graph）

有权图的边可以拥有权值（Weight)

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004514.png)

### 连通图（Connected Graph）

如果顶点 x 和 y 之间存在可相互抵达的路径（直接或间接的路径），则称 x 和 y 是连通的

如果无向图 G 中任意2个顶点都是连通的，则称G为连通图

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004535.png)

### 连通分量（Connected Component）

连通分量：无向图的极大连通子图 

- 连通图只有一个连通分量，即其自身；非连通的无向图有多个连通分量

下面的无向图有3个连通分量

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004556.png)

### 强连通图（Strongly Connected Graph）

如果有向图 G 中任意2个顶点都是连通的，则称G为强连通图

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004614.png)

### 强连通分量（Strongly Connected Component）

强连通分量：有向图的极大强连通子图 

- 强连通图只有一个强连通分量，即其自身；非强连通的有向图有多个强连通分量

![image.png](https://gitee.com/jarrysong/img/raw/master/img/20200915004636.png)

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

![image-20200904081037310](https://gitee.com/jarrysong/img/raw/master/img/image-20200904081037310.png)

  

##### 邻接矩阵 – 有权图

![image-20200904081203057](https://gitee.com/jarrysong/img/raw/master/img/image-20200904081203057.png)

#### 邻接表（Adjacency List）

![image-20200904081412347](https://gitee.com/jarrysong/img/raw/master/img/image-20200904081412347.png)

##### 邻接表-有权图

![image-20200904081506434](https://gitee.com/jarrysong/img/raw/master/img/image-20200904081506434.png)

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

![image-20200907084627659](https://gitee.com/jarrysong/img/raw/master/img/image-20200907084627659.png)

![image-20200907084751321](https://gitee.com/jarrysong/img/raw/master/img/image-20200907084751321.png)

#### 思路

![image-20200907085239597](https://gitee.com/jarrysong/img/raw/master/img/image-20200907085239597.png)

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

![image-20200908085401613](https://gitee.com/jarrysong/img/raw/master/img/image-20200908085401613.png)

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

一项大的工程常被分为多个小的子工程

- ✓子工程之间可能存在一定的先后顺序，即某些子工程必须在其他的一些子工程完成后才能开始

在现代化管理中，人们常用有向图来描述和分析一项工程的计划和实施过程，子工程被称为活动（Activity） 

- ✓以顶点表示活动、有向边表示活动之间的先后关系，这样的图简称为 AOV 网

标准的AOV网必须是一个有向无环图（Directed Acyclic Graph，简称 DAG） 

![image-20200914084643666](https://gitee.com/jarrysong/img/raw/master/img/image-20200914084643666.png)

## 拓扑排序（Topological Sort）

### 什么是拓扑排序？ 

- 将 AOV 网中所有活动排成一个序列，使得每个活动的前驱活动都排在该活动的前面 
- 比如上图的拓扑排序结果是：A、B、C、D、E、F 或者 A、B、D、C、E、F （结果并不一定是唯一的）

![image-20200914084743569](https://gitee.com/jarrysong/img/raw/master/img/image-20200914084743569.png)

前驱活动：有向边起点的活动称为终点的前驱活动

- 只有当一个活动的前驱全部都完成后，这个活动才能进行

后继活动：有向边终点的活动称为起点的后继活

### 思路

可以使用卡恩算法（Kahn于1962年提出）完成拓扑排序 
- 假设 L 是存放拓扑排序结果的列表
  - ① 把所有入度为 0 的顶点放入 L 中，然后把这些顶点从图中去掉 
  - ② 重复操作 ①，直到找不到入度为 0 的顶点 
- 如果此时 L 中的元素个数和顶点总数相同，说明拓扑排序完成 
- 如果此时 L 中的元素个数少于顶点总数，说明原图中存在环，无法进行拓扑排序

![image-20200914084907829](https://gitee.com/jarrysong/img/raw/master/img/image-20200914084907829.png)

### 实现

```java
public List<V> topologicalSort() {
		List<V> list = new ArrayList<>();
		Queue<Vertex<V, E>> queue = new LinkedList<>();
		Map<Vertex<V, E>, Integer> ins = new HashMap<>();
		// 初始化（将度为0的节点都放入队列）
		vertices.forEach((V v, Vertex<V, E> vertex) -> {
			int in = vertex.inEdges.size();
			if (in == 0) {
				queue.offer(vertex);
			} else {
				ins.put(vertex, in);
			}
		});
		
		while (!queue.isEmpty()) {
			Vertex<V, E> vertex = queue.poll();
			// 放入返回结果中
			list.add(vertex.value);
			
			for (Edge<V, E> edge : vertex.outEdges) {
				int toIn = ins.get(edge.to) - 1;
				if (toIn == 0) {
					queue.offer(edge.to);
				} else {
					ins.put(edge.to, toIn);
				}
			}
		}
		
		return list;
	}
```



## 生成树（Spanning Tree)

生成树（Spanning Tree），也称为支撑树 

- 连通图的极小连通子图，它含有图中全部的 n 个顶点，恰好只有 n – 1 条边

![image-20200909085922959](https://gitee.com/jarrysong/img/raw/master/img/image-20200909085922959.png)

## 最小生成树（Minimum Spanning Tree）

最小生成树（Minimum Spanning Tree，简称MST） 

- 也称为最小权重生成树（Minimum Weight Spanning Tree）、最小支撑树
- 是所有生成树中，总权值最小的那棵
- 适用于有权的连通图（无向)

![image-20200909090045804](https://gitee.com/jarrysong/img/raw/master/img/image-20200909090045804.png)

最小生成树在许多领域都有重要的作用，例如 

- 要在 n 个城市之间铺设光缆，使它们都可以通信 
- 铺设光缆的费用很高，且各个城市之间因为距离不同等因素，铺设光缆的费用也不同 
- 如何使铺设光缆的总费用最低？

如果图的每一条边的权值都互不相同，那么最小生成树将只有一个，否则可能会有多个最小生成树

求最小生成树的2个经典算法

- Prim（普里姆算法） 
- Kruskal（克鲁斯克尔算法）



## 切分定理

切分（Cut）：把图中的节点分为两部分，称为一个切分
下图有个切分 C = (S, T)，S = {A, B, D}，T = {C, E}

![image-20200909090702082](https://gitee.com/jarrysong/img/raw/master/img/image-20200909090702082.png)

横切边（Crossing Edge）：如果一个边的两个顶点，分别属于切分的两部分，这个边称为横切边 

- 比如上图的边 BC、BE、DE 就是横切边

切分定理：给定任意切分，横切边中权值最小的边必然属于最小生成树

## Prim算法

###  执行过程

假设 G = (V，E) 是有权的连通图（无向），A 是 G 中最小生成树的边集 

- 算法从 S = { u0 }（u0 ∈ V），A = { } 开始，重复执行下述操作，直到 S = V 为止 
- ✓找到切分 C = (S，V – S) 的最小横切边 (u0，v0) 并入集合 A，同时将 v0 并入集合S

![image-20200914085336379](https://gitee.com/jarrysong/img/raw/master/img/image-20200914085336379.png)

![image-20200914085546513](https://gitee.com/jarrysong/img/raw/master/img/image-20200914085546513.png)

![image-20200914085627467](https://gitee.com/jarrysong/img/raw/master/img/image-20200914085627467.png)



### Prim算法 – 实现

边信息

```java
public static class EdgeInfo<V, E> {
		private V from;
		private V to;
		private E weight;
		public EdgeInfo(V from, V to, E weight) {
			this.from = from;
			this.to = to;
			this.weight = weight;
		}
		public V getFrom() {
			return from;
		}
		public void setFrom(V from) {
			this.from = from;
		}
		public V getTo() {
			return to;
		}
		public void setTo(V to) {
			this.to = to;
		}
		public E getWeight() {
			return weight;
		}
		public void setWeight(E weight) {
			this.weight = weight;
		}
		@Override
		public String toString() {
			return "EdgeInfo [from=" + from + ", to=" + to + ", weight=" + weight + "]";
		}
	}
```

最小生成树

```java
@Override
	public Set<EdgeInfo<V, E>> mst() {
		return Math.random() > 0.5 ? prim() : kruskal();
	}
```

prim最小生成树

```java
private Comparator<Edge<V, E>> edgeComparator = (Edge<V, E> e1, Edge<V, E> e2) -> {
		return weightManager.compare(e1.weight, e2.weight);
};

private Set<EdgeInfo<V, E>> prim() {
		Iterator<Vertex<V, E>> it = vertices.values().iterator();
		if (!it.hasNext()) return null;
		Vertex<V, E> vertex = it.next();
         //最小生成树的边
		Set<EdgeInfo<V, E>> edgeInfos = new HashSet<>();
         //已经加入的生成树的点
		Set<Vertex<V, E>> addedVertices = new HashSet<>();
		addedVertices.add(vertex);
         //最小堆来选择最小权限的边
		MinHeap<Edge<V, E>> heap = new MinHeap<>(vertex.outEdges, edgeComparator);
		int verticesSize = vertices.size();
		while (!heap.isEmpty() && addedVertices.size() < verticesSize) {
			Edge<V, E> edge = heap.remove();
			if (addedVertices.contains(edge.to)) continue;
			edgeInfos.add(edge.info());
			addedVertices.add(edge.to);
			heap.addAll(edge.to.outEdges);
		}
		return edgeInfos;
	}
```



## Kruskal算法 

### 执行过程

按照边的权重顺序（从小到大）将边加入生成树中，直到生成树中含有V – 1 条边为止（ V 是顶点数量）

- 若加入该边会与生成树形成环，则不加入该边 
- 从第3条边开始，可能会与生成树形成环

![image-20200914212441923](https://gitee.com/jarrysong/img/raw/master/img/image-20200914212441923.png)

![image-20200914212725074](https://gitee.com/jarrysong/img/raw/master/img/image-20200914212725074.png)

![image-20200914212807042](https://gitee.com/jarrysong/img/raw/master/img/image-20200914212807042.png)

### Kruskal算法 – 实现

```java
private Set<EdgeInfo<V, E>> kruskal() {
		int edgeSize = vertices.size() - 1;
		if (edgeSize == -1) return null;
         //最小生成树的边
		Set<EdgeInfo<V, E>> edgeInfos = new HashSet<>();
         //最小堆筛选
		MinHeap<Edge<V, E>> heap = new MinHeap<>(edges, edgeComparator);
         //使用并查集判断是否是一个环
		UnionFind<Vertex<V, E>> uf = new UnionFind<>();
		vertices.forEach((V v, Vertex<V, E> vertex) -> {
			uf.makeSet(vertex);
		});
		while (!heap.isEmpty() && edgeInfos.size() < edgeSize) {
			Edge<V, E> edge = heap.remove(); 
             //是否构成环
			if (uf.isSame(edge.from, edge.to)) continue; 
			edgeInfos.add(edge.info());
			uf.union(edge.from, edge.to);
		}
		return edgeInfos;
	}
```

时间复杂度：O(ElogE)

## 修改图的接口：改为抽象类

```java
public abstract class Graph<V, E> {
    //权重管理
	protected WeightManager<E> weightManager;
	
	public Graph() {}
	
	public Graph(WeightManager<E> weightManager) {
		this.weightManager = weightManager;
	}
	//大小
	public abstract int edgesSize();
	public abstract int verticesSize();
	//添加
	public abstract void addVertex(V v);
	public abstract void addEdge(V from, V to);
	public abstract void addEdge(V from, V to, E weight);
	//删除
	public abstract void removeVertex(V v);
	public abstract void removeEdge(V from, V to);
	
    //广度遍历
	public abstract void bfs(V begin, VertexVisitor<V> visitor);
    //深度遍历
	public abstract void dfs(V begin, VertexVisitor<V> visitor);
	//最小生成树
	public abstract Set<EdgeInfo<V, E>> mst();
	//拓扑排序
	public abstract List<V> topologicalSort();
	
    //public abstract Map<V, E> shortestPath(V begin);
    
    //单元最短路径
	public abstract Map<V, PathInfo<V, E>> shortestPath(V begin);
	
	public abstract Map<V, Map<V, PathInfo<V, E>>> shortestPath();
	
	public interface WeightManager<E> {
		int compare(E w1, E w2);
		E add(E w1, E w2);
		E zero();
	}
	
	public interface VertexVisitor<V> {
		boolean visit(V v);
	}
	
	public static class PathInfo<V, E> {
		protected E weight;
		protected List<EdgeInfo<V, E>> edgeInfos = new LinkedList<>();
		public PathInfo() {}
		public PathInfo(E weight) {
			this.weight = weight;
		}
		public E getWeight() {
			return weight;
		}
		public void setWeight(E weight) {
			this.weight = weight;
		}
		public List<EdgeInfo<V, E>> getEdgeInfos() {
			return edgeInfos;
		}
		public void setEdgeInfos(List<EdgeInfo<V, E>> edgeInfos) {
			this.edgeInfos = edgeInfos;
		}
		@Override
		public String toString() {
			return "PathInfo [weight=" + weight + ", edgeInfos=" + edgeInfos + "]";
		}
	}
	
	public static class EdgeInfo<V, E> {
		private V from;
		private V to;
		private E weight;
		public EdgeInfo(V from, V to, E weight) {
			this.from = from;
			this.to = to;
			this.weight = weight;
		}
		public V getFrom() {
			return from;
		}
		public void setFrom(V from) {
			this.from = from;
		}
		public V getTo() {
			return to;
		}
		public void setTo(V to) {
			this.to = to;
		}
		public E getWeight() {
			return weight;
		}
		public void setWeight(E weight) {
			this.weight = weight;
		}
		@Override
		public String toString() {
			return "EdgeInfo [from=" + from + ", to=" + to + ", weight=" + weight + "]";
		}
	}
}
```



## 最短路径（Shortest Path）

最短路径是指两顶点之间权值之和最小的路径（有向图、无向图均适用，不能有负权环)

![image-20200914204745911](https://gitee.com/jarrysong/img/raw/master/img/image-20200914204745911.png)

### 最短路径 – 无权图

无权图相当于是全部边权值为1的有权图

![image-20200914214313990](https://gitee.com/jarrysong/img/raw/master/img/image-20200914214313990.png)

### 最短路径 – 负权边

有负权边，但没有负权环时，存在最短路径

![image-20200914214359605](https://gitee.com/jarrysong/img/raw/master/img/image-20200914214359605.png)

A到E的最短路径是：A → B → E

### 最短路径 – 负权环

有负权环时，不存在最短路径

![image-20200914214508722](https://gitee.com/jarrysong/img/raw/master/img/image-20200914214508722.png)

通过负权环， A到E的路径可以无限短 

![image-20200914214634371](https://gitee.com/jarrysong/img/raw/master/img/image-20200914214634371.png)



### 最短路径 – 应用场景

最短路径的典型应用之一：路径规划问题

求解最短路径的3个经典算法

1.单源短路径算法 

- ✓Dijkstra（迪杰斯特拉算法） 

- ✓Bellman-Ford（贝尔曼-福特算法）

2.多源最短路径算法 

- ✓Floyd（弗洛伊德算法）

## Dijkstra

Dijkstra 属于单源最短路径算法，用于计算一个顶点到其他所有顶点的最短路径

- 使用前提：不能有负权边 

- 时间复杂度：可优化至 O(ElogV) ，E 是边数量，V 是节点数量

由荷兰的科学家 Edsger Wybe Dijkstra 发明，曾在1972年获得图灵奖

### Dijkstra – 等价思考

Dijkstra 的原理其实跟生活中的一些自然现象完全一样

- 把每1个顶点想象成是1块小石头
- 每1条边想象成是1条绳子，每一条绳子都连接着2块小石头，边的权值就是绳子的长度
- 将小石头和绳子平放在一张桌子上（下图是一张俯视图，图中黄颜色的是桌子）

![image-20200914215541391](https://gitee.com/jarrysong/img/raw/master/img/image-20200914215541391.png)

接下来想象一下，手拽着小石头A，慢慢地向上提起来，远离桌面 

- B、D、C、E会依次离开桌面
- 最后绷直的绳子就是A到其他小石头的最短路径

![image-20200914215718296](https://gitee.com/jarrysong/img/raw/master/img/image-20200914215718296.png)

有一个很关键的信息 

- 后离开桌面的小石头
- ✓都是被先离开桌面的小石头拉起来的 

### Dijkstra – 执行过程

![image-20200914220518151](https://gitee.com/jarrysong/img/raw/master/img/image-20200914220518151.png)

绿色

- 已经“离开桌面”

- 已经确定了最终的最短路径

红色：更新了最短路径信

![image-20200914220716413](https://gitee.com/jarrysong/img/raw/master/img/image-20200914220716413.png)

松弛操作（Relaxation）：更新2个顶点之间的最短路径 

- 这里一般是指：更新源点到另一个点的最短路径 

- 松弛操作的意义：尝试找出更短的最短路径

确定A到D的最短路径后，对DC、DE边进行松弛操作，更新了A到C、A到E的最短路径 

![image-20200914220913302](https://gitee.com/jarrysong/img/raw/master/img/image-20200914220913302.png)

### Dijkstra – 实现

简单实现

```java
	public Map<V, E> shortestPath(V begin) {
		Vertex<V, E> beginVertex = vertices.get(begin);
		if (beginVertex == null) return null;
		//已经被拽起来的点
		Map<V, E> selectedPaths = new HashMap<>();
         //可以被拽起的种子选手
		Map<Vertex<V, E>, E> paths = new HashMap<>();
		// 初始化paths
		for (Edge<V, E> edge : beginVertex.outEdges) {
			paths.put(edge.to, edge.weight);
		}

		while (!paths.isEmpty()) {
			Entry<Vertex<V, E>, E> minEntry = getMinPath(paths);
			// minVertex离开桌面
			Vertex<V, E> minVertex = minEntry.getKey();
			selectedPaths.put(minVertex.value, minEntry.getValue());
			paths.remove(minVertex);
			// 对它的minVertex的outEdges进行松弛操作
			for (Edge<V, E> edge : minVertex.outEdges) {
				// 如果edge.to已经离开桌面，就没必要进行松弛操作
				if (selectedPaths.containsKey(edge.to.value)) continue;
				// 新的可选择的最短路径：beginVertex到edge.from的最短路径 + edge.weight
				E newWeight = weightManager.add(minEntry.getValue(), edge.weight);
				// 以前的最短路径：beginVertex到edge.to的最短路径
				E oldWeight = paths.get(edge.to);
				if (oldWeight == null || weightManager.compare(newWeight, oldWeight) < 0) {
					paths.put(edge.to, newWeight);
				}
			}
		}
		
		selectedPaths.remove(begin);
		return selectedPaths;
	}


     /**
	 * 从paths中挑一个最小的路径出来
	 * @param paths
	 * @return
	 */
	private Entry<Vertex<V, E>, PathInfo<V, E>> getMinPath(Map<Vertex<V, E>, PathInfo<V, E>> paths) {
		Iterator<Entry<Vertex<V, E>, PathInfo<V, E>>> it = paths.entrySet().iterator();
		Entry<Vertex<V, E>, PathInfo<V, E>> minEntry = it.next();
		while (it.hasNext()) {
			Entry<Vertex<V, E>, PathInfo<V, E>> entry = it.next();
			if (weightManager.compare(entry.getValue().weight, minEntry.getValue().weight) < 0) {
				minEntry = entry;
			}
		}
		return minEntry;
	}
```

```java
	public static class PathInfo<V, E> {
		protected E weight;
		protected List<EdgeInfo<V, E>> edgeInfos = new LinkedList<>();
		public PathInfo() {}
		public PathInfo(E weight) {
			this.weight = weight;
		}
		public E getWeight() {
			return weight;
		}
		public void setWeight(E weight) {
			this.weight = weight;
		}
		public List<EdgeInfo<V, E>> getEdgeInfos() {
			return edgeInfos;
		}
		public void setEdgeInfos(List<EdgeInfo<V, E>> edgeInfos) {
			this.edgeInfos = edgeInfos;
		}
		@Override
		public String toString() {
			return "PathInfo [weight=" + weight + ", edgeInfos=" + edgeInfos + "]";
		}
	}
```

Dijkstra

```java
private Map<V, PathInfo<V, E>> dijkstra(V begin) {
		Vertex<V, E> beginVertex = vertices.get(begin);
		if (beginVertex == null) return null;
		
		Map<V, PathInfo<V, E>> selectedPaths = new HashMap<>();
		Map<Vertex<V, E>, PathInfo<V, E>> paths = new HashMap<>();
		paths.put(beginVertex, new PathInfo<>(weightManager.zero()));
		// 初始化paths
//		for (Edge<V, E> edge : beginVertex.outEdges) {
//			PathInfo<V, E> path = new PathInfo<>();
//			path.weight = edge.weight;
//			path.edgeInfos.add(edge.info());
//			paths.put(edge.to, path);
//		}

		while (!paths.isEmpty()) {
			Entry<Vertex<V, E>, PathInfo<V, E>> minEntry = getMinPath(paths);
			// minVertex离开桌面
			Vertex<V, E> minVertex = minEntry.getKey();
			PathInfo<V, E> minPath = minEntry.getValue();
			selectedPaths.put(minVertex.value, minPath);
			paths.remove(minVertex);
			// 对它的minVertex的outEdges进行松弛操作
			for (Edge<V, E> edge : minVertex.outEdges) {
				// 如果edge.to已经离开桌面，就没必要进行松弛操作
				if (selectedPaths.containsKey(edge.to.value)) continue;
				relaxForDijkstra(edge, minPath, paths);
			}
		}
		
		selectedPaths.remove(begin);
		return selectedPaths;
	}


    /**
	 * 松弛
	 * @param edge 需要进行松弛的边
	 * @param fromPath edge的from的最短路径信息
	 * @param paths 存放着其他点（对于dijkstra来说，就是还没有离开桌面的点）的最短路径信息
	 */
	private void relaxForDijkstra(Edge<V, E> edge, PathInfo<V, E> fromPath, Map<Vertex<V, E>, PathInfo<V, E>> paths) {
		// 新的可选择的最短路径：beginVertex到edge.from的最短路径 + edge.weight
		E newWeight = weightManager.add(fromPath.weight, edge.weight);
		// 以前的最短路径：beginVertex到edge.to的最短路径
		PathInfo<V, E> oldPath = paths.get(edge.to);
		if (oldPath != null && weightManager.compare(newWeight, oldPath.weight) >= 0) return;
		
		if (oldPath == null) {
			oldPath = new PathInfo<>();
			paths.put(edge.to, oldPath);
		} else {
			oldPath.edgeInfos.clear();
		}

		oldPath.weight = newWeight;
		oldPath.edgeInfos.addAll(fromPath.edgeInfos);
		oldPath.edgeInfos.add(edge.info());
	}


```



## Bellman-Ford

Bellman-Ford 也属于单源最短路径算法，支持负权边，还能检测出是否有负权环 

- 算法原理：对所有的边进行 V – 1 次松弛操作（ V 是节点数量），得到所有可能的最短路径 

- 时间复杂度：O(EV) ，E 是边数量，V 是节点数量

下图的最好情况是恰好从左到右的顺序对边进行松弛操作 

- 对所有边仅需进行 1 次松弛操作就能计算出A到达其他所有顶点的最短路径

![image-20200915132503106](https://gitee.com/jarrysong/img/raw/master/img/image-20200915132503106.png)

最坏情况是恰好每次都从右到左的顺序对边进行松弛操作 

对所有边需进行 V – 1 次松弛操作才能计算出A到达其他所有顶点的最短路径

![image-20200915213339579](https://gitee.com/jarrysong/img/raw/master/img/image-20200915213339579.png)

### Bellman-Ford – 实例

![image-20200915213416019](https://gitee.com/jarrysong/img/raw/master/img/image-20200915213416019.png)

一共8条边

假设每次松弛操作的顺序是：DC、DF、BC、ED、EF、BE、AE、AB

![image-20200915213416019](https://gitee.com/jarrysong/img/raw/master/img/20200915230650.png)

![image-20200915213416019](https://gitee.com/jarrysong/img/raw/master/img/20200915231022.png)



![image-20200915213416019](https://gitee.com/jarrysong/img/raw/master/img/20200915230006.png)

不难分析出，经过4次松弛操作之后，已经计算出了A到其他所有顶点的最短路径

```java
private Map<V, PathInfo<V, E>> bellmanFord(V begin) {
		Vertex<V, E> beginVertex = vertices.get(begin);
		if (beginVertex == null) return null;
		
		Map<V, PathInfo<V, E>> selectedPaths = new HashMap<>();
		selectedPaths.put(begin, new PathInfo<>(weightManager.zero()));
		
		int count = vertices.size() - 1;
		for (int i = 0; i < count; i++) { // v - 1 次
			for (Edge<V, E> edge : edges) {
				PathInfo<V, E> fromPath = selectedPaths.get(edge.from.value);
				if (fromPath == null) continue;
				relax(edge, fromPath, selectedPaths);
			}
		}
		
		for (Edge<V, E> edge : edges) {
			PathInfo<V, E> fromPath = selectedPaths.get(edge.from.value);
			if (fromPath == null) continue;
			if (relax(edge, fromPath, selectedPaths)) {
				System.out.println("有负权环");
				return null;
			}
		}
		
		selectedPaths.remove(begin);
		return selectedPaths;
	}

	
	/**
	 * 松弛
	 * @param edge 需要进行松弛的边
	 * @param fromPath edge的from的最短路径信息
	 * @param paths 存放着其他点（对于dijkstra来说，就是还没有离开桌面的点）的最短路径信息
	 */
	private boolean relax(Edge<V, E> edge, PathInfo<V, E> fromPath, Map<V, PathInfo<V, E>> paths) {
		// 新的可选择的最短路径：beginVertex到edge.from的最短路径 + edge.weight
		E newWeight = weightManager.add(fromPath.weight, edge.weight);
		// 以前的最短路径：beginVertex到edge.to的最短路径
		PathInfo<V, E> oldPath = paths.get(edge.to.value);
		if (oldPath != null && weightManager.compare(newWeight, oldPath.weight) >= 0) return false;
		
		if (oldPath == null) {
			oldPath = new PathInfo<>();
			paths.put(edge.to.value, oldPath);
		} else {
			oldPath.edgeInfos.clear();
		}

		oldPath.weight = newWeight;
		oldPath.edgeInfos.addAll(fromPath.edgeInfos);
		oldPath.edgeInfos.add(edge.info());
		
		return true;
	}
```



## Floyd

Floyd 属于多源最短路径算法，能够求出任意2个顶点之间的最短路径，支持负权边 

- 时间复杂度：O(V3)，效率比执行 V 次 Dijkstra 算法要好（ V 是顶点数量）

### 算法原理 

从任意顶点 i 到任意顶点 j 的最短路径不外乎两种可能 

- ① 直接从 i 到 j 

- ② 从 i 经过若干个顶点到 j

假设 dist(i，j) 为顶点 i 到顶点 j 的最短路径的距离 

对于每一个顶点 k，检查 dist(i，k) + dist(k，j)＜dist(i，j) 是否成立 

- ✓如果成立，证明从 i 到 k 再到 j 的路径比 i 直接到 j 的路径短，设置 dist(i，j) = dist(i，k) + dist(k，j)
- ✓当我们遍历完所有结点 k，dist(i，j) 中记录的便是 i 到 j 的最短路径的距离

### 实现

```java
public Map<V, Map<V, PathInfo<V, E>>> shortestPath() {
		Map<V, Map<V, PathInfo<V, E>>> paths = new HashMap<>();
		// 初始化
		for (Edge<V, E> edge : edges) {
			Map<V, PathInfo<V, E>> map = paths.get(edge.from.value);
			if (map == null) {
				map = new HashMap<>();
				paths.put(edge.from.value, map);
			}
			
			PathInfo<V, E> pathInfo = new PathInfo<>(edge.weight);
			pathInfo.edgeInfos.add(edge.info());
			map.put(edge.to.value, pathInfo);
		}

		vertices.forEach((V v2, Vertex<V, E> vertex2) -> {
			vertices.forEach((V v1, Vertex<V, E> vertex1) -> {
				vertices.forEach((V v3, Vertex<V, E> vertex3) -> {
					if (v1.equals(v2) || v2.equals(v3) || v1.equals(v3)) return;
					
					// v1 -> v2
					PathInfo<V, E> path12 = getPathInfo(v1, v2, paths);
					if (path12 == null) return;
					
					// v2 -> v3
					PathInfo<V, E> path23 = getPathInfo(v2, v3, paths);
					if (path23 == null) return;
					
					// v1 -> v3 
					PathInfo<V, E> path13 = getPathInfo(v1, v3, paths);
					
					E newWeight = weightManager.add(path12.weight, path23.weight);
					if (path13 != null && weightManager.compare(newWeight, path13.weight) >= 0) return;
					
					if (path13 == null) {
						path13 = new PathInfo<V, E>();
						paths.get(v1).put(v3, path13);
					} else {
						path13.edgeInfos.clear();
					}
					
					path13.weight = newWeight;
					path13.edgeInfos.addAll(path12.edgeInfos);
					path13.edgeInfos.addAll(path23.edgeInfos);
				});
			});
		});
		
		return paths;
	}
	
	private PathInfo<V, E> getPathInfo(V from, V to, Map<V, Map<V, PathInfo<V, E>>> paths) {
		Map<V, PathInfo<V, E>> map = paths.get(from);
		return map == null ? null : map.get(to);
	}
```







