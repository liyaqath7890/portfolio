import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { global3DTunnel } from '../3d/Global3DEngine';
import { Float, Box, RoundedBox, Text, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

const Experience3D = () => {
  // Arrow curve path
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, -0.5, 2.5),
      new THREE.Vector3(-1.5, 0.5, 1.5),
      new THREE.Vector3(1, 1.5, 0),
      new THREE.Vector3(3.5, 2.5, -1)
    ]);
  }, []);

  const backRow = [
    { pos: [-2.4, 0.8, -0.5], label: 'React', color: '#61DAFB' },
    { pos: [-1.2, 0.8, -0.5], label: 'Node.js', color: '#339933' },
    { pos: [0, 0.8, -0.5], label: 'Express', color: '#ffffff' },
    { pos: [1.2, 0.8, -0.5], label: 'MongoDB', color: '#47A248' },
    { pos: [2.4, 0.8, -0.5], label: 'PostgreSQL', color: '#336791' },
  ];

  const frontRow = [
    { pos: [-2.4, 0.5, 1], label: 'TypeScript', color: '#3178C6' },
    { pos: [-1.2, 0.5, 1], label: 'JavaScript', color: '#F7DF1E' },
    { pos: [0, 0.5, 1], label: 'Docker', color: '#2496ED' },
    { pos: [1.2, 0.5, 1], label: 'AWS', color: '#FF9900' },
    { pos: [2.4, 0.5, 1], label: 'Git', color: '#F05032' },
  ];

  const allBlocks = [...backRow, ...frontRow];

  return (
    <global3DTunnel.In>
      <group position={[1.0, -2.5, -2]} scale={1.2}>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <group rotation={[0.4, -0.5, 0]}>
            
            {/* Holographic Base Platforms */}
            <group position={[0, -0.6, 0]}>
              {/* Bottom Base (Wider, Purple Glow) */}
              <RoundedBox args={[7.5, 0.4, 4.5]} radius={0.15} position={[0, -0.2, 0.2]}>
                <meshPhysicalMaterial color="#020617" metalness={0.9} roughness={0.2} clearcoat={0.8} />
              </RoundedBox>
              {/* Purple Glowing Edge */}
              <RoundedBox args={[7.6, 0.1, 4.6]} radius={0.15} position={[0, -0.2, 0.2]}>
                <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={1.5} transparent opacity={0.9} toneMapped={false} />
              </RoundedBox>
              
              {/* Top Base (Cyan Glow) */}
              <RoundedBox args={[6.8, 0.4, 3.8]} radius={0.15} position={[0, 0.2, 0.2]}>
                <meshPhysicalMaterial color="#0F172A" metalness={0.8} roughness={0.2} clearcoat={0.8} />
              </RoundedBox>
              {/* Cyan Glowing Edge */}
              <RoundedBox args={[6.9, 0.1, 3.9]} radius={0.15} position={[0, 0.2, 0.2]}>
                <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.5} transparent opacity={0.9} toneMapped={false} />
              </RoundedBox>
            </group>

            {/* Glowing Tech Blocks */}
            <group position={[0, -0.1, 0]}>
              {allBlocks.map((block, i) => (
                <group key={i} position={block.pos as [number, number, number]}>
                  {/* Block Body - Tall Rounded Rectangle */}
                  <RoundedBox args={[0.95, 1.4, 0.95]} radius={0.2} position={[0, 0.7, 0]}>
                    <meshPhysicalMaterial 
                      color="#0F172A" 
                      metalness={0.9} 
                      roughness={0.2} 
                      clearcoat={1}
                    />
                  </RoundedBox>
                  
                  {/* Top Glowing Edge / Cap */}
                  <RoundedBox args={[0.96, 0.05, 0.96]} radius={0.2} position={[0, 1.35, 0]}>
                    <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.5} toneMapped={false} />
                  </RoundedBox>

                  {/* Floating Tech Label */}
                  <Text 
                    position={[0, 0.3, 0.51]} 
                    fontSize={0.14} 
                    color="#94A3B8"
                    anchorX="center" 
                    anchorY="middle"
                    material-toneMapped={false}
                  >
                    {block.label}
                  </Text>
                  
                  {/* Colored Icon Placeholder */}
                  <group position={[0, 0.8, 0.48]}>
                    {/* Glowing Core */}
                    <Box args={[0.3, 0.3, 0.05]}>
                      <meshStandardMaterial color={block.color} emissive={block.color} emissiveIntensity={2.0} toneMapped={false} />
                    </Box>
                    {/* Glass Shell over icon */}
                    <Box args={[0.35, 0.35, 0.08]}>
                      <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} thickness={0.1} ior={1.5} />
                    </Box>
                  </group>
                </group>
              ))}
            </group>

            {/* Glowing Upward Arrow */}
            <group position={[0, -0.2, 0]}>
              {/* Outer Cyan Glass Tube */}
              <mesh>
                <tubeGeometry args={[curve, 64, 0.25, 16, false]} />
                <meshPhysicalMaterial color="#06B6D4" transmission={0.9} opacity={0.6} transparent roughness={0.1} thickness={0.5} ior={1.5} clearcoat={1} />
              </mesh>
              {/* Inner intense core for arrow */}
              <mesh>
                <tubeGeometry args={[curve, 64, 0.08, 16, false]} />
                <meshStandardMaterial color="#ffffff" emissive="#06B6D4" emissiveIntensity={3.0} toneMapped={false} />
              </mesh>

              {/* Arrow Head */}
              <group position={[3.5, 2.5, -1]} rotation={[0, Math.PI / 4, Math.PI / 2 + 0.3]}>
                {/* Outer Glass Cone */}
                <Cylinder args={[0, 0.6, 1.2, 32]} rotation={[0, 0, Math.PI / 2]}>
                    <meshPhysicalMaterial color="#06B6D4" transmission={0.9} transparent opacity={0.6} roughness={0.1} thickness={0.5} clearcoat={1} />
                </Cylinder>
                {/* Inner Glowing Core */}
                <Cylinder args={[0, 0.3, 1.0, 32]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#ffffff" emissive="#06B6D4" emissiveIntensity={3.0} toneMapped={false} />
                </Cylinder>
              </group>
            </group>

            {/* Shattered Rocks / Particles */}
            {[...Array(40)].map((_, i) => (
               <Float key={i} speed={1.5 + i*0.2} rotationIntensity={3} floatIntensity={4} position={[(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}>
                  <Box args={[0.1 + Math.random()*0.4, 0.1 + Math.random()*0.4, 0.1 + Math.random()*0.4]} rotation={[Math.random(), Math.random(), Math.random()]}>
                    <meshPhysicalMaterial color="#0F172A" metalness={0.9} roughness={0.2} clearcoat={1} />
                  </Box>
               </Float>
            ))}
            {/* Glowing Particles */}
            {[...Array(30)].map((_, i) => (
               <Float key={`glow-${i}`} speed={2 + i*0.5} rotationIntensity={2} floatIntensity={3} position={[(Math.random() - 0.5) * 12, Math.random() * 8, (Math.random() - 0.5) * 10]}>
                  <Sphere args={[0.03 + Math.random()*0.05, 8, 8]}>
                    <meshStandardMaterial color={i % 2 === 0 ? "#06B6D4" : "#A855F7"} emissive={i % 2 === 0 ? "#06B6D4" : "#A855F7"} emissiveIntensity={2.5} toneMapped={false} />
                  </Sphere>
               </Float>
            ))}
          </group>
        </Float>
      </group>
    </global3DTunnel.In>
  );
};

const experiences = [
  {
    id: 1,
    company: 'Maskan Technologies',
    role: 'Software Developer Intern',
    duration: 'Current',
    points: [
      'Developing enterprise SaaS applications including PIM, Inventory, School Management & Restaurant System.',
      'Building responsive web apps using React.js, TypeScript and Tailwind CSS.',
      'Developing RESTful APIs with Node.js, Express.js & PostgreSQL.',
      'Implementing Role-Based Access Control (RBAC) and JWT Authentication.',
      'Working with Agile methodology and Git workflows.',
    ],
  },
  {
    id: 2,
    company: 'Innovate Digital Academy',
    role: 'Full Stack Development Trainee',
    duration: 'Jan 2024 - Feb 2024',
    points: [
      'Trained in MERN Stack development.',
      'Built multiple real-world projects.',
      'Learned best practices and clean code.',
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative w-full py-24 px-4 md:px-12 lg:px-24 bg-slate-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[2px] bg-primary"></span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">My Experience</h2>
          </div>
          <p className="text-slate-400">My professional journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Timeline */}
          <div className="relative border-l border-primary/30 pl-8 space-y-12 z-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-primary shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>

                <GlassCard className="p-8 hover:border-primary/50 transition-colors duration-300 bg-slate-900/40 backdrop-blur-xl">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                      <h4 className="text-primary font-medium">{exp.role}</h4>
                    </div>
                    <span className="text-slate-400 text-sm mt-2 md:mt-0 px-3 py-1 bg-slate-800 rounded-full border border-white/5">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-3 mt-6">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start text-slate-400 text-sm leading-relaxed">
                        <span className="text-primary mr-3 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Premium 3D Visual Content (WebGL) */}
          <div className="relative w-full aspect-square max-w-2xl mx-auto lg:ml-auto flex items-center justify-end pointer-events-none sticky top-32">
            {/* Cinematic Bloom Behind 3D */}
            <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-3000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-purple-600/10 blur-[100px] mix-blend-screen rounded-full"></div>
            
            {/* Tunnel injection for interactive 3D scene */}
            <Experience3D />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
