# A的LU分解

E<sub>32</sub>E<sub>31</sub>E<sub>21</sub>A = U

A = E<sup>-1</sup><sub>21</sub>E<sup>-1</sup><sub>31</sub>E<sup>-1</sup><sub>32</sub>U = LU

### How many operations on n×n matrix A

n=100

1/3 n<sup>3</sup>

### Permutations 3×3

6P in this group

```
⎡1 0 0⎤
⎢0 1 0⎥
⎣0 0 1⎦

⎡1 0 0⎤
⎢0 0 1⎥
⎣0 1 0⎦

⎡0 1 0⎤
⎢1 0 0⎥
⎣0 0 1⎦

⎡0 1 0⎤
⎢0 0 1⎥
⎣1 0 0⎦

⎡0 0 1⎤
⎢0 1 0⎥
⎣1 0 0⎦

⎡0 0 1⎤
⎢1 0 0⎥
⎣0 1 0⎦
```

以上的矩阵两两相乘得到的结果仍在上面的  group 内
