document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".markdown-body .highlighter-rouge")
    .forEach(function (block) {
      if (block.closest("details")) return;

      const details = document.createElement("details");
      const summary = document.createElement("summary");

      summary.textContent = "点击展开代码";
      details.className = "collapsible-code";

      block.parentNode.insertBefore(details, block);
      details.appendChild(summary);
      details.appendChild(block);
    });
});
