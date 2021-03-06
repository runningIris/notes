# 矩阵消元

### Elimination(消元)

```
 x + 2y + z = 2
3x + 8y + z = 12
     4y + z = 2

⎡1 2 1⎤ ⎡x⎤    ⎡ 2⎤
⎢3 8 1⎥ ⎢y⎥ =  ⎢12⎥
⎣0 4 1⎦ ⎣z⎦    ⎣ 2⎦
   A     x       b

⎡1 2 1｜ 2⎤ (2, 1)  ⎡1 2  1｜2⎤ (3, 2)  ⎡1 2  1｜  2⎤
⎢3 8 1｜12⎥ ------> ⎢0 2 -2｜6⎥ ------> ⎢0 2 -2｜  6⎥  
⎣0 4 1｜ 2⎦         ⎣0 4  1｜2⎦         ⎣0 0  5｜-10⎦
```

U = E<sub>32</sub>  E<sub>21</sub> A

主元(pivot)不能为0

### Back Substitution(回代)

```
① x + 2y + z = 2
② 2y - 2z = 6
③ 5z = -10
```

把③代入②中得到 y 的值，再把 ③, ② 求出来的值代入 ① 中得到 x 的值，这个过程称为回代。

### 矩阵相乘

Column Operation

```
⎡1 2 1⎤ ⎡3⎤      ⎡1⎤     ⎡2⎤     ⎡1⎤   ⎡16⎤
⎢3 8 1⎥ ⎢4⎥ =  3*⎢3⎥ + 4*⎢8⎥ + 5*⎢1⎥ = ⎢46⎥
⎣0 4 1⎦ ⎣5⎦      ⎣0⎦     ⎣4⎦     ⎣1⎦   ⎣21⎦
```

Row Operation

```
          ⎡1 2 1⎤
[1 2 7] * ⎢3 8 1⎥ = 1*[1 2 1] + 2*[3 8 1] + 7*[0 4 1] = [7 46 10]
          ⎣0 4 1⎦
```

使用 Row Operation 可计算 E<sub>21</sub>:
```
⎡ 1 0 0⎤ ⎡1 2 1⎤   ⎡1 2  1⎤
⎢-3 1 0⎥ ⎢3 8 1⎥ = ⎢0 2 -2⎥
⎣ 0 0 1⎦ ⎣0 4 1⎦   ⎣0 4  1⎦
    *
```

还有 E<sub>32</sub>:
```
⎡1  0 0⎤  ⎡1 2  1⎤   ⎡1 2  1⎤
⎢0  1 0⎥  ⎢0 2 -2⎥ = ⎢0 2 -2⎥
⎣0 -2 1⎦  ⎣0 4  1⎦   ⎣0 0  5⎦
    *
```

E<sub>32</sub>  E<sub>21</sub> A = U

令 E = E<sub>32</sub>  E<sub>21</sub>，则 EA = U，
可计算出E的值：
```
⎡ 1 0 0⎤ ⎡1  0 0⎤   ⎡ 1  0 0⎤
⎢-3 1 0⎥ ⎢0  1 0⎥ = ⎢-3  1 0⎥
⎣ 0 0 1⎦ ⎣0 -2 1⎦   ⎣ 0 -2 1⎦
                        *
```

### Permutation Matrix 置换矩阵

- Exchange rows 1 and 2, using Row Operation, multiplies on the left:
  ```
  ⎡0 1 0⎤ ⎡1 2 1⎤   ⎡3 8 1⎤
  ⎢1 0 0⎥ ⎢3 8 1⎥ = ⎢1 2 1⎥
  ⎣0 0 1⎦ ⎣0 4 1⎦   ⎣0 4 1⎦
     *
  ```

- Exchange cols 1 and 3, using Column Operation, multiplies on the right:
  ```
  ⎡1 2 1⎤ ⎡0 0 1⎤   ⎡1 2 1⎤
  ⎢3 8 1⎥ ⎢0 1 0⎥ = ⎢1 8 3⎥
  ⎣0 4 1⎦ ⎣1 0 0⎦   ⎣1 4 0⎦
             *
  ```

### Inverses 逆矩阵

```
⎡1 0 0⎤ ⎡ 1 0 0⎤   ⎡1 0 0⎤
⎢3 1 0⎥ ⎢-3 1 0⎥ = ⎢0 1 0⎥
⎣0 0 1⎦ ⎣ 0 0 1⎦   ⎣0 0 1⎦
   E⁻¹      E         I
```

I: identity matrix 
