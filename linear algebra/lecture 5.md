1. 对 Ax = 0（null space） 求解（模拟算法）

```
        ⎡1 2 2  2⎤   eliminate  ⎡1 2 2 2⎤
    A = ⎢2 4 6  8⎥   ========>  ⎢0 0 2 4⎥ 
        ⎣3 6 8 10⎦              ⎣0 0 0 0⎦
                                 ↑ ↑ ↑ ↑
                                 ①②①②
                                
                                ① -> privot columns
                                ② -> free columns (can be assigned to any number)
                                
   r (rank A) = the number of privot columns
   
   number of free columns = n - r
                                
   x₁ + 2x₂ + 2x₃ + 2x₄ = 0
              2x₃ + 4x₄ = 0
   
   if we let x₁ = 1, x₃ = 0;
   
                                        ⎡-2⎤
                                        ⎢ 1⎥
   then we get an special solution: c * ⎢ 0⎥ (c = constant) 四维空间里的一条线
                                        ⎣ 0⎦
                                        
   if we let x₁ = 0, x₃ = 1; then we get another special solution. for every pair of free column (x₁, x₃), we have a special solution.
```

2. 使用 Matlab 简化 A (rref 命令的执行原理)
   reduce row echelon(梯形) form

```
        ⎡1 2 2  2⎤    ⎡1 2 2 2⎤    ⎡1 2 0 -2⎤    ⎡1 2 0 -2⎤
    A = ⎢2 4 6  8⎥ => ⎢0 0 2 4⎥ => ⎢0 0 2  4⎥ => ⎢0 0 1  2⎥ = R = rref(A)
        ⎣3 6 8 10⎦    ⎣0 0 0 0⎦    ⎣0 0 0  0⎦    ⎣0 0 0  0⎦

   最后得到的 R 消去了重复的行（一行全都是0的行表示有重复的行），显示了 free columns 和 privet columns，还包含了一个 identity matrix
   
   
         ⎡-F⎤
   x = c ⎢  ⎥ ???
         ⎣ I⎦
     
```

