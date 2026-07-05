import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Navbar from '../../components/public/Navbar';
import Button from '../../components/ui/Button';

// Local mock data until API is integrated
const projectsData = [
  { 
    id: '1', 
    title: 'AI Job Platform', 
    subtitle: 'AI-powered job matching platform',
    desc: 'An intelligent platform connecting top talent with the right opportunities using advanced neural networks and NLP algorithms.', 
    category: 'AI/ML', 
    tech: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'TypeScript'], 
    image: '/proj_ai_job.png',
    duration: 'Mar 2024 - Present',
    role: 'Lead AI Engineer',
    teamSize: '3 Members',
    deployment: 'AWS & Vercel'
  },
  { 
    id: '2', 
    title: 'Product Information Management', 
    subtitle: 'Enterprise PIM Solution',
    desc: 'A multi-tenant SaaS platform to manage product catalogs, variants, attributes, assets, and categories with role-based access control and integrated inventory management.', 
    category: 'Management', 
    tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'], 
    image: '/proj_pim.png',
    duration: 'Jan 2024 - Mar 2024',
    role: 'Lead Full Stack Developer',
    teamSize: '4 Members',
    deployment: 'Vercel & Render'
  },
  { 
    id: '3', 
    title: 'Inventory Management', 
    subtitle: 'Stock & warehouse management',
    desc: 'A complete inventory tracking system with barcode scanning, automated reordering, and real-time analytics for medium to large warehouses.', 
    category: 'Management', 
    tech: ['React', 'Express', 'MongoDB', 'Redis', 'Tailwind CSS'], 
    image: '/proj_inventory.png',
    duration: 'Nov 2023 - Jan 2024',
    role: 'Full Stack Developer',
    teamSize: '2 Members',
    deployment: 'DigitalOcean'
  },
  { 
    id: '4', 
    title: 'School Management', 
    subtitle: 'Complete school ERP system',
    desc: 'A comprehensive ERP handling student enrollments, attendance, grading, fee management, and parent-teacher communication portals.', 
    category: 'SaaS', 
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Stripe'], 
    image: '/proj_school.png',
    duration: 'Aug 2023 - Nov 2023',
    role: 'Backend Developer',
    teamSize: '5 Members',
    deployment: 'AWS ECS'
  },
  { 
    id: '5', 
    title: 'Restaurant System', 
    subtitle: 'Restaurant & order management',
    desc: 'A modern POS and table management system with kitchen display screens, online ordering integration, and inventory tracking.', 
    category: 'SaaS', 
    tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'], 
    image: '/proj_restaurant.png',
    duration: 'May 2023 - Aug 2023',
    role: 'Full Stack Developer',
    teamSize: '3 Members',
    deployment: 'Heroku & Vercel'
  },
  { 
    id: '6', 
    title: 'Disaster Management', 
    subtitle: 'Disaster response & tracking',
    desc: 'Real-time disaster reporting and resource allocation platform using GIS mapping, satellite data, and community-driven alerts.', 
    category: 'Web Apps', 
    tech: ['React', 'Django', 'PostgreSQL', 'Mapbox', 'WebSockets'], 
    image: '/proj_disaster.png',
    duration: 'Feb 2023 - May 2023',
    role: 'Frontend Engineer',
    teamSize: '6 Members',
    deployment: 'AWS'
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const project = projectsData.find(p => p.id === id) || projectsData[1]; // Fallback to PIM if not found

  const tabs = ['Overview', 'Features', 'Architecture', 'Tech Stack', 'Screenshots', 'Video'];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-sky-400/5 blur-[100px]"></div>
      </div>

      <main className="pt-28 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link to="/#projects" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
              {project.title}
            </h1>
            <span className="inline-block px-4 py-1.5 bg-slate-800/50 backdrop-blur-md text-slate-300 rounded-full text-sm font-medium mb-6 border border-slate-700/50 shadow-sm">
              {project.subtitle}
            </span>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-xl">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-sm font-medium shadow-[0_0_10px_rgba(56,189,248,0.05)]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" className="rounded-full neon-glow hover:scale-105 transition-transform duration-300">
                <ExternalLink size={18} className="mr-2" /> Live Demo
              </Button>
              <Button variant="secondary" className="rounded-full hover:scale-105 transition-transform duration-300 bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-slate-500">
                <FaGithub size={18} className="mr-2" /> View Code
              </Button>
            </div>
          </motion.div>

          {/* Premium Image with Cinematic Effects */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full relative flex items-center justify-center group perspective-[1000px]"
          >
            {/* Cinematic Bloom Behind Illustration */}
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen"
            ></motion.div>
            
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5 }}
              className="relative z-10 w-[110%] h-auto drop-shadow-[0_20px_40px_rgba(56,189,248,0.25)]"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-contain"
                style={{ filter: 'contrast(1.1) brightness(1.1)' }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-24">
          
          <div className="lg:col-span-2">
            <div className="flex overflow-x-auto border-b border-slate-800/50 mb-8 pb-2 scrollbar-hide gap-2">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 py-3 font-medium rounded-t-lg transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-slate-800/40 text-primary border-b-2 border-primary neon-text' 
                      : 'border-b-2 border-transparent text-slate-400 hover:text-white hover:bg-slate-800/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass p-8 rounded-2xl border border-white/5 shadow-xl bg-slate-900/30 backdrop-blur-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span className="w-8 h-1 bg-primary mr-3 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
                {activeTab}
              </h2>
              
              <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                <p className="leading-relaxed">
                  {project.desc}
                </p>
                <p className="leading-relaxed mt-4">
                  Built to scale, this application utilizes modern cloud infrastructure and robust backend services to deliver a seamless user experience. By heavily optimizing database queries and utilizing robust caching mechanisms, the application achieves extremely low latency.
                </p>
                
                {activeTab === 'Features' && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 list-none pl-0">
                    {['Real-time Analytics', 'Role-Based Access Control', 'Multi-tenant Architecture', 'Automated Workflows', 'RESTful API Integration', 'Responsive Dashboard'].map((feature, idx) => (
                      <li key={idx} className="flex items-center bg-slate-800/40 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                        <span className="text-primary mr-3 text-xl">✦</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar Metadata */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass p-6 rounded-2xl border border-white/5 space-y-5 bg-slate-900/30 backdrop-blur-xl relative overflow-hidden"
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-4">
                <span className="text-slate-400 text-sm">Duration</span>
                <span className="text-white font-medium text-right">{project.duration}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-4">
                <span className="text-slate-400 text-sm">Team Size</span>
                <span className="text-white font-medium text-right">{project.teamSize}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-4">
                <span className="text-slate-400 text-sm">Role</span>
                <span className="text-white font-medium text-right">{project.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Deployment</span>
                <span className="text-primary font-medium text-right">{project.deployment}</span>
              </div>
            </motion.div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
