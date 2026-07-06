import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, X, Image as ImageIcon, PlayCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Line, Html, Box, Cylinder, Plane } from '@react-three/drei';
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
  const [show3DDemo, setShow3DDemo] = useState(false);

  const project = projectsData.find(p => p.id === id) || projectsData[1]; // Fallback to PIM if not found

  const tabs = ['Overview', 'Features', 'Workflow', 'Architecture', 'Tech Stack', 'Screenshots', 'Video'];

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
              <Button onClick={() => setShow3DDemo(true)} variant="primary" className="rounded-full neon-glow hover:scale-105 transition-transform duration-300">
                <ExternalLink size={18} className="mr-2" /> Live Demo
              </Button>
              <a href="https://github.com/liyaqath7890/portfolio" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-full hover:scale-105 transition-transform duration-300 bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-slate-500">
                  <FaGithub size={18} className="mr-2" /> View Code
                </Button>
              </a>
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
                
                {activeTab === 'Workflow' && (
                  <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-slate-900 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          1
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-700 bg-slate-800/50 shadow">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-white">Requirements & Planning</div>
                          </div>
                          <div className="text-slate-400">Collaborated closely with stakeholders to map out user journeys, define architecture, and setup initial database schemas.</div>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-slate-900 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          2
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-700 bg-slate-800/50 shadow">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-white">Design & Prototyping</div>
                          </div>
                          <div className="text-slate-400">Created high-fidelity wireframes in Figma. Established a design system with reusable Tailwind components for consistency.</div>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-slate-900 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          3
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-700 bg-slate-800/50 shadow">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-white">Backend & APIs</div>
                          </div>
                          <div className="text-slate-400">Developed robust REST APIs using Node/Express. Implemented JWT auth, rate limiting, and complex aggregations.</div>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-slate-900 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          4
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-700 bg-slate-800/50 shadow">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-white">Frontend Integration</div>
                          </div>
                          <div className="text-slate-400">Connected React components to the backend APIs using Redux Toolkit/React Query. Optimized rendering for performance.</div>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-slate-900 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          5
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-700 bg-slate-800/50 shadow">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-white">Deployment & CI/CD</div>
                          </div>
                          <div className="text-slate-400">Set up GitHub Actions for automated testing. Deployed frontend to Vercel and backend to Render/AWS.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Screenshots' && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="relative group overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/20 aspect-video flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/20 transition-colors duration-300 z-10"></div>
                        <ImageIcon size={48} className="text-slate-600 group-hover:scale-110 group-hover:text-primary transition-all duration-300 relative z-20 opacity-50" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 to-transparent z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">Screenshot {num} Placeholder</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Video' && (
                  <div className="mt-8 relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 aspect-video flex items-center justify-center group cursor-pointer shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-600/10"></div>
                    <PlayCircle size={64} className="text-white/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300 relative z-10 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                    <div className="absolute bottom-6 left-6 text-white font-bold tracking-wide z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Watch Walkthrough
                    </div>
                  </div>
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

      {/* 3D Demo Modal */}
      <AnimatePresence>
        {show3DDemo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setShow3DDemo(false)}></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-[90vw] h-[80vh] max-w-6xl rounded-3xl overflow-hidden glass border border-slate-700/50 shadow-[0_0_50px_rgba(56,189,248,0.2)] bg-[#040814]"
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 bg-gradient-to-b from-slate-900/80 to-transparent">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Workflow Simulation</h3>
                  <p className="text-primary text-sm font-medium">Interactive 3D Data Flow</p>
                </div>
                <button 
                  onClick={() => setShow3DDemo(false)}
                  className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-red-500/50 transition-colors border border-white/10 hover:border-red-500"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* 3D Canvas */}
              <div className="w-full h-full relative z-10 cursor-move">
                <Canvas camera={{ position: [10, 8, 10], fov: 40 }} shadows>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[0, 5, 0]} intensity={1} color="#38bdf8" distance={20} />
                  <spotLight position={[10, 15, 10]} intensity={1.5} color="#8b5cf6" angle={0.3} penumbra={1} castShadow />
                  
                  <group position={[0, -2, 0]}>
                    {/* Motherboard Base */}
                    <Box args={[12, 0.2, 12]} position={[0, -0.1, 0]} receiveShadow>
                      <meshStandardMaterial color="#020617" metalness={0.8} roughness={0.2} />
                    </Box>
                    
                    {/* Glowing Grid Lines on Base */}
                    <gridHelper args={[12, 12, "#38bdf8", "#1e293b"]} position={[0, 0.01, 0]} />

                    {/* Central CPU Core */}
                    <group position={[0, 0.5, 0]}>
                      <Cylinder args={[2, 2.2, 1, 8]} position={[0, 0, 0]} castShadow>
                        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
                      </Cylinder>
                      <Cylinder args={[1.5, 1.5, 1.1, 8]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} wireframe />
                      </Cylinder>
                      <Float speed={3} rotationIntensity={0.5} floatIntensity={1} position={[0, 1.5, 0]}>
                        <Box args={[1, 1, 1]} rotation={[Math.PI/4, Math.PI/4, 0]}>
                          <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={1} wireframe />
                        </Box>
                      </Float>
                    </group>

                    {/* Dynamic Server Nodes based on Tech Stack */}
                    {project.tech.map((tech, index) => {
                      const angle = (index / project.tech.length) * Math.PI * 2;
                      const radius = 4.5;
                      const x = Math.cos(angle) * radius;
                      const z = Math.sin(angle) * radius;
                      
                      const colors = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];
                      const color = colors[index % colors.length];

                      return (
                        <group key={tech} position={[x, 0, z]}>
                          {/* Data Connection Line to Core */}
                          <Line 
                            points={[[0, 0.5, 0], [0, 0.1, 0], [x * 0.5, 0.1, z * 0.5], [x, 0.1, z]]} 
                            color={color} 
                            lineWidth={2} 
                            dashed 
                            dashScale={5} 
                            dashSize={2} 
                            dashOffset={index} 
                          />
                          
                          {/* Server Rack */}
                          <Box args={[1.2, 2, 1.2]} position={[0, 1, 0]} castShadow>
                            <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.2} />
                          </Box>
                          {/* Server Glowing Accents */}
                          <Box args={[1.3, 0.1, 1.3]} position={[0, 0.5, 0]}>
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
                          </Box>
                          <Box args={[1.3, 0.1, 1.3]} position={[0, 1.5, 0]}>
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
                          </Box>

                          {/* Holographic Screen */}
                          <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[0, 3, 0]}>
                            <Plane args={[2, 1]}>
                              <meshStandardMaterial side={2} color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.2} />
                            </Plane>
                            {/* Screen Frame */}
                            <Line points={[[-1, -0.5, 0], [1, -0.5, 0], [1, 0.5, 0], [-1, 0.5, 0], [-1, -0.5, 0]]} color={color} lineWidth={1} />
                            
                            <Html transform center position={[0, 0, 0.05]}>
                              <div className="flex flex-col items-center justify-center pointer-events-none select-none">
                                <span className="text-[10px] text-slate-300 uppercase tracking-widest mb-1 opacity-80">Node Active</span>
                                <div className="bg-slate-950/80 backdrop-blur-md px-4 py-1.5 border border-white/20 rounded shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}></div>
                                  <span className="text-sm font-bold text-white tracking-wider whitespace-nowrap">{tech}</span>
                                </div>
                              </div>
                            </Html>
                          </Float>
                        </group>
                      );
                    })}
                  </group>

                  <OrbitControls 
                    enableZoom={true} 
                    autoRotate 
                    autoRotateSpeed={0.8} 
                    maxPolarAngle={Math.PI / 2.2} 
                    minPolarAngle={Math.PI / 6} 
                    target={[0, -1, 0]}
                  />
                </Canvas>
              </div>
              
              {/* Footer instructions */}
              <div className="absolute bottom-6 left-0 right-0 text-center z-20 pointer-events-none">
                <p className="inline-block px-4 py-2 rounded-full glass border border-white/5 text-slate-400 text-sm tracking-widest uppercase">
                  Drag to rotate • Scroll to zoom
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
