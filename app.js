// Review Slider
const reviewSlider = document.querySelector('#review-slider');
if (reviewSlider) {
  const reviewSlides = [...reviewSlider.querySelectorAll('[data-review-slide]')];
  const reviewCurrent = document.querySelector('#review-current');
  let reviewIndex = 0;
  let reviewTimer;

  const showReview = index => {
    reviewIndex = (index + reviewSlides.length) % reviewSlides.length;
    reviewSlides.forEach((slide, slideIndex) => {
      const active = slideIndex === reviewIndex;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
    });
    if (reviewCurrent) {
      reviewCurrent.textContent = String(reviewIndex + 1).padStart(2, '0');
    }
  };

  const restartReviewTimer = () => {
    clearInterval(reviewTimer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reviewTimer = setInterval(() => showReview(reviewIndex + 1), 6000);
    }
  };

  document.querySelector('[data-review-action="previous"]')?.addEventListener('click', () => {
    showReview(reviewIndex - 1);
    restartReviewTimer();
  });

  document.querySelector('[data-review-action="next"]')?.addEventListener('click', () => {
    showReview(reviewIndex + 1);
    restartReviewTimer();
  });

  reviewSlider.addEventListener('mouseenter', () => clearInterval(reviewTimer));
  reviewSlider.addEventListener('mouseleave', restartReviewTimer);
  reviewSlider.addEventListener('focusin', () => clearInterval(reviewTimer));
  reviewSlider.addEventListener('focusout', restartReviewTimer);
  reviewSlider.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      showReview(reviewIndex - 1);
      restartReviewTimer();
    }
    if (event.key === 'ArrowRight') {
      showReview(reviewIndex + 1);
      restartReviewTimer();
    }
  });

  restartReviewTimer();
}

// Receipt Handling
function openReceipt() {
  if (!cart.length) {
    showToast('Add an item before printing a receipt.');
    return;
  }
  const now = new Date();
  $('#receipt-order-number').textContent = `Order #CF-${String(now.getTime()).slice(-6)}`;
  $('#receipt-date').textContent = now.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  $('#receipt-lines').innerHTML = cart.map(item => `<div class="receipt-line"><span>${item.qty} x ${item.name}</span><strong>${money(item.price * item.qty)}</strong></div>`).join('');
  $('#receipt-total').textContent = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
  $('#cart-drawer').classList.remove('open');
  $('#drawer-backdrop').hidden = true;
  $('#receipt-backdrop').hidden = false;
}

document.querySelector('[data-action="checkout"]')?.addEventListener('click', openReceipt);
document.querySelector('[data-action="print-receipt"]')?.addEventListener('click', () => window.print());
document.querySelector('[data-action="close-receipt"]')?.addEventListener('click', () => $('#receipt-backdrop').hidden = true);

// Mobile Nav Toggle
document.querySelector('[data-action="toggle-menu"]')?.addEventListener('click', () => {
  document.querySelector('.site-header')?.classList.toggle('menu-open');
});

// Products & Store State
const products = [
  { id: 1, name: 'Everyday resistance band', category: 'Fitness', price: 18, image: 'assets/images/prod_1_1769168283.webp', description: 'A quietly powerful addition to your movement routine.', badge: 'Best seller' },
  { id: 2, name: 'The reset kit', category: 'Wellness', price: 32, image: 'assets/images/prod_2_1769171281.webp', description: 'Your small, satisfying pause in a box.' },
  { id: 3, name: 'Cloud nine body oil', category: 'Care', price: 24, image: 'assets/images/prod_3_1770907729.jpg', description: 'A lightweight daily ritual for soft, happy skin.' },
  { id: 4, name: 'Sunday kitchen set', category: 'Home', price: 42, image: 'assets/images/prod_5_1770908194.webp', description: 'Simple tools for meals worth lingering over.', badge: 'New' },
  { id: 5, name: 'Good mood essentials', category: 'Wellness', price: 29, image: 'assets/images/prod_8_1771192294.jpg', description: 'A few everyday favorites, gathered together.' },
  { id: 6, name: 'The fun little extra', category: 'Care', price: 36, image: 'assets/images/prod_8_6994c7e9e4fce.webp', description: 'Because practical can have personality too.' },
  { id: 7, name: 'Move with ease mat', category: 'Fitness', price: 38, image: 'assets/images/prod_8_6994c7e9e8696.webp', description: 'A grounded start to your next good habit.' },
  { id: 8, name: 'Clear space starter', category: 'Home', price: 21, image: 'assets/images/prod_2_1769171281.webp', description: 'Less fuss, more room for what matters.' },
  { id: 9, name: 'Ceramic incense burner', category: 'Smoking', price: 28, image: 'assets/images/categories/cat_1771162535_e8c710f7.webp', description: 'Clean lines and slow burns for calm spaces.', badge: 'Popular' },
  { id: 10, name: 'Organic cotton play mat', category: 'Kids', price: 34, image: 'assets/images/categories/cat_1771172874_547cf9a8.jpeg', description: 'Soft, safe padding for little adventures.', badge: 'New' }
];

let activeFilter = 'All';
let cart = JSON.parse(localStorage.getItem('citas-cart') || '[]');

const $ = selector => document.querySelector(selector);
const money = value => `GH₵${Number(value).toFixed(2)}`;

function visibleProducts() {
  const term = ($('#search-input')?.value || '').toLowerCase();
  let list = products.filter(p =>
    (activeFilter === 'All' || p.category === activeFilter) &&
    `${p.name} ${p.description}`.toLowerCase().includes(term)
  );
  const sort = $('#sort-select')?.value;
  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  if (sort === 'high') list.sort((a, b) => b.price - a.price);
  return list;
}

function renderProducts() {
  const grid = $('#product-grid');
  if (!grid) return;
  const items = visibleProducts();

  grid.innerHTML = items.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <button class="quick-add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.category} · ${p.description}</p>
        <span class="price">${money(p.price)}</span>
      </div>
    </article>
  `).join('');

  const emptyState = $('#empty-state');
  if (emptyState) {
    emptyState.hidden = items.length > 0;
  }

  // Trigger stock label update
  if (typeof window.updateStockLabels === 'function') {
    window.updateStockLabels(grid);
  }
  grid.dispatchEvent(new CustomEvent('products:rendered'));
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = $('#cart-count');
  if (cartCountEl) cartCountEl.textContent = count;

  const cartTotalEl = $('#cart-total');
  if (cartTotalEl) cartTotalEl.textContent = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));

  const cartItemsEl = $('#cart-items');
  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.length
      ? cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h3>${item.name}</h3>
              <p>${money(item.price)}</p>
              <div class="qty-controls">
                <button data-minus="${item.id}" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button data-plus="${item.id}" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <button class="close-button" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
          </div>
        `).join('')
      : '<p class="empty-state">Your bag is waiting for something good.</p>';
  }

  localStorage.setItem('citas-cart', JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (window.stockByName && window.stockByName[product.name] === 0) {
    showToast(`${product.name} is currently sold out.`);
    return;
  }

  const existing = cart.find(p => p.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  showToast(`${product.name} added to your bag`);
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

function openModal(product) {
  if (!product) return;
  const isSoldOut = Boolean(window.stockByName && window.stockByName[product.name] === 0);

  $('#modal-content').innerHTML = `
    <div class="quick-content">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <p class="eyebrow">${product.category}</p>
        <h2 id="modal-title">${product.name}</h2>
        <p>${product.description}</p>
        <strong class="price">${money(product.price)}</strong>
        <br>
        <button class="button button-dark" data-add="${product.id}" style="margin-top:22px" ${isSoldOut ? 'disabled' : ''}>
          ${isSoldOut ? 'Sold out' : 'Add to bag <span>+</span>'}
        </button>
      </div>
    </div>
  `;
  $('#modal-backdrop').hidden = false;
}

function openCart() {
  $('#cart-drawer')?.classList.add('open');
  const backdrop = $('#drawer-backdrop');
  if (backdrop) backdrop.hidden = false;
}

function closeModal() {
  const modal = $('#modal-backdrop');
  if (modal) modal.hidden = true;
}

// Global Click Handlers
document.addEventListener('click', event => {
  const add = event.target.closest('[data-add]');
  if (add) {
    addToCart(Number(add.dataset.add));
    if (!$('#modal-backdrop')?.hidden) closeModal();
    return;
  }

  const filter = event.target.closest('[data-filter]');
  if (filter) {
    activeFilter = filter.dataset.filter;
    document.querySelectorAll('.filter').forEach(button => {
      button.classList.toggle('active', button === filter);
    });
    renderProducts();
    return;
  }

  const plus = event.target.closest('[data-plus]');
  if (plus) {
    const item = cart.find(p => p.id === Number(plus.dataset.plus));
    if (item) {
      item.qty++;
      renderCart();
    }
    return;
  }

  const minus = event.target.closest('[data-minus]');
  if (minus) {
    const item = cart.find(p => p.id === Number(minus.dataset.minus));
    if (item) {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(p => p.id !== item.id);
      }
      renderCart();
    }
    return;
  }

  const remove = event.target.closest('[data-remove]');
  if (remove) {
    cart = cart.filter(p => p.id !== Number(remove.dataset.remove));
    renderCart();
    return;
  }

  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'open-cart') openCart();
  if (action === 'close-cart') {
    $('#cart-drawer')?.classList.remove('open');
    if ($('#drawer-backdrop')) $('#drawer-backdrop').hidden = true;
  }
  if (action === 'close-modal') closeModal();
  if (action === 'focus-search') {
    const searchInput = $('#search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  if (action === 'account') {
    showToast('Account sign-in will be connected in the next release.');
  }

  const card = event.target.closest('.product-card');
  if (card && !event.target.closest('button')) {
    const addBtn = card.querySelector('[data-add]');
    if (addBtn) {
      const prod = products.find(p => p.id === Number(addBtn.dataset.add));
      if (prod) openModal(prod);
    }
  }
});

// Search & Sort Event Listeners
$('#search-input')?.addEventListener('input', renderProducts);
$('#sort-select')?.addEventListener('change', renderProducts);

// Category Cards
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    activeFilter = card.dataset.category;
    document.querySelectorAll('.filter').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === activeFilter);
    });
    renderProducts();
  });
});

// Forms
$('#newsletter-form')?.addEventListener('submit', event => {
  event.preventDefault();
  event.target.reset();
  showToast('You’re on the list. Welcome to the funhouse.');
});

$('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  event.target.reset();
  showToast('Message received. We’ll get back to you soon.');
});

// Backdrops
$('#drawer-backdrop')?.addEventListener('click', () => {
  $('#cart-drawer')?.classList.remove('open');
  $('#drawer-backdrop').hidden = true;
});

$('#modal-backdrop')?.addEventListener('click', event => {
  if (event.target.id === 'modal-backdrop') closeModal();
});

// Initial Render
renderProducts();
renderCart();