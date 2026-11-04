import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/task.service";

const CreateTask = () => {

  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: "",
    deadline: "",
    checklist: [""]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChecklistChange = (index, value) => {
    const updated = [...task.checklist];
    updated[index] = value;

    setTask({ ...task, checklist: updated });
  };

  const addChecklistItem = () => {
    setTask({
      ...task,
      checklist: [...task.checklist, ""]
    });
  };

  const removeChecklistItem = (index) => {
    setTask({
      ...task,
      checklist: task.checklist.filter((_, i) => i !== index)
    });
  };

  const submitted = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await createTask(
        task.name,
        task.deadline,
        task.checklist
      );

      alert("Task created successfully!");

      navigate("/task");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6">

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          Create New Task
        </h2>

        <form onSubmit={submitted}>

          <label className="font-semibold">
            Task Name
          </label>

          <input
            type="text"
            required
            placeholder="Enter task name"
            className="border p-3 rounded-lg w-full mt-2 mb-5"
            value={task.name}
            onChange={(e) =>
              setTask({ ...task, name: e.target.value })
            }
          />

          <label className="font-semibold">
            Deadline
          </label>

          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className="border p-3 rounded-lg w-full mt-2 mb-5"
            value={task.deadline}
            onChange={(e) =>
              setTask({ ...task, deadline: e.target.value })
            }
          />

          <h3 className="font-bold mb-3">
            Task Checklist
          </h3>

          {task.checklist.map((item, index) => (

            <div key={index} className="flex gap-2 mb-3">

              <input
                type="text"
                placeholder={`Checklist item ${index + 1}`}
                className="border p-3 rounded-lg flex-1"
                value={item}
                onChange={(e) =>
                  handleChecklistChange(index, e.target.value)
                }
              />

              <button
                type="button"
                onClick={() => removeChecklistItem(index)}
                className="bg-red-500 text-white px-4 rounded-lg"
              >
                Remove
              </button>

            </div>
          ))}

          <button
            type="button"
            onClick={addChecklistItem}
            className="bg-green-500 text-white p-3 rounded-lg mb-5"
          >
            + Add Checklist
          </button>

          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex-1 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create Task"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/task")}
              className="bg-gray-300 p-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateTask;