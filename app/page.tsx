import Header from './components/Header';
import Divider from './components/Divider';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import SocialLinks from './components/SocialLinks';
import ChatSection from './components/ChatSection';

export default function Home() {
  return (
    <main className="bg-cyber-black min-h-screen">
      {/* Fixed Social Links */}
      <SocialLinks />

      {/* Main Content */}
      <div className="relative">
        <Header />
        <Divider />
        <About />
        <ChatSection />
        <Experience />
        <Divider />
        <Projects />
        <SocialLinks />
      </div>
    </main>
  );
}
