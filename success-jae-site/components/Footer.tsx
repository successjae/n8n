import { SITE } from '@/lib/data';

const footerLinks = [
	{ label: 'AI Automation', href: '#ai-solutions' },
	{ label: 'Cloud Solutions', href: '#cloud-systems' },
	{ label: 'Digital Systems', href: '#automation-examples' },
	{ label: 'Connect Hub', href: '#connect-hub' },
	{ label: 'Book a Call', href: '#book' },
];

const socials = [
	{
		label: 'Instagram',
		href: '#', // add Instagram profile URL
		icon: (
			<>
				<rect x="2.5" y="2.5" width="15" height="15" rx="4.5" />
				<circle cx="10" cy="10" r="3.5" />
				<circle cx="14.7" cy="5.3" r="0.9" fill="currentColor" stroke="none" />
			</>
		),
	},
	{
		label: 'YouTube',
		href: '#', // add YouTube channel URL
		icon: (
			<>
				<rect x="1.5" y="4.5" width="17" height="11" rx="3" />
				<path d="M8.5 7.8v4.4l4-2.2-4-2.2Z" fill="currentColor" stroke="none" />
			</>
		),
	},
	{
		label: 'TikTok',
		href: '#', // add TikTok profile URL
		icon: (
			<path d="M12.5 3v8.7a3.4 3.4 0 1 1-3.4-3.4M12.5 3c.3 2.2 1.8 4 4 4.3" strokeLinecap="round" />
		),
	},
	{
		label: 'LinkedIn',
		href: '#', // add LinkedIn profile URL
		icon: (
			<>
				<rect x="2.5" y="2.5" width="15" height="15" rx="2.5" />
				<path d="M6.2 8.5v5m0-7.4v.01M10 13.5v-3a2 2 0 0 1 4 0v3" strokeLinecap="round" />
			</>
		),
	},
];

export default function Footer() {
	return (
		<footer className="border-t border-white/5 bg-ink-950 py-14">
			<div className="mx-auto max-w-7xl px-5 lg:px-8">
				<div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
					<div>
						<a href="#home" className="flex items-center gap-2.5" aria-label="Success Jae home">
							<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 font-display text-sm font-bold text-ink-950">
								SJ
							</span>
							<span className="font-display text-lg font-bold tracking-tight text-white">
								Success<span className="text-gradient-gold">Jae</span>
							</span>
						</a>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
							AI automation, cloud solutions, and digital systems for businesses ready to operate
							smarter.
						</p>
					</div>

					<nav aria-label="Footer">
						<ul className="flex flex-wrap gap-x-7 gap-y-3">
							{footerLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-neutral-400 transition-colors hover:text-gold-300"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div className="flex items-center gap-3">
						{socials.map((social) => (
							<a
								key={social.label}
								href={social.href}
								aria-label={social.label}
								className="glass flex h-10 w-10 items-center justify-center rounded-lg text-neutral-400 transition-all duration-300 hover:border-gold-500/40 hover:text-gold-300"
							>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
									{social.icon}
								</svg>
							</a>
						))}
					</div>
				</div>

				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-neutral-600 sm:flex-row sm:items-center">
					<p>
						© {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
					</p>
					<a href="mailto:hello@successjae.com" className="transition-colors hover:text-gold-300">
						hello@successjae.com {/* contact placeholder — update with real email */}
					</a>
				</div>
			</div>
		</footer>
	);
}
