import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTask, fetchMyTasks, updateTask } from "../services/task.service";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setError("");
      const data = await fetchMyTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Unable to load tasks. Check your login and Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const visibleTasks = useMemo(() =>
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter),
  [tasks, filter]);

  const changeStatus = async (task, status) => {
    try {
      await updateTask(task.id, { status });
      await loadTasks();
    } catch (err) { setError(err.message); }
  };

  const toggleChecklist = async (task, index) => {
    const checklist = [...(task.checklist || [])];
    checklist[index] = { ...checklist[index], completed: !checklist[index].completed };
    try {
      await updateTask(task.id, { checklist });
      await loadTasks();
    } catch (err) { setError(err.message); }
  };

  const removeTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) { setError(err.message); }
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div><p className="font-semibold text-violet-600">YOUR WORKSPACE</p><h1 className="text-3xl font-bold text-slate-800">My Tasks</h1><p className="text-slate-500">Organize work and track your progress.</p></div>
          <button onClick={() => navigate("/create-task")} className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700">+ New task</button>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total tasks</p><p className="text-3xl font-bold">{tasks.length}</p></article>
          <article className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Completed</p><p className="text-3xl font-bold text-green-600">{completedCount}</p></article>
          <article className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Remaining</p><p className="text-3xl font-bold text-amber-600">{tasks.length - completedCount}</p></article>
        </section>

        <div className="mb-4 flex justify-end">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border bg-white p-2">
            <option value="all">All tasks</option><option value="pending">Pending</option><option value="in-progress">In progress</option><option value="completed">Completed</option>
          </select>
        </div>

        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
        {loading ? <p className="py-10 text-center text-slate-500">Loading tasks...</p> :
          visibleTasks.length === 0 ? <div className="rounded-xl bg-white p-10 text-center shadow-sm"><p className="text-lg font-semibold">No tasks found</p><p className="mt-1 text-slate-500">Create your first task to get started.</p></div> :
          <div className="space-y-3">
            {visibleTasks.map((task) => (
              <article key={task.id} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button onClick={() => setExpanded(expanded === task.id ? null : task.id)} className="text-left">
                    <h2 className="font-semibold text-slate-800">{task.name}</h2>
                    <p className="text-sm text-slate-500">Deadline: {task.deadline || "Not set"} · {task.checklist?.length || 0} checklist items</p>
                  </button>
                  <div className="flex flex-wrap items-center gap-2">
                    <select aria-label={`Status for ${task.name}`} value={task.status || "pending"} onChange={(e) => changeStatus(task, e.target.value)} className="rounded-lg border p-2 text-sm">
                      <option value="pending">Pending</option><option value="in-progress">In progress</option><option value="completed">Completed</option>
                    </select>
                    <button onClick={() => removeTask(task.id)} className="rounded-lg border px-3 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                  </div>
                </div>
                {expanded === task.id && (
                  <div className="mt-4 border-t pt-4">
                    <h3 className="mb-2 font-semibold">Checklist</h3>
                    {task.checklist?.length ? task.checklist.map((item, index) => (
                      <label key={index} className="flex items-center gap-2 py-2 text-sm">
                        <input type="checkbox" checked={Boolean(item.completed)} onChange={() => toggleChecklist(task, index)} />
                        <span className={item.completed ? "text-slate-400 line-through" : "text-slate-700"}>{item.name}</span>
                      </label>
                    )) : <p className="text-sm text-slate-500">No checklist items.</p>}
                  </div>
                )}
              </article>
            ))}
          </div>}
      </div>
    </main>
  );
}
