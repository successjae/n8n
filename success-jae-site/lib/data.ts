export const NAV_LINKS = [
	{ label: 'Home', href: '#home' },
	{ label: 'AI Solutions', href: '#ai-solutions' },
	{ label: 'Cloud Systems', href: '#cloud-systems' },
	{ label: 'Automation Examples', href: '#automation-examples' },
	{ label: 'Network', href: '#network' },
	{ label: 'Connect Hub', href: '#connect-hub' },
	{ label: 'My Story', href: '#my-story' },
] as const;

export const ROTATING_WORDS = [
	'AI Automation',
	'Cloud Solutions',
	'Workflow Systems',
	'Smart Websites',
	'Digital Operations',
	'AI Integration',
] as const;

export const AUTHORITY_ANCHORS = [
	'Floyd Mayweather',
	'The Money Team',
	'Mayweather Promotions',
	"Keyshia Ka'oir / KA'OIR",
	'Black Enterprise',
] as const;

export interface ServiceCard {
	title: string;
	description: string;
	icon: 'integration' | 'workflow' | 'cloud' | 'website' | 'tools' | 'operations';
}

export const AI_SOLUTIONS: ServiceCard[] = [
	{
		title: 'AI Integration',
		description:
			'Add AI into existing websites, forms, customer workflows, communication systems, and internal processes.',
		icon: 'integration',
	},
	{
		title: 'Workflow Automation',
		description:
			'Automate repetitive tasks like client intake, appointment follow-up, lead routing, document collection, status updates, and reporting.',
		icon: 'workflow',
	},
	{
		title: 'Cloud Solutions',
		description:
			'Build cleaner, more scalable cloud systems using tools like Google Workspace, Microsoft 365, cloud storage, shared calendars, forms, file organization, and connected apps.',
		icon: 'cloud',
	},
	{
		title: 'Smart Website Systems',
		description:
			'Create websites with intelligent forms, AI assistants, booking workflows, lead capture, automated responses, analytics, and conversion-focused structure.',
		icon: 'website',
	},
	{
		title: 'Business Tool Integration',
		description:
			'Connect key tools such as Google Workspace, Calendly, forms, email, CRM systems, payment tools, analytics, and automation platforms.',
		icon: 'tools',
	},
	{
		title: 'Digital Operations Setup',
		description:
			'Design repeatable systems for leads, clients, files, communication, follow-up, task tracking, and reporting.',
		icon: 'operations',
	},
];

export const AUTOMATION_EXAMPLES = [
	'AI customer intake assistant',
	'Automated client onboarding',
	'Appointment booking and reminders',
	'Lead capture and follow-up',
	'Smart contact forms',
	'AI-powered FAQ assistant',
	'Proposal and invoice workflow',
	'Document collection system',
	'Google Workspace automation',
	'Microsoft 365 workflow setup',
	'CRM and pipeline automation',
	'Automated reporting dashboards',
	'Cloud file structure and permissions',
	'Customer review request workflow',
	'Email response templates and routing',
	'Internal task handoff systems',
] as const;

export interface Industry {
	name: string;
	examples: string[];
}

export const INDUSTRIES: Industry[] = [
	{
		name: 'Service Businesses',
		examples: [
			'AI intake assistant',
			'Appointment reminders',
			'Client onboarding',
			'Document collection',
			'Follow-up automation',
		],
	},
	{
		name: 'Creators & Consultants',
		examples: [
			'Lead magnet system',
			'Email sequence',
			'Booking calendar',
			'CRM pipeline',
			'AI content support',
			'Client portal',
		],
	},
	{
		name: 'Artists & Entertainers',
		examples: [
			'AI press kit',
			'Booking inquiry automation',
			'Content hub',
			'Fan capture form',
			'Automated email follow-up',
		],
	},
	{
		name: 'Athletes & NIL Brands',
		examples: [
			'Sponsor inquiry form',
			'Media kit',
			'Brand deal intake',
			'Social proof hub',
			'Partnership tracking',
		],
	},
	{
		name: 'Beauty & Lifestyle Brands',
		examples: [
			'Booking automation',
			'Product inquiry system',
			'Customer follow-up workflow',
			'FAQ assistant',
			'Review requests',
		],
	},
	{
		name: 'Restaurants & Food Brands',
		examples: [
			'Catering inquiry automation',
			'Customer list builder',
			'Event booking form',
			'Review request workflow',
		],
	},
	{
		name: 'Childcare & Community Services',
		examples: [
			'Enrollment inquiry automation',
			'Parent communication workflow',
			'Document collection',
			'Scheduling system',
		],
	},
	{
		name: 'Real Estate & Property Services',
		examples: [
			'Maintenance request intake',
			'Tenant communication workflow',
			'Cloud document organization',
			'Automated status updates',
		],
	},
];

export type NetworkCategory =
	| 'Featured'
	| 'Entertainment'
	| 'Business / Community'
	| 'AI Systems Examples';

export interface NetworkEntry {
	name: string;
	category: NetworkCategory;
}

export const NETWORK_CATEGORIES: NetworkCategory[] = [
	'Featured',
	'Entertainment',
	'Business / Community',
	'AI Systems Examples',
];

export const NETWORK_ENTRIES: NetworkEntry[] = [
	{ name: 'Floyd Mayweather', category: 'Featured' },
	{ name: 'The Money Team', category: 'Featured' },
	{ name: 'Mayweather Promotions', category: 'Featured' },
	{ name: "Keyshia Ka'oir / KA'OIR", category: 'Featured' },
	{ name: 'Black Enterprise', category: 'Featured' },
	{ name: 'DJ Holiday', category: 'Entertainment' },
	{ name: 'Beat Billionaire', category: 'Entertainment' },
	{ name: 'Rsonist / The Heatmakerz', category: 'Entertainment' },
	{ name: 'P-Reala', category: 'Entertainment' },
	{ name: 'Suga J', category: 'Entertainment' },
	{ name: 'Swift', category: 'Entertainment' },
	{ name: 'Ameer', category: 'Entertainment' },
	{ name: 'Block 125', category: 'Entertainment' },
	{ name: 'Selfpaid Savage', category: 'Entertainment' },
	{ name: 'DJ Nando', category: 'Entertainment' },
	{ name: 'AMXXR', category: 'Entertainment' },
	{ name: 'Grow With Snow', category: 'Business / Community' },
	{ name: 'Bright Future Kiddie Care', category: 'Business / Community' },
	{ name: 'Back 2 Life', category: 'Business / Community' },
	{ name: "Jolo's Kitchen", category: 'Business / Community' },
	{ name: 'The Bite Life', category: 'Business / Community' },
	{ name: 'My College Stream', category: 'Business / Community' },
	{ name: 'Eco Neighbors', category: 'Business / Community' },
	{ name: 'Allure by Jalecia', category: 'Business / Community' },
	{ name: "Movin' Weight", category: 'Business / Community' },
	{ name: 'Dopeboy Clothing', category: 'Business / Community' },
	{ name: 'AI intake assistant', category: 'AI Systems Examples' },
	{ name: 'Automated lead follow-up', category: 'AI Systems Examples' },
	{ name: 'Cloud file system', category: 'AI Systems Examples' },
	{ name: 'Smart website system', category: 'AI Systems Examples' },
	{ name: 'CRM automation', category: 'AI Systems Examples' },
	{ name: 'Booking workflow', category: 'AI Systems Examples' },
	{ name: 'Reporting dashboard', category: 'AI Systems Examples' },
	{ name: 'AI FAQ assistant', category: 'AI Systems Examples' },
	{ name: 'Client onboarding workflow', category: 'AI Systems Examples' },
	{ name: 'Google Workspace automation', category: 'AI Systems Examples' },
];

export interface Moment {
	src: string;
	alt: string;
	caption: string;
}

/** Real photos from Success Jae's network — shown in the Moments gallery. */
export const MOMENTS: Moment[] = [
	{
		src: '/images/money-team.jpg',
		alt: 'Success Jae with Floyd Mayweather at a The Money Team event',
		caption: 'The Money Team — with Floyd Mayweather',
	},
	{
		src: '/images/fifty-cent.jpg',
		alt: 'Success Jae with 50 Cent at a boxing gym wearing a The Money Team shirt',
		caption: 'The Money Team era — with 50 Cent',
	},
	{
		src: '/images/dave-east.jpg',
		alt: 'Success Jae backstage with Dave East',
		caption: 'Backstage — with Dave East',
	},
	{
		src: '/images/fight-night.jpg',
		alt: 'Success Jae ringside at a Las Vegas fight night',
		caption: 'Fight night — Las Vegas',
	},
	{
		src: '/images/swizz-beatz.jpg',
		alt: 'Success Jae in a recording studio with Swizz Beatz',
		caption: 'In the studio — with Swizz Beatz',
	},
	{
		src: '/images/mayweather-vegas.jpg',
		alt: 'Success Jae with Floyd Mayweather in Las Vegas',
		caption: 'Las Vegas — with Floyd Mayweather',
	},
	{
		src: '/images/backstage-show.jpg',
		alt: 'Success Jae backstage at a show',
		caption: 'Backstage — show night',
	},
	{
		src: '/images/gallery-day.jpg',
		alt: 'Success Jae at a community art gallery',
		caption: 'Community & culture — gallery day',
	},
	{
		src: '/images/community-1.jpg',
		alt: 'Success Jae at a community event',
		caption: 'The network runs deep',
	},
];

export interface Milestone {
	title: string;
	description: string;
}

export const STORY_MILESTONES: Milestone[] = [
	{
		title: 'Success Media Group',
		description: 'Built a media and digital platform serving culture-driven brands and businesses.',
	},
	{
		title: 'Digital Platform Experience',
		description: 'Years of hands-on work with the platforms, tools, and audiences that move online.',
	},
	{
		title: 'Entertainment & Entrepreneurship Network',
		description:
			'Worked alongside athletes, artists, and entrepreneurs operating at the highest levels.',
	},
	{
		title: 'Black Enterprise Feature',
		description: 'Featured by Black Enterprise for his work at the intersection of culture and business.',
	},
	{
		title: 'Shift Into AI & Cloud Systems',
		description:
			'Moved his focus to AI automation, cloud solutions, and connected digital systems.',
	},
	{
		title: 'Current Focus',
		description:
			'Helping businesses modernize operations with smarter, faster, connected workflows.',
	},
];

export type HubCategory =
	| 'Watch'
	| 'Interview'
	| 'AI Systems'
	| 'Cloud Solutions'
	| 'Social Clip'
	| 'Featured Press';

export interface HubItem {
	title: string;
	category: HubCategory;
	description: string;
	embed: 'youtube' | 'short' | 'interview' | 'press';
	featured?: boolean;
}

export const HUB_ITEMS: HubItem[] = [
	{
		title: 'Black Enterprise Feature Interview',
		category: 'Featured Press',
		description:
			'Success Jae on building at the intersection of culture, business, and technology.',
		embed: 'press',
		featured: true,
	},
	{
		title: 'What Every Business Should Automate First',
		category: 'AI Systems',
		description: 'A practical breakdown of the highest-leverage automations for growing businesses.',
		embed: 'youtube',
		featured: true,
	},
	{
		title: 'Cloud Systems That Scale With You',
		category: 'Cloud Solutions',
		description: 'How to structure Google Workspace and Microsoft 365 for clean, connected operations.',
		embed: 'youtube',
	},
	{
		title: 'AI Automation Commentary',
		category: 'Watch',
		description: 'Insights on where AI is actually saving businesses time right now.',
		embed: 'youtube',
	},
	{
		title: 'Interview: From Digital Culture to AI Systems',
		category: 'Interview',
		description: 'The story behind the shift from media platforms to automation consulting.',
		embed: 'interview',
	},
	{
		title: 'Smarter Intake in 60 Seconds',
		category: 'Social Clip',
		description: 'Short-form clip: replacing manual intake with an AI assistant.',
		embed: 'short',
	},
	{
		title: 'Business Systems Tips',
		category: 'Social Clip',
		description: 'Quick wins from Instagram, TikTok, and YouTube Shorts.',
		embed: 'short',
	},
	{
		title: 'Workflow Teardown: Client Onboarding',
		category: 'AI Systems',
		description: 'Step-by-step teardown of a fully automated onboarding workflow.',
		embed: 'youtube',
	},
];

export const CHECKLIST_BENEFITS = [
	'Identify automation opportunities',
	'Reduce manual tasks',
	'Choose the right workflows to automate first',
	'Evaluate AI tools',
	'Create a step-by-step implementation plan',
	'Improve customer response time',
	'Build cleaner cloud-based operations',
] as const;

export const SITE = {
	name: 'Success Jae',
	fullName: 'Jared "Success Jae" Vincent',
	title: 'Success Jae | AI Automation, Cloud Solutions & Digital Systems',
	description:
		'Success Jae helps businesses use AI automation, cloud integration, and digital systems to save time, streamline workflows, and scale smarter.',
	bookCallHref: '#book',
	checklistHref: '#checklist',
	solutionsHref: '#ai-solutions',
	connectHubHref: '#connect-hub',
} as const;
