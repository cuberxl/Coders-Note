document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".markdown-body .highlighter-rouge").forEach(function (block) {
    const code = block.querySelector("code");
    if (!code) return;

    const className = (code.className || "") + " " + (block.className || "");
    const isCpp = /language-cpp|cpp/.test(className);

    if (!isCpp) return;
    if (block.closest("details")) return;

    const details = document.createElement("details");
    const summary = document.createElement("summary");

    summary.textContent = "点击展开 C++ 代码";
    details.className = "collapsible-code";

    block.parentNode.insertBefore(details, block);
    details.appendChild(summary);
    details.appendChild(block);
  });
});
