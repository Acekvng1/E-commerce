(() => {
  const normalizeCurrency = (root = document.body) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      if (node.nodeValue.includes('$')) node.nodeValue = node.nodeValue.replace(/\$/g, 'GH₵');
    });
  };
  normalizeCurrency();
  new MutationObserver(records => records.forEach(record => {
    record.addedNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.includes('$')) node.nodeValue = node.nodeValue.replace(/\$/g, 'GH₵');
      if (node.nodeType === Node.ELEMENT_NODE) normalizeCurrency(node);
    });
  })).observe(document.body, {childList: true, subtree: true});
})();
