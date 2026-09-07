(() => {
  const stockByName = {
    'Everyday resistance band': 12,
    'The reset kit': 4,
    'Cloud nine body oil': 0,
    'Sunday kitchen set': 7,
    'Good mood essentials': 2,
    'The fun little extra': 18,
    'Move with ease mat': 5,
    'Clear space starter': 0
  };

  const updateStockLabels = (root = document) => {
    root.querySelectorAll('.product-card').forEach(card => {
      const name = card.querySelector('.product-info h3')?.textContent.trim();
      if (!(name in stockByName)) return;
      const stock = stockByName[name];
      let label = card.querySelector('.stock-status');
      if (!label) {
        label = document.createElement('span');
        label.className = 'stock-status';
        card.querySelector('.product-info')?.append(label);
      }
      const state = stock === 0 ? 'sold-out' : stock <= 3 ? 'low-stock' : 'in-stock';
      label.className = `stock-status ${state}`;
      label.textContent = stock === 0 ? 'Sold out' : stock <= 3 ? `Only ${stock} left` : 'In stock';
      const addButton = card.querySelector('[data-add]');
      if (addButton) {
        addButton.disabled = stock === 0;
        addButton.setAttribute('aria-label', stock === 0 ? `${name} is sold out` : `Add ${name} to bag`);
        addButton.title = stock === 0 ? 'Sold out' : 'Add to bag';
      }
    });
  };

  updateStockLabels();
  new MutationObserver(() => updateStockLabels()).observe(document.querySelector('#product-grid'), {childList: true, subtree: true});
})();
