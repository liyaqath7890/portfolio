import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const fetchProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

const AdminProjects = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Management</h1>
        <button className="px-6 py-2 bg-primary text-slate-950 font-bold rounded-lg hover:bg-opacity-90 transition neon-glow">
          Add Project
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400">Loading projects...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Failed to load projects.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="p-4 text-slate-300 font-medium">Project Name</th>
                <th className="p-4 text-slate-300 font-medium">Category</th>
                <th className="p-4 text-slate-300 font-medium">Status</th>
                <th className="p-4 text-slate-300 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.projects?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    No projects found. Add one!
                  </td>
                </tr>
              ) : (
                data?.projects?.map((project: any) => (
                  <tr key={project.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                    <td className="p-4 font-semibold text-white">{project.title}</td>
                    <td className="p-4 text-slate-400">{project.category || 'N/A'}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                        {project.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-4">
                      <button className="text-accent hover:text-white transition text-sm font-semibold">Edit</button>
                      <button className="text-red-500 hover:text-red-400 transition text-sm font-semibold">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
