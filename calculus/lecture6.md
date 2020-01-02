# 指数和对数函数的导数，对数微分法

### 尝试求 y = aˣ 的导数，part 1

```

 d            aˣ⁺▵ˣ - aˣ              a▵ˣ - 1 
-- aˣ = lim  ------------  -> aˣ lim ---------
dx     ▵ˣ->0      ▵ˣ             ▵ˣ->0   ▵ˣ

       a▵ˣ - 1 
令 lim --------- = M(a)
  ▵ˣ->0   ▵ˣ

 d
-- aˣ = aˣ· M(a)
dx

算到这里就卡住了，另寻出路：

当 x = 0 时，

 d
-- aˣ⎮    = M(a)
dx   ⎮x=0

此时 M(a) 代表着 x = 0 时, y 的导数(斜率)。

设 e = a, 有 M(e) = 1, 

    d
得 -- eˣ= eˣ (* 重要式子)
   dx  
   
```
#### 引入自然对数 e, 求导 lnx

Natural Log: w = lnx

defines "ln": y = eˣ -> lny = x

- ln(m * n) = lnm + lnn
- ln1 = 0, lne = 1

to find d/dx lnx, using implicit differentiation.

```
w = lnx -> eʷ = x

 d
-- eʷ = 1
dx

 d   dw
-- · -- · eʷ = 1
dw   dx

 d
-- · eʷ · w' = 1
dw

w' = 1/eʷ = 1/x

 d        1
-- lnx = ---
dx        x
```

### 2. 求 y = log𝖺x 的导数
