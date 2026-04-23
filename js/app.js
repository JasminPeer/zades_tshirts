// ===== ZADES App Logic — Fixed Full Version =====

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('zades_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('zades_wish') || '[]');
let currentUser = JSON.parse(localStorage.getItem('zades_user') || 'null');
let currentProduct = null;
let currentColorIdx = 0;
let currentQty = 1;
let currentSize = null;

// ===== CINEMATIC LOADER =====
(function initLoader() {
  const pg = document.querySelector('.loader-pg');
  const cv = document.getElementById('loader-cv');
  if (!pg || !cv) return;
  const ctx = cv.getContext('2d');
  const ltrs = [0,1,2,3,4].map(i => document.getElementById('ll'+i));
  const tag = document.getElementById('ltag');
  const dl = document.getElementById('ldl');
  const logoSvg = document.getElementById('loadersvg');

  let W, H, raf = null, startT = null, floatStart = null;

  function resize() { W = cv.width = pg.offsetWidth; H = cv.height = pg.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  const DIRS = ['top','bottom','top','bottom','top'];
  const LETTER_DUR = 1.5, LETTER_GAP = 0.22, TRAVEL = 110;

  function easeOutExpo(t) { return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function drawBg() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
  }

  function mainLoop(ts) {
    if (!startT) startT = ts;
    const t = (ts - startT) / 1000;
    drawBg();

    const lp = Math.min(t / 2.8, 1), leq = easeOutQuart(lp);
    logoSvg.style.transform = `scale(${3.2 - (3.2 - 1.0) * leq})`;
    logoSvg.style.opacity = (leq * 0.07) + '';
    logoSvg.style.filter = `blur(${(1 - leq) * 10}px)`;

    ltrs.forEach((l, i) => {
      const dir = DIRS[i], start = 0.5 + i * LETTER_GAP, p = t - start;
      if (p <= 0) { l.style.opacity = '0'; return; }
      const pr = Math.min(p / LETTER_DUR, 1), eq = easeOutExpo(pr), eq2 = easeOutQuart(pr);
      const fromY = dir === 'top' ? -TRAVEL : TRAVEL, fromRX = dir === 'top' ? -25 : 25;
      l.style.transform = `translateY(${fromY * (1 - eq2)}px) rotateX(${fromRX * (1 - eq2)}deg)`;
      l.style.opacity = `${Math.min(pr * 2.5, 1)}`;
      const glowBloom = pr < 0.5 ? pr / 0.5 : 1 - (pr - 0.5) / 0.5;
      l.style.textShadow = `0 0 ${40 * glowBloom}px rgba(255,255,255,${glowBloom * 0.3})`;
      if (pr >= 1) { l.style.transform = ''; l.style.textShadow = 'none'; l.style.opacity = '1'; }
    });

    const dlp = easeOutQuart(Math.min(Math.max(0, t - 2.2) / 1.2, 1));
    dl.style.width = (dlp * 210) + 'px'; dl.style.opacity = dlp + '';

    const tp = easeOutQuart(Math.min(Math.max(0, t - 2.7) / 1.3, 1));
    tag.style.opacity = tp + ''; tag.style.transform = `translateY(${(1 - tp) * 8}px)`;
    tag.style.color = `rgba(255,255,255,${tp * 0.36})`;

    if (t > 0.15) ['lc1','lc2','lc3','lc4'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('on');
    });

    const allDone = 0.5 + (4 * LETTER_GAP) + LETTER_DUR;
    if (t < allDone + 1.8) {
      raf = requestAnimationFrame(mainLoop);
    } else {
      floatStart = ts;
      raf = requestAnimationFrame(floatLoop);
      setTimeout(() => exitLoader(), 1000);
    }
  }

  function floatLoop(ts) {
    if (!floatStart) floatStart = ts;
    const t = (ts - floatStart) / 1000;
    drawBg();
    logoSvg.style.opacity = (0.065 + Math.sin(t * 0.45) * 0.015) + '';
    logoSvg.style.transform = `scale(1) rotate(${Math.sin(t * 0.18) * 1.5}deg)`;
    ltrs.forEach((l, i) => {
      const ph = i * 0.42;
      l.style.transform = `translateY(${Math.sin(t * 0.48 + ph) * 4}px) rotateX(${Math.sin(t * 0.30 + ph) * 1.0}deg)`;
      l.style.opacity = '1';
    });
    raf = requestAnimationFrame(floatLoop);
  }

  function exitLoader() {
    cancelAnimationFrame(raf);
    const loader = document.getElementById('loader');
    loader.style.transition = 'opacity 0.8s ease';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      const visited = localStorage.getItem('zades_visited');
      if (!visited && !currentUser) {
        document.getElementById('auth-modal').style.display = 'flex';
      }
      localStorage.setItem('zades_visited', '1');
    }, 800);
  }

  setTimeout(() => raf = requestAnimationFrame(mainLoop), 200);
})();

// ===== AUTH =====
function showAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'flex';
}

function submitEmailAuth() {
  const emailOrMobile = document.getElementById('auth-emailmobile').value.trim();
  if (!emailOrMobile) { showToast('Please enter email or mobile'); return; }
  const isEmail = emailOrMobile.includes('@');
  const isMobile = /^\d{10}$/.test(emailOrMobile);
  if (!isEmail && !isMobile) { showToast('Enter a valid email or 10-digit mobile'); return; }
  const mockUser = {
    name: 'ZADES Customer',
    email: isEmail ? emailOrMobile : '',
    mobile: isMobile ? emailOrMobile : '',
    uid: 'user_' + Date.now()
  };
  setUser(mockUser);
  document.getElementById('auth-modal').style.display = 'none';
  showToast('Welcome to ZADES! ✦');
}

function setUser(user) {
  currentUser = user;
  localStorage.setItem('zades_user', JSON.stringify(user));
  updateProfileUI();
}

function skipAuth() {
  document.getElementById('auth-modal').style.display = 'none';
}

function signOut() {
  currentUser = null;
  cart = [];
  wishlist = [];
  localStorage.removeItem('zades_user');
  localStorage.removeItem('zades_cart');
  localStorage.removeItem('zades_wish');
  localStorage.removeItem('zades_visited');
  updateProfileUI();
  updateBadges();
  const dd = document.getElementById('profile-dropdown');
  if (dd) dd.style.display = 'none';
  showToast('Signed out successfully');
}

function toggleProfile() {
  const dd = document.getElementById('profile-dropdown');
  if (!dd) return;
  const isOpen = dd.style.display === 'block';
  // Close all dropdowns first
  document.getElementById('profile-dropdown').style.display = 'none';
  if (!isOpen) dd.style.display = 'block';
}

function updateProfileUI() {
  const info = document.getElementById('profile-info');
  if (!info) return;
  if (currentUser) {
    const identifier = currentUser.email || currentUser.mobile || '';
    info.innerHTML = `
      <div style="padding:16px 16px 8px;border-bottom:1px solid rgba(255,255,255,0.08)">
        <strong style="display:block;font-size:13px">${currentUser.name}</strong>
        <span style="font-size:11px;color:#888">${identifier}</span>
      </div>`;
  } else {
    info.innerHTML = `<div style="padding:16px 16px 8px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#888">Guest User</div>`;
  }
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== SEARCH =====
function handleSearch(q) {
  const dd = document.getElementById('search-dropdown');
  if (!q.trim()) { dd.classList.remove('open'); return; }
  const results = ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    p.desc.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 5);
  if (!results.length) {
    dd.innerHTML = '<div class="search-item">No results found</div>';
    dd.classList.add('open'); return;
  }
  dd.innerHTML = results.map(p => `
    <div class="search-item" onclick="openProductFromSearch('${p.id}')">
      <img src="${p.tshirt || p.images[0]}" alt="${p.name}" onerror="this.style.display='none'">
      <div>
        <div style="font-weight:500">${p.name}</div>
        <div style="color:#666;font-size:10px">₹${p.price} · ${p.category}</div>
      </div>
    </div>`).join('');
  dd.classList.add('open');
}

function openProductFromSearch(id) {
  document.getElementById('search-dropdown').classList.remove('open');
  document.getElementById('search-input').value = '';
  const p = ALL_PRODUCTS.find(x => x.id === id);
  if (p) openProductModal(p);
}

document.addEventListener('click', e => {
  if (!e.target.closest('.search-bar')) {
    document.getElementById('search-dropdown').classList.remove('open');
  }
  if (!e.target.closest('.nav-right')) {
    const dd = document.getElementById('profile-dropdown');
    if (dd) dd.style.display = 'none';
  }
});

// ===== VIDEO PLACEHOLDER =====
window.addEventListener('load', () => {
  const video = document.getElementById('hero-video');
  const placeholder = document.getElementById('hero-placeholder');
  if (video) {
    video.addEventListener('canplay', () => { if (placeholder) placeholder.style.display = 'none'; });
    video.addEventListener('error', () => { if (placeholder) placeholder.style.display = 'flex'; });
    if (video.readyState >= 3 && placeholder) placeholder.style.display = 'none';
  }
});

// ===== CATEGORIES =====
function openCategory(catId) {
  const prods = ZADES_PRODUCTS[catId];
  if (!prods) return;
  const page = document.getElementById('cat-page');
  const title = document.getElementById('cat-page-title');
  const count = document.getElementById('cat-page-count');
  const grid = document.getElementById('products-grid');

  title.textContent = catId.charAt(0).toUpperCase() + catId.slice(1);
  count.textContent = `${prods.length} styles`;

  grid.innerHTML = prods.map(p => {
    const stock = getStockStatus(p.sizes);
    // Color dots
    const colors = p.colors.map((c, i) =>
      `<div class="color-dot ${i===0?'active':''}" style="background:${c.hex}"
        onclick="event.stopPropagation();switchCardColor(this,'${p.id}',${i})" title="${c.name}"></div>`
    ).join('');

    // Use tshirt as default, model on hover
    const tshirtSrc = p.tshirt || p.images[0];
    const modelSrc = p.modelImg || p.images[0];

    return `
      <div class="product-card" onclick="openProductModal(${JSON.stringify(p).replace(/"/g,'&quot;')})">
        <div class="product-card-img">
          <!-- tshirt shown by default, model shown on hover -->
          <img src="${tshirtSrc}" alt="${p.name}" class="pc-tshirt" id="card-tshirt-${p.id}">
          <img src="${modelSrc}" alt="${p.name} model" class="pc-model" id="card-model-${p.id}"
            onerror="this.src='${tshirtSrc}';this.style.objectFit='contain';this.style.padding='16px'">
          <div class="color-dots">${colors}</div>
        </div>
        <div class="product-card-info">
          <h4>${p.name}</h4>
          <p>${p.desc.substring(0,60)}...</p>
          <div class="product-card-bottom">
            <span class="product-price">₹${p.price}</span>
            <span class="stock-pill ${stock.cls}">${stock.label}</span>
          </div>
          <button class="product-buy-btn" onclick="event.stopPropagation(); openProductModal(${JSON.stringify(p).replace(/"/g,'&quot;')})">
            Buy Now
          </button>
        </div>
      </div>`;
  }).join('');

  document.querySelector('.collections').style.display = 'none';
  page.style.display = 'block';
  page.scrollIntoView({ behavior: 'smooth' });
}

function closeCatPage() {
  document.getElementById('cat-page').style.display = 'none';
  document.querySelector('.collections').style.display = 'block';
  document.querySelector('.collections').scrollIntoView({ behavior: 'smooth' });
}

function switchCardColor(dotEl, prodId, idx) {
  const prod = ALL_PRODUCTS.find(p => p.id === prodId);
  if (!prod || !prod.colors[idx]) return;
  const tshirtImg = document.getElementById('card-tshirt-' + prodId);
  const modelImg = document.getElementById('card-model-' + prodId);
  if (tshirtImg) tshirtImg.src = prod.colors[idx].image;
  if (modelImg) modelImg.src = prod.colors[idx].modelImage || prod.modelImg || prod.images[0];
  dotEl.closest('.color-dots').querySelectorAll('.color-dot').forEach((d,i) => {
    d.classList.toggle('active', i === idx);
  });
}

// ===== PRODUCT MODAL =====
function openProductModal(p) {
  if (typeof p === 'string') {
    try { p = JSON.parse(p); } catch(e) { return; }
  }
  currentProduct = p;
  currentColorIdx = 0;
  currentQty = 1;
  currentSize = null;

  document.getElementById('modal-cat').textContent = p.category.toUpperCase();
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-price').textContent = `₹${p.price}`;
  document.getElementById('modal-qty').textContent = '1';

  // Modal images: model shown by default, tshirt on hover
  const imgWrap = document.getElementById('modal-images');
  const tshirtSrc = p.tshirt || p.images[0];
  const modelSrc = p.modelImg || p.images[1] || p.images[0];
  imgWrap.innerHTML = `
    <div class="modal-img-wrap">
      <img src="${tshirtSrc}" alt="${p.name}" class="modal-img-tshirt">
      <img src="${modelSrc}" alt="${p.name} model" class="modal-img-model" id="modal-main-img">
    </div>`;

  // Thumbnail strip
  const thumbsDiv = document.getElementById('modal-thumbs');
  if (thumbsDiv) {
    thumbsDiv.innerHTML = p.images.map((src, i) =>
      `<img src="${src}" class="modal-thumb ${i===0?'active':''}" onclick="switchModalImg('${src}',this)">`
    ).join('');
  }

  // Colors
  const colorsDiv = document.getElementById('modal-colors');
  if (p.colors && p.colors.length > 0) {
    colorsDiv.innerHTML = `<label>Color — <span id="color-name">${p.colors[0].name}</span></label>
      <div class="color-options">
        ${p.colors.map((c, i) =>
          `<div class="color-opt ${i===0?'selected':''}" style="background:${c.hex}"
            onclick="selectColor(${i})" title="${c.name}"></div>`
        ).join('')}
      </div>`;
  } else {
    colorsDiv.innerHTML = '';
  }

  // Sizes
  const sizesDiv = document.getElementById('modal-sizes');
  const sizeKeys = Object.keys(p.sizes);
  sizesDiv.innerHTML = `<label>Size</label>
    <div class="size-options">
      ${sizeKeys.map(s =>
        `<button class="size-opt" ${p.sizes[s]===0?'disabled':''} onclick="selectSize(this,'${s}')">${s}</button>`
      ).join('')}
    </div>`;

  const stock = getStockStatus(p.sizes);
  document.getElementById('modal-stock').textContent = stock.label;

  // Wishlist button state
  const wishBtn = document.querySelector('.btn-wishlist');
  if (wishBtn) {
    const inWish = wishlist.some(w => w.id === p.id);
    wishBtn.textContent = inWish ? '♥ Wishlisted' : '♡ Wishlist';
  }

  document.getElementById('product-modal').style.display = 'flex';
  document.getElementById('overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function switchModalImg(src, el) {
  const main = document.getElementById('modal-main-img');
  if (main) main.src = src;
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function closeProductModal() {
  document.getElementById('product-modal').style.display = 'none';
  closeAll();
}

function selectColor(idx) {
  currentColorIdx = idx;
  const p = currentProduct;
  document.querySelectorAll('.color-opt').forEach((el, i) => el.classList.toggle('selected', i === idx));
  if (p.colors[idx]) {
    document.getElementById('color-name').textContent = p.colors[idx].name;
    // Update tshirt image (hover layer)
    const tshirtImg = document.querySelector('.modal-img-tshirt');
    if (tshirtImg) tshirtImg.src = p.colors[idx].image;
    // Update model image (default/primary layer)
    const modelImg = document.querySelector('.modal-img-model');
    if (modelImg && p.colors[idx].modelImage) modelImg.src = p.colors[idx].modelImage;
  }
}

function selectSize(btn, size) {
  currentSize = size;
  document.querySelectorAll('.size-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ===== QTY COUNTER — FIXED =====
function changeQty(delta) {
  currentQty = Math.max(1, Math.min(10, (currentQty || 1) + delta));
  const qtyEl = document.getElementById('modal-qty');
  if (qtyEl) qtyEl.textContent = currentQty;
}

// ===== ADD TO CART =====
function addToCartModal() {
  if (!currentSize) { showToast('Please select a size'); return; }
  const p = currentProduct;
  const color = p.colors[currentColorIdx]?.name || 'Default';
  const image = p.colors[currentColorIdx]?.image || p.tshirt || p.images[0];

  const cartKey = `${p.id}_${color}_${currentSize}`;
  const existing = cart.find(i => i.id === cartKey);
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({
      id: cartKey,
      productId: p.id,
      name: p.name,
      price: p.price,
      color,
      size: currentSize,
      qty: currentQty,
      image,
      category: p.category
    });
  }
  saveCart();
  closeProductModal();
  showToast(`${p.name} added to cart ✦`);

  // Prompt to fill delivery profile if not set
  const profile = JSON.parse(localStorage.getItem('zades_delivery_profile') || 'null');
  if (!profile) {
    setTimeout(() => {
      if (confirm('Add your delivery address now for faster checkout?\n(Mobile, Address, City, Pincode, Alt Mobile)')) {
        openDeliveryProfile();
      }
    }, 600);
  }
}

function buyNowModal() {
  if (!currentSize) { showToast('Please select a size'); return; }
  addToCartModal();
  proceedCheckout();
}

// ===== ADD TO WISHLIST =====
function addToWishlistModal() {
  const p = currentProduct;
  if (!p) return;
  const existing = wishlist.findIndex(w => w.id === p.id);
  if (existing === -1) {
    wishlist.push({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.colors[currentColorIdx]?.image || p.tshirt || p.images[0],
      category: p.category
    });
    saveWishlist();
    showToast('Added to wishlist ♡');
    const btn = document.querySelector('.btn-wishlist');
    if (btn) btn.textContent = '♥ Wishlisted';
  } else {
    wishlist.splice(existing, 1);
    saveWishlist();
    showToast('Removed from wishlist');
    const btn = document.querySelector('.btn-wishlist');
    if (btn) btn.textContent = '♡ Wishlist';
  }
}

// ===== CART =====
function saveCart() {
  localStorage.setItem('zades_cart', JSON.stringify(cart));
  updateBadges();
}

function toggleCart() {
  const s = document.getElementById('cart-sidebar');
  const isOpen = s.style.display !== 'none';
  closeAll();
  if (!isOpen) {
    renderCart();
    s.style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function renderCart() {
  const div = document.getElementById('cart-items');
  if (!cart.length) {
    div.innerHTML = '<p style="padding:24px;text-align:center;color:#888">Your cart is empty</p>';
  } else {
    div.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <p>${item.color} · ${item.size}</p>
          <div class="cart-qty-row">
            <button class="qty-btn" onclick="cartChangeQty(${idx},-1)">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="cartChangeQty(${idx},1)">+</button>
          </div>
          <p class="cart-item-price">₹${item.price * item.qty}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">✕</button>
      </div>`).join('');
  }
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  document.getElementById('cart-total').textContent = `₹${total}`;
}

// In-cart qty change
function cartChangeQty(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty = Math.max(1, Math.min(10, cart[idx].qty + delta));
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
}

// ===== WISHLIST =====
function saveWishlist() {
  localStorage.setItem('zades_wish', JSON.stringify(wishlist));
  updateBadges();
}

function toggleWishlist() {
  const s = document.getElementById('wish-sidebar');
  const isOpen = s.style.display !== 'none';
  closeAll();
  if (!isOpen) {
    renderWishlist();
    s.style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function renderWishlist() {
  const div = document.getElementById('wish-items');
  if (!div) return;
  if (!wishlist.length) {
    div.innerHTML = '<p style="padding:24px;text-align:center;color:#888">Your wishlist is empty</p>';
  } else {
    div.innerHTML = wishlist.map(item => `
      <div class="wish-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <p>₹${item.price}</p>
          <button style="font-size:10px;letter-spacing:0.1em;margin-top:6px;padding:4px 10px;border:1px solid #000;background:none;cursor:pointer"
            onclick="addWishToCart('${item.id}')">Add to Cart</button>
        </div>
        <button class="remove-btn" onclick="removeFromWish('${item.id}')">✕</button>
      </div>`).join('');
  }
}

function addWishToCart(id) {
  const item = wishlist.find(w => w.id === id);
  if (!item) return;
  const prod = ALL_PRODUCTS.find(p => p.id === id);
  if (prod) openProductModal(prod);
}

function removeFromWish(id) {
  wishlist = wishlist.filter(i => i.id !== id);
  saveWishlist(); renderWishlist();
}

// ===== BADGES =====
function updateBadges() {
  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const cartBadge = document.getElementById('cart-badge');
  const wishBadge = document.getElementById('wish-badge');
  if (cartBadge) cartBadge.textContent = cartCount;
  if (wishBadge) wishBadge.textContent = wishlist.length;
}

// ===== DELIVERY PROFILE =====
function openDeliveryProfile() {
  const profile = JSON.parse(localStorage.getItem('zades_delivery_profile') || '{}');
  const modal = document.getElementById('delivery-profile-modal');
  if (!modal) return;
  document.getElementById('dp-name').value = profile.name || '';
  document.getElementById('dp-mobile').value = profile.mobile || '';
  document.getElementById('dp-altmobile').value = profile.altmobile || '';
  document.getElementById('dp-addr').value = profile.addr || '';
  document.getElementById('dp-city').value = profile.city || '';
  document.getElementById('dp-pincode').value = profile.pincode || '';
  modal.style.display = 'flex';
  document.getElementById('overlay').style.display = 'block';
}

function saveDeliveryProfile() {
  const name = document.getElementById('dp-name').value.trim();
  const mobile = document.getElementById('dp-mobile').value.trim();
  const altmobile = document.getElementById('dp-altmobile').value.trim();
  const addr = document.getElementById('dp-addr').value.trim();
  const city = document.getElementById('dp-city').value.trim();
  const pincode = document.getElementById('dp-pincode').value.trim();
  if (!name || !mobile || !addr || !city || !pincode) { showToast('Please fill all required fields'); return; }
  if (!/^\d{10}$/.test(mobile)) { showToast('Enter valid 10-digit mobile'); return; }
  if (altmobile && !/^\d{10}$/.test(altmobile)) { showToast('Enter valid 10-digit alt mobile'); return; }
  if (!/^\d{6}$/.test(pincode)) { showToast('Enter valid 6-digit pincode'); return; }
  localStorage.setItem('zades_delivery_profile', JSON.stringify({ name, mobile, altmobile, addr, city, pincode }));
  closeDeliveryProfile();
  showToast('Delivery profile saved ✦');
}

function closeDeliveryProfile() {
  const modal = document.getElementById('delivery-profile-modal');
  if (modal) modal.style.display = 'none';
  closeAll();
}

// ===== CHECKOUT =====
function proceedCheckout() {
  if (!cart.length) { showToast('Your cart is empty'); return; }
  if (!currentUser) {
    document.getElementById('auth-modal').style.display = 'flex';
    return;
  }
  closeAll();

  // Pre-fill from saved delivery profile
  const profile = JSON.parse(localStorage.getItem('zades_delivery_profile') || '{}');
  if (profile.name) document.getElementById('co-name').value = profile.name;
  if (profile.mobile) document.getElementById('co-mobile').value = profile.mobile;
  if (profile.altmobile) document.getElementById('co-altmobile').value = profile.altmobile;
  if (profile.addr) document.getElementById('co-addr1').value = profile.addr;
  if (profile.city) document.getElementById('co-city').value = profile.city;
  if (profile.pincode) document.getElementById('co-pincode').value = profile.pincode;

  const summary = document.getElementById('checkout-summary');
  let html = '<h4>Order Summary</h4>';
  cart.forEach(i => {
    html += `<div class="summary-item"><span>${i.name} (${i.size} × ${i.qty})</span><span>₹${i.price * i.qty}</span></div>`;
  });
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  html += `<div class="summary-total"><span>Total</span><span>₹${total}</span></div>`;
  summary.innerHTML = html;
  document.getElementById('checkout-modal').style.display = 'flex';
  document.getElementById('overlay').style.display = 'block';
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
  closeAll();
}

function placeOrder() {
  const name = document.getElementById('co-name').value.trim();
  const mobile = document.getElementById('co-mobile').value.trim();
  const altmobile = document.getElementById('co-altmobile')?.value.trim() || '';
  const addr1 = document.getElementById('co-addr1').value.trim();
  const city = document.getElementById('co-city').value.trim();
  const state = document.getElementById('co-state').value.trim();
  const pincode = document.getElementById('co-pincode').value.trim();

  if (!name || !mobile || !addr1 || !city || !state || !pincode) {
    showToast('Please fill all required fields'); return;
  }
  if (!/^\d{10}$/.test(mobile)) { showToast('Enter valid 10-digit mobile number'); return; }
  if (altmobile && !/^\d{10}$/.test(altmobile)) { showToast('Enter valid 10-digit alt mobile'); return; }
  if (!/^\d{6}$/.test(pincode)) { showToast('Enter valid 6-digit pincode'); return; }

  // Save delivery profile for next time
  localStorage.setItem('zades_delivery_profile', JSON.stringify({ name, mobile, altmobile, addr: addr1, city, pincode }));

  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);

  // ===== RAZORPAY INTEGRATION =====
  const options = {
    key: 'rzp_test_YOUR_KEY_HERE',
    amount: total * 100,
    currency: 'INR',
    name: 'ZADES',
    description: 'Urban Streetwear',
    image: 'assets/logo-zades.jpeg',
    prefill: { name, contact: mobile, email: currentUser?.email || '' },
    notes: { address: `${addr1}, ${city}, ${state} - ${pincode}`, altmobile },
    theme: { color: '#000000' },
    handler: function(response) {
      const orderId = 'ZD' + Date.now();
      const orders = JSON.parse(localStorage.getItem('zades_orders') || '[]');
      orders.push({
        id: orderId, items: [...cart], total,
        address: { name, mobile, altmobile, addr1, city, state, pincode },
        paymentId: response.razorpay_payment_id,
        date: new Date().toISOString(), status: 'Confirmed'
      });
      localStorage.setItem('zades_orders', JSON.stringify(orders));
      cart = [];
      saveCart();
      closeCheckout();
      showToast(`Order confirmed! ID: ${orderId} ✦`);
    },
    modal: { ondismiss: () => showToast('Payment cancelled') }
  };

  if (window.Razorpay) {
    new window.Razorpay(options).open();
  } else {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => new window.Razorpay(options).open();
    script.onerror = () => showToast('Payment gateway unavailable. Please try again.');
    document.head.appendChild(script);
  }
}

// ===== ENQUIRY =====
function submitEnquiry(e) {
  e.preventDefault();
  showToast("Enquiry sent! We'll contact you soon ✦");
  e.target.reset();
}

// ===== CLOSE ALL =====
function closeAll() {
  ['cart-sidebar','wish-sidebar','delivery-profile-modal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const ov = document.getElementById('overlay');
  if (ov) ov.style.display = 'none';
  document.body.style.overflow = '';
}

// ===== ADMIN =====
let adminCode = '';
document.addEventListener('keydown', e => {
  adminCode += e.key;
  if (adminCode.length > 10) adminCode = adminCode.slice(-10);
  if (adminCode.endsWith('zades2024')) window.location.href = 'admin/index.html';
});
function goAdmin() { window.location.href = 'admin/index.html'; }

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
updateBadges();
updateProfileUI();
