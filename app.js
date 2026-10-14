// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  DATA.JS  â€“  Base de datos en localStorage
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€â”€ Simple hash (para demo; no usar en producciÃ³n) â”€â”€â”€
function simpleHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

// â”€â”€â”€ Claves de almacenamiento â”€â”€â”€
const KEYS = {
  PRODUCTS : 'el_products',
  USERS    : 'el_users',
  ADMIN    : 'el_admin',
  ORDERS   : 'el_orders',
};

// â”€â”€â”€ CategorÃ­as e iconos (compartido entre app y admin) â”€â”€â”€
const CATEGORY_ICONS = {
  stands    : 'ðŸª',
  accesorios: 'ðŸŽˆ',
  decoracion: 'âœ¨',
  mobiliario: 'ðŸª‘',
};
const CATEGORY_COLORS = {
  stands    : '#7C3AED',
  accesorios: '#DB2777',
  decoracion: '#D97706',
  mobiliario: '#059669',
};

// â”€â”€â”€ Productos iniciales â”€â”€â”€
const SEED_PRODUCTS = [
  {
    id: 'p1',
    name: 'Stand Moderno Blanco 3Ã—3m',
    description: 'Elegante stand de aluminio y tela premium en blanco puro. Ideal para cualquier tipo de evento: corporativo, cumpleaÃ±os, bodas. Incluye estructura completa y cubierta lateral.',
    price: 150,
    category: 'stands',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    name: 'Stand RÃºstico Madera',
    description: 'Stand de madera natural de 2Ã—2 m con efecto vintage. Perfecto para eventos campestres, shabby-chic y fotografÃ­as. Muy fotogÃ©nico y resistente.',
    price: 120,
    category: 'stands',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    name: 'Kit Fotostand Premium',
    description: 'Stand fotogrÃ¡fico completo con fondo, iluminaciÃ³n LED de dos puntos, set de props divertidos y panel de fondo personalizable. Â¡El Ã©xito de cualquier fiesta!',
    price: 200,
    category: 'stands',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    name: 'Pack Globos MetÃ¡licos Premium',
    description: 'ColecciÃ³n de 60 globos metÃ¡licos en oro, plata y champagne. Incluye inflador de alta presiÃ³n y 20 m de cinta decorativa. Perfecto para ambientar cualquier espacio.',
    price: 45,
    category: 'accesorios',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p5',
    name: 'Arco Floral Decorativo 2Ã—2m',
    description: 'Hermoso arco de flores artificiales premium. Disponible en tonos rosado, blanco y verde. Ideal para entradas de evento, zonas de fotos y decoraciÃ³n general.',
    price: 95,
    category: 'decoracion',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p6',
    name: 'Guirnalda LED 10 m',
    description: '10 metros de luces LED de luz cÃ¡lida tipo cadena "fairy lights". Con control remoto de 8 modos. Transforma cualquier espacio en un ambiente mÃ¡gico.',
    price: 35,
    category: 'decoracion',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p7',
    name: 'Mesa Redonda con Mantel (1.8m)',
    description: 'Mesa redonda de 1.8 m de diÃ¡metro con mantel de tela de alta calidad. Disponible en blanco, negro y dorado. Capacidad para 8-10 personas.',
    price: 80,
    category: 'mobiliario',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p8',
    name: 'Pack Sillas Tiffany Doradas (Ã—10)',
    description: 'Pack de 10 sillas Tiffany en color dorado brillante. Elegantes, resistentes y perfectas para eventos formales, bodas y celebraciones de lujo.',
    price: 70,
    category: 'mobiliario',
    image: '',
    available: true,
    createdAt: new Date().toISOString(),
  },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  ProductDB
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const ProductDB = {
  _save(products) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },
  init() {
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      this._save(SEED_PRODUCTS);
    }
  },
  getAll() {
    return JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
  },
  getById(id) {
    return this.getAll().find(p => p.id === id) || null;
  },
  getByCategory(cat) {
    return cat === 'all' ? this.getAll() : this.getAll().filter(p => p.category === cat);
  },
  add(data) {
    const products = this.getAll();
    const item = { ...data, id: 'p_' + Date.now(), createdAt: new Date().toISOString() };
    products.push(item);
    this._save(products);
    return item;
  },
  update(id, data) {
    const products = this.getAll();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
    this._save(products);
    return products[idx];
  },
  delete(id) {
    this._save(this.getAll().filter(p => p.id !== id));
  },
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  UserDB
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const UserDB = {
  _save(users) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },
  init() {
    if (!localStorage.getItem(KEYS.USERS)) {
      this._save([]);
    }
    if (!localStorage.getItem(KEYS.ADMIN)) {
      localStorage.setItem(KEYS.ADMIN, JSON.stringify({
        username: 'admin',
        password: simpleHash('admin123'),
      }));
    }
  },
  getAll() {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
  },
  getByCedula(cedula) {
    return this.getAll().find(u => u.cedula === cedula) || null;
  },
  getByEmail(email) {
    return this.getAll().find(u => u.email === email.toLowerCase()) || null;
  },
  register({ name, cedula, email, password }) {
    const users = this.getAll();
    const user = {
      cedula,
      email: email.toLowerCase(),
      name,
      password: simpleHash(password),
      cart: [],
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    this._save(users);
    return user;
  },
  update(cedula, data) {
    const users = this.getAll();
    const idx = users.findIndex(u => u.cedula === cedula);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...data };
    this._save(users);
    return users[idx];
  },
  getAdmin() {
    return JSON.parse(localStorage.getItem(KEYS.ADMIN) || 'null');
  },
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  OrderDB â€“ GestiÃ³n de Solicitudes de Alquiler
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const OrderDB = {
  _save(orders) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },
  init() {
    if (!localStorage.getItem(KEYS.ORDERS)) {
      this._save([]);
    }
  },
  getAll() {
    return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
  },
  getById(id) {
    return this.getAll().find(o => o.id === id) || null;
  },
  getByUserCedula(cedula) {
    return this.getAll().filter(o => o.userCedula === cedula);
  },
  create({ userCedula, userName, userEmail, phone, eventDate, rentalDays, address, items, total, notes }) {
    const orders = this.getAll();
    const order = {
      id: 'ord_' + Date.now(),
      userCedula,
      userName,
      userEmail,
      phone: phone || '',
      eventDate: eventDate || '',
      rentalDays: parseInt(rentalDays, 10) || 1,
      address: address || '',
      items: items || [],
      total: parseFloat(total) || 0,
      notes: notes || '',
      status: 'pending', // pending, confirmed, delivered, completed, cancelled
      createdAt: new Date().toISOString(),
    };
    orders.unshift(order);
    this._save(orders);
    return order;
  },
  updateStatus(id, status) {
    const orders = this.getAll();
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) return null;
    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString();
    this._save(orders);
    return orders[idx];
  },
  delete(id) {
    this._save(this.getAll().filter(o => o.id !== id));
  },
};

// InicializaciÃ³n
ProductDB.init();
UserDB.init();
OrderDB.init();
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  AUTH.JS  â€“  AutenticaciÃ³n y Cookies
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const COOKIE_SESSION = 'el_session';
const COOKIE_ADMIN   = 'el_admin_session';

const Auth = {

  // â”€â”€â”€ Cookie helpers con fallback a localStorage (compatible con file:// y http://) â”€â”€â”€
  setCookie(name, value, days = 1) {
    try {
      const exp = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Strict`;
    } catch (e) {}
    try {
      localStorage.setItem(`_sess_${name}`, value);
    } catch (e) {}
  },

  getCookie(name) {
    try {
      const parts = document.cookie ? document.cookie.split('; ') : [];
      const found = parts.reduce((acc, pair) => {
        const [k, ...v] = pair.split('=');
        return k === name ? decodeURIComponent(v.join('=')) : acc;
      }, null);
      if (found) return found;
    } catch (e) {}
    try {
      return localStorage.getItem(`_sess_${name}`);
    } catch (e) {
      return null;
    }
  },

  deleteCookie(name) {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (e) {}
    try {
      localStorage.removeItem(`_sess_${name}`);
    } catch (e) {}
  },

  // â”€â”€â”€ Registro â”€â”€â”€
  register(name, cedula, email, password) {
    // Validaciones
    if (!/^\d+$/.test(cedula))
      return { success: false, error: 'La cÃ©dula debe contener solo nÃºmeros.' };
    if (cedula.length < 6)
      return { success: false, error: 'La cÃ©dula debe tener al menos 6 dÃ­gitos.' };
    if (UserDB.getByCedula(cedula))
      return { success: false, error: 'Ya existe una cuenta con esta cÃ©dula.' };
    if (UserDB.getByEmail(email))
      return { success: false, error: 'Ya existe una cuenta con este correo electrÃ³nico.' };
    if (password.length < 6)
      return { success: false, error: 'La contraseÃ±a debe tener al menos 6 caracteres.' };
    if (!name.trim())
      return { success: false, error: 'Por favor ingresa tu nombre.' };

    const user = UserDB.register({ name: name.trim(), cedula, email, password });

    // Auto-login
    const sessionData = JSON.stringify({ cedula: user.cedula, name: user.name });
    this.setCookie(COOKIE_SESSION, sessionData, 7);

    return { success: true, user };
  },

  // â”€â”€â”€ Iniciar sesiÃ³n â”€â”€â”€
  login(cedula, password, rememberMe = false) {
    if (!/^\d+$/.test(cedula))
      return { success: false, error: 'La cÃ©dula debe contener solo nÃºmeros.' };

    const user = UserDB.getByCedula(cedula);
    if (!user)
      return { success: false, error: 'No existe ninguna cuenta con esa cÃ©dula.' };
    if (user.password !== simpleHash(password))
      return { success: false, error: 'ContraseÃ±a incorrecta.' };

    const days = rememberMe ? 30 : 1;
    this.setCookie(COOKIE_SESSION, JSON.stringify({ cedula: user.cedula, name: user.name }), days);

    return { success: true, user };
  },

  // â”€â”€â”€ Login admin â”€â”€â”€
  adminLogin(username, password) {
    const admin = UserDB.getAdmin();
    if (!admin)
      return { success: false, error: 'Error del sistema.' };
    if (admin.username !== username || admin.password !== simpleHash(password))
      return { success: false, error: 'Usuario o contraseÃ±a incorrectos.' };

    this.setCookie(COOKIE_ADMIN, 'true', 1);
    return { success: true };
  },

  // â”€â”€â”€ Logout â”€â”€â”€
  logout() {
    this.deleteCookie(COOKIE_SESSION);
  },

  adminLogout() {
    this.deleteCookie(COOKIE_ADMIN);
  },

  // â”€â”€â”€ Estado â”€â”€â”€
  isLoggedIn() {
    const raw = this.getCookie(COOKIE_SESSION);
    if (!raw) return false;
    try {
      return !!JSON.parse(raw).cedula;
    } catch { return false; }
  },

  getCurrentUser() {
    const raw = this.getCookie(COOKIE_SESSION);
    if (!raw) return null;
    try {
      const { cedula } = JSON.parse(raw);
      return UserDB.getByCedula(cedula);
    } catch { return null; }
  },

  isAdmin() {
    return this.getCookie(COOKIE_ADMIN) === 'true';
  },
};
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  CART.JS  â€“  Carrito de Compras
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const Cart = {

  _getUser() {
    return Auth.getCurrentUser();
  },

  getItems() {
    const user = this._getUser();
    if (!user) return [];
    // Siempre refresca desde localStorage
    const fresh = UserDB.getByCedula(user.cedula);
    return fresh ? (fresh.cart || []) : [];
  },

  _saveItems(cart) {
    const user = this._getUser();
    if (!user) return;
    UserDB.update(user.cedula, { cart });
  },

  addItem(productId, qty = 1) {
    const items = this.getItems();
    const existing = items.find(i => i.productId === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({ productId, quantity: qty, addedAt: new Date().toISOString() });
    }
    this._saveItems(items);
    return items;
  },

  removeItem(productId) {
    const items = this.getItems().filter(i => i.productId !== productId);
    this._saveItems(items);
    return items;
  },

  updateQty(productId, qty) {
    if (qty <= 0) return this.removeItem(productId);
    const items = this.getItems();
    const item = items.find(i => i.productId === productId);
    if (item) { item.quantity = qty; this._saveItems(items); }
    return items;
  },

  clear() {
    this._saveItems([]);
  },

  getCount() {
    return this.getItems().reduce((n, i) => n + i.quantity, 0);
  },

  getTotal() {
    return this.getItems().reduce((sum, i) => {
      const p = ProductDB.getById(i.productId);
      return p ? sum + p.price * i.quantity : sum;
    }, 0);
  },

  getWithProducts() {
    return this.getItems()
      .map(i => ({ ...i, product: ProductDB.getById(i.productId) }))
      .filter(i => i.product !== null);
  },
};
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  APP.JS  â€“  LÃ³gica principal (index.html)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

let currentCategory = 'all';

// â”€â”€â”€ Inicializar â”€â”€â”€
function init() {
  renderProducts();
  updateNavbar();
  updateCartBadge();
  setupEventListeners();
}

// â”€â”€â”€ Navbar â”€â”€â”€
function updateNavbar() {
  const user = Auth.getCurrentUser();
  const loggedIn = Auth.isLoggedIn() && !!user;

  el('nav-auth').classList.toggle('hidden', loggedIn);
  el('nav-user').classList.toggle('hidden', !loggedIn);
  el('nav-cart').classList.toggle('hidden', !loggedIn);

  if (loggedIn) {
    el('user-name').textContent = user.name.split(' ')[0];
  }
}

// â”€â”€â”€ Renderizar productos â”€â”€â”€
function renderProducts(category = currentCategory) {
  const grid = el('products-grid');
  const products = ProductDB.getByCategory(category).filter(p => p.available);
  const loggedIn = Auth.isLoggedIn();

  if (!products.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">ðŸ“¦</span>
        <p>No hay productos disponibles en esta categorÃ­a.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(p => cardHTML(p, loggedIn)).join('');
}

function cardHTML(p, loggedIn) {
  const icon = CATEGORY_ICONS[p.category] || 'ðŸ“¦';
  const color = CATEGORY_COLORS[p.category] || '#555';
  const img = p.image
    ? `<img src="${p.image}" alt="${escHtml(p.name)}" loading="lazy">`
    : `<div class="product-image-placeholder" style="background:linear-gradient(135deg,${color}18,${color}38)">${icon}</div>`;

  const btn = loggedIn
    ? `<button class="btn-add-cart" onclick="addToCart('${p.id}')">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
           <line x1="3" y1="6" x2="21" y2="6"/>
           <path d="M16 10a4 4 0 01-8 0"/>
         </svg>
         Agregar
       </button>`
    : `<button class="btn-login-required" onclick="openLoginModal()">ðŸ”’ Inicia sesiÃ³n</button>`;

  return `
    <article class="product-card" id="card-${p.id}">
      <div class="product-image">
        ${img}
        <div class="product-category-badge">${p.category}</div>
      </div>
      <div class="product-body">
        <h3 class="product-name">${escHtml(p.name)}</h3>
        <p class="product-description">${escHtml(p.description)}</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-label">Precio/dÃ­a</span>
            <span class="price-value">$${p.price.toFixed(2)}</span>
          </div>
          ${btn}
        </div>
      </div>
    </article>`;
}

// â”€â”€â”€ Carrito â”€â”€â”€
function addToCart(productId) {
  Cart.addItem(productId);
  updateCartBadge();
  showToast('Â¡Producto agregado al carrito!', 'success');
  const badge = el('cart-badge');
  badge.classList.add('bounce');
  setTimeout(() => badge.classList.remove('bounce'), 350);
}

function updateCartBadge() {
  const count = Cart.getCount();
  const badge = el('cart-badge');
  if (!badge) return;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function openCartSidebar() {
  el('cart-sidebar').classList.add('open');
  el('cart-overlay').classList.add('active');
  renderCart();
}

function closeCartSidebar() {
  el('cart-sidebar').classList.remove('open');
  el('cart-overlay').classList.remove('active');
}

function renderCart() {
  const items  = Cart.getWithProducts();
  const list   = el('cart-items-list');
  const total  = el('cart-total-amount');

  list.innerHTML = items.length === 0
    ? `<div class="cart-empty"><span>ðŸ›’</span><p>Tu carrito estÃ¡ vacÃ­o</p></div>`
    : items.map(i => {
        const icon = CATEGORY_ICONS[i.product.category] || 'ðŸ“¦';
        const imgEl = i.product.image
          ? `<img src="${i.product.image}" alt="${escHtml(i.product.name)}">`
          : `<div class="cart-item-placeholder">${icon}</div>`;
        return `
          <div class="cart-item">
            <div class="cart-item-image">${imgEl}</div>
            <div class="cart-item-info">
              <h4>${escHtml(i.product.name)}</h4>
              <span class="cart-item-price">$${i.product.price.toFixed(2)}/dÃ­a</span>
            </div>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="changeQty('${i.productId}',${i.quantity - 1})">âˆ’</button>
              <span class="qty-value">${i.quantity}</span>
              <button class="qty-btn" onclick="changeQty('${i.productId}',${i.quantity + 1})">+</button>
              <button class="remove-btn" onclick="removeFromCart('${i.productId}')" title="Eliminar">ðŸ—‘</button>
            </div>
          </div>`;
      }).join('');

  total.textContent = `$${Cart.getTotal().toFixed(2)}`;
}

function changeQty(pid, qty) {
  Cart.updateQty(pid, qty);
  updateCartBadge();
  renderCart();
}

function removeFromCart(pid) {
  Cart.removeItem(pid);
  updateCartBadge();
  renderCart();
}

function clearCart() {
  if (!Cart.getCount()) return;
  if (!confirm('Â¿Vaciar el carrito?')) return;
  Cart.clear();
  updateCartBadge();
  renderCart();
  showToast('Carrito vaciado.', 'info');
}

function handleCheckout() {
  if (!Cart.getCount()) {
    showToast('Tu carrito estÃ¡ vacÃ­o.', 'error');
    return;
  }
  closeCartSidebar();
  openCheckoutModal();
}

function openCheckoutModal() {
  const modal = el('checkout-modal');
  const overlay = el('modal-overlay');
  if (!modal) return;

  // Fecha por defecto: maÃ±ana
  const tomorrow = new Date(Date.now() + 864e5).toISOString().split('T')[0];
  const dateInput = el('chk-date');
  if (dateInput) {
    dateInput.min = tomorrow;
    if (!dateInput.value) dateInput.value = tomorrow;
  }

  el('chk-days').value = '1';
  el('checkout-error').textContent = '';
  updateCheckoutSummary();

  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeCheckoutModal() {
  const modal = el('checkout-modal');
  const overlay = el('modal-overlay');
  if (modal) modal.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

function updateCheckoutSummary() {
  const dailyTotal = Cart.getTotal();
  const days = Math.max(1, parseInt(el('chk-days').value, 10) || 1);
  const finalTotal = dailyTotal * days;

  el('chk-daily-total').textContent = `$${dailyTotal.toFixed(2)}`;
  el('chk-days-multiplier').textContent = `Ã— ${days} ${days === 1 ? 'dÃ­a' : 'dÃ­as'}`;
  el('chk-final-total').textContent = `$${finalTotal.toFixed(2)}`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const user = Auth.getCurrentUser();
  if (!user) {
    showToast('Debes iniciar sesiÃ³n para realizar el pedido.', 'error');
    closeCheckoutModal();
    openLoginModal();
    return;
  }

  const date = el('chk-date').value;
  const days = parseInt(el('chk-days').value, 10) || 1;
  const phone = el('chk-phone').value.trim();
  const address = el('chk-address').value.trim();
  const notes = el('chk-notes').value.trim();

  if (!date || !address || !phone) {
    el('checkout-error').textContent = 'Por favor completa todos los campos requeridos (*).';
    return;
  }

  const items = Cart.getItems();
  const dailyTotal = Cart.getTotal();
  const finalTotal = dailyTotal * days;

  const order = OrderDB.create({
    userCedula: user.cedula,
    userName: user.name,
    userEmail: user.email,
    phone,
    eventDate: date,
    rentalDays: days,
    address,
    items,
    total: finalTotal,
    notes,
  });

  Cart.clear();
  updateCartBadge();
  closeCheckoutModal();

  showToast(`ðŸŽ‰ Â¡Pedido #${order.id.slice(-6)} confirmado! Te contactaremos al WhatsApp.`, 'success');
}

// â”€â”€â”€ Modal Mis Pedidos â”€â”€â”€
function openOrdersModal() {
  const user = Auth.getCurrentUser();
  if (!user) return;

  const container = el('user-orders-container');
  const orders = OrderDB.getByUserCedula(user.cedula);

  if (!orders.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:32px;color:var(--text-2);">
        <div style="font-size:36px;margin-bottom:8px;">ðŸ“¦</div>
        <p>AÃºn no tienes solicitudes de alquiler registradas.</p>
        <button class="btn-primary" style="margin-top:14px;" onclick="closeOrdersModal()">Explorar CatÃ¡logo</button>
      </div>`;
  } else {
    const statusMap = {
      pending:   { label: 'ðŸŸ¡ Pendiente de ConfirmaciÃ³n', color: 'var(--gold)' },
      confirmed: { label: 'ðŸŸ¢ Confirmado / Agendado',     color: 'var(--success)' },
      delivered: { label: 'ðŸ”µ Entregado en Evento',       color: 'var(--info)' },
      completed: { label: 'âœ… Completado',               color: 'var(--text-2)' },
      cancelled: { label: 'âŒ Cancelado',                color: 'var(--error)' },
    };

    container.innerHTML = orders.map(o => {
      const st = statusMap[o.status] || { label: o.status, color: 'var(--text-2)' };
      const itemsList = (o.items || []).map(i => {
        const prod = ProductDB.getById(i.productId);
        return `â€¢ ${escHtml(prod ? prod.name : i.productId)} <strong>Ã— ${i.quantity}</strong>`;
      }).join('<br>');

      return `
        <div style="background:var(--bg-3);border:1px solid var(--border-2);border-radius:var(--r);padding:16px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;border-bottom:1px solid var(--border);padding-bottom:8px;">
            <span style="font-weight:700;color:var(--white);">Pedido <code style="color:var(--gold);">#${o.id.slice(-6)}</code></span>
            <span style="font-size:12px;font-weight:700;color:${st.color};">${st.label}</span>
          </div>
          <div style="font-size:13px;color:var(--text-2);margin-bottom:8px;">
            ðŸ“… <strong>Fecha del Evento:</strong> ${escHtml(o.eventDate)} (${o.rentalDays} dÃ­a${o.rentalDays>1?'s':''})<br>
            ðŸ“ <strong>Lugar:</strong> ${escHtml(o.address)}
          </div>
          <div style="font-size:12px;color:var(--text);background:var(--bg-card);padding:10px;border-radius:var(--r-sm);margin-bottom:10px;">
            ${itemsList}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
            <span style="color:var(--text-3);">${new Date(o.createdAt).toLocaleDateString('es-ES')}</span>
            <strong style="color:var(--gold);font-size:16px;">Total: $${Number(o.total).toFixed(2)}</strong>
          </div>
        </div>`;
    }).join('');
  }

  el('orders-modal').classList.add('active');
  el('modal-overlay').classList.add('active');
}

function closeOrdersModal() {
  el('orders-modal').classList.remove('active');
  el('modal-overlay').classList.remove('active');
}


// â”€â”€â”€ Filtros â”€â”€â”€
function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === cat);
  });
  renderProducts(cat);
}

// â”€â”€â”€ Modales Login / Registro â”€â”€â”€
function openLoginModal() {
  el('login-modal').classList.add('active');
  el('modal-overlay').classList.add('active');
  el('login-error').textContent = '';
}

function closeLoginModal() {
  el('login-modal').classList.remove('active');
  el('modal-overlay').classList.remove('active');
}

function openRegisterModal() {
  closeLoginModal();
  el('register-modal').classList.add('active');
  el('modal-overlay').classList.add('active');
  el('register-error').textContent = '';
}

function closeRegisterModal() {
  el('register-modal').classList.remove('active');
  el('modal-overlay').classList.remove('active');
}

function handleLogin(e) {
  e.preventDefault();
  const cedula = el('login-cedula').value.trim();
  const pass   = el('login-password').value;
  const rem    = el('login-remember').checked;

  const res = Auth.login(cedula, pass, rem);
  if (res.success) {
    closeLoginModal();
    updateNavbar();
    renderProducts();
    updateCartBadge();
    showToast(`Â¡Bienvenido de nuevo, ${res.user.name.split(' ')[0]}!`, 'success');
  } else {
    el('login-error').textContent = res.error;
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name    = el('reg-name').value.trim();
  const cedula  = el('reg-cedula').value.trim();
  const email   = el('reg-email').value.trim();
  const pass    = el('reg-password').value;
  const confirm = el('reg-confirm').value;

  if (pass !== confirm) {
    el('register-error').textContent = 'Las contraseÃ±as no coinciden.';
    return;
  }

  const res = Auth.register(name, cedula, email, pass);
  if (res.success) {
    closeRegisterModal();
    updateNavbar();
    renderProducts();
    updateCartBadge();
    showToast(`ðŸŽ‰ Â¡Cuenta creada! Bienvenido, ${name.split(' ')[0]}!`, 'success');
  } else {
    el('register-error').textContent = res.error;
  }
}

function handleLogout() {
  Auth.logout();
  updateNavbar();
  renderProducts();
  updateCartBadge();
  closeCartSidebar();
  showToast('SesiÃ³n cerrada correctamente.', 'info');
}

// â”€â”€â”€ Toasts â”€â”€â”€
function showToast(msg, type = 'info') {
  const icons = { success: 'âœ“', error: 'âœ•', info: 'i' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || 'i'}</span><span>${msg}</span>`;
  el('toast-container').appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 320);
  }, 3200);
}

// â”€â”€â”€ Utilidades â”€â”€â”€
function el(id) { return document.getElementById(id); }
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// â”€â”€â”€ Event Listeners â”€â”€â”€
function setupEventListeners() {
  el('login-form').addEventListener('submit', handleLogin);
  el('register-form').addEventListener('submit', handleRegister);
  if (el('checkout-form')) {
    el('checkout-form').addEventListener('submit', handleCheckoutSubmit);
  }

  // Cerrar modal al hacer clic en overlay
  el('modal-overlay').addEventListener('click', () => {
    closeLoginModal();
    closeRegisterModal();
    closeCheckoutModal();
    closeOrdersModal();
  });

  // Scroll navbar
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ESC para cerrar modales / carrito
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLoginModal();
      closeRegisterModal();
      closeCheckoutModal();
      closeOrdersModal();
      closeCartSidebar();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
