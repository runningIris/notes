# 图和网络

- Graphs & Networks
- Incidence Matrices 关联矩阵
- Kirchhoffs Laws

## Graphs

可用 Matrix 来描述有向图，例：
```
      nodes   edges
    ⎡-1 1 0⎤    1
A = ⎢0 -1 1⎥    2
    ⎣-1 0 1⎦    3

    edges 1,2,3 组成一个 loop
```

## Euler's Formula(欧拉公式)

dim(N(Aᵀ)) = m - r

r = n - 1

-> loops = edges - (nodes - 1)

-> loops + nodes - edges = 1
