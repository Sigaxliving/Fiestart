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
//  ADMIN.JS  â€“  Panel de AdministraciÃ³n
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

let editingId  = null;
let uploadedB64 = '';

// â”€â”€â”€ Init â”€â”€â”€
function adminInit() {
  if (Auth.isAdmin()) {
    showPanel();
  } else {
    el('admin-login-screen').classList.remove('hidden');
    el('admin-panel').classList.add('hidden');
    el('admin-login-form').addEventListener('submit', handleAdminLogin);
  }
}

function showPanel() {
  el('admin-login-screen').classList.add('hidden');
  el('admin-panel').classList.remove('hidden');
  showSection('dashboard');
}

function handleAdminLogin(e) {
  e.preventDefault();
  const user = el('admin-username').value.trim();
  const pass = el('admin-password').value;
  const res  = Auth.adminLogin(user, pass);
  if (res.success) {
    showPanel();
  } else {
    el('admin-login-error').textContent = res.error;
  }
}

function handleAdminLogout() {
  Auth.adminLogout();
  location.reload();
}

// â”€â”€â”€ Secciones â”€â”€â”€
function showSection(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.toggle('active', b.dataset.section === section));
  el(`section-${section}`).classList.add('active');

  if (section === 'dashboard') loadDashboard();
  if (section === 'orders')    loadOrders();
  if (section === 'products')  loadProducts();
  if (section === 'users')     loadUsers();
}

// â”€â”€â”€ Dashboard â”€â”€â”€
function loadDashboard() {
  const products = ProductDB.getAll();
  const users    = UserDB.getAll();
  const orders   = OrderDB.getAll();
  const pending  = orders.filter(o => o.status === 'pending');

  el('stat-products').textContent       = products.length;
  el('stat-users').textContent          = users.length;
  el('stat-orders').textContent         = orders.length;
  el('stat-pending-orders').textContent = pending.length;

  const badge = el('sidebar-order-badge');
  if (badge) {
    badge.textContent = pending.length;
    badge.style.display = pending.length > 0 ? 'inline-block' : 'none';
  }

  // Ãšltimos 4 productos
  const recent = [...products].reverse().slice(0, 4);
  el('dashboard-recent').innerHTML = recent.length
    ? recent.map(p => productCardHTML(p)).join('')
    : '<p class="empty-text">AÃºn no hay productos.</p>';
}

// â”€â”€â”€ Productos â”€â”€â”€
function loadProducts() {
  el('product-search').value       = '';
  el('product-cat-filter').value   = '';
  renderProductList(ProductDB.getAll());
}

function filterAdminProducts() {
  const term = el('product-search').value.toLowerCase();
  const cat  = el('product-cat-filter').value;
  let list   = ProductDB.getAll();

  if (cat)  list = list.filter(p => p.category === cat);
  if (term) list = list.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));

  renderProductList(list);
}

function renderProductList(products) {
  const c = el('admin-products-list');
  c.innerHTML = products.length
    ? products.map(p => productCardHTML(p)).join('')
    : '<p class="empty-text">No se encontraron productos.</p>';
}

function productCardHTML(p) {
  const icon = CATEGORY_ICONS[p.category] || 'ðŸ“¦';
  const imgEl = p.image
    ? `<img src="${p.image}" alt="${escA(p.name)}">`
    : `<div class="admin-img-placeholder">${icon}</div>`;
  const desc = p.description.length > 110 ? p.description.slice(0, 110) + 'â€¦' : p.description;

  return `
    <div class="admin-product-card">
      <div class="admin-product-image">${imgEl}</div>
      <div class="admin-product-info">
        <h3>${escA(p.name)}</h3>
        <p>${escA(desc)}</p>
        <div class="admin-product-meta">
          <span class="badge">${p.category}</span>
          <span class="price">$${p.price.toFixed(2)}/dÃ­a</span>
          <span class="status ${p.available ? 'available' : 'unavailable'}">
            ${p.available ? 'âœ“ Disponible' : 'âœ— No disponible'}
          </span>
        </div>
      </div>
      <div class="admin-product-actions">
        <button class="btn-edit"   onclick="openProductModal('${p.id}')">âœï¸ Editar</button>
        <button class="btn-delete" onclick="deleteProduct('${p.id}')">ðŸ—‘ï¸ Eliminar</button>
      </div>
    </div>`;
}

function deleteProduct(id) {
  if (!confirm('Â¿Eliminar este producto? Esta acciÃ³n no se puede deshacer.')) return;
  ProductDB.delete(id);
  loadProducts();
  adminToast('Producto eliminado.', 'success');
}

// â”€â”€â”€ Modal producto â”€â”€â”€
function openProductModal(id = null) {
  editingId   = id;
  uploadedB64 = '';

  if (id) {
    const p = ProductDB.getById(id);
    if (!p) return;
    el('product-modal-title').textContent = 'Editar Producto';
    el('prod-name').value        = p.name;
    el('prod-description').value = p.description;
    el('prod-price').value       = p.price;
    el('prod-category').value    = p.category;
    el('prod-available').checked = p.available;
    uploadedB64 = p.image || '';
    updateImgPreview();
  } else {
    el('product-modal-title').textContent = 'Nuevo Producto';
    el('product-form').reset();
    el('image-preview').innerHTML = '<span style="color:var(--text-3);font-size:13px">Sin imagen</span>';
    el('prod-available').checked = true;
  }

  el('product-modal').classList.add('active');
  el('admin-modal-overlay').classList.add('active');
}

function closeProductModal() {
  el('product-modal').classList.remove('active');
  el('admin-modal-overlay').classList.remove('active');
  editingId   = null;
  uploadedB64 = '';
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    adminToast('Selecciona un archivo de imagen vÃ¡lido.', 'error');
    return;
  }
  if (file.size > 2.5 * 1024 * 1024) {
    adminToast('La imagen supera el lÃ­mite de 2.5 MB.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    uploadedB64 = ev.target.result;
    updateImgPreview();
  };
  reader.readAsDataURL(file);
}

function updateImgPreview() {
  el('image-preview').innerHTML = uploadedB64
    ? `<img src="${uploadedB64}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`
    : '<span style="color:var(--text-3);font-size:13px">Sin imagen</span>';
}

function handleProductSave() {
  const form = el('product-form');
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const data = {
    name       : el('prod-name').value.trim(),
    description: el('prod-description').value.trim(),
    price      : parseFloat(el('prod-price').value),
    category   : el('prod-category').value,
    available  : el('prod-available').checked,
    image      : uploadedB64,
  };

  if (editingId) {
    ProductDB.update(editingId, data);
    adminToast('Producto actualizado correctamente.', 'success');
  } else {
    ProductDB.add(data);
    adminToast('Producto agregado correctamente.', 'success');
  }

  closeProductModal();
  loadProducts();
  loadDashboard();
}

// â”€â”€â”€ Pedidos / Solicitudes de Alquiler â”€â”€â”€
function loadOrders() {
  const filter = el('order-status-filter');
  if (filter) filter.value = '';
  renderOrdersList(OrderDB.getAll());
}

function filterAdminOrders() {
  const status = el('order-status-filter') ? el('order-status-filter').value : '';
  let orders = OrderDB.getAll();
  if (status) {
    orders = orders.filter(o => o.status === status);
  }
  renderOrdersList(orders);
}

function renderOrdersList(orders) {
  const container = el('admin-orders-list');
  if (!orders.length) {
    container.innerHTML = '<p class="empty-text">No hay solicitudes de alquiler registradas.</p>';
    return;
  }

  const statusLabels = {
    pending:   { text: 'ðŸŸ¡ Pendiente', class: 'status-pending' },
    confirmed: { text: 'ðŸŸ¢ Confirmado', class: 'status-confirmed' },
    delivered: { text: 'ðŸ”µ Entregado', class: 'status-delivered' },
    completed: { text: 'âœ… Completado', class: 'status-completed' },
    cancelled: { text: 'âŒ Cancelado', class: 'status-cancelled' },
  };

  container.innerHTML = `
    <div style="overflow-x:auto">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Cliente</th>
            <th>Fecha Evento / DuraciÃ³n</th>
            <th>UbicaciÃ³n</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(o => {
            const itemsList = (o.items || []).map(i => {
              const p = ProductDB.getById(i.productId);
              return `${escA(p ? p.name : i.productId)} (x${i.quantity})`;
            }).join('<br>');
            const st = statusLabels[o.status] || { text: o.status, class: '' };
            return `
              <tr>
                <td><code style="color:var(--gold);font-size:12px;">#${escA(o.id.replace('ord_',''))}</code></td>
                <td>
                  <strong>${escA(o.userName)}</strong><br>
                  <small style="color:var(--text-2)">CI: ${escA(o.userCedula)} | Tel: ${escA(o.phone || 'N/A')}</small><br>
                  <small style="color:var(--text-3)">${escA(o.userEmail)}</small>
                </td>
                <td>
                  ðŸ“… ${escA(o.eventDate || 'Por coordinar')}<br>
                  <span style="color:var(--text-2);font-size:12px;">â±ï¸ ${o.rentalDays} dÃ­a(s)</span>
                </td>
                <td><small>${escA(o.address || 'Caracas')}</small></td>
                <td><small style="line-height:1.4">${itemsList || 'Sin items'}</small></td>
                <td><strong style="color:var(--gold);font-size:15px;">$${Number(o.total).toFixed(2)}</strong></td>
                <td>
                  <select class="form-input" style="padding:4px 8px;font-size:12px;border-radius:6px;width:auto;"
                    onchange="changeOrderStatus('${o.id}', this.value)">
                    <option value="pending"   ${o.status==='pending'?'selected':''}>ðŸŸ¡ Pendiente</option>
                    <option value="confirmed" ${o.status==='confirmed'?'selected':''}>ðŸŸ¢ Confirmado</option>
                    <option value="delivered" ${o.status==='delivered'?'selected':''}>ðŸ”µ Entregado</option>
                    <option value="completed" ${o.status==='completed'?'selected':''}>âœ… Completado</option>
                    <option value="cancelled" ${o.status==='cancelled'?'selected':''}>âŒ Cancelado</option>
                  </select>
                </td>
                <td>
                  <button class="btn-delete" style="padding:5px 9px;font-size:12px;" onclick="deleteOrder('${o.id}')" title="Eliminar">ðŸ—‘ï¸</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function changeOrderStatus(orderId, newStatus) {
  OrderDB.updateStatus(orderId, newStatus);
  adminToast('Estado de pedido actualizado.', 'success');
  loadDashboard();
}

function deleteOrder(orderId) {
  if (!confirm('Â¿Eliminar este pedido del sistema?')) return;
  OrderDB.delete(orderId);
  filterAdminOrders();
  loadDashboard();
  adminToast('Pedido eliminado.', 'info');
}

// â”€â”€â”€ Usuarios â”€â”€â”€
function loadUsers() {
  const users = UserDB.getAll();
  const c = el('admin-users-list');

  if (!users.length) {
    c.innerHTML = '<p class="empty-text">AÃºn no hay usuarios registrados.</p>';
    return;
  }

  c.innerHTML = `
    <div style="overflow-x:auto">
      <table class="admin-table">
        <thead>
          <tr>
            <th>CÃ©dula</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Items en carrito</th>
            <th>Registrado</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td><strong style="color:var(--gold)">${escA(u.cedula)}</strong></td>
              <td>${escA(u.name)}</td>
              <td>${escA(u.email)}</td>
              <td>${(u.cart || []).length} items</td>
              <td>${new Date(u.createdAt).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// â”€â”€â”€ Admin Toast â”€â”€â”€
function adminToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = `admin-toast toast-${type}`;
  t.textContent = msg;
  el('admin-toast-container').appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 320); }, 3200);
}

// â”€â”€â”€ Utils â”€â”€â”€
function el(id) { return document.getElementById(id); }
function escA(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// â”€â”€â”€ ESC key â”€â”€â”€
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProductModal();
});

document.addEventListener('DOMContentLoaded', adminInit);
