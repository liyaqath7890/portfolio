import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/public/HomePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminProjects from './pages/admin/AdminProjects';
import Global3DEngine from './components/3d/Global3DEngine';

import ProjectDetail from './pages/public/ProjectDetail';
import About from './components/public/About';
import Projects from './components/public/Projects';
import Skills from './components/public/Skills';
import Experience from './components/public/Experience';
import Blog from './components/public/Blog';
import Contact from './components/public/Contact';

function App() {
  return (
    <Global3DEngine>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="project/:id" element={<ProjectDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
          </Route>
        </Routes>
      </Router>
    </Global3DEngine>
  );
}

export default App;
