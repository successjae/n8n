'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, SITE } from '@/lib/data';

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
				scrolled ? 'glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]' : 'bg-transparent'
			}`}
		>
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
				aria-label="Main navigation"
			>
				<a href="#home" className="group flex items-center gap-2.5" aria-label="Success Jae home">
					<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 font-display text-sm font-bold text-ink-950 shadow-[0_0_20px_-4px_rgba(212,169,78,0.6)]">
						SJ
					</span>
					<span className="font-display text-lg font-bold tracking-tight text-white">
						Success<span className="text-gradient-gold">Jae</span>
					</span>
				</a>

				<ul className="hidden items-center gap-7 lg:flex">
					{NAV_LINKS.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-3">
					<a href={SITE.bookCallHref} className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
						Book a Call
					</a>
					<button
						type="button"
						className="glass flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
						aria-expanded={menuOpen}
						aria-label={menuOpen ? 'Close menu' : 'Open menu'}
						onClick={() => setMenuOpen((open) => !open)}
					>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
							{menuOpen ? (
								<path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
							) : (
								<path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
							)}
						</svg>
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{menuOpen ? (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25 }}
						className="glass overflow-hidden border-t-0 lg:hidden"
					>
						<ul className="space-y-1 px-5 pb-5 pt-2">
							{NAV_LINKS.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										onClick={() => setMenuOpen(false)}
										className="block rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
									>
										{link.label}
									</a>
								</li>
							))}
							<li className="pt-2">
								<a
									href={SITE.bookCallHref}
									onClick={() => setMenuOpen(false)}
									className="btn-primary w-full"
								>
									Book a Call
								</a>
							</li>
						</ul>
					</motion.div>
				) : null}
			</AnimatePresence>
		</header>
	);
}
