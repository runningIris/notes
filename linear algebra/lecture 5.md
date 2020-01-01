1. 对 Ax = 0 求解（模拟算法）

```
        ⎡1 2 2  2⎤   eliminate  ⎡1 2 2 2⎤
    A = ⎢2 4 6  8⎥   ========>  ⎢0 0 2 4⎥ 
        ⎣3 6 8 10⎦              ⎣0 0 0 0⎦
                                 ↑ ↑ ↑ ↑
                                 ①②①②
                                
                                ① -> privot columns
                                ② -> free columns (can be assigned to any number)
                                
   x₁ + 2x₂ + 2x₃ + 2x₄ = 0
              2x₃ + 4x₄ = 0
   
   if we let x₁ = 1, x₃ = 0;
   
                              ⎡-2⎤
                              ⎢ 1⎥
   then we get the answer c * ⎢ 0⎥ (c = constant) 四维空间里的一条线
                              ⎣ 0⎦
```
