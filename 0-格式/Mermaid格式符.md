
# Mermaid 详细语法速查

## 一、图类型与方向

**代码块格式**：以 ` ```mermaid ` 开头，` ``` ` 结尾。

| 关键字 | 图类型 |
| :--- | :--- |
| `graph` / `flowchart` | 流程图 |
| `sequenceDiagram` | 时序图 |
| `classDiagram` | 类图 |
| `stateDiagram-v2` | 状态图（推荐） |
| `erDiagram` | ER 图 |
| `gantt` | 甘特图 |
| `pie` | 饼图 |
| `gitGraph` | Git 图 |
| `mindmap` | 思维导图 |
| `timeline` | 时间线 |
| `quadrantChart` | 四象限图 |
| `xychart-beta` | 折线/柱状图 |

**流程图方向**：`TD`/`TB` 上到下、`BT` 下到上、`LR` 左到右、`RL` 右到左。

**类图方向**：在类图内写 `direction RL` 等设置渲染方向。

---

## 二、流程图

### 节点形状

| 写法 | 效果 |
| :--- | :--- |
| `A[文本]` | 矩形 |
| `A(文本)` | 圆角矩形 |
| `A((文本))` | 圆形 |
| `A{文本}` | 菱形 |
| `A{{文本}}` | 六边形 |
| `A[(文本)]` | 数据库/圆柱 |
| `A[[文本]]` | 子程序 |
| `A[/文本/]` | 平行四边形 |
| `A[\文本\]` | 反向平行四边形 |
| `A>文本]` | 非对称 |

### 连线类型

| 写法 | 效果 |
| :--- | :--- |
| `A --> B` | 实线箭头 |
| `A --- B` | 实线无箭头 |
| `A -.-> B` | 虚线箭头 |
| `A ==> B` | 粗线箭头 |
| `A -- 文本 --> B` | 实线带文字 |
| `A -->\|文本\| B` | 箭头带文字 |
| `A <--> B` | 双向箭头 |
| `A o--o B` | 圆点两端 |
| `A x--x B` | 叉号两端 |

**链路长度**：增加破折号可让连线跨更多层级。`A ----> B` 比普通连线多跨两层。

| 长度 | 1 | 2 | 3 |
| :--- | :--- | :--- | :--- |
| 普通 | `---` | `----` | `-----` |
| 普通+箭头 | `-->` | `--->` | `---->` |
| 粗线 | `===` | `====` | `=====` |
| 虚线 | `-.-` | `-..-` | `-...-` |

### 特殊字符处理

节点文本含括号、引号等特殊字符时，用引号包裹：`id1["This is (text) in the box"]`。

### 样式

```mermaid
graph TD
    A[开始] --> B{判断}
    B -->|是| C[处理]
    style A fill:#f00,stroke:#333
    classDef 类名 fill:#0f0
    class A 类名
    linkStyle 0 stroke:#f00
    click A "url"
```

**边 ID 与动画**（较新版本）：

```mermaid
flowchart LR
    A e1@--> B
    e1@{ animate: true, animation: fast }
```

---

## 三、时序图

### 参与者与消息

```mermaid
sequenceDiagram
    participant A as 用户
    participant B as 系统
    actor C as 角色
    A->>B: 实线箭头
    B-->>A: 虚线箭头
    A-)B: 开放箭头（异步）
    A--)B: 虚线开放箭头
```

| 写法 | 说明 |
| :--- | :--- |
| `->>` | 实线箭头 |
| `-->>` | 虚线箭头 |
| `-)` | 实线开放箭头（异步） |
| `--)` | 虚线开放箭头（异步） |
| `->` | 无箭头实线 |
| `-->` | 无箭头虚线 |

**半箭头**（v11.12.3+）：`-|\`、`-|/`、`/|-` 等多种方向。

### 注释与激活

```mermaid
sequenceDiagram
    participant A
    Note right of A: 右侧注释
    Note left of A: 左侧注释
    Note over A: 覆盖注释
    Note over A,B: 跨参与者注释
    activate A
    A->>+B: 激活B
    B-->>-A: 取消B
    deactivate A
```

- `Note right of/left of/over 参与者: 文本`
- 换行用 `<br/>`
- `activate`/`deactivate` 或消息箭头后加 `+`/`-` 快捷激活

### 控制流

```mermaid
sequenceDiagram
    loop 每分钟
        A->>B: 循环
    end
    
    alt 生病
        A->>B: 不舒服
    else 健康
        A->>B: 感觉良好
    end
    
    opt 额外响应
        A->>B: 谢谢关心
    end
    
    par 并行任务1
        A->>B: 消息1
    and 并行任务2
        A->>C: 消息2
    end
    
    critical 必须执行
        A->>B: 关键操作
    option 情况A
        A->>B: 处理A
    option 情况B
        A->>B: 处理B
    end
```

| 块 | 说明 |
| :--- | :--- |
| `loop ... end` | 循环 |
| `alt ... else ... end` | 分支 |
| `opt ... end` | 可选 |
| `par ... and ... end` | 并行 |
| `critical ... option ... end` | 关键区域 |

### 其他功能

| 写法 | 说明 |
| :--- | :--- |
| `rect rgb(0,0,0)` | 背景高亮 |
| `autonumber` | 自动编号 |
| `box 颜色` | 分组参与者 |
| `break` | 中断流程 |

---

## 四、类图

### 类定义

```mermaid
classDiagram
    class Animal {
        +String name
        -int age
        #String species
        ~String package
        +eat()
        +sleep()
    }
    class Shape <<interface>>
    class AbstractShape <<Abstract>>
```

| 标记 | 含义 |
| :--- | :--- |
| `+` | public |
| `-` | private |
| `#` | protected |
| `~` | package |
| `<<Interface>>` | 接口 |
| `<<Abstract>>` | 抽象类 |
| `<<Enumeration>>` | 枚举 |

### 关系类型

| 写法 | 含义 |
| :--- | :--- |
| `A <\|-- B` | B 继承 A |
| `A *-- B` | 组合 |
| `A o-- B` | 聚合 |
| `A --> B` | 关联 |
| `A ..> B` | 依赖 |
| `A ..\|> B` | 实现 |

### 基数标注

在关系两端用引号标注：

```mermaid
classDiagram
    Customer "1" --> "*" Ticket
    Student "1" --> "1..*" Course
```

可用基数：`1`、`0..1`、`1..*`、`*`、`n`、`0..n`、`1..n`。

### 命名空间

```mermaid
classDiagram
    namespace 公司.工程.后端 {
        class Developer
    }
    namespace 公司.工程.前端 {
        class Designer
    }
```

支持嵌套命名空间和点号自动创建父级。

### 方向与注释

- `direction RL` 等设置方向。
- `%% 这是注释` 单独一行。

---

## 五、状态图

**推荐使用 `stateDiagram-v2`。**

```mermaid
stateDiagram-v2
    [*] --> 待机
    待机 --> 运行: 启动
    运行 --> 待机: 停止
    运行 --> [*]: 结束
```

### 状态定义

| 写法 | 说明 |
| :--- | :--- |
| `stateId` | 简单状态 |
| `state "描述" as s2` | 带描述 |
| `s2 : 描述` | 冒号方式 |
| `state 名称 { ... }` | 复合状态 |

### 特殊状态

```mermaid
stateDiagram-v2
    state 判断 <<choice>>
    state fork_state <<fork>>
    state join_state <<join>>
    
    [*] --> 判断
    判断 --> A: 条件1
    判断 --> B: 条件2
    A --> join_state
    B --> join_state
    join_state --> 结束
```

### 并发与注释

- `--` 分隔并发区域。
- `note right of 状态: 文本` 添加注释。

---

## 六、ER 图

### 关系基数（乌鸦脚标记）

| 左侧 | 右侧 | 含义 |
| :--- | :--- | :--- |
| `\|\|` | `\|\|` | 恰好一个 |
| `\|o` | `o\|` | 零或一个 |
| `}o` | `o{` | 零或多个 |
| `}\|` | `\|{` | 一个或多个 |

**实线 `--`** = 标识关系；**虚线 `..`** = 非标识关系。

### 实体与属性

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name PK
        string custNumber
    }
    ORDER {
        int orderNumber PK
        string deliveryAddress
    }
```

| 标记 | 含义 |
| :--- | :--- |
| `PK` | 主键 |
| `FK` | 外键 |
| `UK` | 唯一键 |
| `string?` | 可选类型（v11.16.0+） |

**别名**：`p[Person]` 或 `a["Customer Account"]`。

**方向**：`direction TB` / `BT`。

---

## 七、甘特图

```mermaid
gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    axisFormat %Y-%m
    section 阶段一
    任务1 :a1, 2024-01-01, 30d
    任务2 :after a1, 20d
    里程碑 :milestone, m1, 2024-03-01, 0d
    已完成 :done, a2, 2024-01-01, 10d
```

| 写法 | 说明 |
| :--- | :--- |
| `title` | 标题 |
| `dateFormat` | 输入日期格式，默认 `YYYY-MM-DD` |
| `axisFormat` | 输出轴格式，如 `%Y-%m-%d` |
| `section` | 分组 |
| `任务 :id, 开始, 时长` | 任务定义 |
| `after a1` | 依赖关系 |
| `milestone` | 里程碑 |
| `done` / `active` / `crit` | 完成/进行/关键 |

**日期格式**：`YYYY` 年、`MM` 月、`DD` 日、`Q` 季度、`X` Unix 时间戳等。

---

## 八、饼图

```mermaid
pie showData
    title 占比
    "A" : 42.96
    "B" : 50.05
    "C" : 10.01
```

- `showData`：在标签后显示数值（可选）
- 数据值必须为正数。
- 饼片按标签顺序顺时针排列。

**配置参数**（v11.16.0+）：

| 参数 | 说明 | 默认 |
| :--- | :--- | :--- |
| `textPosition` | 标签径向位置，0~1 | 0.75 |
| `donutHole` | 环形图孔洞比例，0~0.9 | 0 |
| `legendPosition` | 图例位置 | right |
| `highlightSlice` | 高亮特定切片 | — |

---

## 九、Git 图

```mermaid
gitGraph
    commit
    branch dev
    checkout dev
    commit id: "feat-1"
    checkout main
    merge dev
    commit type: HIGHLIGHT
    cherry-pick id: "feat-1"
```

| 写法 | 说明 |
| :--- | :--- |
| `commit` | 提交 |
| `commit id: "说明"` | 带 ID |
| `commit type: HIGHLIGHT` | 类型：NORMAL/HIGHLIGHT/REVERSE |
| `branch 名称` | 创建分支 |
| `checkout 名称` | 切换 |
| `merge 名称` | 合并 |
| `cherry-pick id: "..."` | 摘取，需指定已存在 ID |

**配置**：`showBranches`、`showCommitLabel`、`mainBranchName`、`parallelCommits`。

---

## 十、其他图类型

### 思维导图

```mermaid
mindmap
  root((中心))
    分支1
      子节点
    分支2
```

形状：`((圆形))`、`[方形]`、`)云形(`、`))爆炸形((`

### 时间线

```mermaid
timeline
    title 项目时间线
    2024 : 启动
    2025 : 开发
    2026 : 发布
```

### 四象限图

```mermaid
quadrantChart
    title 优先级矩阵
    x-axis 低 --> 高
    y-axis 低 --> 高
    quadrant-1 立即做
    quadrant-2 计划做
    quadrant-3 不做
    quadrant-4 委托
    任务A: [0.3, 0.6]
```

### XY 图

```mermaid
xychart-beta
    title "示例"
    x-axis [A, B, C]
    y-axis "值" 0 --> 100
    bar [10, 20, 30]
    line [15, 25, 35]
```

---

## 十一、通用技巧

### 注释与配置

| 写法 | 说明 |
| :--- | :--- |
| `%% 注释` | 单独一行 |
| `%%{init: {"theme": "dark"}}%%` | 全局主题 |
| `%%{init: {"flowchart": {"curve": "basis"}}}%%` | 图类型专属配置 |

**主题**：`default`、`neutral`、`dark`、`forest`、`base`。

### 转义与特殊字符

| 字符 | 写法 |
| :--- | :--- |
| `"` | `#quot;` |
| `#` | `#35;` |
| `<` | `#lt;` |
| `>` | `#gt;` |
| `&` | `#amp;` |
| `\` | `#92;` |

节点文本含特殊字符时优先用双引号包裹。

### 踩坑提醒

- 子图必须以 `end` 结束
- 类图 `A <|-- B` 表示 B 继承 A，方向别写反
- 状态图优先 `stateDiagram-v2`
- 甘特图日期格式需与 `dateFormat` 一致
- 不同渲染器支持的图类型和版本不同，用前确认
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjAwNzg0MzQ4MF19
-->