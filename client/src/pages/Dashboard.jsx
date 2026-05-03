import { useEffect, useState } from "react";
import API from "../api/api";
import '../App.css';

const statusColors = {
  "Pending": "badge badge-pending",
  "In Progress": "badge badge-progress", 
  "Completed": "badge badge-completed"
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "Pending" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch tasks");
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update task");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "", status: "Pending" });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create task");
    }
  };

  const now = new Date();
  const overdue = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
  );

  return (
    <div className="app fade-in">
      <div className="container">
        <div className="dashboard-header flex">
          <div>
            <h1>Project Dashboard</h1>
              <p style={{color: '#6b7280', marginTop: '0.5rem'}}>Manage your tasks and track progress</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? "Cancel" : "+ Add Task"}
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-total card fade-in">
            <h3>Total Tasks</h3>
            <div className="stat-number" style={{color: '#6366f1'}}>{tasks.length}</div>
          </div>
          <div className="stat-card stat-overdue card fade-in">
            <h3>Overdue</h3>
            <div className="stat-number" style={{color: '#ef4444'}}>{overdue.length}</div>
          </div>
          <div className="stat-card stat-completed card fade-in">
            <h3>Completed</h3>
            <div className="stat-number" style={{color: '#10b981'}}>{tasks.filter(t => t.status === "Completed").length}</div>
          </div>
        </div>

        {error && <div className="error fade-in">{error}</div>}

        {showForm && (
          <form onSubmit={createTask} className="card fade-in">
            <h3>Add New Task</h3>
            <div className="form-group">
              <label>Title</label>
              <input 
                placeholder="Enter task title" 
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Enter task description" 
                value={newTask.description}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select 
                value={newTask.status}
                onChange={e => setNewTask({...newTask, status: e.target.value})}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
              Create Task
            </button>
          </form>
        )}

        {loading && <div className="loading fade-in">Loading tasks...</div>}

        {tasks.length === 0 && !loading && !showForm && (
          <div className="empty-state fade-in">
            <h3>No tasks yet</h3>
            <p>Create your first task above to get started!</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary" style={{marginTop: '1rem'}}>
              + Add First Task
            </button>
          </div>
        )}

        <div className="grid grid-tasks">
          {tasks.map(task => (
            <div key={task._id} className="task-card card fade-in">
              <h3>{task.title}</h3>
              {task.description && <p className="text-gray-600 mb-4">{task.description}</p>}
              <div className="task-meta">
                <span className={`${statusColors[task.status.replace(/\s/g, '-').toLowerCase()] || 'badge bg-gray-400 text-gray-800'}`}>
                  {task.status}
                </span>
                {task.dueDate && (
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
              </div>
              <div className="task-actions">
                {task.status !== "Completed" && (
                  <button 
                    onClick={() => updateStatus(task._id, "In Progress")}
                    className="btn btn-secondary"
                  >
                    Start
                  </button>
                )}
                <button 
                  onClick={() => updateStatus(task._id, "Completed")}
                  className="btn btn-success"
                >
                  Mark Done
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
