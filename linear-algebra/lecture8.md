# 求解 Ax=b; 可解性和解的结构


```
    ⎡1 2 2  2 | b₁⎤    ⎡1 2 2 2 |     b₁⎤    ⎡1 2 2 2 |       b₁⎤
    ⎢2 4 6  8 | b₂⎥ -> ⎢0 0 2 4 | b₂-2b₁⎥ -> ⎢0 0 2 4 |   b₂-2b₁⎥
    ⎣3 6 8 10 | b₃⎦    ⎣0 0 2 4 | b₃-3b₁⎦    ⎣0 0 0 0 | b₃-b₂-b₁⎦ -> b₃-b₂-b₁ = 0

增广矩阵(Augmented Matrix) = [A | b]
```
```
        ⎡1⎤
let b = ⎢5⎥ -> OK
        ⎣6⎦
```        

**solvability**: condition on b

**Definition**: Ax=b is solvable when b is in C(A) (column space of A). 如果 b 存在于 A 的列空间之中，则 Ax=b 有解。

In other language: if a combination of the rows of A gives the zero row, then the same combination of the entries of b must give zero. 也就是说，如果矩阵 A 的行组合得出一个空行，那么相对应 b 的组合也会给出 0 值。

### To find complete solution to Ax=b

1. x<sub>particular</sub>: set all free variables to zero, solve Ax=b for privot variables.

```
   x₁ + 2x₃ = 1
        2x₃ = 3

   ->  x₁ = -2, x₃ = 3/2

        ⎡ -2⎤
        ⎢  0⎥
   x𝗉 = ⎢3/2⎥
        ⎣  0⎦
```

2. x<sub>nullspace</sub>

    x<sub>complete</sub> = x<sub>𝗉</sub> + x<sub>𝗇</sub>( any vector in the nullspace )

    A x 𝗉=b

    A x 𝗇=0

    -> A(x𝗉 + x𝗇) = b

    x = 一个特解+任意零空间上的解

## m by n matrix A of rank r

r <= m, r <= n

the rank of matrix determines the number of solutions

- Full column rank: r = n

    ```
    R = ⎡I⎤
        ⎣0⎦
    ```


    1 or 0 solution

- Full row rank: r = m

    ```
    A = ⎡1 2 6 5⎤ -> ⎡1 0 F⎤
        ⎣3 1 1 1⎦    ⎣0 1  ⎦
                        R
    ```
    Can solve Ax=b for every b

- Full rank: r = m = n

    ```
    A = ⎡1 2⎤ -> ⎡1 0⎤
        ⎣3 1⎦    ⎣0 1⎦
                   R
    ```
    1 Solution

- r < m && r < n

    ```
    R = ⎡I F⎤
        ⎣0 0⎦
    ```

    0 or ∞ solutions
