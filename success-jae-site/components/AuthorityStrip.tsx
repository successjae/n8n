import Reveal from './Reveal';
import { AUTHORITY_ANCHORS } from '@/lib/data';

export default function AuthorityStrip() {
	return (
		<section className="relative border-y border-white/5 bg-ink-900/60 py-12">
			<div className="mx-auto max-w-7xl px-5 lg:px-8">
				<Reveal>
					<p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
						Experience Across Culture, Business, and Technology
					</p>
				</Reveal>
				<Reveal delay={0.15}>
					<ul className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
						{AUTHORITY_ANCHORS.map((name) => (
							<li key={name}>
								<span className="glass inline-flex items-center rounded-xl px-5 py-3 font-display text-sm font-semibold tracking-wide text-neutral-200 transition-all duration-300 hover:border-gold-500/40 hover:text-gold-300 sm:text-base">
									{name}
								</span>
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</section>
	);
}
