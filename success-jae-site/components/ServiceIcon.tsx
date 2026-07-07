import type { ServiceCard } from '@/lib/data';

const paths: Record<ServiceCard['icon'], React.ReactNode> = {
	integration: (
		<>
			<circle cx="12" cy="12" r="3" />
			<path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l2.8 2.8m8.4 8.4L19 19M19 5l-2.8 2.8M7.8 16.2 5 19" />
		</>
	),
	workflow: (
		<>
			<rect x="2" y="3" width="7" height="6" rx="1.5" />
			<rect x="15" y="15" width="7" height="6" rx="1.5" />
			<path d="M9 6h5a3 3 0 0 1 3 3v6m-6 3H8" />
		</>
	),
	cloud: (
		<>
			<path d="M7 18a5 5 0 1 1 .8-9.95A6 6 0 0 1 19 10a4 4 0 0 1-1 7.87" />
			<path d="M12 13v8m0-8-3 3m3-3 3 3" />
		</>
	),
	website: (
		<>
			<rect x="2" y="4" width="20" height="16" rx="2" />
			<path d="M2 9h20M6 6.5h.01M9 6.5h.01M12 16l2-4 2 4m-8-4v4" />
		</>
	),
	tools: (
		<>
			<circle cx="6" cy="6" r="3" />
			<circle cx="18" cy="6" r="3" />
			<circle cx="6" cy="18" r="3" />
			<circle cx="18" cy="18" r="3" />
			<path d="M9 6h6M6 9v6m12-6v6M9 18h6" />
		</>
	),
	operations: (
		<>
			<path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />
			<circle cx="16" cy="9" r="2.5" />
		</>
	),
};

export default function ServiceIcon({ icon }: { icon: ServiceCard['icon'] }) {
	return (
		<svg
			width="26"
			height="26"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			{paths[icon]}
		</svg>
	);
}
