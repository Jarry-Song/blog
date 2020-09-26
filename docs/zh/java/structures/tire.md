# tire
## 需求
如何判断一堆不重复的字符串是否以某个前缀开头？
- 用Set\Map存储字符串
- 遍历所有字符串进行判断
- 时间复杂度：O(n)

有没有更优的数据结构实现前缀搜索？
- Trie

## Tire
- Trie 也叫做字典树、前缀树（Prefix Tree）、单词查找树
- Trie 搜索字符串的效率主要跟字符串的长度有关
- 假设使用 Trie 存储 cat、dog、doggy、does、cast、add 六个单词
![](https://gitee.com/jarrysong/img/raw/master/img/20200916080209.png)

## 接口设计
```java
int size(); 
boolean isEmpty(); 
void clear(); 
boolean contains(String str); 
void add(String str); 
void remove(String str); 
boolean starsWith(String prefix);
```

```java
int size(); 
boolean isEmpty(); 
void clear(); 
boolean contains(String str); 
V add(String str, V value); 
V remove(String str); 
boolean starsWith(String prefix); 
```

## 实现
Node设计

clear、get、contains

add

startWith

调整代码

remove


                



## 总结
rie 的优点：搜索前缀的效率主要跟前缀的长度有关

Trie 的缺点：需要耗费大量的内存，因此还有待改进

更多Trie 相关的数据结构和算法 
- Double-array Trie、Suffix Tree、Patricia Tree、Crit-bit Tree、AC自动机