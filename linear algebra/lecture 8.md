# 求解 Ax=b; 可解性和解的结构


```
    ⎡1 2 2  2 | b₁⎤    ⎡1 2 2 2 |     b₁⎤    ⎡1 2 2 2 |       b₁⎤
    ⎢2 4 6  8 | b₂⎥ -> ⎢0 0 2 4 | b₂-2b₁⎥ -> ⎢0 0 2 4 |   b₂-2b₁⎥
    ⎣3 6 8 10 | b₃⎦    ⎣0 0 2 4 | b₃-3b₁⎦    ⎣0 0 0 0 | b₃-b₂-b₁⎦ -> b₃-b₂-b₁ = 0

增广矩阵(Augmented Matrix) = [A b]
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
