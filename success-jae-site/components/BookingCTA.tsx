import Reveal from './Reveal';

export default function BookingCTA() {
	return (
		<section id="book" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#141428_0%,#050507_65%)]"
				aria-hidden
			/>
			<div
				className="absolute left-1/4 top-0 h-[300px] w-[500px] rounded-full bg-electric-500/8 blur-[120px] animate-pulse-slow"
				aria-hidden
			/>
			<div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
				<Reveal>
					<span className="section-eyebrow">
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden />
						Limited weekly strategy calls
					</span>
					<h2 className="section-title">Ready to Build Smarter Systems?</h2>
					<p className="section-sub mx-auto">
						Book a free strategy call to identify where AI automation, cloud tools, and connected
						workflows can save time and improve your business operations.
					</p>
				</Reveal>

				<Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<a href="#book" className="btn-primary">
						Book a Free Strategy Call
					</a>
					<a href="#checklist" className="btn-secondary">
						Start an AI Automation Audit
					</a>
				</Reveal>

				<Reveal delay={0.25}>
					{/* Booking integration placeholder — drop a Calendly inline embed here:
					    <iframe src="https://calendly.com/YOUR-HANDLE/strategy-call" ... /> */}
					<div className="glass-card mx-auto mt-14 flex aspect-[16/8] max-w-2xl flex-col items-center justify-center gap-3 hover:!translate-y-0 sm:aspect-[16/6]">
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							className="text-gold-400"
							aria-hidden
						>
							<rect x="3" y="4" width="18" height="17" rx="2" />
							<path d="M3 9h18M8 2v4m8-4v4m-8.5 7h3m3 0h2M7.5 17h3m3 0h2" strokeLinecap="round" />
						</svg>
						<p className="text-sm font-medium text-neutral-300">Calendly booking embed</p>
						<p className="text-xs text-neutral-500">
							Connect your scheduling link to activate live booking
						</p>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
