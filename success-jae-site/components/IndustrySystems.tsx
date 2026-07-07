'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { INDUSTRIES } from '@/lib/data';

export default function IndustrySystems() {
	const [active, setActive] = useState(0);
	const industry = INDUSTRIES[active];

	return (
		<section id="industries" className="relative py-24 sm:py-32">
			<div
				className="absolute right-0 top-1/3 h-[380px] w-[500px] rounded-full bg-gold-500/5 blur-[130px]"
				aria-hidden
			/>
			<div className="relative mx-auto max-w-7xl px-5 lg:px-8">
				<SectionHeading
					eyebrow="By Industry"
					title="AI and Cloud Systems for Different Industries"
					subtitle="Every business runs on repeatable workflows. Here is how connected AI and cloud systems apply across different types of operations."
				/>

				<Reveal delay={0.1}>
					<div
						className="mt-12 flex flex-wrap gap-2.5"
						role="tablist"
						aria-label="Industries"
					>
						{INDUSTRIES.map((item, index) => (
							<button
								key={item.name}
								type="button"
								role="tab"
								aria-selected={index === active}
								onClick={() => setActive(index)}
								className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
									index === active
										? 'bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 shadow-[0_0_25px_-6px_rgba(212,169,78,0.7)]'
										: 'glass text-neutral-400 hover:text-white'
								}`}
							>
								{item.name}
							</button>
						))}
					</div>
				</Reveal>

				<AnimatePresence mode="wait">
					<motion.div
						key={industry.name}
						role="tabpanel"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.35, ease: [0.21, 0.65, 0.36, 1] }}
						className="glass-card mt-8 p-8 hover:!translate-y-0"
					>
						<h3 className="font-display text-2xl font-bold text-white">{industry.name}</h3>
						<ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{industry.examples.map((example) => (
								<li key={example} className="flex items-center gap-3 text-sm text-neutral-300">
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										className="shrink-0 text-gold-400"
										aria-hidden
									>
										<path
											d="M3 8.5 6.5 12 13 4.5"
											stroke="currentColor"
											strokeWidth="1.8"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									{example}
								</li>
							))}
						</ul>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
