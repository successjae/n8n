'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import {
	MOMENTS,
	NETWORK_CATEGORIES,
	NETWORK_ENTRIES,
	type NetworkCategory,
	type NetworkEntry,
} from '@/lib/data';

function NetworkTile({ entry }: { entry: NetworkEntry }) {
	const initials = entry.name
		.split(/\s+/)
		.map((word) => word[0])
		.filter((char) => /[A-Za-z0-9]/.test(char ?? ''))
		.slice(0, 2)
		.join('')
		.toUpperCase();

	return (
		<div className="glass-card group mx-2 flex w-56 shrink-0 items-center gap-3.5 px-5 py-4 grayscale transition-all duration-500 hover:grayscale-0">
			{/* Swap this monogram for an official logo/image when available */}
			<span
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-ink-700 to-ink-900 font-display text-xs font-bold text-gold-300"
				aria-hidden
			>
				{initials}
			</span>
			<div>
				<p className="text-sm font-semibold leading-snug text-white">{entry.name}</p>
				<p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">{entry.category}</p>
			</div>
		</div>
	);
}

function MarqueeRow({ entries, reverse }: { entries: NetworkEntry[]; reverse?: boolean }) {
	// duplicate for seamless -50% translate loop
	const doubled = [...entries, ...entries];
	return (
		<div className="group/marquee overflow-hidden" aria-hidden={false}>
			<div
				className={`flex w-max py-2 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap`}
			>
				{doubled.map((entry, index) => (
					<NetworkTile key={`${entry.name}-${index}`} entry={entry} />
				))}
			</div>
		</div>
	);
}

export default function NetworkWall() {
	const [filter, setFilter] = useState<NetworkCategory | 'All'>('All');

	const filtered =
		filter === 'All'
			? NETWORK_ENTRIES
			: NETWORK_ENTRIES.filter((entry) => entry.category === filter);

	const mid = Math.ceil(filtered.length / 2);
	const rowA = filtered.slice(0, mid);
	const rowB = filtered.slice(mid);

	return (
		<section id="network" className="relative border-y border-white/5 bg-ink-900/40 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-5 lg:px-8">
				<SectionHeading
					eyebrow="The Network"
					title="Network, Clients & Collaborations"
					subtitle="A visual snapshot of creators, companies, entrepreneurs, artists, and brands connected to Success Jae's work across technology, automation, digital systems, entertainment, and entrepreneurship."
					center
				/>

				{/* Moments gallery — real photos from the network */}
				<div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{MOMENTS.map((moment, index) => (
						<Reveal key={moment.src} delay={index * 0.08}>
							<figure className="glass-card group relative aspect-[4/5] overflow-hidden !p-0">
								<Image
									src={moment.src}
									alt={moment.alt}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									className="object-cover grayscale-[0.4] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
								/>
								<div
									className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-transparent"
									aria-hidden
								/>
								<figcaption className="absolute inset-x-0 bottom-0 p-4">
									<p className="text-sm font-semibold leading-snug text-white">{moment.caption}</p>
								</figcaption>
							</figure>
						</Reveal>
					))}
				</div>

				<Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-2.5">
					{(['All', ...NETWORK_CATEGORIES] as const).map((category) => (
						<button
							key={category}
							type="button"
							aria-pressed={filter === category}
							onClick={() => setFilter(category)}
							className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
								filter === category
									? 'bg-gradient-to-r from-electric-400 to-electric-600 text-ink-950 shadow-[0_0_25px_-6px_rgba(14,165,233,0.8)]'
									: 'glass text-neutral-400 hover:text-white'
							}`}
						>
							{category}
						</button>
					))}
				</Reveal>
			</div>

			<motion.div
				key={filter}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="mt-12 space-y-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
			>
				<MarqueeRow entries={rowA} />
				{rowB.length > 0 ? <MarqueeRow entries={rowB} reverse /> : null}
			</motion.div>
		</section>
	);
}
