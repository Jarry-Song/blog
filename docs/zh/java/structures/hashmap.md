# 哈希表

## TreeMap分析 

1.时间复杂度（平均） 

- 添加、删除、搜索：O(logn)

2.特点 

- Key 必须具备可比较性 
- 元素的分布是有顺序的

3.在实际应用中，很多时候的需求

- Map 中存储的元素不需要讲究顺序 
- Map 中的 Key 不需要具备可比较性

4.不考虑顺序、不考虑 Key 的可比较性，Map 有更好的实现方案，平均时间复杂度可以达到 O(1) 

- 那就是采取哈希表来实现 Map 

## 需求
设计一个写字楼通讯录，存放所有公司的通讯信息 
- 座机号码作为 key（假设座机号码最长是 8 位），公司详情（名称、地址等）作为 value
- 添加、删除、搜索的时间复杂度要求是 O(1）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-67a3154d93a2e1d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

存在什么问题？ 
- 空间复杂度非常大
- 空间使用率极其低，非常浪费内存空间
- 其实数组 companies 就是一个哈希表，典型的【空间换时间】

## 哈希表（Hash Table）  
1.哈希表也叫做散列表（ hash 有“剁碎”的意思）

2.它是如何实现高效处理数据的？ 
- put("Jack", 666); 
- put("Rose", 777); 
- put("Kate", 888);

![image.png](https://upload-images.jianshu.io/upload_images/1128757-4cc3e1c222c48538.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


3.添加、搜索、删除的流程都是类似的 

（1）利用哈希函数生成 key 对应的 index【O(1)】 

（2）根据 index 操作定位数组元素【O(1)】

4.哈希表是【空间换时间】的典型应用 

5.哈希函数，也叫做散列函数 

6.哈希表内部的数组元素，很多地方也叫 Bucket（桶），整个数组叫 Buckets 或者 Bucket Array 

## 哈希冲突（Hash Collision） 
哈希冲突也叫做哈希碰撞 
- 2 个不同的 key，经过哈希函数计算出相同的结果 
- key1 ≠ key2 ，hash(key1) = hash(key2)

#### 解决哈希冲突的常见方法 
1.开放定址法（Open Addressing） 
- ✓按照一定规则向其他地址探测，直到遇到空桶 

2.再哈希法（Re-Hashing） 
- ✓设计多个哈希函数 

3.链地址法（Separate Chaining） 
- ✓比如通过链表将同一index的元素串起


![image.png](https://upload-images.jianshu.io/upload_images/1128757-f9a749626ab00c40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### JDK1.8的哈希冲突解决方案
![image.png](https://upload-images.jianshu.io/upload_images/1128757-c27e60455e744ce5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.默认使用单向链表将元素串起来

2.在添加元素时，可能会由单向链表转为红黑树来存储元素 
- 比如当哈希表容量 ≥ 64 且 单向链表的节点数量大于 8 时

3.当红黑树节点数量少到一定程度时，又会转为单向链表

4.JDK1.8中的哈希表是使用链表+红黑树解决哈希冲突

5.思考：这里为什么使用单链表？ 
- 每次都是从头节点开始遍历
- 单向链表比双向链表少一个指针，可以节省内存空间


## 哈希函数 
1.哈希表中哈希函数的实现步骤大概如下 
- 先生成 key 的哈希值（必须是整数） 
- 再让 key 的哈希值跟数组的大小进行相关运算，生成一个索引值

![image.png](https://upload-images.jianshu.io/upload_images/1128757-a09f8fc81959d6bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.为了提高效率，可以使用 & 位运算取代 % 运算【前提：将数组的长度设计为 2 的幂（2n）】

![image.png](https://upload-images.jianshu.io/upload_images/1128757-b59d859a0b003617.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3.良好的哈希函数
- 让哈希值更加均匀分布 → 减少哈希冲突次数 → 提升哈希表的性能

## 如何生成key的哈希值
1.key的常见种类可能：整数、浮点数、字符串、自定义对象 
- 不同种类的 key，哈希值的生成方式不一样，但目标是一致的 
- ✓尽量让每个 key 的哈希值是唯一的 
- ✓尽量让 key 的所有信息参与运算

2.在Java中，HashMap 的 key 必须实现 hashCode、equals 方法，也允许 key 为 null

#### 整数 
- 整数值当做哈希值 
- 比如 10 的哈希值就是 10

```java
public static int hashCode(int value) {
    return value;
}
```
#### 浮点数 
- 将存储的二进制格式转为整数值
```java
public static int hashCode(float value) {
    return Float.floatToIntBits(value);
}
```


####  Long和Double的哈希值
```java
public static int hashCode(long value) {
    return (int) (value ^ (value >>> 32));
}

public static int hashCode(double value) {
    long bits = Double.doubleToLongBits(value);
    return (int) (bits ^ (bits >>> 32));
}
```

1.>>> 和 ^ 的作用是？
- 高32bit 和 低32bit 混合计算出 32bit 的哈希值
- 充分利用所有信息计算出哈希值

![image.png](https://upload-images.jianshu.io/upload_images/1128757-4af0910c1d44ed09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 字符串的哈希值 
整数 5489 是如何计算出来的？ 
```math
5 ∗ 10^3 + 4 ∗ 10^2 + 8 ∗ 10^1 + 9 ∗ 10^0
```
字符串是由若干个字符组成的 

- 比如字符串 jack，由 j、a、c、k四个字符组成（字符的本质就是一个整数） 


- 因此，jack 的哈希值可以表示为

```math
 j ∗ n^3 + a ∗ n^2 + c ∗ n^1 + k ∗ ^n0
```
等价于
```math
 [ ( j ∗ n + a ) ∗ n + c ] ∗ n + k 
```


- 在JDK中，乘数 n 为 31，为什么使用 31？ 
 - ✓31 是一个奇素数，JVM会将 31 * i 优化成 (i << 5) – i 
```java
 public static int hashCode(String string) {
        int hashCode = 0;
        int len = string.length();
        for (int i = 0; i < len; i++) {
            char c = string.charAt(i);
            hashCode = 31 * hashCode + c;
        }
        return hashCode;
    }


    public static int hashCode2(String string) {
        int hashCode = 0;
        int len = string.length();
        for (int i = 0; i < len; i++) {
            char c = string.charAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
        }
        return hashCode;
    }
```
#### 关于31的探讨
```math
1 * i =  (2^5 – 1) * i =  i * 2^5 – i =  (i << 5) – i
```

```math
31不仅仅是符合2^n – 1，它是个奇素数（既是奇数，又是素数，也就是质数）
```

- 素数和其他数相乘的结果比其他方式更容易产成唯一性，减少哈希冲突 
- 最终选择31是经过观测分布结果后的选择



## 自定义对象的哈希值
```java
public class Person implements Comparable<Person> {
	private int age;   // 10  20
	private float height; // 1.55 1.67
	private String name; // "jack" "rose"
	
	public Person(int age, float height, String name) {
		this.age = age;
		this.height = height;
		this.name = name;
	}
	
	@Override
	/**
	 * 用来比较2个对象是否相等
	 */
	public boolean equals(Object obj) {
		// 内存地址
		if (this == obj) return true;
		if (obj == null || obj.getClass() != getClass()) return false;
		// if (obj == null || !(obj instanceof Person)) return false;
		
		// 比较成员变量
		Person person = (Person) obj;
		return person.age == age
				&& person.height == height
				&& (person.name == null ? name == null : person.name.equals(name));
	}
	
	@Override
	public int hashCode() {
		int hashCode = Integer.hashCode(age);
		hashCode = hashCode * 31 + Float.hashCode(height);
		hashCode = hashCode * 31 + (name != null ? name.hashCode() : 0);
		return hashCode;
	}

	@Override
	public int compareTo(Person o) {
		return age - o.age;
	}
}
```
思考几个问题：
- 哈希值太大，整型溢出怎么办？
- ✓不用作任何处理

## 自定义对象作为key

1.自定义对象作为 key，最好同时重写 hashCode 、equals 方法 

- equals ：用以判断 2 个 key 是否为同一个 key 
  - ✓自反性：对于任何非 null 的 x，x.equals(x)必须返回true
  - ✓对称性：对于任何非 null 的 x、y，如果 y.equals(x) 返回 true，x.equals(y) 必须返回 true 
  - ✓传递性：对于任何非 null 的 x、y、z，如果 x.equals(y)、y.equals(z) 返回 true，那么x.equals(z) 必须 返回 true
  - ✓一致性：对于任何非 null 的 x、y，只要 equals 的比较操作在对象中所用的信息没有被修改，多次调用 x.equals(y) 就会一致地返回 true，或者一致地返回 false
  - ✓对于任何非 null 的 x，x.equals(null) 必须返回 false 
  - hashCode ：必须保证 equals 为 true 的 2 个 key 的哈希值一样
  - 反过来 hashCode 相等的 key，不一定 equals 为 true
  ```
  比如
  int i = 123123213;
  float f = 10.7f;
  他们的hash值相等
  ```

2.不重写 hashCode 方法只重写 equals 会有什么后果？
- ✓可能会导致 2 个 equals 为 true 的 key 同时存在哈希表中

3.思考：以下情况会怎样？
- 不实现hashCode和equals
- 只实现equals
- 只实现hashCode

## 实现HashMap

#### 实现一

1.继承Map接口

```java
public interface Map<K, V> {
    int size();

    boolean isEmpty();

    void clear();

    V put(K key, V value);

    V get(K key);

    V remove(K key);

    boolean containsKey(K key);

    boolean containsValue(V value);

    void traversal(Visitor<K, V> visitor);

    public static abstract class Visitor<K, V> {
        boolean stop;

        public abstract boolean visit(K key, V value);
    }
}
```



2.clear

```java
@Override
	public void clear() {
		if (size == 0) return;
		size = 0;
		for (int i = 0; i < table.length; i++) {
			table[i] = null;
		}
	}
```



3.put

```java
@Override
	public V put(K key, V value) {
		int index = index(key);
		// 取出index位置的红黑树根节点
		Node<K, V> root = table[index];
		if (root == null) {
			root = new Node<>(key, value, null);
			table[index] = root;
			size++;
			afterPut(root);
			return null;
		}
		
		// 添加新的节点到红黑树上面
		Node<K, V> parent = root;
		Node<K, V> node = root;
		int cmp = 0;
		K k1 = key;
		int h1 = k1 == null ? 0 : k1.hashCode();
		Node<K, V> result = null;
		boolean searched = false; // 是否已经搜索过这个key
		do {
			parent = node;
			K k2 = node.key;
			int h2 = node.hash;
			if (h1 > h2) {
				cmp = 1;
			} else if (h1 < h2) {
				cmp = -1;
			} else if (Objects.equals(k1, k2)) {
				cmp = 0;
			} else if (k1 != null && k2 != null 
					&& k1.getClass() == k2.getClass()
					&& k1 instanceof Comparable
					&& (cmp = ((Comparable) k1).compareTo(k2)) != 0) {

			} else if (searched) { // 已经扫描了
				cmp = System.identityHashCode(k1) - System.identityHashCode(k2);
			} else { // searched == false; 还没有扫描，然后再根据内存地址大小决定左右
				if ((node.left != null && (result = node(node.left, k1)) != null)
						|| (node.right != null && (result = node(node.right, k1)) != null)) {
					// 已经存在这个key
					node = result;
					cmp = 0;
				} else { // 不存在这个key
					searched = true;
					cmp = System.identityHashCode(k1) - System.identityHashCode(k2);
				}
			}
			
			if (cmp > 0) {
				node = node.right;   //同一个添加的node，为了防止在父节点左右子节点搜索过之后，进入子节点后重复搜索，添加标记记录是否有搜索过。
			} else if (cmp < 0) {
				node = node.left;
			} else { // 相等
				V oldValue = node.value;
				node.key = key;
				node.value = value;
				node.hash = h1;
				return oldValue;
			}
		} while (node != null);

		// 看看插入到父节点的哪个位置
		Node<K, V> newNode = new Node<>(key, value, parent);
		if (cmp > 0) {
			parent.right = newNode;
		} else {
			parent.left = newNode;
		}
		size++;
		
		// 新添加节点之后的处理
		afterPut(newNode);
		return null;
	}
```



4.index：索引

```java
/**
	 * 根据key生成对应的索引（在桶数组中的位置）
	 */
	private int index(K key) {
		if (key == null) return 0;
		int hash = key.hashCode();
		return (hash ^ (hash >>> 16)) & (table.length - 1);
	}
	
	private int index(Node<K, V> node) {
		return (node.hash ^ (node.hash >>> 16)) & (table.length - 1);
	}
```



4.compare

```java
 /**
     * 比较key大小
     *
     * @param k1
     * @param k2
     * @param h1 k1的hashCode
     * @param h2 k2的hashCode
     * @return
     */
    private int compare(K k1, K k2, int h1, int h2) {
        // 1.比较哈希值
        int result = h1 - h2;
        if (result != 0) return result;

        // 2.比较equals
        if (Objects.equals(k1, k2)) return 0;

        // 3.哈希值相等，但是不equals
        if (k1 != null && k2 != null
                && k1.getClass() == k2.getClass()
                && k1 instanceof Comparable) {
            // 同一种类型并且具备可比较性
            if (k1 instanceof Comparable) {
                return ((Comparable) k1).compareTo(k2);
            }
        }

        // 4.同一种类型，哈希值相等，但是不equals，但是不具备可比较性,比较内存地址
        // k1不为null，k2为null
        // k1为null，k2不为null
        return System.identityHashCode(k1) - System.identityHashCode(k2);
    }
```

get

```java
@Override
	public V get(K key) {
		Node<K, V> node = node(key);
		return node != null ? node.value : null;
	}
```



contains

```java
@Override
	public boolean containsKey(K key) {
		return node(key) != null;
	}
```

node

```java
  private Node<E> node(K key) {
        Node<E> node = table[index(key)];
        int h1 = key ==null?0:key.hashCode();
        while (node != null) {
            int cmp = compare(key,node.key,h1,node.hash);
            if (cmp == 0) return node;
            if (cmp > 0) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
        return null;
    }
```

remove

```java
private V remove(Node<K, V> node) {
		if (node == null) return null;
		
		size--;
		
		V oldValue = node.value;
		
		if (node.hasTwoChildren()) { // 度为2的节点
			// 找到后继节点
			Node<K, V> s = successor(node);
			// 用后继节点的值覆盖度为2的节点的值
			node.key = s.key;
			node.value = s.value;
			node.hash = s.hash;
			// 删除后继节点
			node = s;
		}
		
		// 删除node节点（node的度必然是1或者0）
		Node<K, V> replacement = node.left != null ? node.left : node.right;
		int index = index(node);
		
		if (replacement != null) { // node是度为1的节点
			// 更改parent
			replacement.parent = node.parent;
			// 更改parent的left、right的指向
			if (node.parent == null) { // node是度为1的节点并且是根节点
				table[index] = replacement;
			} else if (node == node.parent.left) {
				node.parent.left = replacement;
			} else { // node == node.parent.right
				node.parent.right = replacement;
			}
			
			// 删除节点之后的处理
			afterRemove(replacement);
		} else if (node.parent == null) { // node是叶子节点并且是根节点
			table[index] = null;
		} else { // node是叶子节点，但不是根节点
			if (node == node.parent.left) {
				node.parent.left = null;
			} else { // node == node.parent.right
				node.parent.right = null;
			}
			
			// 删除节点之后的处理
			afterRemove(node);
		}
		
		return oldValue;
	}
```



containsValue

```java
@Override
	public boolean containsValue(V value) {
		if (size == 0) return false;
		Queue<Node<K, V>> queue = new LinkedList<>();
		for (int i = 0; i < table.length; i++) {
			if (table[i] == null) continue;
			
			queue.offer(table[i]);
			while (!queue.isEmpty()) {
				Node<K, V> node = queue.poll();
				if (Objects.equals(value, node.value)) return true;
				
				if (node.left != null) {
					queue.offer(node.left);
				}
				if (node.right != null) {
					queue.offer(node.right);
				}
			}
		}
		return false;
	}
```



遍历

```java
@Override
	public void traversal(Visitor<K, V> visitor) {
		if (size == 0 || visitor == null) return;
		
		Queue<Node<K, V>> queue = new LinkedList<>();
		for (int i = 0; i < table.length; i++) {
			if (table[i] == null) continue;
			
			queue.offer(table[i]);
			while (!queue.isEmpty()) {
				Node<K, V> node = queue.poll();
				if (visitor.visit(node.key, node.value)) return;
				
				if (node.left != null) {
					queue.offer(node.left);
				}
				if (node.right != null) {
					queue.offer(node.right);
				}
			}
		}
	}
```



#### 发现问题

compare（test4、test5）

打印红黑树

问题分析

每次都是通过比较内存，导致地址不同就找不到。

重写node

#### 测试用例

```java
private Node<K, V> node(Node<K, V> node, K k1) {
		int h1 = k1 == null ? 0 : k1.hashCode();
		// 存储查找结果
		Node<K, V> result = null;
		int cmp = 0;
		while (node != null) {
			K k2 = node.key;
			int h2 = node.hash;
			// 先比较哈希值
			if (h1 > h2) {
				node = node.right;
			} else if (h1 < h2) {
				node = node.left;
			} else if (Objects.equals(k1, k2)) {
				return node;
			} else if (k1 != null && k2 != null 
				&& k1.getClass() == k2.getClass()
				&& k1 instanceof Comparable
				&& (cmp = ((Comparable) k1).compareTo(k2)) != 0) {
				node = cmp > 0 ? node.right : node.left;
			} else if (node.right != null && (result = node(node.right, k1)) != null) { 
				return result;
			} else { // 只能往左边找
				node = node.left;
			}
//			} else if (node.left != null && (result = node(node.left, k1)) != null) { 
//				return result;
//			} else {
//				return null;
//			}
		}
		return null;
	}
```

重写put

```

```

优化put

```

```

优化node

优化compare to


#### 测试用例

修复替换值的时候没有更新hash值得bug

#### 代码演化
- 简化put和node
  - 添加的时候默认添加到右边，然后旋转
  - 确定是往右边还是左边，提高效率
- 增加comparable
- 最后的比较策略

- node的hash值调整

## 哈希值的进一步处理：扰动计算 

```java
 private int hash(K key) {
        if (key == null) return 0;
        int h = key.hashCode();
        return (h ^ (h >>> 16)) & (table.length - 1);
}
```
## 装填因子
装填因子（Load Factor）：节点总数量 /哈希表桶数组长度，也叫做负载因子

在JDK1.8的HashMap中，如果装填因子超过0.75，就扩容为原来的2倍

#### 扩容

1.方式一：

将原来的table和红黑树进行遍历，然后重新添加到hashmap中

![image.png](https://upload-images.jianshu.io/upload_images/1128757-c2424b6d24229300.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.将对应索引上的树移动到新的索引上，形成新的树。通过层序遍历。

扩容为原来的2倍之时，节点的索引有2种情况：

- 保持不变；
- index = index + 旧容量

> 因为2进制在前面加了1，然后与或运算之后该位要么是0要么是1；

```
1110

& 11
----
  10
  
  
  
1110
&111
----
 11o
```



步骤

>1.遍历原来的树，然后移动到新的树种
>
>2.每个移动的节点要清空原来的父节点、左右子节点关系
>
>3.添加的时候对比节点只需要考虑往左还是往右边放，没有等于的情况，也不用左右搜索，一定没有。
>
>4.设置newnode的parent
>
>5.新节点的颜色为红色



#### equals的规范

#### 缩容

- 服务器一般不做缩容
- Android专门写了一个HashMap

## TreeMap vs HashMap

何时选择TreeMap？
- 元素具备可比较性且要求升序遍历（按照元素从小到大）

何时选择HashMap？ 
- 无序遍历

## LinkedHashMap
在HashMap的基础上维护元素的添加顺序，使得遍历的结果是遵从添加顺序的

![image-20200821000036625](https://gitee.com/jarrysong/img/raw/master/img/20210414114510.png)

假设添加顺序是：37、21、31、41、97、95、52、42、83

![image-20200821000142003](https://gitee.com/jarrysong/img/raw/master/img/20210414114433.png)

#### 实现LinkHashMap

1.继承hasMap，修改创建节点。

2.通过一个双线链表串联起每一个添加的节点

3.串线，在创建node的时候

4.清空

5.遍历：遍历链表

6.删除：删除链表中的关系，其他不变

7.删除的bug

- 删除度为2的节点node时
  -  需要注意更换 node 与 前驱\后继节点 的连接位置

#### LinkedHashMap – 删除注意点

删除度为2的节点node时（比如删除31） 
- 需要注意更换 node 与 前驱\后继节点 的连接位置（链表中的位置）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-9d4b7707fb620e6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### LinkedHashMap – 更换节点的连接位置

![image.png](https://upload-images.jianshu.io/upload_images/1128757-575372e024936c0f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## HashSet

## LinkHashSet



## 关于使用%来计算索引
如果使用%来计算索引 
- 建议把哈希表的长度设计为素数（质数）
- 可以大大减小哈希冲突 

10%8 = 2 | 10%7 = 3
---|---
20%8 = 4 | 20%7 = 6
30%8 = 6 | 30%7 = 2 
40%8 = 0 | 40%7 = 5 
50%8 = 2 | 50%7 = 1 
60%8 = 4 | 60%7 = 4
70%8 = 6 | 70%7 = 0

右边表格列出了不同数据规模对应的最佳素数，特点如下

- 每个素数略小于前一个素数的2倍
- 每个素数尽可能接近2的幂（2n）

![image.png](https://upload-images.jianshu.io/upload_images/1128757-692ee3a4b786ce48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

