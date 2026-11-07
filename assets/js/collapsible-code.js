(function () {
  function collapseCppCodeBlocks() {
    document
      .querySelectorAll('.markdown-body .highlighter-rouge')
      .forEach(function (block) {
        const code = block.querySelector('code');

        if (!code || block.closest('details')) {
          return;
        }

        const classes = [...block.classList, ...code.classList];

        const isCpp = classes.some(function (name) {
          return name === 'cpp' || name === 'language-cpp';
        });

        if (!isCpp || !block.parentNode) {
          return;
        }

        const details = document.createElement('details');
        const summary = document.createElement('summary');

        details.className = 'collapsible-code';
        summary.textContent = '点击展开代码';

        block.parentNode.insertBefore(details, block);
        details.appendChild(summary);
        details.appendChild(block);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      collapseCppCodeBlocks,
      { once: true }
    );
  } else {
    collapseCppCodeBlocks();
  }
})();
