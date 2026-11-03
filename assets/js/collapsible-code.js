document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".markdown-body .highlighter-rouge")
    .forEach(function (block) {
      const code = block.querySelector("code");
      if (!code || block.closest("details")) return;

      const classes = [...block.classList, ...code.classList];
      const isCpp = classes.some(
        name => name === "cpp" || name === "language-cpp"
      );

      if (!isCpp) return;

      const details = document.createElement("details");
      const summary = document.createElement("summary");

      summary.textContent = "点击展开 C++ 代码";
      details.className = "collapsible-code";

      block.parentNode.insertBefore(details, block);
      details.appendChild(summary);
      details.appendChild(block);
    });
});
