(() => {
  let isNormalizing = false;

  const normalizeCurrency = (root = document.body) => {
    if (isNormalizing || !root) return;
    isNormalizing = true;
    try {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach(node => {
        if (node.nodeValue && node.nodeValue.includes('$')) {
          node.nodeValue = node.nodeValue.replace(/\$/g, 'GH₵');
        }
      });
    } finally {
      isNormalizing = false;
    }
  };

  normalizeCurrency();

  const observer = new MutationObserver(records => {
    if (isNormalizing) return;
    records.forEach(record => {
      record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue && node.nodeValue.includes('$')) {
          node.nodeValue = node.nodeValue.replace(/\$/g, 'GH₵');
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          normalizeCurrency(node);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
