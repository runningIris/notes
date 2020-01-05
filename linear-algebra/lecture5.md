# 转置/置换/向量空间

```
         ⎡1 0 0 0 0⎤ ⎡- - - - -⎤
         ⎢- 1 0 0 0⎥ ⎢0 - - - -⎥
A = LU = ⎢- - 1 0 0⎥ ⎢0 0 - - -⎥
         ⎢- - - 1 0⎥ ⎢0 0 0 - -⎥
         ⎣- - - - 1⎦ ⎣0 0 0 0 -⎦
              L           U
```

### Elimination with Permutations

PA = LU

P: identity matrix with reordered rows

n! counts all n×n permutations

invertable

### Transpose(转置)

A<sup>T</sup><sub>ij</sub> = A<sub>ji</sub>

Symmetric matrix: A<sup>T</sup> = A

Example:
```
⎡3 1 7⎤
⎢1 2 9⎥
⎣7 9 4⎦
```

A<sup>T</sup>· A is always symmetric

```
⎡1 3⎤   ⎡1 2 4⎤   ⎡10 11  7⎤
⎢2 3⎥ * ⎣3 3 1⎦ = ⎢11 13 11⎥
⎣4 1⎦             ⎣ 7 11 17⎦
```

Why take transpose?

(R<sup>T</sup>R)<sup>T</sup> = R<sup>T</sup>R<sup>T</sup><sup>T</sup> = R<sup>T</sup>R

### Vector Space(向量空间)

a bunch of vectors, a space of vectors.

Examples:
1. R<sup>2</sup> = all 2-dimensional real vectors = a (x, y) plane.
    ```
    ⎡3⎤  ⎡0⎤  ⎡9⎤
    ⎣2⎦, ⎣0⎦, ⎣e⎦, ...
    ```
2. R<sup>3</sup> = all column vectors with 3 real components.

3. R<sup>n</sup> = all column vectors with n real components.

**Vector space must be closed under multifications and additions of vectors.**

比如说，R<sup>2</sup>的第一象限不是 vector space, 因为它不闭合。

### Sub space

sub vector spaces inside R<sup>2</sup>

1. any line in R<sup>2</sup> through the zero vector. 过原点的线
2. zero vector 向量零
3. R<sup>2</sup> itself

columns in R<sup>3</sup>, all their combinations form a sub space named column space, C(A)
