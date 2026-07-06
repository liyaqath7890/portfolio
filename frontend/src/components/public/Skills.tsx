import { useState } from 'react';
import { motion } from 'framer-motion';
import { Float, Torus } from '@react-three/drei';
import { global3DTunnel } from '../3d/Global3DEngine';

const Skills3D = () => {
  return (
    <global3DTunnel.In>
      <group position={[0, -2, -5]}>
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <Torus args={[8, 0.05, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
            <meshStandardMaterial color="#38BDF8" emissive="#0EA5E9" emissiveIntensity={2} />
          </Torus>
        </Float>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5} position={[0, -1, 0]}>
          <Torus args={[12, 0.02, 16, 100]} rotation={[Math.PI / 2.2, 0, 0]}>
            <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1} />
          </Torus>
        </Float>
      </group>
    </global3DTunnel.In>
  );
};

const skillsData = [
  { name: 'React', category: 'Frontend', icon: '⚛️', color: 'text-sky-400', desc: 'Component-driven UI development & state management' },
  { name: 'TypeScript', category: 'Frontend', icon: 'TS', color: 'text-blue-500', desc: 'Static typing for robust, scalable applications' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: '🌊', color: 'text-teal-400', desc: 'Utility-first styling for rapid, responsive design' },
  { name: 'Next.js', category: 'Frontend', icon: 'N', color: 'text-white', desc: 'Server-side rendering & full-stack React framework' },
  { name: 'Node.js', category: 'Backend', icon: '🟩', color: 'text-green-500', desc: 'Event-driven, non-blocking I/O for scalable APIs' },
  { name: 'Express.js', category: 'Backend', icon: 'EX', color: 'text-slate-300', desc: 'Fast, unopinionated minimalist web framework' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: 'text-blue-400', desc: 'Advanced open-source relational database' },
  { name: 'MongoDB', category: 'Database', icon: '🍃', color: 'text-green-600', desc: 'Flexible NoSQL document database for modern apps' },
  { name: 'Docker', category: 'DevOps', icon: '🐳', color: 'text-blue-500', desc: 'Containerization for consistent deployment environments' },
  { name: 'Git', category: 'Tools', icon: '🌲', color: 'text-orange-500', desc: 'Distributed version control & collaboration' },
  { name: 'GitHub', category: 'Tools', icon: '🐙', color: 'text-white', desc: 'Code hosting, CI/CD, & open-source contribution' },
  { name: 'Vercel', category: 'DevOps', icon: '▲', color: 'text-white', desc: 'Edge network deployment & serverless functions' },
];

const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  return (
    <section id="skills" className="relative w-full py-24 px-4 md:px-12 lg:px-24 overflow-hidden">
      <Skills3D />
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">My Skills</h2>
          <p className="text-slate-400">Technologies & tools I work with</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-primary/20 text-primary border border-primary neon-glow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 w-full place-items-center">
          {skillsData.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`flex flex-col items-center transition-all duration-500 ${activeCategory !== skill.category ? 'hidden' : 'flex opacity-100 scale-100'}`}
            >
              <div className="relative group cursor-pointer">
                {/* 3D Base/Stand effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all duration-500"></div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-[50%] border-b border-primary/50 shadow-[0_10px_20px_rgba(56,189,248,0.3)]"></div>
                
                {/* Floating Icon */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + (i % 2), ease: "easeInOut" }}
                  className="relative z-10 w-24 h-24 rounded-full glass border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300"
                >
                  <span className={`text-4xl font-black ${skill.color}`}>
                    {skill.icon}
                  </span>
                </motion.div>
              </div>
              <div className="text-center mt-3 max-w-[150px]">
                <span className="text-white font-semibold tracking-wide block text-lg">{skill.name}</span>
                <span className="text-slate-400 text-xs mt-1 block leading-tight">{skill.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <button className="px-8 py-3 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary/20 transition-all duration-300 border border-primary/50 hover:neon-glow">
            Download Resume
          </button>
        </div>

      </div>
    </section>
  );
};

export default Skills;
