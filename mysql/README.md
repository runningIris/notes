# MySQL

常用命令

``` sql
mysql -uroot -p -- 连接数据库

update mysql.user set authentication_string=password('123456') where user='root' and Host='localhost'; -- 修改用户密码
flush privileges; -- 刷新权限

show databases; -- 查看所有的数据库
use school; -- 切换数据库 use 数据库名
show tables; -- 查看数据库中所有的表
describe student; -- 显示数据库中所有的表的信息

create database westos; -- 创建一个数据库
exit; -- 退出连接

```

DDL 定义 Database Definition Language

DML 操作 Database Management Language

DQL 查询 Database Query Language

DCL 控制 Database Control Language

## 操作数据库

``` sql
CREATE DATABASE IF NOT EXISTS westos;
DROP DATABASE hello;

USE `school`;

SELECT USER FROM student

-- 创建表
CREATE TABLE IF NOT EXISTS `student` (
	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '',
	`name` VARCHAT(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
	`pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT '密码',
	`sex` VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
	`birthday` DATETIME DEFAULT NULL COMMENT '出生日期',
	`address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
	`email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
    `gradeid` INT(10) NOT NULL COMMENT '学生的年级',
	PRIMARY KEY (`id`),
) ENGINE=INNODB DEFAULT CHARSET=utf8

-- 查看创建数据库的语句
SHOW CREATE DATABASE school;
SHOW CREATE TABLE student;

-- 修改表名 ALTER TABLE 旧表名 RENAME AS 新表名
ALTER TABLE teacher;
ADD CONSTRAINT `FK_gradeid` FOREIGN KEY(`gradeid`) REFERENCES `grade`(`gradeid`)

-- 增加表的字段
ALTER TABLE teacher ADD age INT(11);

-- 修改表的字段（重命名，修改约束）
ALTER TABLE teacher1 MODIFY age VARCHAR(11); -- 修改约束
ALTER TABLE teacher1 CHANGE age age1 INT(1); -- 字段重命名

-- 删除表的字段
ALTER TABLE teacher1 DROP age1;
DROP TABLE IF EXISTS teacher1;

-- 外键约束（不建议使用）
-- 1. 创建表的时候
KEY `FK_gradeid` (`gradeid`),
CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade`(`gradeid`)

-- 2. 创建表的时候没有外键关系
ALTER TABLE `student`
ADD CONSTRAINT `FK_gradeid` FOREIGN KEY(``)

```


## 数据表的类型

INNODB 默认使用，支持【事务支持】、【数据行锁定】、【外键约束】

MYISAM 早些年使用，支持【全文索引】

### DML语言！

数据库意义：数据存储、数据管理

DML语言：数据操作语言

- Insert
- Update
- Delete

####  1. 插入语句（添加）

INSERT INTO 表明([字段名1, 字段名2, 字段名3]) VALUES('值1', '值2', '值3', ...)

``` sql
-- INSERT INTO 表明([字段名1, 字段名2, 字段名3]) VALUES('值1', '值2', '值3', ...)
INSERT INTO `grade`(`gradename`) VALUES('大四');
-- 由于主键自增我们可以省略

-- 插入多个字段
INSERT INTO `student`(`name`, `pwd`, `sex`)
VALUES ('张三', 'aaaaaa', '男'), ('李四', 'aaaaaa', '男'), ('王五', 'aaaaaa', '男'); 
```



#### 2. 修改

``` sql
-- 修改学员名字，带了简介
UPDATE `student` SET `name`='狂神', `email`='haha@my.cn' WHERE id = 1;

-- 不指定条件的情况下，会改动所有的表
UPDATE `student` SET `name`='狂神'
```

操作符

=, <>, !=, >, <, <=, >=, BETWEEN ... AND ... , AND, OR, 



#### 3. 删除

- delete 命令

  ``` sql
  -- 删除数据（避免这样写，会全部删除）
  DELETE FROM `student`;
  
  -- 删除指定数据
  DELETE FROM `student` WHERE id = 1;
  ```

- truncate 命令

  完全清空一个数据库表，表的结构和索引约束不会变

  ```sql
  TRUNCATE `student`;
  ```

  特点：

  - 重新设置自增列，计数器会归零

  - 不会影响事务

#### 4. DQL 查询数据

Data Query Language



SELECT 语法

[]括号代表可选的，{}括号代表必选的

```sql
SELECT [ALL | DISTINCT]
{* | table.* | [table.field1[as alias1][, table.field2[as alias2]][, ...]]}
FROM table_name [as table_alias]
	[left | right | inner join table_name2] --联合查询
	[WHERE ...] -- 指定结果需满足的条件
	[GROUP BY ...] -- 指定结果按照哪几个字段来分组
	[HAVING] -- 过滤分组的记录必须要满足的次要条件
	[ORDER BY ...] -- 指定查询记录按一个或多个条件排序
	[LIMIT {[offset,]row_count | row_countOFFSET offset}]; -- 指定查询的记录从哪条到哪条
```



``` sql
SELECT * FROM student;

-- 查询指定字段
SELECT `StudentNo`, `StudentName` FROM student
-- 别名，给字段起别名，给表起别名
SELECT `StudentNo` AS 学号, `StudentName` AS 学生姓名 FROM student AS s;
--- 函数 Concat(a, b)
SELECT CONCAT('姓名：', StudentName) As 新名字 FROM student;
-- 去重
SELECT DISTINCT `StudentNo` FROM result;
-- 查询系统版本
SELECT VERSION() 
-- 用来计算
SELECT 100*3-1 AS 计算结果
-- 查询自增的步长(变量)
SELECT @@auto_increment_increemnt 
-- 学员考试成绩 + 1 分查看
SELECT `StudentNo`, `StudentResult` + 1 AS '提分后' FROM result
```

模糊查询

- IS NULL
- IS NOT NULL
- BETWEEN
- LIKE
- IN

```sql
-- ====== like ======
SELECT `StudentNo`, `StudentName` FROM `student`
WHERE StudentName like '刘%' -- 姓刘的
'刘_' -- 姓后面一个字的
'刘__' -- 姓后面两个字的
'%嘉%' -- 名字中间有嘉字的

-- ====== in ======
-- 查询 1001, 1002, 1003
WHERE StudentNo IN (1001, 1002, 1003)
-- 查询在北京的学生
WHERE `Address` IN ('安徽', '洛阳', '北京')
```

### 联表查询 Joins

思路：

1. 分析需求，分析查询的字段来自哪些表

2. 确定使用哪种连接查询？ 7种

   确定交叉点（表中的哪些数据是相同的）

   判断条件：学生表中的 studentNo = 成绩表的 studentNo

```sql
-- 查询参加了考试的同学（学号、姓名、科目编号、分数）
SELECT * FROM student;
SELECT * FROM result;

-- Inner Join
SELECT s.studentNo, studentName, SubjectNo, StudentResult 
FROM student AS s 
INNER JOIN result AS r 
ON s.studentNo = r.studentNo;

-- Right Join
SELECT s.studentNo, studentName, SubjectNo, StudentResult 
FROM student AS s 
RIGHT JOIN result AS r 
ON s.studentNo = r.studentNo

```

join on (判断条件)连接查询

where 等值查询

``` sql
-- 查询缺考的同学
SELECT s.studentNo, studentName, SubjectNo, StudentResult
FROM student s
LEFT JOIN result r
ON s.studentNo = r.studentNo
WHERE StudentResult IS NULL;

-- 查询了参加考试的同学的信息
SELECT s.studentNo, studentName, SubjectName, StudentResult
FROM student s
RIGHT JOIN result r
ON s.studentNo = r.studentNo
INNER JOIN `subject` sub
ON r.SubjectNo = sub.SubjectNo

-- 查询学员所属的年级（学号，学生的姓名，年级名称）
SELECT studentNo, studentName, `GradeName`
FROM student s
INNER JOIN `grade` g
ON s.`GradeID` = g.`GradeID`

-- 查询科目所属的年级（科目名称、年级名称）
SELECT `SubjectName`, `GradeName`
FROM `subject` sub
INNER JOIN `grade` g
ON sub.`GradeID` = g.`GradeID`

-- 查询了参加数据库结构 -1 考试的同学信息：学号，学生姓名，科目名，分数
SELECT `StudentNo`, `StudentName`, `SubjectName`, `StudentResult`
FROM student s
INNER JOIN `result` r
ON s.StudentNo = r.StudentNo
INNER JOIN `subject` sub
ON r.`SubjectNo` = sub.`SubjectNo`
WHERE subjectName = '数据库结构-1'
```



### 分页和排序

```sql
-- 升序
ORDER BY StudentResult ASC
-- 降序
ORDER BY StudentResult DESC

-- 分页语法：limit [起始值], [页面的大小]
LIMIT 0,5 1~5
LIMIT 1,5 2~6
LIMIT 6,5 7~12

-- 查询课程排名前十的学生，并且分数要大于80的学生信息（学号，姓名，课程名称，分数）
SELECT s.`StudentNo`, `StudentName`, `SubjectName`, `StudentResult`
FROM `student` s
INNER JOIN `result` r
ON s.StudentNo = r.StudentNo
INNER JOIN `subject` sub
ON sub.`SubjectNo` = r.`SubjectNo`
WHERE SubjectName = 'JAVA第一学年' AND StudentResult >= 80
ORDER BY StudentResult DESC
LIMIT 0,10
```



### 子查询

where (这个值是计算出来的)

本质：`在where语句中嵌套一个子查询语句`

```sql
-- 查询数据库结构 - 1 的所有考试结果（学号，科目编号，成绩），降序排列

-- 方式一： 连接查询
SELECT `StudentNo`, `SubjectName`, `StudentResult`
FROM `result` r
INNER JOIN `subject` sub
ON r.SubjectNo = sub.SubjectNo
WHERE SubjectName = '数据库结构 - 1'
ORDER BY StudentResult DESC

-- 方式二：子查询（由里及外）
SELECT `StudentNo`, `SubjectNo`, `StudentResult`
FROM `result`
WHERE SubjectNo = (
    -- 查询所有数据库结构 - 1 的学生学号
    SELECT SubjectNo FROM `subject` 
    WHERE SubjectName = '数据库结构 - 1'
)
ORDER BY StudentResult DESC

-- 查询高等数学分数不小于80分的学生的学号和姓名
SELECT DISTINCT s.`StudentNo`, `StudentName`
FROM student s
INNER JOIN result r
ON r.StudentNo = s.StudentNo
WHERE `StudentResult` >= 80 AND `SubjetNo` = (
	SELECT SubjectNo FROM `subject` 
    WHERE `SubjectName` = '高等数学'
)

SELECT StudentNo, StudentName FROM student WHERE StudentNo IN (
	SELECT StudentNo FROM result
    WHERE StudentResult > 80 AND SubjectNo = (
    	SELECT SubjectNo FROM `subject`
        WHERE SubjectName = '高等数学'
    )
)

```



## MySQL 函数

```sql
-- 数学运算
ABS
CEILING
FLOOR
RAND
SIGN

-- 字符串函数
CHAR_LENGTH
CONCAT
INSERT
```

