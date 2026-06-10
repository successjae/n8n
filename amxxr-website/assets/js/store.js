/* ============================================================
   AMXXR — Store engine
   Cart, promo codes, limited drops, checkout.
   Checkout is demo-mode: it records the order to the fan CRM.
   In production, point checkout() at a Stripe Checkout Session
   (see README "Payments" section) — the cart payload is already
   shaped like Stripe line_items.
   ============================================================ */

(() => {
	const { PRODUCTS, PROMO_CODES } = window.AMXXR;
	const CRM = window.AMXXR_CRM;
	const CART_KEY = 'amxxr_cart';
	const SHIPPING = 8;

	const cart = {
		items: JSON.parse(localStorage.getItem(CART_KEY) || '[]'),
		promo: null,
		save() { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); renderCart(); },
		add(productId, size) {
			const line = this.items.find((i) => i.productId === productId && i.size === size);
			if (line) line.qty += 1;
			else this.items.push({ productId, size, qty: 1 });
			this.save();
			openDrawer();
		},
		setQty(idx, qty) {
			if (qty <= 0) this.items.splice(idx, 1);
			else this.items[idx].qty = qty;
			this.save();
		},
		subtotal() {
			return this.items.reduce((sum, i) => {
				const p = PRODUCTS.find((x) => x.id === i.productId);
				return sum + (p ? p.price * i.qty : 0);
			}, 0);
		},
		discount() {
			if (!this.promo) return 0;
			const c = PROMO_CODES[this.promo];
			return c && c.type === 'percent' ? Math.round(this.subtotal() * c.value) / 100 : 0;
		},
		shipping() {
			if (!this.items.length) return 0;
			if (this.promo && PROMO_CODES[this.promo] && PROMO_CODES[this.promo].type === 'shipping') return 0;
			const physical = this.items.some((i) => {
				const p = PRODUCTS.find((x) => x.id === i.productId);
				return p && p.category !== 'digital';
			});
			return physical ? SHIPPING : 0;
		},
		total() { return Math.max(0, this.subtotal() - this.discount() + this.shipping()); },
		clear() { this.items = []; this.promo = null; this.save(); },
	};
	window.AMXXR_cart = cart;

	const money = (n) => '$' + n.toFixed(2);

	/* ---------------- Drawer ---------------- */
	const veil = document.createElement('div');
	veil.className = 'drawer-veil';
	const drawer = document.createElement('aside');
	drawer.className = 'drawer';
	drawer.setAttribute('aria-label', 'Shopping cart');
	drawer.innerHTML = `
		<div class="drawer-head"><h3>Your Cart</h3><button class="drawer-close" aria-label="Close cart">×</button></div>
		<div class="drawer-body" id="cartBody"></div>
		<div class="drawer-foot">
			<form class="inline-form" id="promoForm" style="margin-bottom:16px">
				<input type="text" name="code" placeholder="Promo code" aria-label="Promo code">
				<button class="btn btn-ghost btn-sm" type="submit">Apply</button>
			</form>
			<div class="cart-total"><span>Subtotal</span><span id="cartSub">$0.00</span></div>
			<div class="cart-total" id="discountRow" style="display:none;color:var(--crimson)"><span id="discountLabel">Discount</span><span id="cartDisc"></span></div>
			<div class="cart-total"><span>Shipping</span><span id="cartShip">$0.00</span></div>
			<div class="cart-total grand"><span>Total</span><span id="cartGrand">$0.00</span></div>
			<button class="btn btn-solid" id="checkoutBtn" style="width:100%">Secure Checkout</button>
			<p class="form-note" style="text-align:center">Secure checkout · Cards, Apple Pay &amp; Google Pay via Stripe</p>
		</div>`;
	document.body.appendChild(veil);
	document.body.appendChild(drawer);

	const openDrawer = () => { veil.classList.add('open'); drawer.classList.add('open'); };
	const closeDrawer = () => { veil.classList.remove('open'); drawer.classList.remove('open'); };
	veil.addEventListener('click', closeDrawer);
	drawer.querySelector('.drawer-close').addEventListener('click', closeDrawer);
	document.getElementById('cartOpen')?.addEventListener('click', openDrawer);

	function renderCart() {
		const body = drawer.querySelector('#cartBody');
		document.getElementById('cartCount').textContent = cart.items.reduce((n, i) => n + i.qty, 0);
		if (!cart.items.length) {
			body.innerHTML = '<p style="color:var(--cream-faint);text-align:center;padding:48px 0">Cart is empty.<br>The drop waits for no one.</p>';
		} else {
			body.innerHTML = cart.items.map((i, idx) => {
				const p = PRODUCTS.find((x) => x.id === i.productId);
				if (!p) return '';
				return `<div class="cart-line">
					<div class="art mini-art" style="--art-accent:${p.palette[0]};padding:0"></div>
					<div>
						<h4>${p.name}</h4>
						<div class="meta">${i.size ? 'Size ' + i.size + ' · ' : ''}${money(p.price)}</div>
						<div class="qty">
							<button data-qty="${idx}:-1" aria-label="Decrease quantity">−</button>
							<span>${i.qty}</span>
							<button data-qty="${idx}:1" aria-label="Increase quantity">+</button>
						</div>
					</div>
					<strong>${money(p.price * i.qty)}</strong>
				</div>`;
			}).join('');
		}
		drawer.querySelector('#cartSub').textContent = money(cart.subtotal());
		drawer.querySelector('#cartShip').textContent = cart.shipping() === 0 && cart.items.length ? 'FREE' : money(cart.shipping());
		drawer.querySelector('#cartGrand').textContent = money(cart.total());
		const dRow = drawer.querySelector('#discountRow');
		if (cart.discount() > 0) {
			dRow.style.display = 'flex';
			drawer.querySelector('#discountLabel').textContent = `Discount (${cart.promo})`;
			drawer.querySelector('#cartDisc').textContent = '−' + money(cart.discount());
		} else dRow.style.display = 'none';
	}

	drawer.addEventListener('click', (e) => {
		const q = e.target.closest('[data-qty]');
		if (!q) return;
		const [idx, delta] = q.dataset.qty.split(':').map(Number);
		cart.setQty(idx, cart.items[idx].qty + delta);
	});

	drawer.querySelector('#promoForm').addEventListener('submit', (e) => {
		e.preventDefault();
		const code = new FormData(e.target).get('code').trim().toUpperCase();
		if (PROMO_CODES[code]) {
			cart.promo = code;
			window.AMXXR_toast(PROMO_CODES[code].label + ' applied');
			renderCart();
		} else {
			window.AMXXR_toast('Code not recognized');
		}
		e.target.reset();
	});

	/* ---------------- Checkout ---------------- */
	const coVeil = document.createElement('div');
	coVeil.className = 'modal-veil';
	coVeil.innerHTML = `<div class="modal">
		<button class="modal-x" aria-label="Close">×</button>
		<div id="checkoutBody"></div>
	</div>`;
	document.body.appendChild(coVeil);
	coVeil.addEventListener('click', (e) => {
		if (e.target === coVeil || e.target.classList.contains('modal-x')) coVeil.classList.remove('open');
	});

	drawer.querySelector('#checkoutBtn').addEventListener('click', () => {
		if (!cart.items.length) { window.AMXXR_toast('Your cart is empty'); return; }
		closeDrawer();
		coVeil.querySelector('#checkoutBody').innerHTML = `
			<span class="kicker">Secure Checkout</span>
			<h2 style="font-size:2rem;margin-bottom:24px">Almost yours</h2>
			<form id="checkoutForm">
				<div class="field"><label>Full name</label><input name="name" required></div>
				<div class="field"><label>Email</label><input type="email" name="email" required></div>
				<div class="grid grid-2" style="gap:14px">
					<div class="field"><label>City</label><input name="city"></div>
					<div class="field"><label>State / Country</label><input name="state"></div>
				</div>
				<div class="field"><label>Shipping address</label><input name="address" placeholder="Street, ZIP"></div>
				<hr class="divider">
				<div class="cart-total grand"><span>Total due</span><span>${money(cart.total())}</span></div>
				<button class="btn btn-solid" type="submit" style="width:100%">Pay ${money(cart.total())}</button>
				<p class="form-note" style="text-align:center">Demo mode — connects to Stripe Checkout in production. No card required here.</p>
			</form>`;
		coVeil.classList.add('open');

		coVeil.querySelector('#checkoutForm').addEventListener('submit', (e) => {
			e.preventDefault();
			const fd = new FormData(e.target);
			const order = {
				id: 'o_' + Date.now().toString(36),
				date: new Date().toISOString(),
				email: fd.get('email'),
				name: fd.get('name'),
				items: cart.items.map((i) => {
					const p = PRODUCTS.find((x) => x.id === i.productId);
					return { product: p ? p.name : i.productId, productId: i.productId, size: i.size, qty: i.qty, price: p ? p.price : 0 };
				}),
				promo: cart.promo,
				total: cart.total(),
				status: 'paid (demo)',
			};
			CRM.addOrder(order);
			CRM.addFan({
				name: order.name, email: order.email,
				city: fd.get('city') || '', state: fd.get('state') || '',
				source: 'merch purchase', tags: ['buyer'],
			});
			// attach purchase to the fan record
			const fans = CRM.read('fans');
			const fan = fans.find((f) => f.email.toLowerCase() === order.email.toLowerCase());
			if (fan) { fan.purchases.push({ orderId: order.id, total: order.total, date: order.date }); CRM.write('fans', fans); }
			cart.clear();
			coVeil.querySelector('#checkoutBody').innerHTML = `
				<div style="text-align:center;padding:30px 0">
					<div style="font-size:52px;margin-bottom:14px">🖤</div>
					<h2 style="font-size:2rem;margin-bottom:10px">Order confirmed</h2>
					<p style="color:var(--cream-dim)">Order ${order.id.toUpperCase()} · receipt sent to ${order.email}.<br>You're officially BELOVED — welcome to the fan list.</p>
					<a class="btn btn-solid" href="merch.html" style="margin-top:26px">Back to the Shop</a>
				</div>`;
		}, { once: true });
	});

	/* ---------------- Product cards (used by merch + home) ---------------- */
	window.AMXXR_productCard = (p) => {
		const sizes = p.sizes
			? `<select aria-label="Size" data-size-for="${p.id}" style="background:var(--coal);border:1px solid var(--line);color:var(--cream);border-radius:8px;padding:8px 10px;font-family:var(--body)">
				${p.sizes.map((s) => `<option>${s}</option>`).join('')}</select>`
			: '';
		const badge = p.drop ? '<span class="tag hot">Limited Drop</span>'
			: p.preorder ? '<span class="tag">Pre-Order</span>'
			: p.featured ? '<span class="tag">Featured</span>' : '';
		const low = p.stock <= 20 && p.stock < 9999 ? `<div class="stock-low">Only ${p.stock} left</div>` : '';
		return `<article class="card reveal" data-category="${p.category}">
			<div class="art" style="--art-accent:${p.palette[0]}"><span class="art-label">${p.name}</span></div>
			<div class="card-body">
				${badge}
				<h3>${p.name}</h3>
				<p style="min-height:42px">${p.desc}</p>
				<div style="display:flex;justify-content:space-between;align-items:center;margin:14px 0 6px">
					<span class="price">$${p.price}</span>${low}
				</div>
				${p.drop && p.dropEnds ? `<div class="stock-low" data-countdown="${p.dropEnds}" style="color:var(--gold);margin-bottom:10px"></div>` : ''}
				<div style="display:flex;gap:10px;align-items:center;margin-top:10px">
					${sizes}
					<button class="btn btn-solid btn-sm" data-add="${p.id}" style="flex:1">Add to Cart</button>
				</div>
			</div>
		</article>`;
	};

	document.addEventListener('click', (e) => {
		const btn = e.target.closest('[data-add]');
		if (!btn) return;
		const id = btn.dataset.add;
		const sizeSel = document.querySelector(`[data-size-for="${id}"]`);
		cart.add(id, sizeSel ? sizeSel.value : null);
		window.AMXXR_toast('Added to cart');
	});

	/* Drop countdowns */
	setInterval(() => {
		document.querySelectorAll('[data-countdown]').forEach((el) => {
			const diff = new Date(el.dataset.countdown) - Date.now();
			if (diff <= 0) { el.textContent = 'DROP CLOSED'; return; }
			const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4), s = Math.floor((diff % 6e4) / 1e3);
			el.textContent = `Drop ends in ${d}d ${h}h ${m}m ${s}s`;
		});
	}, 1000);

	renderCart();
})();
