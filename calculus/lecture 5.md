1. Implicit Differenciation (隐函数微分)

```
   x² + y² = 1
   
        d
  -->  -- (x² + y²) = 0
       dx
   
        d         d
  -->  -- (x²) + --(y²) = 0
       dx        dx
   
             d   dy
  -->  2x + -- · -- · y² = 0
            dy   dx
        
  --> 2x + 2y · y' = 0
   
  --> y' = x/y
  
```

如果知道 x 和 y 的值，便能轻松求导

2. Inplicit can differentiate any inverse fn (反函数), provided we know the derivative fn. 
   只要知道原函数的微分方程，使用隐函数便可求导任何反函数

   𝑓(x) = tanx; 𝑓⁻¹(x) = tan⁻¹x = arctanx
   
   y = tan⁻¹x (x, y 坐标对调)
   
   ```
   tany = x
   
    d         d
   -- tany = -- · x
   dx        dx
   
    d   dy
   -- · -- · tany = 1
   dy   dx
   
    d
   -- · tany · y' = 1
   dy
   
     1
   ----- · y' = 1
   cos²y
   
   y' = cos²y = cos²(arctanx) -> 这是正确的答案，但不是我们想要的方程
   
   想象 tany = x 的图像，y 为直角三角形的一个角，对边的长度为 x, 邻边的长度为 1, 则 tany = x 成立
   
   此时 cos²y = 1 / (x² + 1) 斜边可以根据勾股定理计算得到
   
   所以 y' = 1 / (x² + 1)
   
   妙啊！
   
   ```
