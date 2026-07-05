import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
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
        <Link to="/contact">
          <Button variant="primary" size="sm" className="hidden sm:inline-flex rounded-full">
            Hire Me
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
