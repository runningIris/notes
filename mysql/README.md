# MySQL

## 1. 常用命令

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

## 2. 操作数据库

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



## 3. 数据管理

INNODB 默认使用，支持【事务支持】、【数据行锁定】、【外键约束】

MYISAM 早些年使用，支持【全文索引】

### DML语言！

数据库意义：数据存储、数据管理

DML语言：数据操作语言

- Insert
- Update
- Delete

####  插入语句（添加）

INSERT INTO 表明([字段名1, 字段名2, 字段名3]) VALUES('值1', '值2', '值3', ...)

``` sql
-- INSERT INTO 表明([字段名1, 字段名2, 字段名3]) VALUES('值1', '值2', '值3', ...)
INSERT INTO `grade`(`gradename`) VALUES('大四');
-- 由于主键自增我们可以省略

-- 插入多个字段
INSERT INTO `student`(`name`, `pwd`, `sex`)
VALUES ('张三', 'aaaaaa', '男'), ('李四', 'aaaaaa', '男'), ('王五', 'aaaaaa', '男'); 
```



#### 修改

``` sql
-- 修改学员名字，带了简介
UPDATE `student` SET `name`='狂神', `email`='haha@my.cn' WHERE id = 1;

-- 不指定条件的情况下，会改动所有的表
UPDATE `student` SET `name`='狂神'
```

操作符

=, <>, !=, >, <, <=, >=, BETWEEN ... AND ... , AND, OR, 



#### 删除

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

### 4. DQL 查询数据

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



## 5. MySQL 函数

文档：https://dev.mysql.com/doc/refman/5.7/en/built-in-function-reference.html

### 常见函数

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

### 聚合函数

 

## 6. 事务

### 原则 

ACID

#### 原子性 Atomicity 

要么都成功，要么都失败

#### 一致性 Consistency

事务前后的数据完整性要保证一致，1000

#### 隔离性 Isolation 

事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰

> 隔离导致的问题：
>
> 1. 脏读
> 2. 不可重复读
> 3. 虚读

#### 持久性 Durability 

事务一旦提交则不可逆，被持久到数据库中



mysql 是默认开启事务自动提交的

```sql
SET autocommit = 0;
SET autocommit = 1; /* 默认 */

```



手动处理事务

```sql
-- 关闭自动提交
SET autocommit = 0

-- 事务开启
START TRANSACTION;
INSERT XX;
INSERT XX;

-- 提交：持久化（成功）
COMMIT
-- 回滚：回到原来的样子（失败）
ROLLBACK

--事务结束
SET autocommit = 1 -- 开启自动提交

-- 了解
SAVEPOINT 保存点名 -- 设置一个事务的保存点
ROLLBACK TO SAVEPOINT 保存点名 -- 回滚到该保存点
RELEASE SAVEPOINT 保存点 -- 撤销保存点
```

转账

```sql
CREATE DATABASE shop CHARACTER SET utf8 COLLATE utf8_general_ci;
USE shop;

CREATE TABLE `account` (
	`id` INT(3) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `money` DECIMAL(9, 2) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = INNODB DEFAULT CHARSET=utf8

INSERT INTO account(`name`, `money`)
VALUES ('A', 2000), ('B', 10000);

-- 模拟转账：事务
SET autocommit = 0;
START TRANSACTION; -- 开启一组事务
UPDATE account SET money=money-500 WHERE `name` = 'A';
UPDATE account SET money=money+500 WHERE `name` = 'B';

COMMIT -- 提交
ROLLBACK -- 回滚

SET autocommit = 1 -- 开启自动提交

```



## 索引

帮助MySQL高效获取数据的数据结构

### 分类

- 主键索引（PRIMARY KEY）
  - 唯一，不可重复
- 唯一索引（UNIQUE KEY）
  - 避免重复的列出现，唯一索引可以重复，多个列都可以标识为唯一索引

- 常规索引（KEY/INDEX）
  - 默认的，INDEX, KEY 关键字来设置

- 全文索引（FullText）
  - 快速定位数据

### 使用

```sql
-- 显示
SHOW INDEX FROM student
-- 增加一个全文索引列名
ALTER TABLE school.student ADD FULLTEXT INDEX `studentName`(`studentName`)
-- 分析sql的执行的情况
EXPLAIN SELECT * FROM student; -- 非全文索引
EXPLAIN SELECT * FROM student WHERE MATCH(studentName) AGAINST('刘')
```

## 用户

```sql
-- 创建用户
CREATE USER kuangshen IDENTIFIED BY '123456';

-- 修改密码
SET PASSWORD FOR kuangshen = PASSWORD('123456')

-- 重命名
RENAME USER kuangshen TO kuangshen2

-- 用户授权 ALLPRIVILEGES 全部权限，库.表
GRANT ALL PRIVILEGES ON *.* TO kuangshen2

-- 查询权限
SHOW GRANTS FOR kuangshen
SHOW GRANTS FOR root@localhost

-- 移除权限
REVOKE ALL PRIVILEGES ON *.* FROM kuangshen2

-- 删除用户
DROP USER kuangshen
```



## MySQL 备份

使用命令行导出, mysqldump



``` cmd
# 导出 mysqldump -h 主机-u用户 -p密码 数据库 表1 表2 表3  > 物理磁盘位置/文件名
mysqldump -hlocalhost -uroot -p123456 school student >D:/a.sql

# 导入
# 登录的情况下,切换到指定的数据库
# source 备份文件
source D:/a.sql

mysql -u用户名 -p密码 库名< 备份文件
```



## JDBC

``` java
import java.sql.*;

public class JdbcFirstDemo {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        // 1. 加载驱动
        Class.forName("com.mysql.jdbc.Driver");
        
        // 2. 用户信息和url
        String url = "jdbc:mysql://localhost:3306/jdbcstudy?useUnicode=true&characterEncoding=utf8&useSSL=true";
        String username = "root";
        String password = "123456";
        
        // 3. 连接成功,数据库对象 Connection 代表数据库
        Connection connection = DriverManager.getConnection(url, username, password);
        
        // 4. 执行SQL对象 Statement
        Statement statement = connection.createStatement();
        
        // 5. 执行sql对象 获得返回的结果集
        String sql = "SELECT * FROM users";
        ResultSet resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
            System.out.println("id=" + resultSet.getObject("id"));
            System.out.println("name=" + resultSet.getObject("NAME"));
            System.out.println("password=" + resultSet.getObject("PASSWORD"));
            System.out.println("email=" + resultSet.getObject("email"));
            System.out.println("birthday=" + resultSet.getObject("birthday"));
        }
        
        // 5. 释放连接
        resultSet.close();
        statement.close();
        connection.close();
    }
}
```

> DriverManager

``` java
class.forName("com.mysql.jdbc.Driver");
Connection connection = DriverManager.getConnection(url, username, password)
```

> URL

``` java
// mysql -- 3306
String url = "jdbc:mysql://localhost:3306/jdbcstudy?useUnicode=true&characterEncoding=utf8&useSSL=true";
// oracle -- 1521
String url = "jdbc:oracle:thin:@localhost:1521/jdbcstudy?useUnicode=true&characterEncoding=utf8&useSSL=true";
```

> Statement 执行 SQL 的对象

```java
String sql = "SELECT * FROM users";
Statement statement = connection.createStatement();
statement.executeQuery(); // 查询操作返回 ResultSet
statement.execute(); // 执行任何 SQL
statement.executeUpdate(); // 更新\插入\删除, 返回一个受影响的行数
statement.excuteBatch(); // 可以放多个sql进去
```

> ResultSet 查询的结果集: 封装了所有的查询结果

获得指定的数据类型

``` java
resultSet.getObject(); // 在不知道列类型的情况下使用
resultSet.getString();
resultSet.getInt();
resultSet.getFloat();
resultSet.getDate();
...
```

遍历, 指针

``` java
resultSet.beforeFirst(); // 移到最前面
resultSet.afterLast(); // 移到最后面
resultSet.next(); // 移到下一个数据
resultSet.previous(); // 移到前一行
resultSet.absolute(row); // 移到某一行
```

> 释放资源

``` java
resultSet.close();
statement.close();
connection.close();
```

