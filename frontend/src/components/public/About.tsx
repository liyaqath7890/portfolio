import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { global3DTunnel } from '../3d/Global3DEngine';
import { Float, Box, RoundedBox, Plane, Text, Sphere } from '@react-three/drei';
import { MonitorPlay, Server, Database, Container } from 'lucide-react';

const About3D = () => {
  const floatingIcons = [
    { pos: [-3, 2, 1], label: 'React', color: '#61DAFB' },
    { pos: [-2, 4, -1], label: 'Node', color: '#339933' },
    { pos: [0, 4.5, -2], label: 'TS', color: '#3178C6' },
    { pos: [2.5, 3.5, -1], label: 'Git', color: '#F05032' },
    { pos: [3.5, 1.5, 1], label: 'Docker', color: '#2496ED' },
    { pos: [-4, 0, 0], label: 'SQL', color: '#336791' },
    { pos: [4, -0.5, 0], label: 'Mongo', color: '#47A248' },
  ];

  return (
    <global3DTunnel.In>
      <group position={[1.0, -1.5, -3]} scale={1.0}> {/* Restored original global position and moved left */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group rotation={[0.1, -0.4, 0]}>
            
            {/* Highly Detailed Laptop */}
            <group position={[0, -0.5, 0]}>
              {/* Laptop Base (Metallic) */}
              <RoundedBox args={[3.8, 0.1, 2.5]} radius={0.05} position={[0, 0, 0]}>
                <meshPhysicalMaterial color="#0F172A" metalness={0.9} roughness={0.1} clearcoat={1} />
              </RoundedBox>
              {/* Keyboard Indent */}
              <RoundedBox args={[3.4, 0.05, 1.4]} radius={0.02} position={[0, 0.05, 0.4]}>
                <meshPhysicalMaterial color="#020617" metalness={0.8} roughness={0.5} />
              </RoundedBox>
              {/* Glowing Edge on Base */}
              <RoundedBox args={[3.85, 0.02, 2.55]} radius={0.05} position={[0, -0.05, 0]}>
                 <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={1.5} toneMapped={false} />
              </RoundedBox>
              {/* Trackpad */}
              <Plane args={[1.0, 0.6]} position={[0, 0.06, 1.7]} rotation={[-Math.PI/2, 0, 0]}>
                <meshPhysicalMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
              </Plane>

              {/* Laptop Screen (Tilted open) */}
              <group position={[0, 0.05, -1.25]} rotation={[0.2, 0, 0]}>
                {/* Screen Back */}
                <RoundedBox args={[3.8, 2.4, 0.08]} radius={0.04} position={[0, 1.2, 0]}>
                  <meshPhysicalMaterial color="#0F172A" metalness={0.9} roughness={0.1} clearcoat={1} />
                </RoundedBox>
                {/* Screen Display */}
                <Plane args={[3.6, 2.2]} position={[0, 1.2, 0.05]}>
                  <meshStandardMaterial color="#020617" emissive="#0284C7" emissiveIntensity={1} toneMapped={false} />
                </Plane>
                {/* Glowing Code / Visuals on Screen */}
                {[...Array(10)].map((_, i) => (
                  <Plane key={i} args={[3.0 * Math.random() + 0.5, 0.04]} position={[-1.5 + Math.random(), 2.0 - i*0.18, 0.06]}>
                     <meshBasicMaterial color={i % 3 === 0 ? "#38BDF8" : "#8B5CF6"} toneMapped={false} />
                  </Plane>
                ))}
              </group>
            </group>

            {/* Glowing Burst / Particles emerging from Laptop */}
            {[...Array(50)].map((_, i) => (
               <Float key={`burst-${i}`} speed={2 + Math.random()*2} rotationIntensity={3} floatIntensity={5} position={[(Math.random() - 0.5) * 6, 1 + Math.random() * 5, (Math.random() - 0.5) * 4]}>
                  <Sphere args={[0.03 + Math.random()*0.05, 8, 8]}>
                    <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={2.0} toneMapped={false} />
                  </Sphere>
               </Float>
            ))}

            {/* Floating Tech Panels (Rounded Glass Squares) */}
            {floatingIcons.map((icon, i) => (
              <Float key={`icon-${i}`} speed={1.5} rotationIntensity={0.5} floatIntensity={1.5} position={icon.pos as [number, number, number]}>
                <group rotation={[0.1, -0.2, 0]}>
                  {/* Glass Panel */}
                  <RoundedBox args={[1.4, 1.4, 0.1]} radius={0.15}>
                    <meshPhysicalMaterial 
                      color="#0F172A" 
                      metalness={0.4} 
                      roughness={0.1} 
                      transmission={0.9} 
                      thickness={0.5} 
                      ior={1.5} 
                      clearcoat={1} 
                    />
                  </RoundedBox>
                  {/* Glowing Edge */}
                  <RoundedBox args={[1.45, 1.45, 0.05]} radius={0.15}>
                    <meshStandardMaterial color={icon.color} emissive={icon.color} emissiveIntensity={1.0} transparent opacity={0.8} toneMapped={false} />
                  </RoundedBox>
                  {/* Inner Icon Representation */}
                  <Plane args={[0.6, 0.6]} position={[0, 0.2, 0.06]}>
                     <meshStandardMaterial color={icon.color} emissive={icon.color} emissiveIntensity={1.5} toneMapped={false} />
                  </Plane>
                  <Text position={[0, -0.35, 0.06]} fontSize={0.22} color="#ffffff" material-toneMapped={false}>
                    {icon.label}
                  </Text>
                </group>
              </Float>
            ))}

            {/* Shattered Glass Debris Background */}
            {[...Array(30)].map((_, i) => (
               <Float key={`debris-${i}`} speed={1} rotationIntensity={1} floatIntensity={2} position={[(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10, -5 + (Math.random() - 0.5) * 5]}>
                  <Box args={[0.2 + Math.random()*0.5, 0.2 + Math.random()*0.5, 0.2 + Math.random()*0.5]} rotation={[Math.random(), Math.random(), Math.random()]}>
                    <meshPhysicalMaterial color="#38BDF8" metalness={0.5} roughness={0.1} transmission={0.9} thickness={0.5} ior={1.5} clearcoat={1} />
                  </Box>
               </Float>
            ))}
          </group>
        </Float>
      </group>
    </global3DTunnel.In>
  );
};

const About = () => {
  return (
    <section id="about" className="relative w-full py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-12 h-[2px] bg-primary"></span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 leading-tight">
              Passionate Full Stack Developer <br /> building enterprise solutions
            </h3>

            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              I specialize in building scalable, high-performance web applications using the MERN stack. I love turning ideas into impactful products that solve real-world problems.
            </p>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              With a strong foundation in frontend UI/UX and robust backend architecture, my goal is to build software that is visually stunning, highly secure, and architecturally sound for the modern web.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { number: '6+', label: 'Experience' },
                { number: '10+', label: 'Projects' },
                { number: '100%', label: 'Client Satisfaction' },
                { number: 'Agile', label: 'Development' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 glass rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                  <span className="text-3xl font-bold text-white neon-text mb-2">{stat.number}</span>
                  <span className="text-slate-500 text-xs text-center uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium 3D Visual Content (WebGL) */}
          <div className="relative w-full aspect-square max-w-2xl mx-auto lg:ml-auto flex items-center justify-end pointer-events-none sticky top-32">
            {/* Cinematic Bloom Behind 3D */}
            <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-3000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-purple-600/10 blur-[100px] mix-blend-screen rounded-full"></div>
            
            {/* Tunnel injection for interactive 3D scene */}
            <About3D />
          </div>
        </div>

        {/* Skill Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            { icon: <MonitorPlay size={28} className="text-sky-400" />, title: 'Frontend', desc: 'React, TS, Tailwind' },
            { icon: <Server size={28} className="text-purple-400" />, title: 'Backend', desc: 'Node.js, Express.js' },
            { icon: <Database size={28} className="text-blue-400" />, title: 'Database', desc: 'PostgreSQL, MongoDB' },
            { icon: <Container size={28} className="text-teal-400" />, title: 'DevOps', desc: 'Docker, Vercel, Render' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hoverEffect className="p-6 flex flex-col items-center text-center group border border-white/5 hover:border-primary/50 transition-all duration-300">
                <div className="mb-4 p-4 rounded-full bg-slate-900/80 border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
