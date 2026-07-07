import Image from 'next/image';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { STORY_MILESTONES } from '@/lib/data';

export default function MyStory() {
	return (
		<section id="my-story" className="relative py-24 sm:py-32">
			<div
				className="absolute left-0 top-1/4 h-[380px] w-[450px] rounded-full bg-electric-500/5 blur-[130px]"
				aria-hidden
			/>
			<div className="relative mx-auto max-w-7xl px-5 lg:px-8">
				<div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
					<div>
						<SectionHeading
							eyebrow="My Story"
							title="From Digital Culture to AI-Powered Systems"
						/>
						<Reveal delay={0.15}>
							<div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-400">
								<p>
									Jared &ldquo;Success Jae&rdquo; Vincent built his reputation by understanding how
									people, platforms, and technology connect. His work across entertainment,
									entrepreneurship, and digital platforms gave him firsthand insight into how
									fast-moving businesses operate, where they lose time, and how better systems
									create leverage.
								</p>
								<p>
									Today, Success Jae focuses on helping businesses use AI automation, cloud tools,
									and connected digital workflows to operate with more speed, clarity, and
									consistency.
								</p>
							</div>
						</Reveal>
						<Reveal delay={0.2}>
							<figure className="glass-card group relative mt-8 aspect-[16/10] overflow-hidden !p-0">
								<Image
									src="/images/workspace.jpg"
									alt="Success Jae working on strategy and systems across two laptops in a studio workspace"
									fill
									sizes="(max-width: 1024px) 100vw, 50vw"
									className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
								/>
								<div
									className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/90 to-transparent"
									aria-hidden
								/>
								<figcaption className="absolute bottom-4 left-5 text-sm font-medium text-neutral-200">
									Vision. Strategy. Execution.
								</figcaption>
							</figure>
						</Reveal>
						<Reveal delay={0.25}>
							{/* Featured press item — link to the Black Enterprise interview when the URL is added */}
							<a
								href="#connect-hub"
								className="glass-card mt-8 flex items-center gap-4 p-5"
							>
								<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 font-display text-xs font-bold text-ink-950">
									BE
								</span>
								<div>
									<p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-300">
										Featured Press
									</p>
									<p className="mt-1 text-sm font-semibold text-white">
										Black Enterprise Interview — Success Jae on culture, business, and technology
									</p>
								</div>
							</a>
						</Reveal>
					</div>

					<div className="relative">
						<div
							className="absolute bottom-2 left-[13px] top-2 w-px bg-gradient-to-b from-electric-400/60 via-gold-500/40 to-transparent"
							aria-hidden
						/>
						<ol className="space-y-8">
							{STORY_MILESTONES.map((milestone, index) => (
								<Reveal key={milestone.title} delay={index * 0.1} y={20}>
									<li className="relative pl-12">
										<span
											className="absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-gold-500/40 bg-ink-900 shadow-[0_0_15px_-3px_rgba(212,169,78,0.6)]"
											aria-hidden
										>
											<span className="h-2 w-2 rounded-full bg-gradient-to-br from-electric-400 to-gold-400" />
										</span>
										<h3 className="font-display text-base font-bold text-white">
											{milestone.title}
										</h3>
										<p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
											{milestone.description}
										</p>
									</li>
								</Reveal>
							))}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
}
