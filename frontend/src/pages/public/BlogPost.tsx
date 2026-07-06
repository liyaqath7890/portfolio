import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';
import Navbar from '../../components/public/Navbar';

const blogsData = [
  {
    id: '1',
    title: 'Building Scalable SaaS Applications with MERN Stack',
    date: 'May 24, 2024',
    readTime: '8 min read',
    image: '/blog-saas.png',
    category: 'Architecture',
    content: `
      <h2>The Foundation of Modern SaaS</h2>
      <p>Building a Software as a Service (SaaS) application requires a solid foundation that can scale seamlessly as your user base grows. The MERN stack (MongoDB, Express.js, React, Node.js) provides an excellent ecosystem for building such robust applications.</p>
      
      <h3>Why MERN for SaaS?</h3>
      <p>The unified language (JavaScript/TypeScript) across the entire stack drastically reduces context switching for developers. This means faster feature delivery and easier maintenance.</p>
      
      <ul>
        <li><strong>MongoDB:</strong> Schema flexibility allows for rapid iteration of user models and multi-tenant architectures.</li>
        <li><strong>Express & Node.js:</strong> Lightweight and highly performant for handling asynchronous I/O, perfect for RESTful APIs or GraphQL endpoints.</li>
        <li><strong>React:</strong> Component-driven UI development ensures a consistent user experience and easy state management across complex dashboards.</li>
      </ul>

      <h3>Key Architectural Decisions</h3>
      <p>When starting, deciding between single-tenant and multi-tenant architectures is crucial. For most modern SaaS apps, a multi-tenant architecture with row-level security or tenant-specific collections in MongoDB is the way to go.</p>

      <blockquote>"Premature optimization is the root of all evil, but premature architecture is the root of scalable success."</blockquote>

      <p>Caching with Redis, offloading heavy processing to worker queues (like BullMQ), and implementing robust rate-limiting are non-negotiable for a production-ready SaaS.</p>
    `
  },
  {
    id: '2',
    title: 'How I Deploy Full Stack Apps on Vercel & Render',
    date: 'May 12, 2024',
    readTime: '6 min read',
    image: '/blog-deploy.png',
    category: 'DevOps',
    content: `
      <h2>The Modern Deployment Pipeline</h2>
      <p>Gone are the days of manually SSHing into servers to pull code and restart PM2. The modern deployment pipeline is all about automation, CI/CD, and serverless architectures.</p>
      
      <h3>Frontend on Vercel</h3>
      <p>Vercel is arguably the best platform for frontend deployments, especially for React/Next.js apps. The global CDN, automatic SSL, and PR preview deployments make the developer experience unmatched.</p>
      
      <h3>Backend on Render</h3>
      <p>While Vercel is great for serverless functions, traditional stateful Express apps or WebSockets need a long-running server. This is where Render shines. It's essentially the modern Heroku.</p>
      
      <pre><code>// Example Render build script
npm install
npm run build
npm run db:migrate</code></pre>

      <p>Connecting the two is as simple as setting up CORS correctly in your backend and providing the Render URL as an environment variable to your Vercel frontend.</p>
    `
  },
  {
    id: '3',
    title: 'Authentication in Node.js with JWT & Refresh Tokens',
    date: 'Apr 28, 2024',
    readTime: '7 min read',
    image: '/blog-security.png',
    category: 'Security',
    content: `
      <h2>Securing Your APIs</h2>
      <p>Authentication is often the most critical part of an application, yet it's frequently implemented with flaws. JWT (JSON Web Tokens) provides a stateless way to authenticate users, but they must be handled correctly.</p>
      
      <h3>The Access Token / Refresh Token Dance</h3>
      <p>Never store long-lived access tokens in localStorage. Doing so leaves your app vulnerable to XSS attacks. Instead, use a dual-token system:</p>
      
      <ol>
        <li><strong>Access Token:</strong> Short-lived (e.g., 15 mins), stored in memory, sent via Authorization header.</li>
        <li><strong>Refresh Token:</strong> Long-lived (e.g., 7 days), stored in an HTTP-only, secure cookie.</li>
      </ol>

      <p>When the access token expires, the client silently calls a /refresh endpoint. Because the refresh token is in an HTTP-only cookie, the browser automatically sends it, and the server responds with a fresh access token.</p>
      
      <h3>Implementation Details</h3>
      <p>Use libraries like <code>jsonwebtoken</code> for signing and verification. Always rotate refresh tokens upon use to detect and mitigate token theft.</p>
    `
  },
  {
    id: '4',
    title: 'Mastering TypeScript Interfaces vs Types',
    date: 'Jun 10, 2024',
    readTime: '5 min read',
    image: '/blog-ts.png',
    category: 'TypeScript',
    content: `
      <h2>The Great Debate: Type or Interface?</h2>
      <p>If you've written TypeScript, you've likely wondered whether to use <code>type</code> or <code>interface</code> to define your object shapes. The short answer? It often comes down to preference, but there are nuanced differences.</p>
      
      <h3>When to use Interfaces</h3>
      <p>Interfaces are excellent for defining object shapes and are highly extensible. They support declaration merging, which makes them ideal for defining public APIs or extending third-party libraries (like extending the Express Request object).</p>
      
      <h3>When to use Types</h3>
      <p>Types are more versatile. You can use them for unions, intersections, primitives, and mapped types. If you need a union type (<code>type Status = 'pending' | 'completed'</code>), you must use <code>type</code>.</p>
      
      <p>My rule of thumb: Start with interfaces for objects, and use types for everything else (unions, primitives, complex utility types).</p>
    `
  },
  {
    id: '5',
    title: 'Optimizing React Performance in 2024',
    date: 'Jun 02, 2024',
    readTime: '9 min read',
    image: '/blog-react.png',
    category: 'Frontend',
    content: `
      <h2>Keeping React Fast</h2>
      <p>React is fast by default, but complex applications can easily become sluggish if you don't pay attention to renders.</p>
      
      <h3>The usual suspects</h3>
      <ul>
        <li><strong>Unnecessary re-renders:</strong> Passing new object references as props on every render.</li>
        <li><strong>Heavy computations:</strong> Running expensive operations directly in the render body instead of using <code>useMemo</code>.</li>
        <li><strong>Prop drilling:</strong> Passing props down too many levels, causing the whole tree to re-render.</li>
      </ul>

      <h3>Modern Solutions</h3>
      <p>With React Server Components (RSC) becoming more prevalent, the paradigm is shifting. However, for client-side apps, mastering <code>useCallback</code>, <code>useMemo</code>, and state colocation remains essential.</p>
      <p>Always measure before you optimize. Use the React Profiler to find actual bottlenecks rather than guessing.</p>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    window.scrollTo(0, 0);
    const foundBlog = blogsData.find(b => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <Link to="/#blog" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]"></div>
      </div>

      <main className="pt-28 pb-20 px-4 md:px-12 lg:px-24 max-w-4xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link to="/#blog" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </Link>

        {/* Article Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <div className="flex items-center text-slate-400 text-sm gap-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {blog.title}
          </h1>

          <div className="w-full h-[400px] rounded-2xl overflow-hidden relative border border-slate-800/50 shadow-2xl">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
              }}
            />
          </div>
        </motion.header>

        {/* Actions bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between py-4 border-y border-slate-800/50 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center font-bold">
              ME
            </div>
            <div>
              <p className="font-medium text-white">Liyaqath</p>
              <p className="text-xs text-slate-400">Software Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full glass hover:bg-slate-800 hover:text-primary transition-colors text-slate-400" title="Share">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-full glass hover:bg-slate-800 hover:text-primary transition-colors text-slate-400" title="Save">
              <Bookmark size={18} />
            </button>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0f172a] prose-pre:border prose-pre:border-slate-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer actions */}
        <div className="mt-16 pt-8 border-t border-slate-800/50 flex justify-center">
          <Link to="/#blog" className="px-8 py-3 glass text-white font-bold rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 border border-primary/30 hover:border-primary neon-glow">
            Read More Articles
          </Link>
        </div>

      </main>
    </div>
  );
};

export default BlogPost;
