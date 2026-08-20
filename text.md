# 中国剩余定理（CRT）

111

## 问题

解同余方程组：

$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\vdots \\
x \equiv a_n \pmod{m_n}
\end{cases}
$$

其中模数 $m_1, m_2, \dots, m_n$ **两两互质**。

---

## 构造法

设：

$$
M = m_1 \times m_2 \times \cdots \times m_n
$$

$$
M_i = \frac{M}{m_i}
$$

求 $M_i$ 在模 $m_i$ 下的逆元 $t_i$：

$$
M_i \cdot t_i \equiv 1 \pmod{m_i}
$$

则通解为：

$$
x \equiv \sum_{i=1}^n a_i \cdot M_i \cdot t_i \pmod{M}
$$

---

## 为什么正确？

对于第 $i$ 个方程：

- 第 $i$ 项：$a_i \cdot M_i \cdot t_i \equiv a_i \pmod{m_i}$（因为 $M_i t_i \equiv 1$）
- 第 $j$ 项（$j \ne i$）：$a_j \cdot M_j \cdot t_j \equiv 0 \pmod{m_i}$（因为 $m_i \mid M_j$）

所以 $x \equiv a_i \pmod{m_i}$ 对每个 $i$ 都成立。

---

## 最小正整数解

$$
x = \left( \sum_{i=1}^n a_i \cdot M_i \cdot t_i \right) \bmod M
$$

---

## 特例：物不知数

$$
\begin{cases}
x \equiv 2 \pmod{3} \\
x \equiv 3 \pmod{5} \\
x \equiv 2 \pmod{7}
\end{cases}
$$

$M = 105$

$$
\begin{aligned}
x &= 2 \times 35 \times 2 + 3 \times 21 \times 1 + 2 \times 15 \times 1 \\
&= 140 + 63 + 30 = 233 \\
x &\equiv 23 \pmod{105}
\end{aligned}
$$

**答案：$x = 23$**

---

## 代码模板

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

ll exgcd(ll a, ll b, ll &x, ll &y) {
    if (!b) { x = 1; y = 0; return a; }
    ll d = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return d;
}

ll inv(ll a, ll m) {
    ll x, y;
    exgcd(a, m, x, y);
    return (x % m + m) % m;
}

ll crt(vector<ll> a, vector<ll> m) {
    int n = a.size();
    ll M = 1;
    for (ll x : m) M *= x;

    ll ans = 0;
    for (int i = 0; i < n; i++) {
        ll Mi = M / m[i];
        ll ti = inv(Mi, m[i]);
        ans = (ans + a[i] * Mi % M * ti) % M;
    }
    return ans;
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4NDA1NjgyODZdfQ==
-->
