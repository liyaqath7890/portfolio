import GlassCard from '../../components/ui/GlassCard';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverEffect className="p-6">
          <h3 className="text-slate-400 text-sm font-semibold mb-2">Total Visitors</h3>
          <p className="text-4xl font-bold text-primary neon-text">1,204</p>
        </GlassCard>
        <GlassCard hoverEffect className="p-6">
          <h3 className="text-slate-400 text-sm font-semibold mb-2">Projects</h3>
          <p className="text-4xl font-bold text-accent">12</p>
        </GlassCard>
        <GlassCard hoverEffect className="p-6">
          <h3 className="text-slate-400 text-sm font-semibold mb-2">New Messages</h3>
          <p className="text-4xl font-bold text-secondary">5</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
