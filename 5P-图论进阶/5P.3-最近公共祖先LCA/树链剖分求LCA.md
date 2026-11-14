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
- 链顶：重链中深度最小的节点。
- 树链剖分：将树划分成若干条不相交的重链，使得每个节点恰属于一条重链，且树上任意路径可拆分为 $O(\log ⁡n)$段重链。

---

#### 策略

**流程**：
通过两遍 DFS 实现。

- 第一遍 DFS：预处理子树大小 $sz[u]$，父节点 $fa[u]$，重儿子 $son[u]$，深度 $dep[u]$
	- DFS 参数：当前遍历节点 $u$，前驱节点 $from$。
	- 初始值：
		- $sz[u] = 1$ （当前节点自身）
		- $dep[u] = dep[from] + 1$
		- $fa[u] = from$
	- 遍历其每个节点，维护最大子树 $mxsz$。
		- 跳过其前驱节点，递归处理子节点。
		- 更新 $mxsz$，若成功则更新 $son[u]$。
		- 累加 $u$ 的子树。
	
- 第二遍 DFS：处理链头。
	- DFS 参数：当前遍历节点 $u$，链头 $tp$。
	- 使 $top[u] = tp$。
	- 递归处理其重儿子，令其链头为 $tp$。（$u$ 和重儿子必然在一条重链上）
	- 递归处理其轻儿子（跳过重儿子和其前驱节点），令其链头为自身。

- 查询处理：
  - 将处于链的链头深度较大的点不断跳到链头的父节点，直到两个点处于同一条链，链头即为答案。 
  - 证明：
    - 设 $L = \text{LCA}(u, v)$，且 $dep[top[u]] > dep[top[v]]$
    - 则 $L$ 不在 $top[u]$ 的子树中
      - 否则 $y$ 也在其子树中，就有 $$

**代码模板**
```cpp
#include<bits/stdc++.h>
#define getchar() getchar_unlocked()
#define putchar(x) putchar_unlocked(x)
using namespace std;
const int N = 1e6 + 10;
int n, m, s;
int idx, h[N], ne[N], to[N];
int fa[N], sz[N], son[N], dep[N];
int top[N];
inline int rd() {
    int x = 0, c = getchar();
    while (c < '0' || c > '9') c = getchar();
    do x = x * 10 + (c ^ 48), c = getchar();
    while ('0' <= c && c <= '9');
    return x;
}
inline void wt(int x) {
    if (x > 9) wt(x / 10);
    putchar(x % 10 ^ 48);
}
void add(int a, int b) {
    ne[idx] = h[a];
    to[idx] = b;
    h[a] = idx ++;
}
void dfs_1(int u, int from) {
	sz[u] = 1;
	dep[u] = dep[from] + 1;
	fa[u] = from;
	int mxsz = -1;
	for (int i = h[u]; ~i; i = ne[i]) {
		int v = to[i];
        if (v == from) continue;
		dfs_1(v, u);
		sz[u] += sz[v];
		if (mxsz < sz[v]) {
			mxsz = sz[v];
			son[u] = v; 
		}
	}
}
void dfs_2(int u, int tp) {
	top[u] = tp;
	if (son[u])
		dfs_2(son[u], tp);
	for (int i = h[u]; ~i; i = ne[i]) {
		int v = to[i];
		if (v == son[u]) continue;
        if (v == fa[u]) continue;
		dfs_2(v, v);
	}
} 
int lca(int u, int v) {
	while (top[u] != top[v]) {
		if (dep[top[u]] < dep[top[v]])
			swap(u, v);
		u = fa[top[u]];
	}
	if (dep[u] < dep[v])
		swap(u, v);
	return v;
}
int main() {
    n = rd(), m = rd(), s = rd();
    memset(h, -1, sizeof h);
    for (int i = 1; i < n; i ++) {
    	int x = rd(), y = rd();
    	add(x, y); add(y, x);
	}
	dfs_1(s, 0); dfs_2(s, s);
	while (m --) {
		int u = rd(), v = rd();
		wt(lca(u, v));
		putchar('\n');
	}
    return 0;
}
```

**复杂度分析**
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4MjQ0MzUwODMsMjgyMzE0NzUxLDE0Mz
YwMjcxOTMsLTczODIxNjAxM119
-->