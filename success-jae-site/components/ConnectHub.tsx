import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { HUB_ITEMS, SITE, type HubItem } from '@/lib/data';

const categoryStyles: Record<HubItem['category'], string> = {
	Watch: 'border-electric-400/30 bg-electric-500/10 text-electric-300',
	Interview: 'border-purple-400/30 bg-purple-500/10 text-purple-300',
	'AI Systems': 'border-gold-500/30 bg-gold-500/10 text-gold-300',
	'Cloud Solutions': 'border-sky-400/30 bg-sky-500/10 text-sky-300',
	'Social Clip': 'border-pink-400/30 bg-pink-500/10 text-pink-300',
	'Featured Press': 'border-gold-500/40 bg-gold-500/15 text-gold-300',
};

function EmbedPlaceholder({ item, large }: { item: HubItem; large?: boolean }) {
	// Placeholder embed area — replace with a YouTube iframe, social embed, or
	// press link per item when real URLs are available.
	return (
		<div
			className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 ${
				large ? 'aspect-video' : item.embed === 'short' ? 'aspect-[4/5]' : 'aspect-video'
			}`}
		>
			<div
				className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.25),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(212,169,78,0.2),transparent_55%)]"
				aria-hidden
			/>
			<span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition-transform duration-300 group-hover:scale-110">
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
					<path d="M6 4.2v9.6c0 .8.9 1.3 1.6.9l7.2-4.8c.6-.4.6-1.4 0-1.8L7.6 3.3c-.7-.4-1.6.1-1.6.9Z" fill="currentColor" />
				</svg>
			</span>
			<span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-300 backdrop-blur">
				{item.embed === 'youtube' && 'YouTube embed'}
				{item.embed === 'short' && 'Short-form clip'}
				{item.embed === 'interview' && 'Interview'}
				{item.embed === 'press' && 'Press feature'}
			</span>
		</div>
	);
}

function HubCard({ item, large }: { item: HubItem; large?: boolean }) {
	return (
		<article className={`glass-card group h-full p-4 ${large ? 'sm:p-5' : ''}`}>
			<EmbedPlaceholder item={item} large={large} />
			<div className="p-2 pt-4">
				<span
					className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${categoryStyles[item.category]}`}
				>
					{item.category}
				</span>
				<h3 className={`mt-3 font-display font-bold text-white ${large ? 'text-xl' : 'text-base'}`}>
					{item.title}
				</h3>
				<p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.description}</p>
			</div>
		</article>
	);
}

export default function ConnectHub() {
	const featured = HUB_ITEMS.filter((item) => item.featured);
	const rest = HUB_ITEMS.filter((item) => !item.featured);

	return (
		<section id="connect-hub" className="relative border-y border-white/5 bg-ink-900/40 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-5 lg:px-8">
				<SectionHeading
					eyebrow="Content"
					title="The Connect Hub"
					subtitle="Videos, interviews, social clips, and insights from Success Jae on AI automation, cloud systems, digital workflows, and smarter business operations."
				/>

				<div className="mt-14 grid gap-5 lg:grid-cols-2">
					{featured.map((item, index) => (
						<Reveal key={item.title} delay={index * 0.1}>
							<HubCard item={item} large />
						</Reveal>
					))}
				</div>

				<div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{rest.map((item, index) => (
						<Reveal key={item.title} delay={(index % 3) * 0.08}>
							<HubCard item={item} />
						</Reveal>
					))}
				</div>

				<Reveal delay={0.2} className="mt-12 flex justify-center">
					<a href={SITE.connectHubHref} className="btn-secondary">
						Explore the Connect Hub
					</a>
				</Reveal>
			</div>
		</section>
	);
}
