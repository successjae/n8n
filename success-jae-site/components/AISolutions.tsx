import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import ServiceIcon from './ServiceIcon';
import { AI_SOLUTIONS } from '@/lib/data';

export default function AISolutions() {
	return (
		<section id="ai-solutions" className="relative py-24 sm:py-32">
			<div
				className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-electric-500/5 blur-[120px]"
				aria-hidden
			/>
			<div className="relative mx-auto max-w-7xl px-5 lg:px-8">
				<SectionHeading
					eyebrow="AI Solutions"
					title="AI Systems Built to Save Time, Streamline Workflows, and Scale Operations"
					subtitle="From automated client intake to cloud-based collaboration systems, Success Jae helps businesses replace manual bottlenecks with smarter, connected digital workflows."
				/>

				{/* id anchor for the Cloud Systems nav item — cloud services live in this grid */}
				<div id="cloud-systems" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{AI_SOLUTIONS.map((service, index) => (
						<Reveal key={service.title} delay={index * 0.08}>
							<article className="glass-card group relative h-full overflow-hidden p-7">
								<div
									className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric-500/10 blur-2xl transition-opacity duration-500 group-hover:bg-gold-500/15"
									aria-hidden
								/>
								<div className="relative">
									<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-electric-400/20 bg-electric-500/10 p-3 text-electric-300 transition-colors duration-300 group-hover:border-gold-500/30 group-hover:bg-gold-500/10 group-hover:text-gold-300">
										<ServiceIcon icon={service.icon} />
									</div>
									<h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
									<p className="mt-3 text-sm leading-relaxed text-neutral-400">
										{service.description}
									</p>
								</div>
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
