# Unit 2: Applications of Differentiation

## Linear Approximations

**使用微分可以求得一些本来很难的函数的值**

由导数的 limit 方程可推导出：
```
f(x) ≈ f(x₀) + f'(x₀)(x - x₀), when x ≈ x₀
HARD            EASY
```
Example:

f(x) = lnx, x₀ = 1

lnx ≈ x - 1

当 x = 1 时，lnx 和 x 的图像无限贴近

### sinx, cosx, eˣ

x₀ = 0, f(x) = f(0) + f'(0)(x), when x ≈ 0

|  f(x) |    f'   |f(0)|f'(0)|result, x≈0|
|-------|---------|----|-----|-----------|
|  sinx |   cosx  |  0 |  1  |   y = x   |
|  cosx |  -sinx  |  1 |  0  |   y = 1   |
|   eˣ  |    eˣ   |  1 |  1  | y = x + 1 |
|ln(1+x)| 1/(x+1) |  0 |  1  |   y = x   |
| (1+x)ʳ|r(1+x)ʳ⁻¹|  1 |  r  | y = rx + 1|

- Example 2: ln1.1 ≈ 0.1

- Example 3:
    ```
    e⁻³ˣ/(1+x)½, x ≈ 0

    f(x) ≈ (1 - 3x)(x/2 + 1)
         = (3/2)x² - (7/2)x + 1
         ≈ 1 - (7/2)x (舍弃二次项或以上)
    ```
- Example 4: (real life)

    对于人造卫星上的时间(T)和地球上拿着 GPS 的人的时间(T')之间有个关系: Timedilation(时间膨胀), 基于狭义相对论。

    T' = T·(1 - v²/c²)⁻½

    u = v²/c²

    T' = T·(1-u)⁻½ = T·(1 + u/2) = T·(1 + v²/2c²)

    in this case, v = 4km/s, c = 3*10⁵km/s

    so, u = v²/c² ≈ 10⁻¹⁰

### Quadratic Approximations

```
f(x) ≈ f(x₀) + f'(x₀)(x - x₀) + f''(x)/2 · (x - x₀)², when x ≈ x₀
```

Example:

ln1.1 = ln(1 + 1/10) ≈ 1/10 - (1/2) * (1/10)² = 0.095

x₀ = 0, f(x) = f(0) + f'(0)(x) + (f''(0)/2) * x², when x ≈ 0
