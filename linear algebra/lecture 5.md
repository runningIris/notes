1. 对 Ax = 0 求解（模拟算法）

```
        ⎡1 2 2  2⎤   eliminate  ⎡1 2 2 2⎤
    A = ⎢2 4 6  8⎥   ========>  ⎢0 0 2 4⎥ 
        ⎣3 6 8 10⎦              ⎣0 0 0 0⎦
                                ↑ ↑ ↑ ↑
                                ①②①②
                                
                                ① -> privot columns
                                ② -> free columns (can be assigned to any number)
```
