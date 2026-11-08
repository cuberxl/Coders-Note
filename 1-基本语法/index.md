## 基本语法

[**返回上一页**](https://cuberxl.github.io/Coders-Note/)

[**返回首页**](https://cuberxl.github.io/Coders-Note/)

---

#### 基本语法

**概念**：本章覆盖 C++ 语言的语法基础与竞赛常用工具：头文件、运算符、变量类型、输入输出、数学函数、算法函数、自定义类型、指针、STL 容器、位运算与字符串流。

**策略**：这些内容是后续所有算法篇章的前置条件，建议按顺序通读一遍，之后仅把本表当作速查索引。

| 编号 | 简介 |
| :--- | :--- |
| 1.1 | 标准库头文件与 `bits/stdc++.h` |
| 1.2 | 算术、关系、逻辑、位运算等运算符 |
| 1.3 | 整型/浮点/字符/布尔及 `const`、`static` 等修饰 |
| 1.4 | `cin`/`cout`、`scanf`/`printf`、转义字符 |
| 1.5 | 绝对值、对数、幂运算、取整、三角函数 |
| 1.6 | `sort`、`reverse`、`unique`、二分查找、排列、内存操作 |
| 1.7 | 定义、构造/析构、继承多态、友元、静态成员、联合体 |
| 1.8 | 指针运算、动态内存分配 |
| 1.9 | STL 容器 ( `vector`、`queue`/`stack`、`deque`、`set`、`map`、`tuple` ) |
| 1.10 | 与或非异或、移位、相关应用、集合操作 |
| 1.11 | `stringstream`、格式化字符串流 |

---

#### 章节结构

```mermaid
flowchart LR
    R(["基本语法"])
    R --> N1(["常用头文件<br/>标准库头文件与 bits/stdc++.…"])
    R --> N2(["运算符<br/>算术、关系、逻辑、位运算等运算符"])
    R --> N3(["变量类型及修饰<br/>整型/浮点/字符/布尔及 const…"])
    R --> N4(["输入输出及转义字符<br/>cin/cout…"])
    R --> N5(["常用数学函数<br/>绝对值、对数、幂运算、取整、三角函数"])
    R --> N6(["常用算法函数<br/>sort、reverse、unique…"])
    R --> N7(["结构体、类、联合体<br/>定义、构造/析构、继承多态、友元…"])
    R --> N8(["指针变量<br/>指针运算、动态内存分配"])
    R --> N9(["STL 容器<br/>STL 容器 ( vector…"])
    N9 --> N9_1(["动态数组 vector"])
    N9 --> N9_2(["队列、堆、栈"])
    N9 --> N9_3(["双端队列 deque"])
    N9 --> N9_4(["集合 set"])
    N9 --> N9_5(["映射 map"])
    N9 --> N9_6(["元组 tuple"])
    R --> N10(["位运算<br/>与或非异或、移位、相关应用、集合操作"])
    R --> N11(["字符串流<br/>stringstream、格式化字符串流"])
```

---

#### 跳转链接

- [1.1 常用头文件](https://cuberxl.github.io/Coders-Note/1-基本语法/1.1-常用头文件)
- [1.2 运算符](https://cuberxl.github.io/Coders-Note/1-基本语法/1.2-运算符)
- [1.3 变量类型及修饰](https://cuberxl.github.io/Coders-Note/1-基本语法/1.3-变量类型及修饰)
- [1.4 输入输出及转义字符](https://cuberxl.github.io/Coders-Note/1-基本语法/1.4-输入输出及转义字符)
- [1.5 常用数学函数](https://cuberxl.github.io/Coders-Note/1-基本语法/1.5-常用数学函数)
- [1.6 常用算法函数](https://cuberxl.github.io/Coders-Note/1-基本语法/1.6-常用算法函数)
- [1.7 结构体、类、联合体](https://cuberxl.github.io/Coders-Note/1-基本语法/1.7-结构体、类、联合体)
- [1.8 指针变量](https://cuberxl.github.io/Coders-Note/1-基本语法/1.8-指针变量)
- [1.9 STL 容器](https://cuberxl.github.io/Coders-Note/1-基本语法/1.9-STL容器/)
- [1.10 位运算](https://cuberxl.github.io/Coders-Note/1-基本语法/1.10-位运算)
- [1.11 字符串流](https://cuberxl.github.io/Coders-Note/1-基本语法/1.11-字符串流)
