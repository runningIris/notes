# 方程组的几何解释

### Row Picture 行图像


2x - y = 0
-x + 2y = 3

使用矩阵来表示：

```
⎡2 -1⎤ ⎡x⎤= ⎡0⎤
⎣-1 2⎦ ⎣y⎦  ⎣3⎦
   A    x =  b
```

对于一个 2 * 2 non-singular matrix，x = 二维平面上的一个点（两条直线相交）


### Columns Picture 列图像

对于

```
⎡2 -1⎤ ⎡x⎤= ⎡0⎤
⎣-1 2⎦ ⎣y⎦  ⎣3⎦

有向量 ⎡2 ⎤， 向量 ⎡-1⎤， 向量 ⎡0⎤
      ⎣-1⎦       ⎣ 2⎦       ⎣3⎦
      
⎡2 ⎤ * x + ⎡-1⎤ * y = ⎡0⎤
⎣-1⎦       ⎣ 2⎦       ⎣3⎦  

```

前两个向量乘以倍数相加等于第三个向量

所有的(x, y)组合，能铺满整个二维平面

### 矩阵相乘

```
⎡2 5⎤ ⎡1⎤   ⎡12⎤
⎢   ⎥ ⎢ ⎥ = ⎢  ⎥ 
⎣1 3⎦ ⎣2⎦   ⎣ 7⎦
```
