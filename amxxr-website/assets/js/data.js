/* ============================================================
   AMXXR — Site Content Layer (acts as the CMS source of truth)
   Edit this file (or override via the Admin > Content panel,
   which persists overrides to localStorage) to update the site.
   ============================================================ */

window.AMXXR = (() => {
	const SITE = {
		artist: 'AMXXR',
		aka: 'Peace Beloved',
		hometown: 'Mount Vernon, NY',
		label: 'Tru Soul Records',
		tagline: 'SOUL HEAVY. CITY RAISED. PEACE BELOVED.',
		socials: {
			instagram: 'https://www.instagram.com/a.m.x.x.r/',
			spotify: 'https://open.spotify.com/artist/1agA5fqFnuIeibCsM2t4iR',
			appleMusic: 'https://music.apple.com/us/artist/amxxr/1256007782',
			bandcamp: 'https://amxxr.bandcamp.com/',
			soundcloud: 'https://soundcloud.com/peaceblvd',
			tidal: 'https://tidal.com/browse/artist/8910665',
			deezer: 'https://www.deezer.com/en/artist/12904541',
			youtube: 'https://www.youtube.com/results?search_query=AMXXR+Pete+Rock',
		},
		contacts: {
			booking: 'booking@amxxr.com',
			sponsors: 'partners@amxxr.com',
			press: 'press@amxxr.com',
			management: 'mgmt@amxxr.com',
		},
		spotifyArtistId: '1agA5fqFnuIeibCsM2t4iR',
	};

	const ANNOUNCEMENTS = [
		{
			id: 'a1',
			date: '2026-06-01',
			tag: 'NEW DROP',
			title: 'THE CITY NEVER SLEEPS BELOVED — out everywhere now',
			body: 'The latest full-length is live on all platforms. Stream it, buy it on Bandcamp, and grab the limited drop in the shop.',
			link: 'music.html',
			cta: 'Listen Now',
		},
		{
			id: 'a2',
			date: '2026-05-20',
			tag: 'MERCH',
			title: 'BELOVED Capsule 002 — limited run live in the shop',
			body: 'Numbered run. When it sells out, it never comes back. VIP fan club members got 48-hour early access.',
			link: 'merch.html',
			cta: 'Shop the Drop',
		},
		{
			id: 'a3',
			date: '2026-05-05',
			tag: 'FAN CLUB',
			title: 'The BELOVED list is open',
			body: 'Unreleased records, first looks at drops, city-by-city show alerts. Free to join, VIP if you want everything.',
			link: 'fanclub.html',
			cta: 'Join the Fan List',
		},
	];

	const RELEASES = [
		{
			id: 'r1',
			title: 'THE CITY NEVER SLEEPS BELOVED',
			type: 'Album',
			year: 2024,
			blurb: 'The city after midnight: hunger, grief, faith and victory laps. AMXXR at his sharpest over heavyweight soul.',
			buy: 'https://amxxr.bandcamp.com/album/the-city-never-sleeps-beloved',
			stream: SITE.socials.spotify,
			accent: '#e0a73c',
			featured: true,
		},
		{
			id: 'r2',
			title: 'BELOVED IN THE SKY',
			type: 'Album',
			year: 2022,
			blurb: 'A meditation on loss and elevation — dedicated to the loved ones watching from above.',
			buy: 'https://amxxr.bandcamp.com/album/beloved-in-the-sky',
			stream: SITE.socials.spotify,
			accent: '#7ea8d8',
			featured: false,
		},
		{
			id: 'r3',
			title: 'DOPE BOY SOUL',
			type: 'Album · prod. Pete Rock',
			year: 2021,
			blurb: 'The full-length statement with the Soul Brother #1. Mount Vernon lineage, modern testimony.',
			buy: 'https://amxxr.bandcamp.com/',
			stream: SITE.socials.spotify,
			accent: '#d94f30',
			featured: true,
		},
		{
			id: 'r4',
			title: "21 GRAMS: WORTH IT'S WEIGHT IN SOUL",
			type: 'Mixtape · prod. Pete Rock',
			year: 2021,
			blurb: 'The introduction — every beat by Pete Rock, every bar by AMXXR. The tape that started Tru Soul Records.',
			buy: 'https://amxxr.bandcamp.com/album/21-grams-worth-its-weight-in-soul',
			stream: SITE.socials.spotify,
			accent: '#b88ae0',
			featured: false,
		},
	];

	/* YouTube IDs are real public uploads featuring AMXXR. */
	const VIDEOS = [
		{
			id: 'Q4N3EWDBZdw',
			title: "IT'S OK — Pete Rock & AMXXR",
			category: 'official',
			featured: true,
			blurb: "Official video from '21 Grams: Worth It's Weight In Soul.'",
		},
		{
			id: 'kPzfN4ROm9Y',
			title: 'FRIED HARD — Pete Rock & AMXXR',
			category: 'official',
			featured: true,
			blurb: 'Official video. Soul chops and street scripture.',
		},
		{
			id: 'X8MRCKBtrNM',
			title: 'BULLRAP — Pete Rock & AMXXR',
			category: 'official',
			featured: true,
			blurb: 'Official video. No filler, all facts.',
		},
		{
			id: '9oVZ-M_ooBI',
			title: 'I SWEAR — AMXXR',
			category: 'official',
			featured: false,
			blurb: 'Visual for I Swear.',
		},
		{
			id: 'LvkNTZvkzBA',
			title: 'SUPER STAR — AMXXR (prod. Pete Rock)',
			category: 'performance',
			featured: false,
			blurb: 'Performance visual over a Pete Rock instrumental.',
		},
		{
			id: '7Duzt1Vn5bY',
			title: 'PETE ROCK presents PEACE BELOVED',
			category: 'bts',
			featured: true,
			blurb: 'Inside the Tru Soul sessions — the story behind Peace Beloved.',
		},
		{
			id: '7i1ZnTlmRVU',
			title: 'PEACE BELOVED',
			category: 'bts',
			featured: false,
			blurb: 'Peace Beloved — the alias, the mission.',
		},
		{
			id: 'J0BamQkCsTc',
			title: "The Pete Rock & AMXXR Interview — 'Dope Boy Soul'",
			category: 'interview',
			featured: true,
			blurb: 'On the new album, longevity, the Tracklib competition and more.',
		},
		{
			id: 'j9P-1LQ7lBs',
			title: 'Imperfect Sense talks new music & album with AMXXR',
			category: 'interview',
			featured: false,
			blurb: 'Conversation on Pete Rock, Heavy D, CL Smooth and the new record.',
		},
		{
			id: 'h-pXHNVLMEQ',
			title: "21 GRAMS: Worth It's Weight In Soul (Full Album Stream)",
			category: 'official',
			featured: false,
			blurb: 'The full 21 Grams tape, front to back.',
		},
	];

	const VIDEO_CATEGORIES = [
		{ key: 'all', label: 'All' },
		{ key: 'official', label: 'Official Videos' },
		{ key: 'performance', label: 'Performances' },
		{ key: 'interview', label: 'Interviews' },
		{ key: 'bts', label: 'Behind the Scenes' },
	];

	const PRODUCTS = [
		{
			id: 'p1',
			name: 'BELOVED Heavyweight Tee',
			price: 40,
			category: 'apparel',
			sizes: ['S', 'M', 'L', 'XL', '2XL'],
			stock: 120,
			drop: false,
			featured: true,
			desc: '8oz heavyweight cotton, oversized fit. Cracked-gold BELOVED print front, Mount Vernon coordinates on the back.',
			palette: ['#e0a73c', '#15120d'],
		},
		{
			id: 'p2',
			name: 'CITY NEVER SLEEPS Hoodie',
			price: 85,
			category: 'apparel',
			sizes: ['S', 'M', 'L', 'XL', '2XL'],
			stock: 60,
			drop: false,
			featured: true,
			desc: '450gsm fleece, garment-dyed black. Embroidered AMXXR chest hit, skyline print across the hood.',
			palette: ['#d94f30', '#100e0c'],
		},
		{
			id: 'p3',
			name: 'TRU SOUL Fitted Cap',
			price: 38,
			category: 'apparel',
			sizes: ['7', '7 1/4', '7 1/2', '7 3/4'],
			stock: 80,
			drop: false,
			featured: false,
			desc: 'Wool-blend fitted with raised AMXXR embroidery and soul-gold underbrim.',
			palette: ['#b88ae0', '#14101a'],
		},
		{
			id: 'p4',
			name: '21 GRAMS Archive Poster',
			price: 25,
			category: 'print',
			sizes: ['18x24', '24x36'],
			stock: 200,
			drop: false,
			featured: false,
			desc: 'Museum-grade matte print of the 21 Grams era artwork. Ships rolled in a protective tube.',
			palette: ['#7ea8d8', '#0d1015'],
		},
		{
			id: 'p5',
			name: 'BELOVED Capsule 002 — Limited Drop',
			price: 150,
			category: 'drop',
			sizes: ['S', 'M', 'L', 'XL'],
			stock: 14,
			drop: true,
			dropEnds: '2026-07-01T00:00:00',
			featured: true,
			desc: 'Numbered run of 50. Coaches jacket with chain-stitch BELOVED script, signed numbered card inside every order. Never reprinted.',
			palette: ['#e0a73c', '#1a0f0a'],
		},
		{
			id: 'p6',
			name: 'DOPE BOY SOUL — Digital Deluxe',
			price: 15,
			category: 'digital',
			sizes: null,
			stock: 9999,
			drop: false,
			featured: false,
			desc: '24-bit masters, two unreleased sessions, digital booklet with handwritten lyrics. Instant download after checkout.',
			palette: ['#d94f30', '#120c0a'],
		},
		{
			id: 'p7',
			name: 'SOUL BUNDLE — Hoodie + Digital Album',
			price: 92,
			category: 'bundle',
			sizes: ['S', 'M', 'L', 'XL', '2XL'],
			stock: 40,
			drop: false,
			featured: true,
			desc: 'CITY NEVER SLEEPS hoodie plus the Dope Boy Soul digital deluxe. Save $8 versus buying separately.',
			palette: ['#e0a73c', '#0f0d0a'],
		},
		{
			id: 'p8',
			name: 'PEACE BELOVED Tour Tee (Pre-Order)',
			price: 45,
			category: 'apparel',
			sizes: ['S', 'M', 'L', 'XL', '2XL'],
			stock: 150,
			drop: false,
			preorder: true,
			featured: false,
			desc: 'Pre-order the official tour tee — city dates printed on the back. Ships ahead of the first show.',
			palette: ['#7ea8d8', '#0c0f12'],
		},
	];

	const PROMO_CODES = {
		BELOVED10: { type: 'percent', value: 10, label: '10% off — fan list welcome code' },
		VIPSOUL: { type: 'percent', value: 20, label: '20% off — VIP members' },
		CITYFREESHIP: { type: 'shipping', value: 0, label: 'Free shipping' },
	};

	const EVENTS = [
		{
			id: 'e1',
			date: '2026-07-18',
			city: 'New York, NY',
			venue: 'SOB’s',
			name: 'THE CITY NEVER SLEEPS — Album Show',
			tickets: '#',
			status: 'upcoming',
			note: 'Full live band. Limited capacity.',
		},
		{
			id: 'e2',
			date: '2026-08-02',
			city: 'Mount Vernon, NY',
			venue: 'Memorial Field',
			name: 'Hometown Day — Free Community Show',
			tickets: '#',
			status: 'upcoming',
			note: 'Free with RSVP. Family welcome.',
		},
		{
			id: 'e3',
			date: '2026-09-12',
			city: 'Brooklyn, NY',
			venue: 'TBA',
			name: 'BELOVED Listening Experience',
			tickets: '#',
			status: 'upcoming',
			note: 'VIP fan club presale first.',
		},
		{
			id: 'e4',
			date: '2024-11-15',
			city: 'New York, NY',
			venue: 'City Winery',
			name: 'Tru Soul Showcase w/ Pete Rock',
			tickets: null,
			status: 'past',
			note: 'Sold out.',
		},
		{
			id: 'e5',
			date: '2022-06-25',
			city: 'Harlem, NY',
			venue: 'Uptown Block Party',
			name: 'Beloved In The Sky — Release Set',
			tickets: null,
			status: 'past',
			note: '',
		},
	];

	const SPONSORS = [
		{
			id: 's1',
			name: 'Tru Soul Records',
			role: 'Label',
			blurb: "Pete Rock's imprint — AMXXR was the first artist signed. Home of 21 Grams and Dope Boy Soul.",
			link: 'https://amxxr.bandcamp.com/',
			tier: 'partner',
		},
		{
			id: 's2',
			name: 'Threesixty Entertainment',
			role: 'Management / Booking',
			blurb: 'Representation and live booking for AMXXR worldwide.',
			link: 'https://www.threesixty-entertainment.com/artist/amxxr',
			tier: 'partner',
		},
		{
			id: 's3',
			name: 'Your Brand Here',
			role: 'Presenting Sponsor',
			blurb: 'Premium placement across the site, tour assets and video content. Serious inquiries only.',
			link: 'sponsors.html#inquiry',
			tier: 'open',
		},
	];

	const PRESS_QUOTES = [
		{
			quote: 'It’s like a marriage with his lyrics and my beats; it is very impressive.',
			source: 'Pete Rock',
			context: 'on working with AMXXR, comparing it to his legendary 90s run with C.L. Smooth',
		},
		{
			quote: 'Distinct flow, clever wordplay, and thought-provoking storytelling.',
			source: 'Press',
			context: 'on the 21 Grams era',
		},
	];

	const TIMELINE = [
		{ year: 'Roots', text: 'Raised in Mount Vernon, NY — the same soil that produced Heavy D, Pete Rock and a lineage of soul-rooted hip-hop.' },
		{ year: '2021', text: "Becomes the first artist signed to Pete Rock's Tru Soul Records. Releases the mixtape '21 Grams: Worth It's Weight In Soul,' produced entirely by Pete Rock." },
		{ year: '2021', text: "Follows with the full-length 'Dope Boy Soul' — again all-Pete Rock production. Official videos for IT'S OK, FRIED HARD and more." },
		{ year: '2022', text: "Releases 'Beloved In The Sky,' deepening the Peace Beloved alias and message." },
		{ year: '2024', text: "Drops 'THE CITY NEVER SLEEPS BELOVED' — the most complete AMXXR statement to date." },
		{ year: 'Now', text: 'Building the BELOVED movement: live shows, limited drops, and a direct line to the fans who carry the music.' },
	];

	/* ---------- localStorage-backed overrides (lightweight CMS) ---------- */
	const LS_KEY = 'amxxr_content_overrides';
	function withOverrides(key, fallback) {
		try {
			const raw = localStorage.getItem(LS_KEY);
			if (!raw) return fallback;
			const o = JSON.parse(raw);
			return Array.isArray(o[key]) && o[key].length ? o[key] : fallback;
		} catch {
			return fallback;
		}
	}

	return {
		SITE,
		get ANNOUNCEMENTS() { return withOverrides('announcements', ANNOUNCEMENTS); },
		get RELEASES() { return withOverrides('releases', RELEASES); },
		get VIDEOS() { return withOverrides('videos', VIDEOS); },
		VIDEO_CATEGORIES,
		get PRODUCTS() { return withOverrides('products', PRODUCTS); },
		PROMO_CODES,
		get EVENTS() { return withOverrides('events', EVENTS); },
		get SPONSORS() { return withOverrides('sponsors', SPONSORS); },
		PRESS_QUOTES,
		TIMELINE,
		LS_KEY,
	};
})();
