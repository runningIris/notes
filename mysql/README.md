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

INNODB 默认使用

MYISAM 早些年使用



INNODB 支持【事务支持】、【数据行锁定】、【外键约束】、

MYISAM 支持【全文索引】

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
