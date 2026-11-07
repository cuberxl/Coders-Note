(function () {
  function injectMermaidStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .markdown-body .mermaid {
        box-sizing: border-box;
        margin: 1.5rem 0;
        padding: 1.25rem;
        overflow-x: auto;
        text-align: center;
        background: linear-gradient(135deg, #f8fafc, #eef2ff);
        border: 1px solid #dbe3f0;
        border-radius: 12px;
        box-shadow: 0 4px 14px rgba(30, 41, 59, 0.06);
      }

      .markdown-body .mermaid svg {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 0 auto;
      }

      .markdown-body details.collapsible-code {
        margin: 1rem 0;
        border: 1px solid #d8dee8;
        border-radius: 8px;
        overflow: hidden;
      }

      .markdown-body details.collapsible-code > summary {
        padding: 0.65rem 1rem;
        cursor: pointer;
        color: #334155;
        background: #f1f5f9;
        font-weight: 600;
      }

      .markdown-body details.collapsible-code[open] > summary {
        border-bottom: 1px solid #d8dee8;
      }

      .markdown-body details.collapsible-code pre {
        margin: 0;
        border-radius: 0;
      }
    `;
    document.head.appendChild(style);
  }

  function renderMermaid() {
    const blocks = [];

    document.querySelectorAll(".markdown-body .highlighter-rouge, .markdown-body pre").forEach(function (block) {
      const code = block.querySelector("code");

      if (!code) return;

      const classes = [...block.classList, ...code.classList];
      const isMermaid = classes.some(function (name) {
        return name === "mermaid" || name === "language-mermaid";
      });

      if (isMermaid) {
        blocks.push(block);
      }
    });

    blocks.forEach(function (block) {
      const code = block.querySelector("code");
      if (!code) return;

      const diagram = document.createElement("div");
      diagram.className = "mermaid";
      diagram.textContent = code.textContent.trim();

      block.replaceWith(diagram);
    });

    if (!document.querySelector(".markdown-body .mermaid")) return;

    if (!window.mermaid) {
      console.warn("Mermaid 未加载，跳过渲染");
      return;
    }

    window.mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        fontSize: "16px",
        background: "#f8fafc",
        primaryColor: "#e0e7ff",
        primaryTextColor: "#1e293b",
        primaryBorderColor: "#6366f1",
        lineColor: "#64748b",
        secondaryColor: "#dcfce7",
        tertiaryColor: "#ffedd5",
        edgeLabelBackground: "#ffffff"
      },
      flowchart: {
        curve: "basis",
        nodeSpacing: 45,
        rankSpacing: 60,
        padding: 16,
        htmlLabels: true
      }
    });

    try {
      window.mermaid.run({
        nodes: document.querySelectorAll(".markdown-body .mermaid")
      });
    } catch (error) {
      console.error("Mermaid 渲染失败：", error);
    }
  }

  function collapseCppCodeBlocks() {
    document.querySelectorAll(".markdown-body .highlighter-rouge").forEach(function (block) {
      const code = block.querySelector("code");
      if (!code || block.closest("details")) return;

      const classes = [...block.classList, ...code.classList];
      const isCpp = classes.some(function (name) {
        return name === "cpp" || name === "language-cpp";
      });

      if (!isCpp) return;

      const details = document.createElement("details");
      const summary = document.createElement("summary");

      summary.textContent = "点击展开代码";
      details.className = "collapsible-code";

      block.parentNode.insertBefore(details, block);
      details.appendChild(summary);
      details.appendChild(block);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectMermaidStyles();
    renderMermaid();
    collapseCppCodeBlocks();
  });
})();
