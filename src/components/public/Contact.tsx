import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Briefcase, Loader2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { global3DTunnel } from '../3d/Global3DEngine';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Contact3D = () => {
  return (
    <global3DTunnel.In>
      <group position={[-4, -2, -2]}>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          {/* Main Globe */}
          <Sphere args={[3, 64, 64]} rotation={[0.5, 0.5, 0]}>
            <meshStandardMaterial 
              color="#020617" 
              emissive="#2563EB" 
              emissiveIntensity={0.5}
              wireframe={true}
              transparent
              opacity={0.3}
            />
          </Sphere>
          
          {/* Inner Core */}
          <Sphere args={[2.8, 32, 32]}>
            <MeshDistortMaterial 
              color="#0F172A"
              emissive="#38BDF8"
              emissiveIntensity={0.8}
              distort={0.4}
              speed={2}
            />
          </Sphere>
        </Float>
      </group>
    </global3DTunnel.In>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 md:px-12 lg:px-24 bg-slate-900/20 overflow-hidden">
      
      {/* 3D Visual Content via Tunnel */}
      <Contact3D />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="w-12 h-[2px] bg-primary mb-4"></span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Get In Touch</h2>
          <p className="text-slate-400 max-w-2xl">Have a project in mind or want to work together? Feel free to reach out!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg mb-1">Email</h4>
                <p className="text-slate-400">liyaqathali385@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg mb-1">Phone</h4>
                <p className="text-slate-400">+91 7795478115</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg mb-1">Location</h4>
                <p className="text-slate-400">Bangalore, India</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <Briefcase size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg mb-1">Availability</h4>
                <p className="text-slate-400">Open to work</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                  <div className="h-48 w-full mb-6 relative">
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[2, 2, 2]} intensity={1.5} color="#22C55E" />
                      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                        <Sphere args={[1.5, 32, 32]}>
                          <meshStandardMaterial color="#020617" emissive="#22C55E" emissiveIntensity={0.8} wireframe />
                        </Sphere>
                      </Float>
                    </Canvas>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 neon-text">Thank You!</h3>
                  <p className="text-slate-400 mb-8">Your message has been sent successfully. I'll get back to you soon.</p>
                  <Button 
                    variant="primary" 
                    className="rounded-full px-8"
                    onClick={() => { 
                      setStatus('idle'); 
                      setFormData({ name: '', email: '', subject: '', message: '' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                      Failed to send message. Please ensure the backend is running and try again.
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your Email" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition placeholder-slate-500"
                      />
                    </div>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject" 
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition placeholder-slate-500"
                    />
                  </div>
                  <div>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your Message" 
                      rows={5}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition placeholder-slate-500 resize-none"
                    ></textarea>
                  </div>
                  <Button variant="primary" className="w-full py-4 rounded-lg flex items-center justify-center" disabled={status === 'submitting'}>
                    {status === 'submitting' ? <Loader2 className="animate-spin mr-2" /> : 'Send Message'}
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
