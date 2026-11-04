import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyTasks } from "../services/task.service";

const Dashboard = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadTasks = async () => {
      try {
        const data = await fetchMyTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();

  }, []);

  const total = tasks.length;

  const completed = tasks.filter(
    task => task.status === "completed"
  ).length;

  const pending = tasks.filter(
    task => task.status === "pending"
  ).length;

  const progress = tasks.filter(
    task => task.status === "in-progress"
  ).length;

  const cards = [
    { title: "Total Tasks", count: total, color: "bg-purple-600" },
    { title: "Completed", count: completed, color: "bg-green-500" },
    { title: "Pending", count: pending, color: "bg-orange-500" },
    { title: "In Progress", count: progress, color: "bg-blue-500" }
  ];

  if (loading) {
    return <p className="text-center p-10">Loading dashboard...</p>;
  }

  return (

    <div className="min-h-screen bg-purple-50 p-6">

      <h2 className="text-3xl font-bold text-purple-700 mb-8">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {cards.map((card) => (

          <div
            key={card.title}
            onClick={() => navigate("/task")}
            className={`${card.color} text-white p-7 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition`}
          >

            <h3 className="text-lg font-semibold">
              {card.title}
            </h3>

            <p className="text-4xl font-bold mt-4">
              {card.count}
            </p>

            <p className="text-sm mt-3">
              Click to view tasks →
            </p>

          </div>

        ))}

      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h3 className="text-xl font-bold mb-3">
          Welcome to Team Task Manager!
        </h3>

        <p className="text-gray-600">
          Manage your tasks, track deadlines and monitor your progress.
        </p>

        <button
          onClick={() => navigate("/create-task")}
          className="bg-purple-600 text-white p-3 rounded-lg mt-5"
        >
          + Create New Task
        </button>

      </div>

    </div>
  );
};

export default Dashboard;