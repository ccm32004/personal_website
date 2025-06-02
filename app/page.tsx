import Header from './components/Header';
import Divider from './components/Divider';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import SocialLinks from './components/SocialLinks';
import Chat from './components/Chat';
import { FaRobot } from 'react-icons/fa';

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
        <Divider />
        {/* Chat Section */}
        <section className="bg-cyber-darker py-24">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-4 mb-12">
              <FaRobot className="text-4xl text-neon-purple" />
              <h2 className="text-3xl md:text-4xl font-cyber text-neon-purple text-glow-purple">
                Chat with CeceBot
              </h2>
            </div>
            <Chat />
          </div>
        </section>
        <Experience />
        <Divider />
        <Projects />
        <SocialLinks />
      </div>
    </main>
  );
}
