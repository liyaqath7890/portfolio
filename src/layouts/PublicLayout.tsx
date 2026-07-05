import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white font-sans selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow pt-20 relative">
        <Outlet />
      </main>
      {/* Footer component should be created separately or just omitted for now */}
    </div>
  );
};

export default PublicLayout;
