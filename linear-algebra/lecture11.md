# 矩阵空间/秩一矩阵/小世界图

- Basis of new vector space
- Rank one matrices
- Small world graphs

## Basis for M = 3 x 3's

- dim(M) = 9
    ```
    ⎡1 0 0⎤ ⎡0 1 0⎤ ⎡0 0 1⎤
    ⎢0 0 0⎥ ⎢0 0 0⎥ ⎢0 0 0⎥
    ⎣0 0 0⎦ ⎣0 0 0⎦ ⎣0 0 0⎦

    ⎡0 0 0⎤ ⎡0 0 0⎤ ⎡0 0 0⎤
    ⎢1 0 0⎥ ⎢0 1 0⎥ ⎢0 0 1⎥
    ⎣0 0 0⎦ ⎣0 0 0⎦ ⎣0 0 0⎦

    ⎡0 0 0⎤ ⎡0 0 0⎤ ⎡0 0 0⎤
    ⎢0 0 0⎥ ⎢0 0 0⎥ ⎢0 0 0⎥
    ⎣1 0 0⎦ ⎣0 1 0⎦ ⎣0 0 1⎦
    ```
- dim(lower triangular) = 6
- dim(upper triangular) = 6

- S ∩ U = symmetric and upper triangular = diagonal(对角矩阵), dim(S ∩ U) = 3
- S + U = any element of S + any element of U = all 3 x 3's, dim(S + U) = 9

## Rank One Matrices

dim(C(A)) = rank = dim(C(Aᵀ))

eg.

```
⎡1 4  5⎤ = ⎡1⎤ * [1 4 5]
⎣2 8 10⎦   ⎣2⎦
```

Rank One Matrix: A = UVᵀ(some column * some row)

## Graphs

Graph = {nodes, edges}
