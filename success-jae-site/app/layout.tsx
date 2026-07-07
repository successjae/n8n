import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
	title: SITE.title,
	description: SITE.description,
	keywords: [
		'Success Jae',
		'Jared Vincent',
		'AI automation consultant',
		'AI integration specialist',
		'cloud solutions consultant',
		'workflow automation',
		'digital systems strategist',
		'business automation',
		'smart website systems',
		'AI systems for small businesses',
	],
	authors: [{ name: 'Jared "Success Jae" Vincent' }],
	openGraph: {
		title: SITE.title,
		description: SITE.description,
		type: 'website',
		siteName: 'Success Jae',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE.title,
		description: SITE.description,
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: '#050507',
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
