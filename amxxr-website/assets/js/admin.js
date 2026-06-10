/* ============================================================
   AMXXR — Team Dashboard (CRM + commerce + analytics + CMS)

   Data lives in localStorage so the demo is fully functional
   offline. Every read/write goes through DB.* — to move to a
   real backend (Supabase/Postgres/Airtable), reimplement DB
   against your API and nothing else changes.

   ⚠ The login below is a DEMO GATE, not security. Anything in
   client-side JS is public. Before launch, put this behind real
   authentication (see README "Going to production").
   ============================================================ */

(() => {
	const A = window.AMXXR;
	const KEYS = {
		fans: 'amxxr_fans',
		orders: 'amxxr_orders',
		metrics: 'amxxr_metrics',
		campaigns: 'amxxr_campaigns',
		session: 'amxxr_admin_session',
	};

	/* ---------------- data access ---------------- */
	const DB = {
		get(k, fallback) {
			try { return JSON.parse(localStorage.getItem(KEYS[k])) ?? fallback; }
			catch { return fallback; }
		},
		set(k, v) { localStorage.setItem(KEYS[k], JSON.stringify(v)); },
	};
	const fans = () => DB.get('fans', []);
	const orders = () => DB.get('orders', []);
	const metrics = () => DB.get('metrics', {});

	/* ---------------- demo seed ---------------- */
	function seed() {
		if (fans().length) return;
		const cities = [['Mount Vernon', 'NY'], ['Bronx', 'NY'], ['Brooklyn', 'NY'], ['Harlem', 'NY'], ['Yonkers', 'NY'], ['Newark', 'NJ'], ['Atlanta', 'GA'], ['Chicago', 'IL'], ['Los Angeles', 'CA'], ['London', 'UK']];
		const sources = ['website', 'merch purchase', 'event', 'giveaway', 'music download', 'fan club', 'instagram'];
		const first = ['Marcus', 'Aisha', 'Devon', 'Tanya', 'Jerome', 'Keisha', 'Andre', 'Maya', 'Theo', 'Imani', 'Carlos', 'Nia', 'Rashad', 'Simone', 'Victor', 'Dana', 'Omar', 'Lena', 'Quincy', 'Zoe', 'Malik', 'Erin', 'Hassan', 'Paula'];
		const last = ['Rivers', 'Cole', 'Bryant', 'Okafor', 'Diaz', 'Hill', 'James', 'Wright', 'Mensah', 'Lopez', 'Carter', 'Banks'];
		const seeded = first.map((f, i) => {
			const [city, state] = cities[i % cities.length];
			const source = sources[i % sources.length];
			const vip = i % 5 === 0;
			const buyer = i % 3 === 0;
			const tags = [];
			if (vip) tags.push('fanclub');
			if (buyer) tags.push('buyer');
			if (i % 4 === 0) tags.push('sms');
			if (i % 6 === 0) tags.push('street-team');
			if (i % 7 === 0) tags.push('high-engagement');
			if (source === 'music download') tags.push('download');
			const joined = new Date(Date.now() - (i + 2) * 5 * 864e5).toISOString();
			return {
				id: 'f_seed' + i,
				name: `${f} ${last[i % last.length]}`,
				email: `${f.toLowerCase()}.${last[i % last.length].toLowerCase()}@example.com`,
				phone: i % 4 === 0 ? `+1 914 555 0${(100 + i)}` : '',
				city, state, country: state === 'UK' ? 'UK' : 'USA',
				social: i % 3 === 0 ? `@${f.toLowerCase()}_blvd` : '',
				source, tags, vip,
				purchases: buyer ? [{ orderId: 'o_seed' + i, total: [40, 85, 150][i % 3], date: joined }] : [],
				downloads: source === 'music download' ? [{ track: 'The Vault Session', date: joined }] : [],
				notes: i === 0 ? 'Day-one supporter — front row at every NY show.' : '',
				joined, lastSeen: joined,
			};
		});
		DB.set('fans', seeded);
		if (!orders().length) {
			DB.set('orders', seeded.filter((f) => f.purchases.length).map((f, i) => ({
				id: f.purchases[0].orderId,
				date: f.purchases[0].date,
				email: f.email, name: f.name,
				items: [{ product: ['BELOVED Heavyweight Tee', 'CITY NEVER SLEEPS Hoodie', 'BELOVED Capsule 002 — Limited Drop'][i % 3], qty: 1, price: f.purchases[0].total }],
				promo: i % 4 === 0 ? 'BELOVED10' : null,
				total: f.purchases[0].total,
				status: 'fulfilled',
			})));
		}
		const m = metrics();
		DB.set('metrics', Object.assign({ pageviews: 1842, videoPlays: 312, musicLinkClicks: 268, emailSignups: 24, smsSignups: 6, sponsorClicks: 31, mediaKitDownloads: 9, orders: 8 }, m));
	}

	/* ---------------- auth (demo) ---------------- */
	const ROLES = {
		admin: ['overview', 'fans', 'orders', 'downloads', 'vip', 'sponsors', 'content', 'events', 'campaigns', 'analytics', 'settings'],
		manager: ['overview', 'fans', 'orders', 'downloads', 'vip', 'events', 'campaigns', 'analytics'],
		content: ['overview', 'content', 'events'],
	};
	const session = () => {
		try { return JSON.parse(sessionStorage.getItem(KEYS.session)); } catch { return null; }
	};

	document.getElementById('loginForm').addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		if (fd.get('user') === 'team' && fd.get('pass') === 'beloved') {
			sessionStorage.setItem(KEYS.session, JSON.stringify({ user: 'team', role: fd.get('role') }));
			boot();
		} else {
			const err = document.getElementById('loginErr');
			err.innerHTML = '<span style="color:var(--crimson)">Invalid credentials.</span> Demo: <strong>team / beloved</strong>';
		}
	});
	document.getElementById('logoutBtn').addEventListener('click', () => {
		sessionStorage.removeItem(KEYS.session);
		location.reload();
	});

	/* ---------------- shell ---------------- */
	const VIEWS = [
		['overview', '◆ Overview'],
		['fans', '👥 Fans & Followers'],
		['orders', '🛒 Merch Orders'],
		['downloads', '⬇ Music Downloads'],
		['vip', '★ VIP Members'],
		['sponsors', '🤝 Sponsors'],
		['content', '✎ Content Library'],
		['events', '📍 Events'],
		['campaigns', '✉ Email / SMS'],
		['analytics', '📈 Analytics'],
		['settings', '⚙ Settings'],
	];
	const main = document.getElementById('main');
	let current = 'overview';

	function boot() {
		const s = session();
		if (!s) return;
		seed();
		document.getElementById('loginStage').style.display = 'none';
		document.getElementById('shell').classList.add('authed');
		document.getElementById('whoami').textContent = `Signed in: ${s.user} (${s.role})`;
		const allowed = ROLES[s.role] || ROLES.admin;
		document.getElementById('sideNav').innerHTML = VIEWS
			.filter(([k]) => allowed.includes(k))
			.map(([k, l]) => `<button data-view="${k}">${l}</button>`).join('');
		document.getElementById('sideNav').addEventListener('click', (e) => {
			const b = e.target.closest('[data-view]');
			if (b) show(b.dataset.view);
		});
		show(allowed[0]);
	}

	function show(view) {
		current = view;
		document.querySelectorAll('#sideNav button').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
		RENDER[view]();
	}

	/* ---------------- shared bits ---------------- */
	const money = (n) => '$' + Number(n).toFixed(2);
	const fmtD = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
	const pillColor = (t) => ({ buyer: 'crimson', fanclub: 'gold', sms: 'sky', 'street-team': 'violet', download: 'sky', 'sponsor-lead': 'gold', 'high-engagement': 'crimson' }[t] || '');

	function head(title, sub, actions = '') {
		return `<div class="main-head"><div><h1>${title}</h1><div class="sub">${sub}</div></div><div style="display:flex;gap:10px;flex-wrap:wrap">${actions}</div></div>`;
	}
	function kpi(v, k, cls = '') { return `<div class="kpi ${cls}"><div class="v">${v}</div><div class="k">${k}</div></div>`; }
	function bars(rows, max) {
		const m = max || Math.max(1, ...rows.map((r) => r[1]));
		return rows.map(([l, v]) => `<div class="bar-row"><span class="lbl">${esc(l)}</span><span class="bar"><i style="width:${Math.round((v / m) * 100)}%"></i></span><span class="num">${v}</span></div>`).join('');
	}
	function csvExport(rows, name) {
		const csv = rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
		a.download = name;
		a.click();
	}

	/* modal */
	const modalVeil = document.createElement('div');
	modalVeil.className = 'modal-veil';
	modalVeil.innerHTML = '<div class="modal"><button class="modal-x" aria-label="Close">×</button><div id="adminModalBody"></div></div>';
	document.body.appendChild(modalVeil);
	modalVeil.addEventListener('click', (e) => { if (e.target === modalVeil || e.target.classList.contains('modal-x')) modalVeil.classList.remove('open'); });
	const openModal = (html) => { modalVeil.querySelector('#adminModalBody').innerHTML = html; modalVeil.classList.add('open'); };

	/* ---------------- views ---------------- */
	const SEGMENTS = [
		['all', 'All fans'],
		['vip', 'VIP Fans'],
		['buyer', 'Merch Buyers'],
		['local', 'Local Fans (NY)'],
		['high-engagement', 'High Engagement'],
		['sms', 'SMS List'],
		['download', 'Music Downloaders'],
		['sponsor-lead', 'Sponsors'],
		['media-contact', 'Media Contacts'],
		['booking-lead', 'Booking Leads'],
		['street-team', 'Street Team'],
		['rsvp', 'Event RSVPs'],
	];
	function segmentFilter(list, seg) {
		if (seg === 'all') return list;
		if (seg === 'vip') return list.filter((f) => f.vip);
		if (seg === 'local') return list.filter((f) => f.state === 'NY');
		return list.filter((f) => (f.tags || []).includes(seg));
	}

	const RENDER = {
		overview() {
			const f = fans(), o = orders(), m = metrics();
			const revenue = o.reduce((s, x) => s + x.total, 0);
			const recent = [...f].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 6);
			main.innerHTML = head('Overview', 'The state of the BELOVED movement, live.') +
				`<div class="kpis">
					${kpi(f.length, 'Total fans')}
					${kpi(f.filter((x) => x.vip).length, 'VIP members', 'crimson')}
					${kpi(o.length, 'Orders')}
					${kpi(money(revenue), 'Merch revenue', 'crimson')}
					${kpi(m.pageviews || 0, 'Page views', 'sky')}
					${kpi(m.videoPlays || 0, 'Video plays', 'violet')}
				</div>
				<div class="charts">
					<div class="chartbox"><h3>Fans by source</h3>${bars(countBy(f, (x) => x.source))}</div>
					<div class="chartbox"><h3>Latest signups</h3>
						${recent.map((x) => `<div class="bar-row" style="grid-template-columns:1fr auto"><span class="lbl"><strong style="color:var(--cream)">${esc(x.name) || esc(x.email)}</strong> · ${esc(x.city) || '—'}</span><span class="num" style="font-weight:400;color:var(--cream-faint)">${fmtD(x.joined)}</span></div>`).join('')}
					</div>
				</div>`;
		},

		fans(presetSeg = 'all') {
			const m = metrics();
			main.innerHTML = head('Fans & Followers', 'Search, segment, tag and export the whole fan base.',
				'<button class="btn btn-sm" id="exportFans">Export CSV</button><button class="btn btn-sm btn-ghost" id="addFan">+ Add fan</button>') +
				`<div class="kpis">
					${kpi(fans().length, 'Records')}
					${kpi(m.emailSignups || 0, 'Email signups')}
					${kpi(m.smsSignups || 0, 'SMS signups', 'sky')}
				</div>
				<div class="seg-chip-row">${SEGMENTS.map(([k, l]) => `<button class="chip ${k === presetSeg ? 'active' : ''}" data-seg="${k}">${l}</button>`).join('')}</div>
				<div class="tablebox">
					<div class="toolbar">
						<input type="search" id="fanSearch" placeholder="Search name, email, city, tag…">
						<select id="fanSource"><option value="">All sources</option>${[...new Set(fans().map((f) => f.source))].map((s) => `<option>${esc(s)}</option>`).join('')}</select>
					</div>
					<div class="tbl-scroll"><table id="fanTable"></table></div>
				</div>`;

			let seg = presetSeg;
			const draw = () => {
				const q = document.getElementById('fanSearch').value.toLowerCase();
				const src = document.getElementById('fanSource').value;
				let list = segmentFilter(fans(), seg);
				if (src) list = list.filter((f) => f.source === src);
				if (q) list = list.filter((f) => [f.name, f.email, f.city, f.state, f.social, (f.tags || []).join(' ')].join(' ').toLowerCase().includes(q));
				document.getElementById('fanTable').innerHTML =
					'<tr><th>Fan</th><th>Location</th><th>Source</th><th>Tags</th><th>Spent</th><th>Joined</th><th></th></tr>' +
					(list.map((f) => `<tr>
						<td><div class="name">${esc(f.name) || '—'} ${f.vip ? '<span class="pill gold">VIP</span>' : ''}</div><div class="sub">${esc(f.email)}${f.phone ? ' · ' + esc(f.phone) : ''}</div></td>
						<td>${esc(f.city)}${f.state ? ', ' + esc(f.state) : ''}</td>
						<td>${esc(f.source)}</td>
						<td>${(f.tags || []).map((t) => `<span class="pill ${pillColor(t)}">${esc(t)}</span>`).join('')}</td>
						<td>${money((f.purchases || []).reduce((s, p) => s + p.total, 0))}</td>
						<td>${fmtD(f.joined)}</td>
						<td><button class="rowbtn" data-fan="${f.id}">Open</button></td>
					</tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--cream-faint);padding:30px">No fans match.</td></tr>');
			};
			main.querySelector('.seg-chip-row').addEventListener('click', (e) => {
				const b = e.target.closest('[data-seg]');
				if (!b) return;
				seg = b.dataset.seg;
				main.querySelectorAll('[data-seg]').forEach((c) => c.classList.toggle('active', c === b));
				draw();
			});
			document.getElementById('fanSearch').addEventListener('input', draw);
			document.getElementById('fanSource').addEventListener('change', draw);
			document.getElementById('fanTable').addEventListener('click', (e) => {
				const b = e.target.closest('[data-fan]');
				if (b) fanDetail(b.dataset.fan, draw);
			});
			document.getElementById('exportFans').addEventListener('click', () => {
				const list = segmentFilter(fans(), seg);
				csvExport([
					['id', 'name', 'email', 'phone', 'city', 'state', 'country', 'social', 'source', 'tags', 'vip', 'total_spent', 'downloads', 'joined', 'notes'],
					...list.map((f) => [f.id, f.name, f.email, f.phone, f.city, f.state, f.country, f.social, f.source, (f.tags || []).join('|'), f.vip ? 'yes' : 'no', (f.purchases || []).reduce((s, p) => s + p.total, 0), (f.downloads || []).length, f.joined, f.notes]),
				], `amxxr-fans-${seg}.csv`);
			});
			document.getElementById('addFan').addEventListener('click', () => {
				openModal(`<h2 style="font-size:1.5rem;margin-bottom:18px">Add fan manually</h2>
					<form id="manualFan">
						<div class="grid grid-2" style="gap:12px">
							<div class="field"><label>Name</label><input name="name"></div>
							<div class="field"><label>Email *</label><input type="email" name="email" required></div>
							<div class="field"><label>Phone</label><input name="phone"></div>
							<div class="field"><label>City</label><input name="city"></div>
							<div class="field"><label>Source</label><input name="source" value="manual"></div>
							<div class="field"><label>Tags (comma separated)</label><input name="tags" placeholder="street-team, media-contact"></div>
						</div>
						<button class="btn btn-solid" style="width:100%">Save fan</button>
					</form>`);
				document.getElementById('manualFan').addEventListener('submit', (e) => {
					e.preventDefault();
					const fd = new FormData(e.target);
					const list = fans();
					list.push({
						id: 'f_' + Date.now().toString(36), name: fd.get('name'), email: fd.get('email'),
						phone: fd.get('phone'), city: fd.get('city'), state: '', country: '', social: '',
						source: fd.get('source') || 'manual',
						tags: String(fd.get('tags') || '').split(',').map((t) => t.trim()).filter(Boolean),
						vip: false, purchases: [], downloads: [], notes: '',
						joined: new Date().toISOString(), lastSeen: new Date().toISOString(),
					});
					DB.set('fans', list);
					modalVeil.classList.remove('open');
					draw();
				});
			});
			draw();
		},

		orders() {
			const o = [...orders()].sort((a, b) => b.date.localeCompare(a.date));
			const revenue = o.reduce((s, x) => s + x.total, 0);
			main.innerHTML = head('Merch Orders', 'Every order, every promo code, every dollar.',
				'<button class="btn btn-sm" id="exportOrders">Export CSV</button>') +
				`<div class="kpis">
					${kpi(o.length, 'Orders')}
					${kpi(money(revenue), 'Revenue', 'crimson')}
					${kpi(o.length ? money(revenue / o.length) : '$0.00', 'Avg order value')}
				</div>
				<div class="tablebox"><div class="tbl-scroll"><table>
					<tr><th>Order</th><th>Customer</th><th>Items</th><th>Promo</th><th>Total</th><th>Status</th><th>Date</th></tr>
					${o.map((x) => `<tr>
						<td class="name">${esc(x.id).toUpperCase()}</td>
						<td><div class="name">${esc(x.name)}</div><div class="sub">${esc(x.email)}</div></td>
						<td>${x.items.map((i) => `${i.qty}× ${esc(i.product)}${i.size ? ' (' + esc(i.size) + ')' : ''}`).join('<br>')}</td>
						<td>${x.promo ? `<span class="pill gold">${esc(x.promo)}</span>` : '—'}</td>
						<td style="color:var(--gold);font-weight:700">${money(x.total)}</td>
						<td><span class="pill ${x.status.includes('paid') ? 'sky' : 'gold'}">${esc(x.status)}</span></td>
						<td>${fmtD(x.date)}</td>
					</tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--cream-faint);padding:30px">No orders yet.</td></tr>'}
				</table></div></div>`;
			document.getElementById('exportOrders').addEventListener('click', () =>
				csvExport([['id', 'date', 'name', 'email', 'items', 'promo', 'total', 'status'],
					...o.map((x) => [x.id, x.date, x.name, x.email, x.items.map((i) => `${i.qty}x ${i.product}`).join('; '), x.promo, x.total, x.status])], 'amxxr-orders.csv'));
		},

		downloads() {
			const list = fans().filter((f) => (f.tags || []).includes('download') || (f.downloads || []).length);
			main.innerHTML = head('Music Downloads', 'Fans who unlocked gated tracks — your warmest leads for the next release.') +
				`<div class="kpis">${kpi(list.length, 'Downloaders')}${kpi(metrics().musicLinkClicks || 0, 'Music link clicks', 'sky')}</div>
				<div class="tablebox"><div class="tbl-scroll"><table>
					<tr><th>Fan</th><th>Tracks</th><th>Source</th><th>Joined</th></tr>
					${list.map((f) => `<tr>
						<td><div class="name">${esc(f.name) || '—'}</div><div class="sub">${esc(f.email)}</div></td>
						<td>${(f.downloads || []).map((d) => esc(d.track)).join(', ') || 'The Vault Session'}</td>
						<td>${esc(f.source)}</td><td>${fmtD(f.joined)}</td>
					</tr>`).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--cream-faint);padding:30px">No downloads yet.</td></tr>'}
				</table></div></div>`;
		},

		vip() {
			const list = fans().filter((f) => f.vip);
			const mrr = list.length * 7;
			main.innerHTML = head('VIP Members', 'The inner circle — treat them like gold, they are the floor of the business.') +
				`<div class="kpis">${kpi(list.length, 'VIP members')}${kpi(money(mrr) + '/mo', 'Membership revenue', 'crimson')}</div>
				<div class="tablebox"><div class="tbl-scroll"><table>
					<tr><th>Member</th><th>Location</th><th>Spent</th><th>Member since</th><th></th></tr>
					${list.map((f) => `<tr>
						<td><div class="name">${esc(f.name)}</div><div class="sub">${esc(f.email)}</div></td>
						<td>${esc(f.city)}${f.state ? ', ' + esc(f.state) : ''}</td>
						<td>${money((f.purchases || []).reduce((s, p) => s + p.total, 0))}</td>
						<td>${fmtD(f.joined)}</td>
						<td><button class="rowbtn" data-fan="${f.id}">Open</button></td>
					</tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--cream-faint);padding:30px">No VIPs yet — promote the fan club.</td></tr>'}
				</table></div></div>`;
			main.querySelector('.tablebox').addEventListener('click', (e) => {
				const b = e.target.closest('[data-fan]');
				if (b) fanDetail(b.dataset.fan, () => RENDER.vip());
			});
		},

		sponsors() {
			const leads = fans().filter((f) => (f.tags || []).includes('sponsor-lead'));
			main.innerHTML = head('Sponsors & Partners', 'Active partners plus inbound partnership leads from the site.') +
				`<div class="kpis">${kpi(A.SPONSORS.filter((s) => s.tier === 'partner').length, 'Active partners')}${kpi(leads.length, 'Inbound leads', 'crimson')}${kpi(metrics().sponsorClicks || 0, 'Sponsor link clicks', 'sky')}</div>
				<div class="charts" style="margin-bottom:22px">
					${A.SPONSORS.map((s) => `<div class="chartbox"><span class="pill ${s.tier === 'open' ? 'crimson' : 'gold'}">${esc(s.role)}</span><h3 style="margin:10px 0 6px">${esc(s.name)}</h3><p style="font-size:13px;color:var(--cream-dim)">${esc(s.blurb)}</p></div>`).join('')}
				</div>
				<div class="tablebox"><div class="toolbar"><strong style="font-size:13px">Partnership inquiries</strong></div><div class="tbl-scroll"><table>
					<tr><th>Contact</th><th>Brand</th><th>Received</th></tr>
					${leads.map((f) => `<tr><td><div class="name">${esc(f.name)}</div><div class="sub">${esc(f.email)}</div></td><td>${esc(f.social) || '—'}</td><td>${fmtD(f.joined)}</td></tr>`).join('') || '<tr><td colspan="3" style="text-align:center;color:var(--cream-faint);padding:30px">No inbound leads yet.</td></tr>'}
				</table></div></div>`;
		},

		content() {
			const collections = ['announcements', 'releases', 'videos', 'products', 'events', 'sponsors'];
			let overrides = {};
			try { overrides = JSON.parse(localStorage.getItem(A.LS_KEY)) || {}; } catch { /* noop */ }
			main.innerHTML = head('Content Library', 'Edit what the public site shows. Saved overrides apply instantly; Reset returns to the defaults shipped in data.js.') +
				`<div class="charts" id="contentPanels" style="grid-template-columns:1fr">
				${collections.map((c) => `
					<div class="chartbox">
						<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
							<h3 style="margin:0;text-transform:capitalize">${c} ${overrides[c] ? '<span class="pill gold">overridden</span>' : '<span class="pill">default</span>'}</h3>
							<div style="display:flex;gap:8px">
								<button class="rowbtn" data-save="${c}">Save</button>
								<button class="rowbtn" data-reset="${c}">Reset</button>
							</div>
						</div>
						<textarea data-json="${c}" spellcheck="false" style="width:100%;min-height:180px;background:var(--coal);border:1px solid var(--line);border-radius:10px;color:var(--cream);font-family:monospace;font-size:12px;padding:12px">${esc(JSON.stringify(A[c.toUpperCase()], null, 2))}</textarea>
					</div>`).join('')}
				</div>`;
			document.getElementById('contentPanels').addEventListener('click', (e) => {
				const save = e.target.closest('[data-save]');
				const reset = e.target.closest('[data-reset]');
				if (save) {
					const c = save.dataset.save;
					try {
						const val = JSON.parse(main.querySelector(`[data-json="${c}"]`).value);
						const o = JSON.parse(localStorage.getItem(A.LS_KEY) || '{}');
						o[c] = val;
						localStorage.setItem(A.LS_KEY, JSON.stringify(o));
						RENDER.content();
					} catch { alert('Invalid JSON — fix the syntax and save again.'); }
				}
				if (reset) {
					const o = JSON.parse(localStorage.getItem(A.LS_KEY) || '{}');
					delete o[reset.dataset.reset];
					localStorage.setItem(A.LS_KEY, JSON.stringify(o));
					RENDER.content();
				}
			});
		},

		events() {
			const rsvps = fans().filter((f) => (f.tags || []).some((t) => t.startsWith('event:') || t === 'rsvp'));
			const cityVotes = countBy(fans().filter((f) => (f.tags || []).includes('city-alerts')), (f) => f.city || 'Unknown');
			main.innerHTML = head('Events', 'Shows on the calendar, RSVPs, and which cities are asking loudest.') +
				`<div class="kpis">${kpi(A.EVENTS.filter((e) => e.status === 'upcoming').length, 'Upcoming shows')}${kpi(rsvps.length, 'RSVPs', 'crimson')}</div>
				<div class="charts">
					<div class="chartbox"><h3>Calendar</h3>
						${A.EVENTS.map((ev) => `<div class="bar-row" style="grid-template-columns:90px 1fr auto"><span class="num" style="text-align:left">${fmtD(ev.date)}</span><span class="lbl"><strong style="color:var(--cream)">${esc(ev.name)}</strong> · ${esc(ev.venue)}, ${esc(ev.city)}</span><span class="pill ${ev.status === 'upcoming' ? 'gold' : ''}">${ev.status}</span></div>`).join('')}
					</div>
					<div class="chartbox"><h3>City demand (alert signups)</h3>${bars(cityVotes.length ? cityVotes : [['No city signups yet', 0]])}</div>
				</div>
				<div class="tablebox" style="margin-top:18px"><div class="toolbar"><strong style="font-size:13px">RSVPs</strong></div><div class="tbl-scroll"><table>
					<tr><th>Fan</th><th>Event tag</th><th>Date</th></tr>
					${rsvps.map((f) => `<tr><td><div class="name">${esc(f.name) || '—'}</div><div class="sub">${esc(f.email)}</div></td><td>${(f.tags || []).filter((t) => t.startsWith('event:') || t === 'rsvp').map((t) => `<span class="pill sky">${esc(t)}</span>`).join('')}</td><td>${fmtD(f.joined)}</td></tr>`).join('') || '<tr><td colspan="3" style="text-align:center;color:var(--cream-faint);padding:30px">No RSVPs yet.</td></tr>'}
				</table></div></div>`;
		},

		campaigns() {
			const sent = DB.get('campaigns', []);
			main.innerHTML = head('Email / SMS Campaigns', 'Compose to a segment. In production this hands off to Mailchimp/Klaviyo (email) and Twilio (SMS) — see README.') +
				`<div class="charts">
					<div class="chartbox">
						<h3>New campaign</h3>
						<form id="campForm">
							<div class="field"><label>Channel</label><select name="channel"><option>Email</option><option>SMS</option></select></div>
							<div class="field"><label>Segment</label><select name="segment">${SEGMENTS.map(([k, l]) => `<option value="${k}">${l} (${segmentFilter(fans(), k).length})</option>`).join('')}</select></div>
							<div class="field"><label>Subject / first line</label><input name="subject" required placeholder="The vault opens Friday…"></div>
							<div class="field"><label>Message</label><textarea name="body" required></textarea></div>
							<button class="btn btn-solid" style="width:100%">Queue Campaign</button>
						</form>
					</div>
					<div class="chartbox">
						<h3>Sent / queued</h3>
						${sent.length ? sent.map((c) => `<div class="bar-row" style="grid-template-columns:1fr auto"><span class="lbl"><strong style="color:var(--cream)">${esc(c.subject)}</strong> · ${esc(c.channel)} → ${esc(c.segment)} (${c.recipients})</span><span class="num" style="font-weight:400;color:var(--cream-faint)">${fmtD(c.date)}</span></div>`).join('') : '<p style="color:var(--cream-faint);font-size:13px">Nothing sent yet.</p>'}
					</div>
				</div>`;
			document.getElementById('campForm').addEventListener('submit', (e) => {
				e.preventDefault();
				const fd = new FormData(e.target);
				const seg = fd.get('segment');
				sent.unshift({
					date: new Date().toISOString(), channel: fd.get('channel'), segment: seg,
					subject: fd.get('subject'), body: fd.get('body'),
					recipients: segmentFilter(fans(), seg).length, status: 'queued (demo)',
				});
				DB.set('campaigns', sent);
				RENDER.campaigns();
			});
		},

		analytics() {
			const m = metrics(), f = fans(), o = orders();
			const productSales = countBy(o.flatMap((x) => x.items.map((i) => i.product)), (p) => p);
			const conversion = m.pageviews ? ((o.length / m.pageviews) * 100).toFixed(2) : '0';
			main.innerHTML = head('Analytics', 'On-site behavior tracked locally. Wire GA4 / Meta Pixel / TikTok Pixel for full attribution (see README).') +
				`<div class="kpis">
					${kpi(m.pageviews || 0, 'Page views')}
					${kpi(m.videoPlays || 0, 'Video plays', 'violet')}
					${kpi(m.musicLinkClicks || 0, 'Music link clicks', 'sky')}
					${kpi(m.emailSignups || 0, 'Email signups')}
					${kpi(m.smsSignups || 0, 'SMS signups', 'sky')}
					${kpi(m.sponsorClicks || 0, 'Sponsor clicks')}
					${kpi(m.mediaKitDownloads || 0, 'Media kit downloads', 'violet')}
					${kpi(conversion + '%', 'Visit → order rate', 'crimson')}
				</div>
				<div class="charts">
					<div class="chartbox"><h3>Best-selling products</h3>${bars(productSales.length ? productSales : [['No sales yet', 0]])}</div>
					<div class="chartbox"><h3>Fan locations</h3>${bars(countBy(f, (x) => (x.city ? x.city + (x.state ? ', ' + x.state : '') : 'Unknown')).slice(0, 8))}</div>
					<div class="chartbox"><h3>Signup sources</h3>${bars(countBy(f, (x) => x.source))}</div>
					<div class="chartbox"><h3>Engagement funnel</h3>${bars([
						['Visits', m.pageviews || 0],
						['Video plays', m.videoPlays || 0],
						['Music clicks', m.musicLinkClicks || 0],
						['Fan signups', f.length],
						['Orders', o.length],
					], m.pageviews || 1)}</div>
				</div>`;
		},

		settings() {
			main.innerHTML = head('Settings', 'Data tools and production integration checklist.') +
				`<div class="charts">
					<div class="chartbox">
						<h3>Data</h3>
						<div style="display:flex;flex-direction:column;gap:10px">
							<button class="rowbtn" id="exportAll">Export everything (JSON backup)</button>
							<button class="rowbtn" id="wipeDemo" style="border-color:rgba(217,79,48,.5);color:var(--crimson)">Wipe demo data (fans, orders, metrics)</button>
						</div>
					</div>
					<div class="chartbox">
						<h3>Production checklist</h3>
						<div class="note">
							☐ Replace demo login with real auth (Supabase Auth / Clerk / Auth0)<br>
							☐ Move fan DB from localStorage to Supabase/Postgres<br>
							☐ Connect Stripe Checkout for merch + VIP billing<br>
							☐ Connect Mailchimp/Klaviyo (email) + Twilio (SMS)<br>
							☐ Add GA4, Meta Pixel, TikTok Pixel snippets<br>
							☐ Point amxxr.com DNS at the static host<br>
							<br>Full instructions in <strong>amxxr-website/README.md</strong>.
						</div>
					</div>
				</div>`;
			document.getElementById('exportAll').addEventListener('click', () => {
				const dump = { fans: fans(), orders: orders(), metrics: metrics(), campaigns: DB.get('campaigns', []), contentOverrides: JSON.parse(localStorage.getItem(A.LS_KEY) || '{}') };
				const a = document.createElement('a');
				a.href = URL.createObjectURL(new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' }));
				a.download = 'amxxr-backup.json';
				a.click();
			});
			document.getElementById('wipeDemo').addEventListener('click', () => {
				if (!confirm('Wipe all fans, orders and metrics from this browser?')) return;
				['fans', 'orders', 'metrics', 'campaigns'].forEach((k) => localStorage.removeItem(KEYS[k]));
				seed();
				RENDER.settings();
			});
		},
	};

	/* ---------------- fan detail ---------------- */
	function fanDetail(id, onClose) {
		const list = fans();
		const f = list.find((x) => x.id === id);
		if (!f) return;
		openModal(`
			<span class="pill ${f.vip ? 'gold' : ''}">${f.vip ? 'VIP MEMBER' : 'FAN'}</span>
			<h2 style="font-size:1.7rem;margin:10px 0 4px">${esc(f.name) || esc(f.email)}</h2>
			<div style="color:var(--cream-faint);font-size:13px">${esc(f.email)}${f.phone ? ' · ' + esc(f.phone) : ''}${f.social ? ' · ' + esc(f.social) : ''}</div>
			<dl class="detail-grid">
				<div><dt>Location</dt><dd>${esc(f.city) || '—'}${f.state ? ', ' + esc(f.state) : ''} ${esc(f.country)}</dd></div>
				<div><dt>Source</dt><dd>${esc(f.source)}</dd></div>
				<div><dt>Joined</dt><dd>${fmtD(f.joined)}</dd></div>
				<div><dt>Lifetime spend</dt><dd>${money((f.purchases || []).reduce((s, p) => s + p.total, 0))}</dd></div>
			</dl>
			<dt style="color:var(--cream-faint);font-size:10px;letter-spacing:.16em;text-transform:uppercase">Purchases</dt>
			<div class="note" style="margin:8px 0 14px">${(f.purchases || []).map((p) => `${p.orderId.toUpperCase()} — ${money(p.total)} (${fmtD(p.date)})`).join('<br>') || 'None yet.'}</div>
			<dt style="color:var(--cream-faint);font-size:10px;letter-spacing:.16em;text-transform:uppercase">Downloads</dt>
			<div class="note" style="margin:8px 0 14px">${(f.downloads || []).map((d) => `${esc(d.track)} (${fmtD(d.date)})`).join('<br>') || 'None yet.'}</div>
			<div class="field"><label>Tags (comma separated)</label><input id="fdTags" value="${esc((f.tags || []).join(', '))}"></div>
			<div class="field"><label>Notes</label><textarea id="fdNotes">${esc(f.notes)}</textarea></div>
			<div style="display:flex;gap:10px;flex-wrap:wrap">
				<button class="btn btn-sm btn-solid" id="fdSave">Save</button>
				<button class="btn btn-sm" id="fdVip">${f.vip ? 'Remove VIP' : 'Make VIP'}</button>
				<button class="btn btn-sm btn-crimson" id="fdDelete">Delete fan</button>
			</div>`);
		document.getElementById('fdSave').addEventListener('click', () => {
			f.tags = document.getElementById('fdTags').value.split(',').map((t) => t.trim()).filter(Boolean);
			f.notes = document.getElementById('fdNotes').value;
			DB.set('fans', list);
			modalVeil.classList.remove('open');
			onClose && onClose();
		});
		document.getElementById('fdVip').addEventListener('click', () => {
			f.vip = !f.vip;
			DB.set('fans', list);
			fanDetail(id, onClose);
		});
		document.getElementById('fdDelete').addEventListener('click', () => {
			if (!confirm('Delete this fan record permanently?')) return;
			DB.set('fans', list.filter((x) => x.id !== id));
			modalVeil.classList.remove('open');
			onClose && onClose();
		});
	}

	/* ---------------- utils ---------------- */
	function countBy(list, fn) {
		const map = {};
		list.forEach((x) => { const k = fn(x); map[k] = (map[k] || 0) + 1; });
		return Object.entries(map).sort((a, b) => b[1] - a[1]);
	}

	if (session()) boot();
})();
