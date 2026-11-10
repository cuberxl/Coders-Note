## 树链剖分求LCA

[**返回上一页**](https://cuberxl.github.io/Coders-Note/5P-图论进阶/5P.3-最近公共祖先LCA/)

[**返回首页**](https://cuberxl.github.io/Coders-Note/)

---

#### 前置知识

- [树与图的存储与遍历](https://cuberxl.github.io/Coders-Note/5B-图论/5B.1-树与图的存储与遍历) —— 链式前向星与 DFS 遍历。

---

#### 树链剖分求LCA

**概念**：

- 重儿子：节点 $u$ 的所有儿子中，子树最大的儿子。若有多个，任选一个。
- 轻儿子：节点 $u$ 除了重儿子以外的其他儿子。
- 重边与轻边：连接父节点与重儿子的边称为重边；连接父节点与轻儿子的边称为轻边。
- 重链：由重边连接而成的链。每个节点至多属于一条重链。
- 

---

#### 策略

**流程**：



<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4OTE2MTA0NTFdfQ==
-->