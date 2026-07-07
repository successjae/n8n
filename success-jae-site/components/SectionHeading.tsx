import Reveal from './Reveal';

interface SectionHeadingProps {
	eyebrow: string;
	title: string;
	subtitle?: string;
	center?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, center }: SectionHeadingProps) {
	return (
		<Reveal className={center ? 'flex flex-col items-center text-center' : ''}>
			<span className="section-eyebrow">
				<span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
				{eyebrow}
			</span>
			<h2 className="section-title">{title}</h2>
			{subtitle ? <p className={`section-sub${center ? ' mx-auto' : ''}`}>{subtitle}</p> : null}
		</Reveal>
	);
}
