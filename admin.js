/**
 * Cita's Funhouse Admin Dashboard & Store Manager
 * Client-side persistence, real-time inventory & expiry monitoring,
 * order pipeline tracking, and notifications.
 */

(() => {
  // Storage Keys
  const STORAGE_KEY_PRODUCTS = 'citas_admin_products';
  const STORAGE_KEY_ORDERS = 'citas_admin_orders';
  const STORAGE_KEY_CATEGORIES = 'citas_admin_categories';
  const STORAGE_KEY_PROMOS = 'citas_admin_promos';
  const STORAGE_KEY_DISMISSED_NOTIFS = 'citas_admin_dismissed_notifs';

  // Seed Data Generator
  function getInitialProducts() {
    const today = new Date();
    const addDays = (d) => {
      const target = new Date(today);
      target.setDate(target.getDate() + d);
      return target.toISOString().split('T')[0];
    };

    return [
      {
        id: 1,
        sku: 'FIT-001',
        name: 'Everyday resistance band',
        category: 'Fitness',
        price: 18,
        stock: 12,
        batch: 'BCH-26-F01',
        expiry: addDays(180),
        image: 'assets/images/prod_1_1769168283.webp',
        description: 'A quietly powerful addition to your movement routine.',
        badge: 'Best seller'
      },
      {
        id: 2,
        sku: 'WEL-002',
        name: 'The reset kit',
        category: 'Wellness',
        price: 32,
        stock: 4,
        batch: 'BCH-26-W09',
        expiry: addDays(22), // Expiring soon!
        image: 'assets/images/prod_2_1769171281.webp',
        description: 'Your small, satisfying pause in a box.',
        badge: ''
      },
      {
        id: 3,
        sku: 'CAR-003',
        name: 'Cloud nine body oil',
        category: 'Care',
        price: 24,
        stock: 0, // Sold out & Expired batch!
        batch: 'BCH-25-C11',
        expiry: addDays(-4), // Expired!
        image: 'assets/images/prod_3_1770907729.jpg',
        description: 'A lightweight daily ritual for soft, happy skin.',
        badge: ''
      },
      {
        id: 4,
        sku: 'HOM-004',
        name: 'Sunday kitchen set',
        category: 'Home',
        price: 42,
        stock: 7,
        batch: 'BCH-26-H04',
        expiry: addDays(365),
        image: 'assets/images/prod_5_1770908194.webp',
        description: 'Simple tools for meals worth lingering over.',
        badge: 'New'
      },
      {
        id: 5,
        sku: 'WEL-005',
        name: 'Good mood essentials',
        category: 'Wellness',
        price: 29,
        stock: 2, // Low stock & expiring soon!
        batch: 'BCH-26-W12',
        expiry: addDays(14), // Expiring soon!
        image: 'assets/images/prod_8_1771192294.jpg',
        description: 'A few everyday favorites, gathered together.',
        badge: ''
      },
      {
        id: 6,
        sku: 'CAR-006',
        name: 'The fun little extra',
        category: 'Care',
        price: 36,
        stock: 18,
        batch: 'BCH-26-C08',
        expiry: addDays(210),
        image: 'assets/images/prod_8_6994c7e9e4fce.webp',
        description: 'Because practical can have personality too.',
        badge: ''
      },
      {
        id: 7,
        sku: 'FIT-007',
        name: 'Move with ease mat',
        category: 'Fitness',
        price: 38,
        stock: 5,
        batch: 'BCH-26-F02',
        expiry: addDays(280),
        image: 'assets/images/prod_8_6994c7e9e8696.webp',
        description: 'A grounded start to your next good habit.',
        badge: ''
      },
      {
        id: 8,
        sku: 'HOM-008',
        name: 'Clear space starter',
        category: 'Home',
        price: 21,
        stock: 0, // Sold out
        batch: 'BCH-25-H09',
        expiry: addDays(90),
        image: 'assets/images/prod_2_1769171281.webp',
        description: 'Less fuss, more room for what matters.',
        badge: ''
      },
      {
        id: 9,
        sku: 'SMK-009',
        name: 'Ceramic incense burner',
        category: 'Smoking',
        price: 28,
        stock: 8,
        batch: 'BCH-26-S03',
        expiry: addDays(400),
        image: 'assets/images/categories/cat_1771162535_e8c710f7.webp',
        description: 'Clean lines and slow burns for calm spaces.',
        badge: 'Popular'
      },
      {
        id: 10,
        sku: 'KID-010',
        name: 'Organic cotton play mat',
        category: 'Kids',
        price: 34,
        stock: 6,
        batch: 'BCH-26-K01',
        expiry: addDays(310),
        image: 'assets/images/categories/cat_1771172874_547cf9a8.jpeg',
        description: 'Soft, safe padding for little adventures.',
        badge: 'New'
      }
    ];
  }

  function getInitialOrders() {
    const now = new Date();
    const formatDate = (minutesAgo) => {
      const d = new Date(now.getTime() - minutesAgo * 60 * 1000);
      return d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    };

    return [
      {
        id: 'CF-849201',
        date: formatDate(35),
        customer: { name: 'Ama Konadu', email: 'ama.k@gmail.com', phone: '+233 24 555 0192' },
        address: 'East Legon, Accra',
        method: 'Home Delivery',
        items: [
          { id: 2, name: 'The reset kit', price: 32, qty: 1 },
          { id: 1, name: 'Everyday resistance band', price: 18, qty: 2 }
        ],
        subtotal: 68,
        shipping: 15,
        total: 83,
        status: 'pending'
      },
      {
        id: 'CF-738192',
        date: formatDate(180),
        customer: { name: 'Nana Boakye', email: 'nana.b@outlook.com', phone: '+233 50 123 4567' },
        address: 'Osu, Accra',
        method: 'In-store Pickup',
        items: [
          { id: 4, name: 'Sunday kitchen set', price: 42, qty: 1 }
        ],
        subtotal: 42,
        shipping: 0,
        total: 42,
        status: 'processing'
      },
      {
        id: 'CF-619283',
        date: formatDate(520),
        customer: { name: 'Kwame Owusu', email: 'kowusu@yahoo.com', phone: '+233 20 987 6543' },
        address: 'Airport Residential, Accra',
        method: 'Home Delivery',
        items: [
          { id: 7, name: 'Move with ease mat', price: 38, qty: 1 },
          { id: 9, name: 'Ceramic incense burner', price: 28, qty: 1 }
        ],
        subtotal: 66,
        shipping: 15,
        total: 81,
        status: 'shipped'
      },
      {
        id: 'CF-509182',
        date: formatDate(1440),
        customer: { name: 'Efua Dadson', email: 'efua.dadson@gmail.com', phone: '+233 24 333 8899' },
        address: 'Cantonments, Accra',
        method: 'Home Delivery',
        items: [
          { id: 5, name: 'Good mood essentials', price: 29, qty: 2 },
          { id: 6, name: 'The fun little extra', price: 36, qty: 1 }
        ],
        subtotal: 94,
        shipping: 15,
        total: 109,
        status: 'delivered'
      }
    ];
  }

  function getInitialCategories() {
    return [
      { id: 1, name: 'Wellness', tagline: 'Small rituals, big shifts.', image: 'assets/images/categories/cat_1771161868_a35ae236.webp' },
      { id: 2, name: 'Home', tagline: 'Make space for good things.', image: 'assets/images/categories/cat_1771164356_67b0c821.webp' },
      { id: 3, name: 'Fitness', tagline: 'Feel good in motion.', image: 'assets/images/categories/cat_1771107288_fb8d135f.jpg' },
      { id: 4, name: 'Care', tagline: 'Your daily reset.', image: 'assets/images/categories/cat_1771163759_392e49d5.webp' },
      { id: 5, name: 'Smoking', tagline: 'Set the mood, your way.', image: 'assets/images/categories/cat_1771162535_e8c710f7.webp' },
      { id: 6, name: 'Kids', tagline: 'Little things for big days.', image: 'assets/images/categories/cat_1771172874_547cf9a8.jpeg' }
    ];
  }

  function getInitialPromos() {
    return [
      {
        id: 1,
        title: 'New Season Rituals',
        code: 'RITUAL15',
        discount: 15,
        start: '2026-09-01',
        end: '2026-10-31',
        details: 'Enjoy 15% off wellness & care essentials on orders above GH₵150.',
        active: true
      },
      {
        id: 2,
        title: 'Welcome to the Funhouse',
        code: 'FUNHOUSE10',
        discount: 10,
        start: '2026-01-01',
        end: '2026-12-31',
        details: '10% discount for first-time shoppers across all catalog items.',
        active: true
      },
      {
        id: 3,
        title: 'Weekend Flash Drop',
        code: 'FLASH25',
        discount: 25,
        start: '2026-09-12',
        end: '2026-09-15',
        details: 'Exclusive 25% discount for subscriber club members.',
        active: false
      }
    ];
  }

  // State Management
  const Store = {
    products: JSON.parse(localStorage.getItem(STORAGE_KEY_PRODUCTS) || 'null') || getInitialProducts(),
    orders: JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS) || 'null') || getInitialOrders(),
    categories: JSON.parse(localStorage.getItem(STORAGE_KEY_CATEGORIES) || 'null') || getInitialCategories(),
    promos: JSON.parse(localStorage.getItem(STORAGE_KEY_PROMOS) || 'null') || getInitialPromos(),
    dismissedNotifs: JSON.parse(localStorage.getItem(STORAGE_KEY_DISMISSED_NOTIFS) || '[]'),

    save() {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(this.products));
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(this.orders));
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(this.categories));
      localStorage.setItem(STORAGE_KEY_PROMOS, JSON.stringify(this.promos));
      localStorage.setItem(STORAGE_KEY_DISMISSED_NOTIFS, JSON.stringify(this.dismissedNotifs));

      // Synchronize stock table in stockByName for storefront
      const stockByName = {};
      this.products.forEach(p => { stockByName[p.name] = p.stock; });
      localStorage.setItem('citas_stock_by_name', JSON.stringify(stockByName));
    },

    reset() {
      this.products = getInitialProducts();
      this.orders = getInitialOrders();
      this.categories = getInitialCategories();
      this.promos = getInitialPromos();
      this.dismissedNotifs = [];
      this.save();
    }
  };

  // Ensure initial data is persisted immediately
  Store.save();

  // Helper Functions
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const money = value => `GH₵${Number(value || 0).toFixed(2)}`;

  function calculateExpiryInfo(expiryDateStr) {
    if (!expiryDateStr) {
      return { status: 'safe', label: 'No Expiry Set', days: 9999, class: 'expiry-safe' };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(expiryDateStr);
    exp.setHours(0, 0, 0, 0);
    const diffTime = exp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        status: 'expired',
        days: diffDays,
        label: `Expired (${Math.abs(diffDays)}d ago)`,
        class: 'expiry-expired'
      };
    }
    if (diffDays <= 30) {
      return {
        status: 'expiring-soon',
        days: diffDays,
        label: `Expiring in ${diffDays}d`,
        class: 'expiry-warning'
      };
    }
    return {
      status: 'safe',
      days: diffDays,
      label: `Safe (${diffDays}d left)`,
      class: 'expiry-safe'
    };
  }

  function getStockStatusInfo(stock) {
    const qty = Number(stock || 0);
    if (qty === 0) {
      return { status: 'sold-out', label: 'Sold Out', class: 'status-sold-out' };
    }
    if (qty <= 3) {
      return { status: 'low-stock', label: `Low (${qty} left)`, class: 'status-low-stock' };
    }
    return { status: 'in-stock', label: `In Stock (${qty})`, class: 'status-in-stock' };
  }

  function showToast(message) {
    const toast = $('#admin-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // System Notifications Engine
  function generateAlerts() {
    const alerts = [];

    // 1. Check Expired Batches
    Store.products.forEach(p => {
      const exp = calculateExpiryInfo(p.expiry);
      if (exp.status === 'expired') {
        alerts.push({
          id: `exp-${p.id}`,
          type: 'critical',
          icon: '🛑',
          title: `Batch Expired: ${p.name}`,
          message: `Batch #${p.batch || 'N/A'} expired on ${p.expiry}. Pull this batch from active stock immediately.`,
          time: 'Action Required',
          view: 'inventory'
        });
      } else if (exp.status === 'expiring-soon') {
        alerts.push({
          id: `exp-soon-${p.id}`,
          type: 'warning',
          icon: '⏳',
          title: `Expiring Soon: ${p.name}`,
          message: `Only ${exp.days} days remaining before batch #${p.batch || 'N/A'} reaches expiry (${p.expiry}).`,
          time: `${exp.days} days left`,
          view: 'inventory'
        });
      }
    });

    // 2. Check Stock Levels
    Store.products.forEach(p => {
      if (p.stock === 0) {
        alerts.push({
          id: `stock-out-${p.id}`,
          type: 'critical',
          icon: '🚫',
          title: `Out of Stock: ${p.name}`,
          message: `Inventory reached 0 units. Customer quick-add button has been disabled on the storefront.`,
          time: 'Urgent',
          view: 'inventory'
        });
      } else if (p.stock <= 3) {
        alerts.push({
          id: `stock-low-${p.id}`,
          type: 'warning',
          icon: '⚠️',
          title: `Low Stock Alert: ${p.name}`,
          message: `Only ${p.stock} units remaining. Consider creating a purchase order or restock.`,
          time: `${p.stock} remaining`,
          view: 'inventory'
        });
      }
    });

    // 3. Check Pending Orders
    const pendingOrders = Store.orders.filter(o => o.status === 'pending');
    pendingOrders.forEach(o => {
      alerts.push({
        id: `ord-${o.id}`,
        type: 'info',
        icon: '📦',
        title: `Pending Order: ${o.id}`,
        message: `${o.customer.name} placed an order for ${money(o.total)} via ${o.method}. Awaiting processing.`,
        time: o.date,
        view: 'orders'
      });
    });

    return alerts;
  }

  // Render Alert Center
  function renderNotifications() {
    const alerts = generateAlerts();
    const activeAlerts = alerts.filter(a => !Store.dismissedNotifs.includes(a.id));

    const badge = $('#notif-badge');
    const navAlerts = $('#nav-alerts-count');
    const notifCountText = $('#notif-count-text');
    const notifList = $('#notif-list');
    const vigilanceList = $('#overview-vigilance-list');

    const totalCount = activeAlerts.length;
    if (badge) badge.textContent = totalCount;
    if (notifCountText) notifCountText.textContent = totalCount;

    if (navAlerts) {
      navAlerts.textContent = totalCount;
      navAlerts.hidden = totalCount === 0;
    }

    // Dropdown list
    if (notifList) {
      if (!activeAlerts.length) {
        notifList.innerHTML = '<li class="notification-empty">All clear! No pending alerts or inventory issues.</li>';
      } else {
        notifList.innerHTML = activeAlerts.map(a => `
          <li class="notification-item">
            <div class="notif-icon notif-${a.type}">${a.icon}</div>
            <div class="notif-body">
              <strong>${a.title}</strong>
              <p>${a.message}</p>
              <span class="notif-time">${a.time}</span>
            </div>
            <button class="clear-btn" data-dismiss-notif="${a.id}" title="Dismiss" style="font-size:16px;">×</button>
          </li>
        `).join('');
      }
    }

    // Overview Vigilance List
    if (vigilanceList) {
      if (!alerts.length) {
        vigilanceList.innerHTML = '<li class="notification-empty">Zero stock or expiry alerts. Store is running smoothly.</li>';
      } else {
        vigilanceList.innerHTML = alerts.slice(0, 5).map(a => `
          <li class="notification-item" style="padding: 10px 0;">
            <div class="notif-icon notif-${a.type}">${a.icon}</div>
            <div class="notif-body">
              <strong>${a.title}</strong>
              <p>${a.message}</p>
              <span class="notif-time">${a.time}</span>
            </div>
          </li>
        `).join('');
      }
    }
  }

  // View Switching
  function switchView(viewName) {
    $$('.view-section').forEach(sec => sec.classList.remove('active'));
    $$('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));

    const targetSection = $(`#view-${viewName}`);
    if (targetSection) targetSection.classList.add('active');

    // Title in topbar
    const titleMap = {
      overview: 'Dashboard Overview',
      orders: 'Customer Orders',
      inventory: 'Inventory & Expiry Monitoring',
      products: 'Products Catalog',
      categories: 'Categories Manager',
      promotions: 'Promotions & Coupons',
      settings: 'Data & Backup Settings'
    };
    const titleEl = $('#topbar-title');
    if (titleEl) titleEl.textContent = titleMap[viewName] || 'Dashboard';

    // Close mobile sidebar if open
    $('#sidebar')?.classList.remove('mobile-open');

    // Refresh active view
    renderCurrentView(viewName);
  }

  function renderCurrentView(viewName) {
    if (viewName === 'overview') renderOverview();
    if (viewName === 'orders') renderOrders();
    if (viewName === 'inventory') renderInventory();
    if (viewName === 'products') renderProducts();
    if (viewName === 'categories') renderCategories();
    if (viewName === 'promotions') renderPromotions();
    renderNotifications();
  }

  // 1. OVERVIEW RENDERING
  function renderOverview() {
    // Total Revenue from delivered/shipped/processing orders
    const totalRev = Store.orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    $('#kpi-revenue').textContent = money(totalRev);

    // Orders Count
    const totalOrders = Store.orders.length;
    const pendingOrders = Store.orders.filter(o => o.status === 'pending').length;
    $('#kpi-orders').textContent = totalOrders;
    $('#kpi-pending-orders').textContent = `${pendingOrders} awaiting fulfillment`;
    $('#nav-orders-count').textContent = pendingOrders;

    // Stock Alerts Count
    const lowOrSoldOut = Store.products.filter(p => p.stock <= 3);
    const soldOutCount = Store.products.filter(p => p.stock === 0).length;
    $('#kpi-stock-alert').textContent = lowOrSoldOut.length;
    $('#kpi-stock-details').textContent = `${soldOutCount} sold out, ${lowOrSoldOut.length - soldOutCount} low`;

    // Expiry Alerts Count
    const expiredCount = Store.products.filter(p => calculateExpiryInfo(p.expiry).status === 'expired').length;
    const expiringSoonCount = Store.products.filter(p => calculateExpiryInfo(p.expiry).status === 'expiring-soon').length;
    $('#kpi-expiry-alert').textContent = expiredCount + expiringSoonCount;
    $('#kpi-expiry-details').textContent = `${expiredCount} expired, ${expiringSoonCount} expiring soon`;

    // Recent Orders Table (first 5)
    const recentOrders = [...Store.orders].reverse().slice(0, 5);
    const tbody = $('#overview-orders-table');
    if (tbody) {
      tbody.innerHTML = recentOrders.map(o => `
        <tr>
          <td><strong>${o.id}</strong></td>
          <td>
            <div style="font-weight:600">${o.customer.name}</div>
            <div style="font-size:11px; color:var(--muted)">${o.customer.phone || o.customer.email}</div>
          </td>
          <td>${o.items.map(i => `${i.qty}× ${i.name}`).join(', ')}</td>
          <td><strong>${money(o.total)}</strong></td>
          <td><span class="order-pill order-${o.status}">${o.status}</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" data-action="view-order" data-id="${o.id}">Inspect</button>
          </td>
        </tr>
      `).join('');
    }
  }

  // 2. ORDERS VIEW RENDERING
  function renderOrders() {
    const search = ($('#orders-search')?.value || '').toLowerCase().trim();
    const statusFilter = $('#orders-status-filter')?.value || 'all';

    let list = Store.orders.filter(o => {
      const matchStatus = statusFilter === 'all' || o.status === statusFilter;
      const matchSearch = !search ||
        o.id.toLowerCase().includes(search) ||
        o.customer.name.toLowerCase().includes(search) ||
        o.customer.email.toLowerCase().includes(search);
      return matchStatus && matchSearch;
    });

    const tbody = $('#orders-table-body');
    if (!tbody) return;

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 40px; color:var(--muted)">No orders match the selected filters.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td><span style="font-size:12px; color:var(--muted);">${o.date}</span></td>
        <td>
          <div style="font-weight:600;">${o.customer.name}</div>
          <div style="font-size:11px; color:var(--muted);">${o.customer.email}</div>
        </td>
        <td><span style="font-size:12px;">${o.method}</span></td>
        <td>
          <span style="font-size:12.5px;" title="${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}">
            ${o.items.reduce((s, i) => s + i.qty, 0)} item(s)
          </span>
        </td>
        <td><strong>${money(o.total)}</strong></td>
        <td><span class="order-pill order-${o.status}">${o.status}</span></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary btn-sm" data-action="view-order" data-id="${o.id}">Details</button>
            <button class="btn btn-secondary btn-sm" data-action="print-order" data-id="${o.id}" title="Print Receipt">🖨️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // 3. INVENTORY & EXPIRY MONITORING RENDERING
  function renderInventory() {
    const search = ($('#inventory-search')?.value || '').toLowerCase().trim();
    const stockFilter = $('#inventory-stock-filter')?.value || 'all';
    const expiryFilter = $('#inventory-expiry-filter')?.value || 'all';

    let list = Store.products.filter(p => {
      const matchSearch = !search ||
        p.name.toLowerCase().includes(search) ||
        (p.sku && p.sku.toLowerCase().includes(search)) ||
        (p.batch && p.batch.toLowerCase().includes(search));

      const stockInfo = getStockStatusInfo(p.stock);
      const matchStock = stockFilter === 'all' || stockInfo.status === stockFilter;

      const expInfo = calculateExpiryInfo(p.expiry);
      let matchExpiry = true;
      if (expiryFilter === 'attention') matchExpiry = expInfo.status === 'expired' || expInfo.status === 'expiring-soon';
      else if (expiryFilter === 'expired') matchExpiry = expInfo.status === 'expired';
      else if (expiryFilter === 'expiring-soon') matchExpiry = expInfo.status === 'expiring-soon';
      else if (expiryFilter === 'safe') matchExpiry = expInfo.status === 'safe';

      return matchSearch && matchStock && matchExpiry;
    });

    const tbody = $('#inventory-table-body');
    if (!tbody) return;

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 40px; color:var(--muted)">No inventory items match criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(p => {
      const stockInfo = getStockStatusInfo(p.stock);
      const expInfo = calculateExpiryInfo(p.expiry);

      return `
        <tr>
          <td>
            <div class="product-cell">
              <img class="cell-thumb" src="${p.image}" alt="${p.name}">
              <div class="cell-info">
                <strong>${p.name}</strong>
                <span>${p.description || ''}</span>
              </div>
            </div>
          </td>
          <td><span style="font-family:monospace; font-weight:700;">${p.sku || 'N/A'}</span></td>
          <td>${p.category}</td>
          <td><strong style="font-size:15px;">${p.stock}</strong></td>
          <td><span class="status-pill ${stockInfo.class}">${stockInfo.label}</span></td>
          <td><span style="font-family:monospace; font-size:11px; color:var(--muted);">${p.batch || '—'}</span></td>
          <td><span style="font-size:12px;">${p.expiry || '—'}</span></td>
          <td><span class="expiry-pill ${expInfo.class}">${expInfo.label}</span></td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary btn-sm" data-action="quick-restock" data-id="${p.id}" data-amount="5" title="Add 5 units">+5</button>
              <button class="btn btn-secondary btn-sm" data-action="quick-restock" data-id="${p.id}" data-amount="10" title="Add 10 units">+10</button>
              <button class="btn btn-secondary btn-sm" data-action="edit-product" data-id="${p.id}">Edit</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 4. PRODUCTS CATALOG RENDERING
  function renderProducts() {
    const search = ($('#products-search')?.value || '').toLowerCase().trim();
    const catFilter = $('#products-category-filter')?.value || 'all';

    // Populate category dropdown
    const catSelect = $('#products-category-filter');
    if (catSelect && catSelect.children.length <= 1) {
      catSelect.innerHTML = '<option value="all">All Categories</option>' +
        Store.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }

    let list = Store.products.filter(p => {
      const matchSearch = !search ||
        p.name.toLowerCase().includes(search) ||
        (p.description && p.description.toLowerCase().includes(search));
      const matchCat = catFilter === 'all' || p.category === catFilter;
      return matchSearch && matchCat;
    });

    const tbody = $('#products-table-body');
    if (!tbody) return;

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color:var(--muted)">No products found in catalog.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(p => {
      const stockInfo = getStockStatusInfo(p.stock);
      return `
        <tr>
          <td>
            <div class="product-cell">
              <img class="cell-thumb" src="${p.image}" alt="${p.name}">
              <div class="cell-info">
                <strong>${p.name}</strong>
                <span>${p.sku || 'No SKU'} · ${money(p.price)}</span>
              </div>
            </div>
          </td>
          <td>${p.category}</td>
          <td><strong>${money(p.price)}</strong></td>
          <td><span class="status-pill ${stockInfo.class}">${p.stock} units</span></td>
          <td>${p.badge ? `<span style="font-size:10px; font-weight:700; text-transform:uppercase; background:var(--cream); padding:3px 7px; border-radius:4px;">${p.badge}</span>` : '—'}</td>
          <td><span style="font-size:12px;">${p.expiry || '—'}</span></td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary btn-sm" data-action="edit-product" data-id="${p.id}">Edit</button>
              <button class="btn btn-danger btn-sm" data-action="delete-product" data-id="${p.id}">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 5. CATEGORIES RENDERING
  function renderCategories() {
    const grid = $('#categories-grid');
    if (!grid) return;

    grid.innerHTML = Store.categories.map(c => {
      const productCount = Store.products.filter(p => p.category === c.name).length;
      return `
        <div class="category-admin-card">
          <div class="category-admin-card-img">
            <img src="${c.image}" alt="${c.name}" onerror="this.src='assets/images/logo_8b9cc80af897.jpg'">
          </div>
          <div class="category-admin-card-body">
            <h4>${c.name}</h4>
            <p>${c.tagline || 'Curated essentials'}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--line); padding-top:12px; margin-top:auto;">
              <span style="font-size:11.5px; font-weight:700; color:var(--muted);">${productCount} Products</span>
              <div style="display:flex; gap:6px;">
                <button class="btn btn-secondary btn-sm" data-action="edit-category" data-id="${c.id}">Edit</button>
                <button class="btn btn-danger btn-sm" data-action="delete-category" data-id="${c.id}">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 6. PROMOTIONS RENDERING
  function renderPromotions() {
    const grid = $('#promotions-grid');
    if (!grid) return;

    grid.innerHTML = Store.promos.map(pr => `
      <div class="promo-admin-card ${pr.active ? '' : 'inactive'}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="margin:0; font-size:16px;">${pr.title}</h4>
            <div class="promo-code-pill">${pr.code}</div>
          </div>
          <span class="status-pill ${pr.active ? 'status-in-stock' : 'status-sold-out'}">
            ${pr.active ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p style="font-size:12.5px; color:var(--muted); margin:12px 0 8px;">${pr.details || ''}</p>
        <div style="font-size:11.5px; color:var(--muted);">
          <strong>${pr.discount}% Off</strong> · Valid: ${pr.start || 'Always'} to ${pr.end || 'Ongoing'}
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px; border-top: 1px solid var(--line); padding-top: 10px;">
          <button class="btn btn-secondary btn-sm" data-action="toggle-promo" data-id="${pr.id}">
            ${pr.active ? 'Deactivate' : 'Activate'}
          </button>
          <button class="btn btn-secondary btn-sm" data-action="edit-promo" data-id="${pr.id}">Edit</button>
          <button class="btn btn-danger btn-sm" data-action="delete-promo" data-id="${pr.id}">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // MODAL HANDLERS
  function openModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) modal.classList.add('active');
  }

  function closeModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) modal.classList.remove('active');
  }

  // Product Add / Edit Modal
  function populateProductCategoryDropdown(selectedCategory) {
    const sel = $('#prod-category');
    if (!sel) return;
    sel.innerHTML = Store.categories.map(c => `
      <option value="${c.name}" ${c.name === selectedCategory ? 'selected' : ''}>${c.name}</option>
    `).join('');
  }

  function openProductModal(prod = null) {
    $('#form-product').reset();
    populateProductCategoryDropdown(prod ? prod.category : Store.categories[0]?.name);

    if (prod) {
      $('#modal-product-title').textContent = 'Edit Product';
      $('#product-id').value = prod.id;
      $('#prod-name').value = prod.name;
      $('#prod-sku').value = prod.sku || '';
      $('#prod-price').value = prod.price;
      $('#prod-stock').value = prod.stock;
      $('#prod-batch').value = prod.batch || '';
      $('#prod-expiry').value = prod.expiry || '';
      $('#prod-badge').value = prod.badge || '';
      $('#prod-image').value = prod.image || '';
      $('#prod-description').value = prod.description || '';
      $('#prod-preview-img').src = prod.image || 'assets/images/prod_1_1769168283.webp';
    } else {
      $('#modal-product-title').textContent = 'Add New Product';
      $('#product-id').value = '';
      $('#prod-image').value = 'assets/images/prod_1_1769168283.webp';
      $('#prod-preview-img').src = 'assets/images/prod_1_1769168283.webp';
    }
    openModal('modal-product');
  }

  // Order Details Modal
  let activeViewingOrder = null;

  function openOrderModal(order) {
    activeViewingOrder = order;
    $('#modal-order-title').textContent = `Order Details #${order.id}`;

    const body = $('#modal-order-details-body');
    if (body) {
      body.innerHTML = `
        <div style="margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; background: var(--cream-light); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--line);">
          <div>
            <span style="font-size: 11px; text-transform: uppercase; color: var(--muted); font-weight: 700;">Customer</span>
            <div style="font-weight: 700; margin-top: 2px;">${order.customer.name}</div>
            <div style="font-size: 12px; color: var(--muted);">${order.customer.email}</div>
            <div style="font-size: 12px; color: var(--muted);">${order.customer.phone || 'N/A'}</div>
          </div>
          <div>
            <span style="font-size: 11px; text-transform: uppercase; color: var(--muted); font-weight: 700;">Delivery Details</span>
            <div style="font-weight: 700; margin-top: 2px;">${order.method}</div>
            <div style="font-size: 12px; color: var(--muted);">${order.address || 'In-store pickup in Accra'}</div>
            <div style="font-size: 11.5px; color: var(--muted-light); margin-top: 4px;">Placed: ${order.date}</div>
          </div>
        </div>

        <h4 style="margin: 0 0 10px 0; font-size: 14px;">Items Ordered</h4>
        <div style="border: 1px solid var(--line); border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 20px;">
          <table class="data-table" style="font-size: 13px;">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${order.items.map(it => `
                <tr>
                  <td><strong>${it.name}</strong></td>
                  <td>${it.qty}</td>
                  <td>${money(it.price)}</td>
                  <td>${money(it.price * it.qty)}</td>
                </tr>
              `).join('')}
              <tr style="background: var(--cream-light);">
                <td colspan="3" style="text-align: right; font-weight: 700;">Subtotal</td>
                <td><strong>${money(order.subtotal || order.total)}</strong></td>
              </tr>
              ${order.shipping ? `
                <tr style="background: var(--cream-light);">
                  <td colspan="3" style="text-align: right; font-weight: 700;">Delivery Fee</td>
                  <td><strong>${money(order.shipping)}</strong></td>
                </tr>
              ` : ''}
              <tr style="background: var(--cream);">
                <td colspan="3" style="text-align: right; font-weight: 800; font-size: 14px;">Total Paid</td>
                <td><strong style="font-size: 15px; color: var(--ink);">${money(order.total)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-group">
          <label for="order-status-select">Fulfillment Status</label>
          <select id="order-status-select" class="filter-select" style="width: 100%;">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending (Awaiting Fulfillment)</option>
            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing (Packed & Ready)</option>
            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped / Out for Delivery</option>
            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered / Collected</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      `;
    }
    openModal('modal-order');
  }

  function printOrderInvoice(order) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showToast('Pop-up blocked. Please allow popups to print invoices.');
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Receipt - ${order.id}</title>
        <style>
          body { font-family: 'Courier New', monospace; font-size: 13px; max-width: 320px; margin: 20px auto; padding: 15px; }
          .center { text-align: center; }
          .rule { border-top: 1px dashed #000; margin: 12px 0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 5px; }
          h2 { margin: 5px 0; font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="center">
          <h2>CITA'S FUNHOUSE</h2>
          <p>Everyday essentials for good days.<br>Accra, Ghana</p>
          <div class="rule"></div>
          <strong>ORDER INVOICE</strong><br>
          ${order.id}<br>
          ${order.date}
        </div>
        <div class="rule"></div>
        <p>Customer: ${order.customer.name}<br>Method: ${order.method}</p>
        <div class="rule"></div>
        ${order.items.map(it => `
          <div class="row">
            <span>${it.qty}x ${it.name}</span>
            <span>GH₵${(it.price * it.qty).toFixed(2)}</span>
          </div>
        `).join('')}
        <div class="rule"></div>
        <div class="row"><strong>TOTAL</strong><strong>GH₵${Number(order.total).toFixed(2)}</strong></div>
        <div class="rule"></div>
        <div class="center"><p>Thank you for your order!</p></div>
        <script>window.onload = function() { window.print(); }<\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  // Global Click & Action Handlers
  document.addEventListener('click', event => {
    // 1. Navigation Tab Clicks
    const navBtn = event.target.closest('[data-view]');
    if (navBtn) {
      switchView(navBtn.dataset.view);
      return;
    }

    // 2. View Switch Shortcuts
    const switchBtn = event.target.closest('[data-switch-view]');
    if (switchBtn) {
      switchView(switchBtn.dataset.switchView);
      return;
    }

    // 3. Modal Closes
    const closeBtn = event.target.closest('[data-close-modal]');
    if (closeBtn) {
      closeModal(closeBtn.dataset.closeModal);
      return;
    }

    // 4. Notification Dropdown Toggle
    const notifBtn = event.target.closest('#notif-btn');
    if (notifBtn) {
      $('#notif-dropdown')?.classList.toggle('active');
      return;
    }
    if (!event.target.closest('.notification-wrapper')) {
      $('#notif-dropdown')?.classList.remove('active');
    }

    // 5. Dismiss single notification
    const dismissBtn = event.target.closest('[data-dismiss-notif]');
    if (dismissBtn) {
      const id = dismissBtn.dataset.dismissNotif;
      if (!Store.dismissedNotifs.includes(id)) {
        Store.dismissedNotifs.push(id);
        Store.save();
        renderNotifications();
      }
      return;
    }

    // 6. Mark all notifications read
    if (event.target.id === 'clear-notifs-btn') {
      const alerts = generateAlerts();
      alerts.forEach(a => {
        if (!Store.dismissedNotifs.includes(a.id)) Store.dismissedNotifs.push(a.id);
      });
      Store.save();
      renderNotifications();
      showToast('All notifications marked as read.');
      return;
    }

    // 7. Quick Add Product Button
    if (event.target.closest('#quick-add-btn') || event.target.closest('#btn-add-product') || event.target.closest('#btn-add-inventory-item')) {
      openProductModal();
      return;
    }

    // 8. Quick Restock Action (+5 / +10)
    const restockBtn = event.target.closest('[data-action="quick-restock"]');
    if (restockBtn) {
      const prodId = Number(restockBtn.dataset.id);
      const amount = Number(restockBtn.dataset.amount);
      const product = Store.products.find(p => p.id === prodId);
      if (product) {
        product.stock += amount;
        Store.save();
        renderCurrentView('inventory');
        showToast(`Added +${amount} units to ${product.name} (Stock: ${product.stock})`);
      }
      return;
    }

    // 9. Edit Product Action
    const editProdBtn = event.target.closest('[data-action="edit-product"]');
    if (editProdBtn) {
      const prodId = Number(editProdBtn.dataset.id);
      const product = Store.products.find(p => p.id === prodId);
      if (product) openProductModal(product);
      return;
    }

    // 10. Delete Product Action
    const delProdBtn = event.target.closest('[data-action="delete-product"]');
    if (delProdBtn) {
      const prodId = Number(delProdBtn.dataset.id);
      const product = Store.products.find(p => p.id === prodId);
      if (product) {
        $('#delete-prompt-text').textContent = `Are you sure you want to delete "${product.name}"?`;
        $('#btn-confirm-delete').onclick = () => {
          Store.products = Store.products.filter(p => p.id !== prodId);
          Store.save();
          closeModal('modal-delete');
          renderCurrentView('products');
          showToast(`Deleted ${product.name}`);
        };
        openModal('modal-delete');
      }
      return;
    }

    // 11. View Order Action
    const viewOrderBtn = event.target.closest('[data-action="view-order"]');
    if (viewOrderBtn) {
      const orderId = viewOrderBtn.dataset.id;
      const order = Store.orders.find(o => o.id === orderId);
      if (order) openOrderModal(order);
      return;
    }

    // 12. Print Order Action
    const printOrderBtn = event.target.closest('[data-action="print-order"]');
    if (printOrderBtn) {
      const orderId = printOrderBtn.dataset.id;
      const order = Store.orders.find(o => o.id === orderId);
      if (order) printOrderInvoice(order);
      return;
    }

    // 13. Add Category Action
    if (event.target.closest('#btn-add-category')) {
      $('#form-category').reset();
      $('#category-id').value = '';
      $('#modal-category-title').textContent = 'Add Category';
      openModal('modal-category');
      return;
    }

    // 14. Edit Category Action
    const editCatBtn = event.target.closest('[data-action="edit-category"]');
    if (editCatBtn) {
      const catId = Number(editCatBtn.dataset.id);
      const cat = Store.categories.find(c => c.id === catId);
      if (cat) {
        $('#category-id').value = cat.id;
        $('#cat-name').value = cat.name;
        $('#cat-tagline').value = cat.tagline || '';
        $('#cat-image').value = cat.image || '';
        $('#modal-category-title').textContent = 'Edit Category';
        openModal('modal-category');
      }
      return;
    }

    // 15. Delete Category Action
    const delCatBtn = event.target.closest('[data-action="delete-category"]');
    if (delCatBtn) {
      const catId = Number(delCatBtn.dataset.id);
      const cat = Store.categories.find(c => c.id === catId);
      if (cat) {
        $('#delete-prompt-text').textContent = `Are you sure you want to delete category "${cat.name}"?`;
        $('#btn-confirm-delete').onclick = () => {
          Store.categories = Store.categories.filter(c => c.id !== catId);
          Store.save();
          closeModal('modal-delete');
          renderCurrentView('categories');
          showToast(`Deleted category ${cat.name}`);
        };
        openModal('modal-delete');
      }
      return;
    }

    // 16. Add Promotion Action
    if (event.target.closest('#btn-add-promotion')) {
      $('#form-promotion').reset();
      $('#promo-id').value = '';
      $('#modal-promotion-title').textContent = 'Create Promotion';
      openModal('modal-promotion');
      return;
    }

    // 17. Toggle Promotion Active
    const togglePromoBtn = event.target.closest('[data-action="toggle-promo"]');
    if (togglePromoBtn) {
      const promoId = Number(togglePromoBtn.dataset.id);
      const promo = Store.promos.find(p => p.id === promoId);
      if (promo) {
        promo.active = !promo.active;
        Store.save();
        renderCurrentView('promotions');
        showToast(`Promotion "${promo.title}" ${promo.active ? 'activated' : 'deactivated'}`);
      }
      return;
    }

    // 18. Edit Promotion
    const editPromoBtn = event.target.closest('[data-action="edit-promo"]');
    if (editPromoBtn) {
      const promoId = Number(editPromoBtn.dataset.id);
      const promo = Store.promos.find(p => p.id === promoId);
      if (promo) {
        $('#promo-id').value = promo.id;
        $('#promo-title').value = promo.title;
        $('#promo-code').value = promo.code;
        $('#promo-discount').value = promo.discount;
        $('#promo-start').value = promo.start || '';
        $('#promo-end').value = promo.end || '';
        $('#promo-details').value = promo.details || '';
        $('#promo-active').checked = Boolean(promo.active);
        $('#modal-promotion-title').textContent = 'Edit Promotion';
        openModal('modal-promotion');
      }
      return;
    }

    // 19. Delete Promotion
    const delPromoBtn = event.target.closest('[data-action="delete-promo"]');
    if (delPromoBtn) {
      const promoId = Number(delPromoBtn.dataset.id);
      const promo = Store.promos.find(p => p.id === promoId);
      if (promo) {
        $('#delete-prompt-text').textContent = `Are you sure you want to delete campaign "${promo.title}"?`;
        $('#btn-confirm-delete').onclick = () => {
          Store.promos = Store.promos.filter(p => p.id !== promoId);
          Store.save();
          closeModal('modal-delete');
          renderCurrentView('promotions');
          showToast(`Deleted promotion`);
        };
        openModal('modal-delete');
      }
      return;
    }

    // 20. Backup / Export JSON
    if (event.target.closest('[data-action="export-data"]')) {
      const dataBackup = {
        exportedAt: new Date().toISOString(),
        products: Store.products,
        orders: Store.orders,
        categories: Store.categories,
        promos: Store.promos
      };
      const blob = new Blob([JSON.stringify(dataBackup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `citas-funhouse-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Store data backup downloaded successfully.');
      return;
    }

    // 21. Reset Demo Data
    if (event.target.closest('[data-action="reset-demo-data"]')) {
      $('#delete-prompt-text').textContent = 'Reset all store data to factory demo dataset? Any custom products or orders will be replaced.';
      $('#btn-confirm-delete').onclick = () => {
        Store.reset();
        closeModal('modal-delete');
        renderCurrentView('overview');
        showToast('Store reset to demo state.');
      };
      openModal('modal-delete');
      return;
    }

    // 22. Simulate Live Storefront Order
    if (event.target.closest('[data-action="new-order-demo"]')) {
      const randomProducts = [
        Store.products[Math.floor(Math.random() * Store.products.length)],
        Store.products[Math.floor(Math.random() * Store.products.length)]
      ];
      const newOrder = {
        id: `CF-${String(Date.now()).slice(-6)}`,
        date: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
        customer: { name: 'Kofi Mensah', email: 'kofi.mensah@gmail.com', phone: '+233 24 112 3344' },
        address: 'Airport Hills, Accra',
        method: 'Home Delivery',
        items: randomProducts.map(p => ({ id: p.id, name: p.name, price: p.price, qty: 1 })),
        subtotal: randomProducts.reduce((s, p) => s + p.price, 0),
        shipping: 15,
        total: randomProducts.reduce((s, p) => s + p.price, 0) + 15,
        status: 'pending'
      };

      // Reduce stock for ordered items
      randomProducts.forEach(p => {
        const prod = Store.products.find(it => it.id === p.id);
        if (prod && prod.stock > 0) prod.stock--;
      });

      Store.orders.unshift(newOrder);
      Store.save();
      renderCurrentView('overview');
      showToast(`New live order #${newOrder.id} received!`);
      return;
    }
  });

  // Save Order Status in Modal
  $('#btn-save-order-status')?.addEventListener('click', () => {
    if (!activeViewingOrder) return;
    const newStatus = $('#order-status-select')?.value;
    if (newStatus) {
      activeViewingOrder.status = newStatus;
      Store.save();
      closeModal('modal-order');
      renderCurrentView('orders');
      showToast(`Order #${activeViewingOrder.id} status updated to ${newStatus}.`);
    }
  });

  // Print Receipt from Modal
  $('#btn-print-order-invoice')?.addEventListener('click', () => {
    if (activeViewingOrder) printOrderInvoice(activeViewingOrder);
  });

  // Product Form Submit
  $('#form-product')?.addEventListener('submit', event => {
    event.preventDefault();
    const idVal = $('#product-id').value;
    const name = $('#prod-name').value.trim();
    const sku = $('#prod-sku').value.trim();
    const category = $('#prod-category').value;
    const price = Number($('#prod-price').value);
    const stock = Number($('#prod-stock').value);
    const batch = $('#prod-batch').value.trim();
    const expiry = $('#prod-expiry').value;
    const badge = $('#prod-badge').value.trim();
    const image = $('#prod-image').value.trim() || 'assets/images/prod_1_1769168283.webp';
    const description = $('#prod-description').value.trim();

    if (idVal) {
      // Edit
      const prod = Store.products.find(p => p.id === Number(idVal));
      if (prod) {
        Object.assign(prod, { name, sku, category, price, stock, batch, expiry, badge, image, description });
        showToast(`Updated product "${name}"`);
      }
    } else {
      // Add
      const nextId = Store.products.length ? Math.max(...Store.products.map(p => p.id)) + 1 : 1;
      Store.products.unshift({
        id: nextId,
        sku,
        name,
        category,
        price,
        stock,
        batch,
        expiry,
        badge,
        image,
        description
      });
      showToast(`Added new product "${name}"`);
    }

    Store.save();
    closeModal('modal-product');
    renderCurrentView('products');
    renderNotifications();
  });

  // Image Preview Input Listener
  $('#prod-image')?.addEventListener('input', e => {
    $('#prod-preview-img').src = e.target.value || 'assets/images/prod_1_1769168283.webp';
  });

  // Category Form Submit
  $('#form-category')?.addEventListener('submit', event => {
    event.preventDefault();
    const catIdVal = $('#category-id').value;
    const name = $('#cat-name').value.trim();
    const tagline = $('#cat-tagline').value.trim();
    const image = $('#cat-image').value.trim() || 'assets/images/categories/cat_1771161868_a35ae236.webp';

    if (catIdVal) {
      const cat = Store.categories.find(c => c.id === Number(catIdVal));
      if (cat) {
        Object.assign(cat, { name, tagline, image });
        showToast(`Updated category "${name}"`);
      }
    } else {
      const nextId = Store.categories.length ? Math.max(...Store.categories.map(c => c.id)) + 1 : 1;
      Store.categories.push({ id: nextId, name, tagline, image });
      showToast(`Added category "${name}"`);
    }

    Store.save();
    closeModal('modal-category');
    renderCurrentView('categories');
  });

  // Promotion Form Submit
  $('#form-promotion')?.addEventListener('submit', event => {
    event.preventDefault();
    const promoIdVal = $('#promo-id').value;
    const title = $('#promo-title').value.trim();
    const code = $('#promo-code').value.trim().toUpperCase();
    const discount = Number($('#promo-discount').value);
    const start = $('#promo-start').value;
    const end = $('#promo-end').value;
    const details = $('#promo-details').value.trim();
    const active = $('#promo-active').checked;

    if (promoIdVal) {
      const promo = Store.promos.find(p => p.id === Number(promoIdVal));
      if (promo) {
        Object.assign(promo, { title, code, discount, start, end, details, active });
        showToast(`Updated campaign "${title}"`);
      }
    } else {
      const nextId = Store.promos.length ? Math.max(...Store.promos.map(p => p.id)) + 1 : 1;
      Store.promos.push({ id: nextId, title, code, discount, start, end, details, active });
      showToast(`Created promotion "${title}"`);
    }

    Store.save();
    closeModal('modal-promotion');
    renderCurrentView('promotions');
  });

  // Import JSON file
  $('#import-json-input')?.addEventListener('change', event => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.products && Array.isArray(data.products)) Store.products = data.products;
        if (data.orders && Array.isArray(data.orders)) Store.orders = data.orders;
        if (data.categories && Array.isArray(data.categories)) Store.categories = data.categories;
        if (data.promos && Array.isArray(data.promos)) Store.promos = data.promos;
        Store.save();
        renderCurrentView('overview');
        showToast('Backup imported and verified successfully!');
      } catch (err) {
        showToast('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  });

  // Mobile Menu Toggle
  $('#menu-toggle')?.addEventListener('click', () => {
    $('#sidebar')?.classList.toggle('mobile-open');
  });

  // Real-time Filters
  $('#orders-search')?.addEventListener('input', () => renderOrders());
  $('#orders-status-filter')?.addEventListener('change', () => renderOrders());

  $('#inventory-search')?.addEventListener('input', () => renderInventory());
  $('#inventory-stock-filter')?.addEventListener('change', () => renderInventory());
  $('#inventory-expiry-filter')?.addEventListener('change', () => renderInventory());

  $('#products-search')?.addEventListener('input', () => renderProducts());
  $('#products-category-filter')?.addEventListener('change', () => renderProducts());

  // Initial Load
  switchView('overview');
})();
