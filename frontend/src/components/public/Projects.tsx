import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';

const projects = [
  { id: 1, title: 'AI Job Platform', desc: 'An intelligent platform connecting top talent with the right opportunities using advanced neural networks and NLP algorithms for resume parsing and matching.', category: 'AI/ML', tech: 'MERN Stack', image: '/proj_ai_job.png' },
  { id: 2, title: 'Product Information Management (PIM)', desc: 'A multi-tenant SaaS platform to manage product catalogs, variants, attributes, assets, and categories with role-based access control.', category: 'Management', tech: 'MERN Stack', image: '/proj_pim.png' },
  { id: 3, title: 'Inventory Management', desc: 'A complete inventory tracking system with barcode scanning, automated reordering, and real-time analytics for medium to large warehouses.', category: 'Management', tech: 'MERN Stack', image: '/proj_inventory.png' },
  { id: 4, title: 'School Management', desc: 'A comprehensive ERP handling student enrollments, attendance, grading, fee management, and parent-teacher communication portals.', category: 'SaaS', tech: 'MERN Stack', image: '/proj_school.png' },
  { id: 5, title: 'Restaurant System', desc: 'A modern POS and table management system with kitchen display screens, online ordering integration, and inventory tracking.', category: 'SaaS', tech: 'MERN Stack', image: '/proj_restaurant.png' },
  { id: 6, title: 'Disaster Management', desc: 'Real-time disaster reporting and resource allocation platform using GIS mapping, satellite data, and community-driven alerts.', category: 'Web Apps', tech: 'MERN Stack', image: '/proj_disaster.png' },
];

const categories = ['All', 'SaaS', 'Management', 'AI/ML', 'Web Apps'];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="relative w-full py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="w-12 h-[2px] bg-primary mb-4"></span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">My Projects</h2>
          <p className="text-slate-400 max-w-2xl">Enterprise solutions that make a difference.</p>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-primary text-slate-950 neon-glow' 
                    : 'glass text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link to={`/project/${project.id}`} className="block h-full">
                <GlassCard hoverEffect className="overflow-hidden group h-full flex flex-col cursor-pointer border border-slate-700/50 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-500 rounded-2xl bg-[#0B1120]/80">
                  
                  {/* Premium Image Thumbnail with Bloom & Parallax Hover */}
                  <div className="h-56 w-full relative overflow-hidden flex items-center justify-center border-b border-slate-800/50 bg-[#070B14]">
                    {/* Cinematic Bloom Behind Image */}
                    <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full mix-blend-screen scale-150 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-700"></div>
                    
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10 drop-shadow-[0_10px_20px_rgba(56,189,248,0.2)]"
                    />
                    
                    {/* Glassmorphism overlay on hover */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="px-6 py-2 bg-primary/20 border border-primary/50 text-white rounded-full font-medium backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Case Study
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-transparent to-slate-900/50">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">{project.desc}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                        {project.tech}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => setActiveTab('All')}
            className="px-8 py-3 glass text-white font-bold rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 border border-primary/30 hover:border-primary neon-glow inline-block"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
