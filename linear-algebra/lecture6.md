# 列空间和零空间

### Vector spaces and Subspaces

for R<sup>3</sup>, a plane through
```
⎡0⎤
⎢0⎥
⎣0⎦
```
 is a subspace.

for 2 subspaces: P and L

1. P ⋃ L is not a subspace
2. P ⋂ L is a subspace

### Column space of A: Solving
```
⎡1 1 2⎤ ⎡x⎤   ⎡ ⎤
⎢2 1 3⎥ ⎢y⎥ = ⎢ ⎥
⎢3 1 4⎥ ⎣z⎦   ⎢ ⎥
⎣4 1 5⎦       ⎣ ⎦
   A     x  =  b
```
Ax=b can be solved, exactly when b is in the column space of A.

由于 col1 + col2 = col3, 所以 col3 是没用的 column.

### Nullspace of A

the combinations of solutions x of Ax=0

Example:
```
⎡0⎤  ⎡ 1⎤  ⎡ c⎤  ⎡ 2⎤
⎢0⎥  ⎢ 1⎥  ⎢ c⎥  ⎢ 0⎥
⎣0⎦, ⎣-1⎦, ⎣-c⎦, ⎣-1⎦, ...
```

#### check that solutions to Ax=0 always gives a subspace

if Aw=0 and Av=0 then A(w+v)=Aw+Av=0 too.

if Av=0 then A(12v)= 12Av=0
