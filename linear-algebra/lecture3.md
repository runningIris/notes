# 乘法和逆矩阵
1. Matrix Multification (4 ways)
2. Inverse of A, AB, Aᵀ
3. Gauss Jordon / find A⁻¹

A col * a row
```
⎡2⎤          ⎡2 12⎤
⎢3⎥ * [1 6]= ⎢3 18⎥
⎣4⎦          ⎣4 24⎦
```

AB = sums of (columns of A) * (rows of B)

```
⎡2 7⎤   ⎡1 6⎤  ⎡2 12⎤
⎢3 8⎥ * ⎣0 0⎦= ⎢3 18⎥
⎣4 9⎦          ⎣4 24⎦

⎡2⎤            ⎡7⎤           ⎡2 12⎤
⎢3⎥ * [1 6] +  ⎢8⎥ * [0 0] = ⎢3 18⎥
⎣4⎦            ⎣9⎦           ⎣4 24⎦
```

### Inverses

A⁻¹A=I (left inverse)

A A⁻¹=I (right inverse)

for square matrix, A⁻¹A=I=A A⁻¹

if you can find a vector x with Ax=0, then A doesn't have inverses.

### Gauss Jordon way to find A⁻¹
```
⎡1 3|1 0⎤   ⎡1 0|7 -3⎤
⎣2 7|0 1⎦ = ⎣0 1|-2 1⎦

A⁻¹ = ⎡7 -3⎤
      ⎣-2 1⎦
```

E [A I] = [I ?]

EA = I -> E = A⁻¹

so, EI = E = A⁻¹

so, ? = A⁻¹
