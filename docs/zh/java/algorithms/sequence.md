# 串（Sequence）

## 串（Sequence）
本课程研究的串是开发中非常熟悉的字符串，是由若干个字符组成的有限序列

![image-20201019083717219](https://gitee.com/jarrysong/img/raw/master/img/image-20201019083717219.png)

字符串 thank 的前缀（prefix）、真前缀（proper prefix）、后缀（suffix）、真后缀（proper suffix）

![image-20201019083802166](https://gitee.com/jarrysong/img/raw/master/img/image-20201019083802166.png)

## 串匹配算法
本课程主要研究串的匹配问题，比如 

- 查找一个模式串（pattern）在文本串（text）中的位置

![image-20201019083902921](https://gitee.com/jarrysong/img/raw/master/img/image-20201019083902921.png)

几个经典的串匹配算法 

- 蛮力（Brute Force） 
- KMP 
- Boyer-Moore 
- Karp-Rabin 
- Sunday

本课程用 tlen 代表文本串 text 的长度，plen 代表模式串 pattern 的长度 

## 蛮力（Brute Force）
以字符为单位，从左到右移动模式串，直到匹配成功

![image-20201019084123763](https://gitee.com/jarrysong/img/raw/master/img/image-20201019084123763.png)

蛮力算法有 2 种常见实现思路

### 蛮力1 – 执行过程

![image-20201019084335763](https://gitee.com/jarrysong/img/raw/master/img/image-20201019084335763.png)

![image-20201019084746293](https://gitee.com/jarrysong/img/raw/master/img/image-20201019084746293.png)

### 蛮力1 – 实现

```java
public static int indexOf1(String text, String pattern){
    if(text == null || pattern == null) return -1;
    char[] tChars = text.toCharArray();
    char[] pChars = pattern.toCharArray();
    int tlen = tChars.length;
    int plen = pChars.length;
    if(tlen == 0 || plen == 0 || tlen < plen) return -1;
    int ti = 0, pi = 0;
    //当ti和pi都未到达字符串尾部,那么字符串匹配还未完成
    while(ti < tlen && pi < plen){
        if(pChars[pi] == tChars[ti]){
            pi++;
            ti++;
        }else{
            ti = ti - pi + 1;  //下一次比较时ti的起始位置, ti-pi: 本次比较中ti的起始位置
            pi = 0;
        }
    }
    return pi == plen ? ti-pi: -1;
}
```

### 蛮力1 – 优化
此前实现的蛮力算法，在恰当的时候可以提前退出，减少比较次数 

![image-20201019085750398](https://gitee.com/jarrysong/img/raw/master/img/image-20201019085750398.png)

因此，ti 的退出条件可以从 ti < tlen 改为 

- ti – pi <= tlen – plen 
- ti – pi 是指每一轮比较中 text 首个比较字符的位置

### 蛮力1 – 优化实现

```java
public static int indexOf1_1(String text, String pattern){
    if(text == null || pattern == null) return -1;
    char[] tChars = text.toCharArray();
    char[] pChars = pattern.toCharArray();
    int tlen = tChars.length;
    int plen = pChars.length;
    if(tlen == 0 || plen == 0 || tlen < plen) return -1;
    int ti = 0, pi = 0;
    int tmax = tlen-plen;
    //当ti和pi都未到达字符串尾部,那么字符串匹配还未完成
    while(ti-pi <= tmax && pi < plen){
        if(pChars[pi] == tChars[ti]){
            pi++;
            ti++;
        }else{
            ti = ti - pi + 1;
            pi = 0;
        }
    }
    return pi == plen ? ti-pi: -1;
}
```

### 蛮力2 – 执行过程

![image-20201019090543338](https://gitee.com/jarrysong/img/raw/master/img/image-20201019090543338.png)

![image-20201020084333374](https://gitee.com/jarrysong/img/raw/master/img/image-20201020084333374.png)

### 蛮力2 – 实现

```java
public static int indexOf2(String text, String pattern){
    if(text == null || pattern == null) return -1;
    char[] tChars = text.toCharArray();
    char[] pChars = pattern.toCharArray();
    int tlen = tChars.length;
    int plen = pChars.length;
    if(tlen == 0 || plen == 0 || tlen < plen) return -1;
    int ti = 0, tmax = tlen-plen;
    //当ti和pi都未到达字符串尾部,那么字符串匹配还未完成
    for (;ti < tmax;ti++){
       int pi = 0;
       for(;pi < plen; pi++){
           if(tChars[ti + pi] != pChars[pi]) break;
       }
       if(pi == plen) return ti;
    }
    return -1;
}
```

### 蛮力 – 性能分析
n 是文本串长度，m 是模式串长度

![image-20201020084540693](https://gitee.com/jarrysong/img/raw/master/img/image-20201020084540693.png)

最好情况 

- 只需一轮比较就完全匹配成功，比较 m 次（ m 是模式串的长度） 
- 时间复杂度为 O(m)

![image-20201020084637861](https://gitee.com/jarrysong/img/raw/master/img/image-20201020084637861.png)

最坏情况（字符集越大，出现概率越低） 

- 执行了 n – m + 1 轮比较（ n 是文本串的长度）
- 每轮都比较至模式串的末字符后失败（ m – 1 次成功，1 次失败） 
- 时间复杂度为 O(m ∗ (n − m + 1))，由于一般 m 远小于 n，所以为 O(mn)

![image-20201020084720870](https://gitee.com/jarrysong/img/raw/master/img/image-20201020084720870.png)

## KMP

KMP 是 Knuth–Morris–Pratt 的简称（取名自3位发明人的名字），于1977年发布

![image-20201020085348259](https://gitee.com/jarrysong/img/raw/master/img/image-20201020085348259.png)

### 蛮力 vs KMP

![image-20201020085133627](https://gitee.com/jarrysong/img/raw/master/img/image-20201020085133627.png)

对比蛮力算法，KMP的精妙之处：充分利用了此前比较过的内容，可以很聪明地跳过一些不必要的比较位置

### KMP – next表的使用
KMP 会预先根据模式串的内容生成一张 next 表（一般是个数组）![image-20201020085546792](https://gitee.com/jarrysong/img/raw/master/img/image-20201020085546792.png)

![image-20201020085714202](https://gitee.com/jarrysong/img/raw/master/img/image-20201020085714202.png)

### KMP – 核心原理

![image-20201020085946970](https://gitee.com/jarrysong/img/raw/master/img/image-20201020085946970.png)

当 d、e 失配时，如果希望 pattern 能够一次性向右移动一大段距离，然后直接比较 d、c 字符 

- 前提条件是 A 必须等于 B 

所以 KMP 必须在失配字符 e 左边的子串中找出符合条件的 A、B，从而得知向右移动的距离

向右移动的距离：e左边子串的长度 – A的长度，等价于：e的索引 – c的索引 

且 c的索引 == next[e的索引]，所以向右移动的距离：e的索引 – next[e的索引] 

总结 

- 如果在 pi 位置失配，向右移动的距离是 pi – next[pi]，所以 next[pi] 越小，移动距离越大 
- next[pi] 是 pi 左边子串的真前缀后缀的最大公共子串长度 

### KMP – 真前缀后缀的最大公共子串长度

![image-20201020090922614](https://gitee.com/jarrysong/img/raw/master/img/image-20201020090922614.png)

### KMP – 得到next表

![image-20201020091007345](https://gitee.com/jarrysong/img/raw/master/img/image-20201020091007345.png)

将最大公共子串长度都向后移动 1 位，首字符设置为 负1，就得到了 next 表

![image-20201020091027128](https://gitee.com/jarrysong/img/raw/master/img/image-20201020091027128.png)

### KMP – 负1的精妙之处



相当于在负1位置有个假想的通配字符（哨兵），匹配成功后 ti++、pi++ 

### KMP – 主算法实现

```java
public static int indexOf(String text, String pattern){
    if(text == null || pattern == null) return -1;
    char[] tChars = text.toCharArray();
    char[] pChars = pattern.toCharArray();
    int tlen = tChars.length;
    int plen = pChars.length;
    if(tlen == 0 || plen == 0 || tlen < plen) return -1;
    int[] next = nextr(pChars);
    int ti = 0, pi = 0;
    int imax = tlen-plen;
    //当ti和pi都未到达字符串尾部,那么字符串匹配还未完成
    while(ti-pi <= imax && pi < plen){
        if(pi < 0 || pChars[pi] == tChars[ti]){
            pi++;
            ti++;
        }else{
            pi = next[pi];
        }
    }
    return pi == plen ? ti-pi: -1;
}
```

### KMP – 为什么是“最大“公共子串长度？ 

假设文本串是AAAAABCDEF，模式串是AAAAB

![image-20201020130609574](https://gitee.com/jarrysong/img/raw/master/img/image-20201020130609574.png)

应该将1、2、3中的哪个值赋值给 pi 是正确的？

将 3 赋值给 pi 

- 向右移动了 1 个字符单位，最后成功匹配

将 1 赋值给 pi 

- 向右移动了 3 个字符单位，错过了成功匹配的机会

公共子串长度越小，向右移动的距离越大，越不安全 

公共子串长度越大，向右移动的距离越小，越安全 

### KMP – next表的构造思路

![image-20201020131014107](https://gitee.com/jarrysong/img/raw/master/img/image-20201020131014107.png)

已知 next[i] == n
① 如果 pattern.charAt(i) == pattern.charAt(n) 

- 那么 next[i + 1] == n + 1

② 如果 pattern.charAt(i) != pattern.charAt(n) 

- 已知 next[n] == k 
- 如果 pattern.charAt(i) == pattern.charAt(k) 
- ✓那么 next[i + 1] == k + 1
- 如果 pattern.charAt(i) != pattern.charAt(k) 
- ✓将 k 代入 n ，重复执行 ②



### KMP – next表的代码实现  

```java
private static int[] next(char[] pChars) {
    int len = pChars.length;
    int[] next = new int[len];
    int i = 0;
    int n = next[0] = -1;
    int imax = len-1;
    while(i < imax){
        if(n < 0 || pChars[i] == pChars[n]){
            next[++i] = ++n;
        }else{
            n = next[n];
        }
    }
    return next;
}
```



### KMP – next表的不足之处 

假设文本串是 AAABAAAAB ，模式串是 AAAAB

![image-20201021080925312](https://gitee.com/jarrysong/img/raw/master/img/image-20201021080925312.png)

在这种情况下，KMP显得比较笨拙

### KMP – next表的优化思路

已知：next[i] == n，next[n] == k

![image-20201021081106646](https://gitee.com/jarrysong/img/raw/master/img/image-20201021081106646.png)

- 如果 pattern[i] != d，就让模式串滑动到 next[i]（也就是n）位置跟 d 进行比较 
- 如果 pattern[n] != d，就让模式串滑动到 next[n]（也就是k）位置跟 d 进行比较 
- 如果 pattern[i] == pattern[n]，那么当 i 位置失配时，模式串最终必然会滑到 k 位置跟 d 进行比较 

**所以 next[i] 直接存储 next[n]（也就是k）即可**

### KMP – next表的优化实现 

```java
private static int[] next(char[] pChars) {
    int len = pChars.length;
    int[] next = new int[len];
    int i = 0;
    int n = next[0] = -1;
    int imax = len-1;
    while(i < imax){
        if(n < 0 || pChars[i] == pChars[n]){
            i++;
            n++;
            if(pChars[i] == pChars[n]){
                next[i] = next[n];
            }else{
                next[i] = n;
            }
        }else{
            n = next[n];
        }
    }
    return next;
}
```

### KMP – next表的优化效果

![image-20201021081511542](https://gitee.com/jarrysong/img/raw/master/img/image-20201021081511542.png)

### KMP – 性能分析

![image-20201021081647543](https://gitee.com/jarrysong/img/raw/master/img/image-20201021081647543.png)

**KMP 主逻辑**

- 最好时间复杂度：O(m) 
- 最坏时间复杂度：O(n)，不超过O(2n)

next 表的构造过程跟 KMP 主体逻辑类似 ,时间复杂度：O(m)

**KMP 整体** 

- 最好时间复杂度：O(m) 
- 最坏时间复杂度：O(n + m) 
- 空间复杂度： O(m)

## 蛮力 vs KMP
蛮力算法为何低效？

当字符失配时

蛮力算法 

- ✓ti 回溯到左边位置 
- ✓pi 回溯到 0

KMP 算法 

- ✓ti 不必回溯 
- ✓pi 不一定要回溯到 0
  

## BN

![image-20201021083320107](https://gitee.com/jarrysong/img/raw/master/img/image-20201021083320107.png)

### 坏字符（Bad Character）

![image-20201021083455539](https://gitee.com/jarrysong/img/raw/master/img/image-20201021083455539.png)

### 好后缀（Good Suffix）

![image-20201021083618266](https://gitee.com/jarrysong/img/raw/master/img/image-20201021083618266.png)

### BM的最好情况

![image-20201021083702084](https://gitee.com/jarrysong/img/raw/master/img/image-20201021083702084.png)

### BM的最坏情况

![image-20201021083752988](https://gitee.com/jarrysong/img/raw/master/img/image-20201021083752988.png)

## RK

![image-20201021083857220](https://gitee.com/jarrysong/img/raw/master/img/image-20201021083857220.png)

## Sunday

![image-20201021083935354](https://gitee.com/jarrysong/img/raw/master/img/image-20201021083935354.png)