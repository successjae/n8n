'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import NetworkCanvas from './NetworkCanvas';
import RotatingText from './RotatingText';
import { ROTATING_WORDS, SITE } from '@/lib/data';

const floatingCards = [
	{
		label: 'Workflow',
		title: 'Client intake → CRM → Follow-up',
		accent: 'text-electric-300',
		position: 'right-[26%] top-[16%]',
		animation: 'animate-float-delayed',
	},
	{
		label: 'Automation',
		title: '38 hrs/mo of manual work removed',
		accent: 'text-gold-300',
		position: 'right-[22%] bottom-[16%]',
		animation: 'animate-float',
	},
] as const;

export default function Hero() {
	const reduceMotion = useReducedMotion();
	const { scrollY } = useScroll();
	const parallaxSlow = useTransform(scrollY, [0, 800], [0, 120]);
	const parallaxFast = useTransform(scrollY, [0, 800], [0, -80]);

	return (
		<section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
			{/* layered cinematic background */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#101024_0%,#050507_60%)]" aria-hidden />
			<NetworkCanvas className="absolute inset-0 h-full w-full" />
			<div
				className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-electric-500/10 blur-[140px] animate-pulse-slow"
				aria-hidden
			/>
			<div
				className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gold-500/10 blur-[140px] animate-pulse-slow"
				aria-hidden
			/>
			<div
				className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
				aria-hidden
			/>

			{/* floating dashboard cards (desktop) */}
			<motion.div
				style={reduceMotion ? undefined : { y: parallaxFast }}
				className="pointer-events-none absolute inset-0 hidden xl:block"
				aria-hidden
			>
				{/* floating portrait — Success Jae in the brown jacket, part of the hero animation */}
				<figure className="glass-card absolute right-[5%] top-[15%] w-72 animate-float overflow-hidden !p-0 shadow-[0_0_60px_-20px_rgba(212,169,78,0.45)]">
					<div className="relative aspect-[4/5]">
						<Image
							src="/images/jae-portrait.jpg"
							alt=""
							fill
							priority
							sizes="288px"
							className="object-cover object-top"
						/>
						<div
							className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent"
							aria-hidden
						/>
						<figcaption className="absolute inset-x-0 bottom-0 p-4">
							<p className="font-display text-sm font-bold text-white">
								Jared &ldquo;Success Jae&rdquo; Vincent
							</p>
							<p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-300">
								AI Automation · Cloud · Systems
							</p>
						</figcaption>
						<span
							className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-ink-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur"
						>
							<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
							Building
						</span>
					</div>
				</figure>

				{floatingCards.map((card) => (
					<div key={card.title} className={`glass-card absolute w-64 p-4 ${card.position} ${card.animation}`}>
						<p className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${card.accent}`}>
							{card.label}
						</p>
						<p className="mt-2 text-sm font-medium text-white">{card.title}</p>
						<div className="mt-3 flex items-center gap-1.5">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
							<span className="h-1 flex-1 rounded-full bg-gradient-to-r from-electric-500/60 to-transparent" />
						</div>
					</div>
				))}
			</motion.div>

			<motion.div
				style={reduceMotion ? undefined : { y: parallaxSlow }}
				className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8"
			>
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: [0.21, 0.65, 0.36, 1] }}
					className="max-w-3xl"
				>
					<p className="section-eyebrow">
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-400" aria-hidden />
						Success Jae — AI Automation · Cloud Solutions · Digital Systems
					</p>

					<h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
						The businesses that <span className="text-gradient-blue">automate today</span> are the
						ones that <span className="text-gradient-gold">dominate tomorrow</span>.
					</h1>

					<p className="mt-7 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
						AI automation, cloud integration, and digital systems built to help businesses save
						time, reduce manual work, improve responsiveness, and scale smarter.
					</p>

					<p className="mt-6 font-display text-lg text-neutral-300 sm:text-xl">
						Systems built for <RotatingText words={ROTATING_WORDS} />
					</p>

					<div className="mt-10 flex flex-wrap items-center gap-4">
						<a href={SITE.bookCallHref} className="btn-primary">
							Book a Free Strategy Call
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
								<path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</a>
						<a href={SITE.solutionsHref} className="btn-secondary">
							Explore AI Solutions
						</a>
						<a href={SITE.checklistHref} className="btn-ghost !px-2">
							Download the AI Automation Checklist
						</a>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
