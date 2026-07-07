import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AuthorityStrip from '@/components/AuthorityStrip';
import AISolutions from '@/components/AISolutions';
import AutomationExamples from '@/components/AutomationExamples';
import IndustrySystems from '@/components/IndustrySystems';
import NetworkWall from '@/components/NetworkWall';
import MyStory from '@/components/MyStory';
import ConnectHub from '@/components/ConnectHub';
import LeadMagnet from '@/components/LeadMagnet';
import BookingCTA from '@/components/BookingCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
	return (
		<>
			<Navbar />
			<main id="home">
				<Hero />
				<AuthorityStrip />
				<AISolutions />
				<AutomationExamples />
				<IndustrySystems />
				<NetworkWall />
				<MyStory />
				<ConnectHub />
				<LeadMagnet />
				<BookingCTA />
			</main>
			<Footer />
		</>
	);
}
