'use client';

import { useState, type FormEvent } from 'react';
import Reveal from './Reveal';
import { CHECKLIST_BENEFITS } from '@/lib/data';

const inputClasses =
	'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20';

export default function LeadMagnet() {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Wire this to your form backend / CRM / email platform of choice.
		setSubmitted(true);
	};

	return (
		<section id="checklist" className="relative py-24 sm:py-32">
			<div
				className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-[140px]"
				aria-hidden
			/>
			<div className="relative mx-auto max-w-7xl px-5 lg:px-8">
				<div className="glass-card grid gap-12 p-8 hover:!translate-y-0 sm:p-12 lg:grid-cols-2 lg:gap-16">
					<div>
						<Reveal>
							<span className="section-eyebrow">
								<span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
								Free Resource
							</span>
							<h2 className="section-title !text-3xl sm:!text-4xl">
								Download the AI Automation Checklist for Growing Businesses
							</h2>
							<p className="section-sub">
								Find out what your business should automate first, where manual work is slowing
								you down, and how to start building smarter systems.
							</p>
						</Reveal>
						<Reveal delay={0.15}>
							<ul className="mt-8 space-y-3">
								{CHECKLIST_BENEFITS.map((benefit) => (
									<li key={benefit} className="flex items-center gap-3 text-sm text-neutral-300">
										<span
											className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15"
											aria-hidden
										>
											<svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="text-gold-400">
												<path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</span>
										{benefit}
									</li>
								))}
							</ul>
						</Reveal>
					</div>

					<Reveal delay={0.2}>
						{submitted ? (
							<div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/5 p-10 text-center">
								<span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950">
									<svg width="24" height="24" viewBox="0 0 16 16" fill="none">
										<path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
								<h3 className="mt-5 font-display text-xl font-bold text-white">You&rsquo;re in.</h3>
								<p className="mt-2 text-sm text-neutral-400">
									The AI Automation Checklist is on its way to your inbox.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="flex h-full flex-col justify-center gap-4">
								<div>
									<label htmlFor="lead-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
										Name
									</label>
									<input id="lead-name" name="name" type="text" required placeholder="Your name" className={inputClasses} />
								</div>
								<div>
									<label htmlFor="lead-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
										Email
									</label>
									<input id="lead-email" name="email" type="email" required placeholder="you@business.com" className={inputClasses} />
								</div>
								<div>
									<label htmlFor="lead-business" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
										Business type
									</label>
									<select id="lead-business" name="businessType" required defaultValue="" className={inputClasses}>
										<option value="" disabled>
											Select your business type
										</option>
										<option>Service business</option>
										<option>Creator / consultant</option>
										<option>Artist / entertainer</option>
										<option>Athlete / NIL brand</option>
										<option>Beauty / lifestyle brand</option>
										<option>Restaurant / food brand</option>
										<option>Childcare / community services</option>
										<option>Real estate / property services</option>
										<option>Other</option>
									</select>
								</div>
								<div>
									<label htmlFor="lead-challenge" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
										Biggest workflow challenge
									</label>
									<textarea
										id="lead-challenge"
										name="challenge"
										rows={3}
										placeholder="Where is manual work slowing you down?"
										className={inputClasses}
									/>
								</div>
								<button type="submit" className="btn-primary mt-2 w-full">
									Download the Checklist
								</button>
							</form>
						)}
					</Reveal>
				</div>
			</div>
		</section>
	);
}
