# 数组

## 数组的误区

数组类型是否相同 -> 由数组元素的类型和数组的大小共同决定

eg. int a[100] 和 int b[200] 是不同大小的数组，所以 a 和 b 的类型不同

## 数组初始化方式

``` c
int a[10] = {0,1,2,3,4,5,6,7,8,9};

// 从第四个元素起, 每个元素被初始化为0
int b[10] = {0,1,2};

// 将编号5的元素初始化为1, 其他初始化为0
int c[10] = {[5]=1};

// 将编号0,5,6,7的元素初始化为1, 其他初始化为0
int d[10] = {1,[5]=1,1,1};

// 将编号0,5的元素初始化为1
// 将编号3,4,5的元素初始化为2(覆盖了之前的[5]=1)
// 其他元素初始化为0
int e[10] = {1,[5]=1,[3]=2,2,2}
```

## 隐式设置数组的元素数量

``` c
int a[10]; // 10个元素, 变量a, 类型是数组, 有时候会被称呼为数组a
int b[] = {1,2,4}; // 3个元素
int c[] = {1,[99]=2}; // 100个元素
int d[]; // 报错，因为既没有设置数组大小，后面也没有初始化元素，编译器就不知道该数组的大小
```

## 变长数组, sizeof 运算符的两种处理方式

### 用法

``` c
unsigned int A;
```

- 用法一: sizeof (类型名), 结果以字节为单位
    * A = sizeof (short int); // 2
    * A = sizeof (int); // 4
    * A = sizeof (long int); // 4
    * A = sizeof (int*); // 8 (指向 int 的指针的大小)
- 用法二: sizeof 值, 结果以字节为单位
    * A = sizeof a; // 40
    * A = sizeof b; // 12
    * A = sizeof 1+2; // 6 -> (sizeof 1) + 2; 4 -> sizeof (1+2);
- sizeof 表达式的类型 -> 无符号整数类型(根据不同的 C 实现而不同)

### 编译期赋值

Example 1:

``` c
unsigned int a = 0, b = 0;
a = sizeof (b = 1);
```
原以为：

b = 1 表达式得到的结果是 1,
sizeof 1 = 4,
所以 a = 4, b = 1

但实际上, 最后 b 的值是 0.

Example 2:

``` c
unsigned char c;
c = sizeof (int a[100]);
```

分析:
`sizeof (int a[100])`  是 `unsigned long long int` 类型, 值为 400, 赋值给 c 时会转换为 `unsigned char` 类型, `unsigned char` 类型最大值为 255， 所以 c 装不下, 最终 c = 400 - 256 = 144

`sizeof` 表达式的值是在编译器编译期间得到的,
也就是说, `sizeof` 表达式会被编译器编译为数值, 并且不会对其操作数进行计算, 也就是说, 编译器不会执行 `b=1`, 所以, b = 0

### 运行期获值(变长数组的情况)

变长数组的元素数量是个变量, 只有在程序运行的时候才能确定元素的数量。

``` c
int d = 100;
int c = sizeof(int[d]);
```
当`sizeof`的操作数是变长数组时, `sizeof`表达式的值是在程序运行期间得到的。

``` c
int e = 100;
sizeof (++e); // 404
```
