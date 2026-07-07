import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { global3DTunnel } from '../3d/Global3DEngine';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { FaWhatsapp } from 'react-icons/fa';

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
  const phoneNumber = '917795478115';
  const whatsappMessage = `Hi Ali,

I visited your portfolio website and was impressed with your work and projects.

I would like to discuss a potential opportunity with you. Please let me know when you're available.

Looking forward to hearing from you.

Thank you!`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
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

          {/* Premium WhatsApp Chat Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 border border-white/5 relative overflow-hidden flex flex-col space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold text-lg">
                      LA
                    </div>
                    {/* Pulsing dot indicator */}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-slate-900 animate-pulse shadow-[0_0_8px_#25D366]"></span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Liyaqath Ali</h3>
                    <p className="text-xs text-[#25D366] font-medium flex items-center gap-1">
                      Active Now
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-semibold uppercase tracking-wider">
                  WhatsApp Direct
                </div>
              </div>

              {/* Chat Message Preview */}
              <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 relative">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-3">Pre-filled Message Preview</span>
                <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed italic">
                  "{whatsappMessage}"
                </p>
                <div className="absolute top-4 right-4 text-emerald-500/10">
                  <FaWhatsapp size={64} />
                </div>
              </div>

              {/* Action Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#22c35e] text-slate-950 font-bold text-center flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] cursor-pointer"
              >
                <FaWhatsapp size={22} />
                <span>Start WhatsApp Chat</span>
              </a>

              <p className="text-center text-xs text-slate-500 font-medium">
                Clicking the button will open WhatsApp with the conversation ready to send.
              </p>
            </GlassCard>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
