import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { global3DTunnel } from '../components/3d/Global3DEngine';
import { Float, Box } from '@react-three/drei';

const Admin3DBackground = () => {
  return (
    <global3DTunnel.In>
      <group position={[0, 0, -8]}>
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1} position={[-8, 4, 0]}>
          <Box args={[3, 3, 3]} rotation={[0.5, 0.5, 0]}>
            <meshStandardMaterial color="#020617" emissive="#2563EB" emissiveIntensity={0.1} wireframe />
          </Box>
        </Float>
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[8, -4, -2]}>
          <Box args={[2, 2, 2]} rotation={[-0.2, 0.8, 0]}>
            <meshStandardMaterial color="#020617" emissive="#7C3AED" emissiveIntensity={0.2} wireframe />
          </Box>
        </Float>
      </group>
    </global3DTunnel.In>
  );
};

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="min-h-screen bg-transparent text-white flex">
      <Admin3DBackground />
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold text-primary neon-text mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin" className="block text-slate-300 hover:text-white transition">Dashboard</a>
          <a href="/admin/projects" className="block text-slate-300 hover:text-white transition">Projects</a>
          <a href="/admin/skills" className="block text-slate-300 hover:text-white transition">Skills</a>
        </nav>
        <div className="absolute bottom-6 w-52">
          <button onClick={logout} className="w-full py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition text-left px-4">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
