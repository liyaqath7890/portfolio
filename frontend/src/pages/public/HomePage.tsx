import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import HeroScene from '../../components/public/HeroScene';
import GlassCard from '../../components/ui/GlassCard';

const HomePage = () => {
  return (
    <>
      <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center px-4 md:px-12 lg:px-24 overflow-hidden">
        {/* 3D Background */}
        <HeroScene />

        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent pointer-events-none z-0" />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 w-full max-w-7xl mx-auto">
          
          {/* Left Side: Typography & CTA */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col space-y-6"
          >
            <div className="flex items-center gap-3 text-primary font-medium tracking-wider [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="w-10 h-[2px] bg-primary"></span>
              Software Engineer
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight [text-shadow:_0_4px_12px_rgba(0,0,0,0.9)]">
              LIYAQATH ALI <br/>
              <span className="text-white font-medium text-4xl md:text-5xl mt-2 block tracking-normal [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                Full Stack Developer
              </span>
            </h1>

            <p className="text-slate-300 font-medium text-lg md:text-xl max-w-lg leading-relaxed [text-shadow:_0_2px_6px_rgba(0,0,0,0.8)]">
              Building scalable enterprise SaaS applications with modern technologies. I specialize in turning complex problems into elegant, production-ready solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/projects">
                <Button variant="primary" className="rounded-full px-8 shadow-lg shadow-primary/20">
                  View Projects
                </Button>
              </Link>
              <a href="/Liyaqath_Ali_Resume.pdf" download="Liyaqath_Ali_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-full px-8">
                  Download Resume
                </Button>
              </a>
              
              <div className="flex flex-col gap-3 ml-4">
                <div className="flex items-center gap-3">
                  <a href="https://github.com/liyaqath7890" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-primary transition-all duration-300 hover:neon-glow">
                    <FaGithub size={20} />
                  </a>
                  <a href="https://linkedin.com/in/liyaqath-ali" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-primary transition-all duration-300 hover:neon-glow">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="mailto:liyaqathali385@gmail.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-primary transition-all duration-300 hover:neon-glow">
                    <Mail size={20} />
                  </a>
                  <a href="tel:+917795478115" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-primary transition-all duration-300 hover:neon-glow">
                    <Phone size={20} />
                  </a>
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-400">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                     <span className="text-green-400 font-medium">Open to work</span>
                   </div>
                   <a href="mailto:liyaqathali385@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                     📧 liyaqathali385@gmail.com
                   </a>
                   <a href="tel:+917795478115" className="hover:text-primary transition-colors flex items-center gap-2">
                     📞 +91 7795478115
                   </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: (Empty space for 3D Scene interaction) */}
          <div className="hidden lg:block h-[500px]">
            {/* The 3D canvas handles the right side visual weight natively */}
          </div>
        </div>

        {/* Stats Row */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="w-full max-w-7xl mx-auto z-10 mt-16 lg:mt-24"
        >
          <GlassCard className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-white">30+</span>
              <span className="text-primary text-sm font-medium uppercase tracking-widest mt-1">Projects</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-white">15+</span>
              <span className="text-primary text-sm font-medium uppercase tracking-widest mt-1">Technologies</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-white">50K+</span>
              <span className="text-primary text-sm font-medium uppercase tracking-widest mt-1">Visitors</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-white">99.9%</span>
              <span className="text-primary text-sm font-medium uppercase tracking-widest mt-1">Uptime Rate</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;
