import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const whatsappUrl = `https://wa.me/917795478115?text=${encodeURIComponent(
  "Hi Ali,\n\nI visited your portfolio website and was impressed with your work and projects.\n\nI would like to discuss a potential opportunity with you. Please let me know when you're available.\n\nLooking forward to hearing from you.\n\nThank you!"
)}`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50 glass border-b-0 border-white/5 py-4 px-8 flex items-center justify-between"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center neon-glow group-hover:bg-primary/30 transition-all duration-300">
            <span className="text-primary font-bold text-xl">L</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide hidden sm:block">Liyaqath Ali</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path}
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:neon-text"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
            <Search size={18} />
          </button>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#22c35e] text-slate-950 font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
          >
            <FaWhatsapp size={18} />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Hamburger Menu (Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 w-full h-screen bg-slate-950/95 backdrop-blur-xl z-40 flex flex-col justify-center px-8 lg:hidden"
          >
            <ul className="flex flex-col gap-6 text-center">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-slate-200 hover:text-primary text-2xl font-semibold tracking-wide transition-colors duration-300 block py-2"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex justify-center"
            >
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#22c35e] text-slate-950 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
              >
                <FaWhatsapp size={22} />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

