# 指数和对数函数的导数，对数微分法

### 求 eˣ 的导数

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

### 引入自然对数 e, 因为已知 eˣ 的导数，使用 implicit differentiation 可求导 lnx

Natural Log: w = lnx

defines "ln": y = eˣ -> lny = x

- ln(m * n) = lnm + lnn
- ln1 = 0, lne = 1

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


### 求 aˣ 的导数

#### Method 1: 把 aˣ 转换为以 e 为底的指数

```
aˣ = (eˡⁿᵃ)ˣ = (eˣ)ˡⁿᵃ

 d
-- aˣ = lna(eˣˡⁿᵃ) = lna · aˣ
dx
```

由此可得，M(a) = lna

---

对于 自然对数 e 的思考：无论底数是什么，总是可以转换成自然对数（所以说“自然”）

eg:
```
 d
-- 2ˣ = (ln2) · 2ˣ
dx

 d
-- 10ˣ = (ln10) · 10ˣ
dx
```

#### Method 2: Logarithmic Differentiation

有时候直接求导原函数会很难，这时候可以考虑求导其对数函数

```
 d                d
-- u = ???,  but -- lnu is easier, the basic identity is the chain rule
dx               dx 

 d        d   du          1          u'
-- lnu = -- · -- · lnu = --- · u' = ---
dx       du   dx          u          u

(lnu)' = u'/u

```

使用上述公式求导 aˣ, u = aˣ, (lnaˣ)' = (aˣ)'/aˣ 

u' = (lnaˣ)' · aˣ = (xlna)' · aˣ = (lna) · aˣ

### differentiatiate with moving exponent: v = xˣ

使用 Method 2

```
 lnv = lnxˣ = x · lnx
 
  d        v'     d
 -- lnv = --- -> -- · x · lnx = v' / xˣ
 dx        v     dx
 
 1 + lnx = v' / xˣ
```

 v' = xˣ · (1 + lnx)
 
 ### 求出以下式子的值：
 
 ```     
            1
   lim (1 + -)ⁿ
   n->∞     n
```

使用对数微分法（Method 2）：

```
   ln((1 + 1/n)ⁿ) = n · ln(1 + 1/n)
   
   令 △x = 1/n, 当 n -> ∞, △x -> 0,
   
                    ln(1 + △x) - ln1    d           
   ln((1 + 1/n)ⁿ) = ---------------- = -- lnx|    = 1/x = 1
                           △x          dx    |x=1
   
   回代原来的式子：
            1
   lim (1 + -)ⁿ = e^(ln((1 + 1/n)ⁿ)) = e^1 = e
   n->∞     n
   
```
（可使用原式子来计算自然对数 e 的值）
