import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { global3DTunnel } from '../3d/Global3DEngine';
import { Float, Box } from '@react-three/drei';
import { Link } from 'react-router-dom';

// Background ambient 3D for the Blog section
const Blog3D = () => {
  return (
    <global3DTunnel.In>
      <group position={[0, -2, -6]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-6, 1, 0]}>
          <Box args={[1.2, 1.8, 0.1]} rotation={[0.2, 0.5, -0.1]}>
            <meshStandardMaterial color="#020617" emissive="#38BDF8" emissiveIntensity={0.3} wireframe />
          </Box>
        </Float>
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[6, 2, -1]}>
          <Box args={[1.5, 2, 0.1]} rotation={[-0.1, -0.6, 0.2]}>
            <meshStandardMaterial color="#020617" emissive="#7C3AED" emissiveIntensity={0.4} wireframe />
          </Box>
        </Float>
      </group>
    </global3DTunnel.In>
  );
};

const blogs = [
  {
    id: '1',
    title: 'Building Scalable SaaS Applications with MERN Stack',
    date: 'May 24, 2024',
    readTime: '8 min read',
    image: '/blog-saas.png',
  },
  {
    id: '2',
    title: 'How I Deploy Full Stack Apps on Vercel & Render',
    date: 'May 12, 2024',
    readTime: '6 min read',
    image: '/blog-deploy.png',
  },
  {
    id: '3',
    title: 'Authentication in Node.js with JWT & Refresh Tokens',
    date: 'Apr 28, 2024',
    readTime: '7 min read',
    image: '/blog-security.png',
  },
  {
    id: '4',
    title: 'Mastering TypeScript Interfaces vs Types',
    date: 'Jun 10, 2024',
    readTime: '5 min read',
    image: '/blog-ts.png',
  },
  {
    id: '5',
    title: 'Optimizing React Performance in 2024',
    date: 'Jun 02, 2024',
    readTime: '9 min read',
    image: '/blog-react.png',
  },
];

const Blog = () => {
  return (
    <section id="blog" className="relative w-full py-24 px-4 md:px-12 lg:px-24 overflow-hidden">
      <Blog3D />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="w-12 h-[2px] bg-primary mb-4"></span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">My Blog</h2>
          <p className="text-slate-400 max-w-2xl">Thoughts, tutorials & insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/blog/${blog.id}`} className="block h-full">
                <GlassCard hoverEffect className="overflow-hidden group h-full flex flex-col cursor-pointer">

                  {/* Premium Image Thumbnail */}
                  <div className="h-56 w-full relative overflow-hidden flex items-center justify-center border-b border-slate-800/50">
                    {/* Cinematic Bloom Behind Image */}
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full mix-blend-screen scale-150 group-hover:bg-purple-500/30 group-hover:scale-110 transition-all duration-700"></div>

                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10 drop-shadow-[0_10px_20px_rgba(56,189,248,0.2)]"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                      }}
                    />

                    {/* Glassmorphism overlay on hover */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="px-6 py-2 bg-primary/20 border border-primary/50 text-white rounded-full font-medium backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Read Article
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors flex-grow">
                      {blog.title}
                    </h3>
                    <div className="flex items-center justify-between text-slate-500 text-sm mt-auto">
                      <span>{blog.date}</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                        {blog.readTime}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-primary text-slate-950 font-bold rounded-full hover:bg-opacity-90 transition-all duration-300 neon-glow">
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
