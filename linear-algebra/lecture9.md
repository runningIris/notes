# 线性相关性、基、维数

Linear independence, spanning(生成) a space, a basic for subspace, the dimension of that space

## Independence

Vector x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>, ... , x<sub>n</sub> are independent if no combination gives zero vector:

c<sub>1</sub>x<sub>1</sub> + c<sub>2</sub>x<sub>2</sub> + ... + c<sub>n</sub>x<sub>n</sub> != 0 (c<sub>i</sub> != 0)

个人理解为 matrix A 没有多余的 Column。
dependent 意味着某些 column 可以由其他 column 组合而成，对 A 没有贡献价值。

Repeat when v<sub>1</sub>, v<sub>2</sub>, ... , v<sub>n</sub> are columns of A

1. They are independent if nullspace of A is {zero vector}.

    N(A) = {0}

    Rank r = n, no free variables

2. They are dependent if Ac = 0 for non-zero c.

    Rank r < n, yes free variables

## Spanning a space

Vecotr v<sub>1</sub>, v<sub>2</sub>, ... , v<sub>l</sub> spans a space means the space consist of all combination of those vectors.
意味着这个空间是由这些向量以及其组合而成的向量组成的。

## Basis for a space

A sequence of vectors that have two properties:

1. They are independent
2. They span the space

Example: space in R<sup>3</sup>

    1 basis:
    ⎡1⎤ ⎡0⎤ ⎡0⎤
    ⎢0⎥ ⎢1⎥ ⎢0⎥
    ⎣0⎦,⎣0⎦,⎣1⎦

## Dimension

Definition: Every basis for the space has the same number of vectors

- dimension of the column space of matrix A = Rank(A) = r

- dimension of nullspace of matrix A = the number of free columns = n - r
