import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { AUTOMATION_EXAMPLES, SITE } from '@/lib/data';

export default function AutomationExamples() {
	return (
		<section id="automation-examples" className="relative border-y border-white/5 bg-ink-900/40 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-5 lg:px-8">
				<SectionHeading
					eyebrow="Automation Examples"
					title="What Your Business Can Automate"
					subtitle="Most businesses lose time through repeated manual tasks. The right AI and cloud systems can create faster responses, cleaner handoffs, and better customer experiences."
				/>

				<div className="mt-14 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
					{AUTOMATION_EXAMPLES.map((example, index) => (
						<Reveal key={example} delay={(index % 4) * 0.06} y={18}>
							<div className="glass-card group flex h-full items-center gap-3.5 px-5 py-4">
								<span
									className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-electric-400 to-gold-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-transform duration-300 group-hover:scale-125"
									aria-hidden
								/>
								<p className="text-sm font-medium text-neutral-200">{example}</p>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal delay={0.2} className="mt-12 flex justify-center">
					<a href={SITE.bookCallHref} className="btn-secondary">
						See What Can Be Automated
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
							<path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</a>
				</Reveal>
			</div>
		</section>
	);
}
