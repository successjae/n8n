/* ============================================================
   AMXXR — Core frontend runtime
   - Shared nav/footer injection
   - Scroll effects + reveal animations
   - Fan CRM capture layer (shared with /admin via localStorage;
     swap CRM.persist() for a Supabase/API call in production)
   - Video lightbox player
   ============================================================ */

(() => {
	const S = window.AMXXR.SITE;

	/* ---------------- CRM data layer ---------------- */
	const CRM = {
		KEYS: { fans: 'amxxr_fans', orders: 'amxxr_orders', metrics: 'amxxr_metrics' },
		read(key) {
			try { return JSON.parse(localStorage.getItem(this.KEYS[key])) || []; }
			catch { return []; }
		},
		write(key, data) {
			localStorage.setItem(this.KEYS[key], JSON.stringify(data));
		},
		addFan(fan) {
			const fans = this.read('fans');
			const existing = fans.find((f) => f.email && fan.email && f.email.toLowerCase() === fan.email.toLowerCase());
			if (existing) {
				existing.tags = [...new Set([...(existing.tags || []), ...(fan.tags || [])])];
				existing.phone = fan.phone || existing.phone;
				existing.city = fan.city || existing.city;
				existing.lastSeen = new Date().toISOString();
			} else {
				fans.push({
					id: 'f_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
					name: fan.name || '',
					email: fan.email || '',
					phone: fan.phone || '',
					city: fan.city || '',
					state: fan.state || '',
					country: fan.country || '',
					social: fan.social || '',
					source: fan.source || 'website',
					tags: fan.tags || [],
					vip: !!fan.vip,
					purchases: [],
					downloads: [],
					notes: '',
					joined: new Date().toISOString(),
					lastSeen: new Date().toISOString(),
				});
			}
			this.write('fans', fans);
			this.bump(fan.tags && fan.tags.includes('sms') ? 'smsSignups' : 'emailSignups');
		},
		addOrder(order) {
			const orders = this.read('orders');
			orders.push(order);
			this.write('orders', orders);
			this.bump('orders');
		},
		bump(metric) {
			let m;
			try { m = JSON.parse(localStorage.getItem(this.KEYS.metrics)) || {}; } catch { m = {}; }
			m[metric] = (m[metric] || 0) + 1;
			localStorage.setItem(this.KEYS.metrics, JSON.stringify(m));
		},
	};
	window.AMXXR_CRM = CRM;
	CRM.bump('pageviews');

	/* ---------------- Nav + footer injection ---------------- */
	const page = location.pathname.split('/').pop() || 'index.html';
	const links = [
		['index.html', 'Home'],
		['music.html', 'Music'],
		['videos.html', 'Videos'],
		['merch.html', 'Shop'],
		['events.html', 'Shows'],
		['fanclub.html', 'Fan Club'],
		['about.html', 'About'],
		['contact.html', 'Contact'],
	];

	const nav = document.createElement('header');
	nav.className = 'nav';
	nav.innerHTML = `
		<div class="nav-inner">
			<a class="nav-logo" href="index.html" aria-label="AMXXR home">AM<span>XX</span>R</a>
			<ul class="nav-links">
				${links.slice(1).map(([href, label]) => `<li><a href="${href}" class="${page === href ? 'active' : ''}">${label}</a></li>`).join('')}
			</ul>
			<div class="nav-cta">
				<button class="cart-btn" id="cartOpen" aria-label="Open cart">CART<span class="cart-count" id="cartCount">0</span></button>
				<button class="nav-burger" id="burger" aria-label="Open menu"><span></span><span></span><span></span></button>
			</div>
		</div>`;
	document.body.prepend(nav);

	const mobile = document.createElement('nav');
	mobile.className = 'mobile-menu';
	mobile.id = 'mobileMenu';
	mobile.innerHTML = links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')
		+ `<a href="press.html">Press Kit</a><a href="sponsors.html">Partners</a>`;
	document.body.appendChild(mobile);
	document.getElementById('burger').addEventListener('click', () => mobile.classList.toggle('open'));
	mobile.addEventListener('click', (e) => { if (e.target.tagName === 'A') mobile.classList.remove('open'); });

	const footer = document.createElement('footer');
	footer.innerHTML = `
		<div class="wrap">
			<div class="footer-grid">
				<div>
					<div class="footer-logo">AM<span>XX</span>R</div>
					<p style="color:var(--cream-dim);font-size:14px;max-width:300px">${S.aka} · ${S.hometown}<br>${S.label}</p>
				</div>
				<div>
					<h4>Explore</h4>
					<ul>
						<li><a href="music.html">Music</a></li>
						<li><a href="videos.html">Videos</a></li>
						<li><a href="merch.html">Shop</a></li>
						<li><a href="events.html">Shows</a></li>
					</ul>
				</div>
				<div>
					<h4>Connect</h4>
					<ul>
						<li><a href="fanclub.html">Fan Club</a></li>
						<li><a href="about.html">About</a></li>
						<li><a href="press.html">Press Kit</a></li>
						<li><a href="sponsors.html">Partners</a></li>
						<li><a href="contact.html">Booking</a></li>
					</ul>
				</div>
				<div>
					<h4>Stay in the loop</h4>
					<form class="inline-form" data-fan-form data-source="footer">
						<input type="email" name="email" placeholder="your@email.com" required aria-label="Email address">
						<button class="btn btn-solid btn-sm" type="submit">Join</button>
					</form>
					<div class="socials-row" style="margin-top:20px">
						<a href="${S.socials.instagram}" target="_blank" rel="noopener">IG</a>
						<a href="${S.socials.spotify}" target="_blank" rel="noopener">Spotify</a>
						<a href="${S.socials.youtube}" target="_blank" rel="noopener">YouTube</a>
						<a href="${S.socials.bandcamp}" target="_blank" rel="noopener">Bandcamp</a>
						<a href="${S.socials.soundcloud}" target="_blank" rel="noopener">SoundCloud</a>
					</div>
				</div>
			</div>
			<div class="footer-giant">BELOVED</div>
			<div class="footer-bottom">
				<span>© ${new Date().getFullYear()} AMXXR · ${S.label}. All rights reserved.</span>
				<span><a href="admin/index.html" style="color:var(--cream-faint)">Team Login</a></span>
			</div>
		</div>`;
	document.body.appendChild(footer);

	/* ---------------- Scroll behaviors ---------------- */
	const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	const io = new IntersectionObserver(
		(entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
		{ threshold: 0.12 },
	);
	const observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
	window.AMXXR_observeReveals = observeReveals;
	observeReveals();

	/* ---------------- Toast ---------------- */
	const toast = document.createElement('div');
	toast.className = 'toast';
	document.body.appendChild(toast);
	let toastTimer;
	window.AMXXR_toast = (msg) => {
		toast.textContent = msg;
		toast.classList.add('show');
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
	};

	/* ---------------- Fan capture forms ---------------- */
	document.addEventListener('submit', (e) => {
		const form = e.target.closest('[data-fan-form]');
		if (!form) return;
		e.preventDefault();
		const fd = new FormData(form);
		const tags = (form.dataset.tags || '').split(',').filter(Boolean);
		if (fd.get('phone')) tags.push('sms');
		CRM.addFan({
			name: fd.get('name') || '',
			email: fd.get('email') || '',
			phone: fd.get('phone') || '',
			city: fd.get('city') || '',
			state: fd.get('state') || '',
			country: fd.get('country') || '',
			social: fd.get('social') || '',
			source: form.dataset.source || 'website',
			tags,
			vip: form.dataset.vip === 'true',
		});
		form.reset();
		const ok = form.parentElement.querySelector('.form-success');
		if (ok) ok.classList.add('show');
		window.AMXXR_toast(form.dataset.successMsg || 'You’re on the list. Welcome to BELOVED.');
	});

	/* ---------------- Video lightbox ---------------- */
	const veil = document.createElement('div');
	veil.className = 'modal-veil';
	veil.id = 'videoModal';
	veil.innerHTML = `<div class="modal" style="padding:0;background:#000;width:min(960px,100%)">
		<button class="modal-x" style="z-index:5" aria-label="Close">×</button>
		<div id="videoModalBody"></div>
	</div>`;
	document.body.appendChild(veil);
	const closeVideo = () => {
		veil.classList.remove('open');
		veil.querySelector('#videoModalBody').innerHTML = '';
	};
	veil.addEventListener('click', (e) => { if (e.target === veil || e.target.classList.contains('modal-x')) closeVideo(); });
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });

	window.AMXXR_playVideo = (ytId, title) => {
		CRM.bump('videoPlays');
		veil.querySelector('#videoModalBody').innerHTML =
			`<iframe class="vid-frame" src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0" title="${title || 'AMXXR video'}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
		veil.classList.add('open');
	};

	/* Delegate clicks on any element with data-yt */
	document.addEventListener('click', (e) => {
		const t = e.target.closest('[data-yt]');
		if (t) window.AMXXR_playVideo(t.dataset.yt, t.dataset.title);
	});

	/* ---------------- Helpers shared by pages ---------------- */
	window.AMXXR_ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
	window.AMXXR_fmtDate = (iso) => {
		const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	};
})();
