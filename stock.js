(() => {
  function getStockMap() {
    try {
      const adminProds = JSON.parse(localStorage.getItem('citas_admin_products') || 'null');
      if (Array.isArray(adminProds) && adminProds.length) {
        const map = {};
        adminProds.forEach(p => { map[p.name] = p.stock; });
        return map;
      }
    } catch (e) {}
    return {
      'Everyday resistance band': 12,
      'The reset kit': 4,
      'Cloud nine body oil': 0,
      'Sunday kitchen set': 7,
      'Good mood essentials': 2,
      'The fun little extra': 18,
      'Move with ease mat': 5,
      'Clear space starter': 0,
      'Ceramic incense burner': 8,
      'Organic cotton play mat': 6
    };
  }

  const stockByName = getStockMap();
  window.stockByName = stockByName;

  let isUpdating = false;

  const updateStockLabels = (root = document) => {
    if (isUpdating) return;
    isUpdating = true;

    try {
      const cards = root.querySelectorAll ? root.querySelectorAll('.product-card') : [];
      cards.forEach(card => {
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
        const targetClass = `stock-status ${state}`;
        const targetText = stock === 0 ? 'Sold out' : stock <= 3 ? `Only ${stock} left` : 'In stock';

        if (label.className !== targetClass) {
          label.className = targetClass;
        }
        if (label.textContent !== targetText) {
          label.textContent = targetText;
        }

        const addButton = card.querySelector('[data-add]');
        if (addButton) {
          const isSoldOut = stock === 0;
          if (addButton.disabled !== isSoldOut) {
            addButton.disabled = isSoldOut;
          }
          const targetAria = isSoldOut ? `${name} is sold out` : `Add ${name} to bag`;
          if (addButton.getAttribute('aria-label') !== targetAria) {
            addButton.setAttribute('aria-label', targetAria);
          }
          const targetTitle = isSoldOut ? 'Sold out' : 'Add to bag';
          if (addButton.title !== targetTitle) {
            addButton.title = targetTitle;
          }
        }
      });
    } finally {
      if (gridObserver) {
        // Discard any mutation records queued during updateStockLabels
        gridObserver.takeRecords();
      }
      isUpdating = false;
    }
  };

  window.updateStockLabels = updateStockLabels;

  const grid = document.querySelector('#product-grid');
  let gridObserver = null;

  if (grid) {
    // Only observe DIRECT childList changes on #product-grid (subtree: false)
    // to prevent infinite loops from mutating card contents
    gridObserver = new MutationObserver(mutations => {
      const hasCardChanges = mutations.some(m =>
        Array.from(m.addedNodes).some(n => n.nodeType === 1 && (n.classList.contains('product-card') || n.querySelector?.('.product-card')))
      );
      if (hasCardChanges) {
        updateStockLabels(grid);
      }
    });

    gridObserver.observe(grid, { childList: true, subtree: false });
    grid.addEventListener('products:rendered', () => updateStockLabels(grid));
  }

  updateStockLabels();
})();
