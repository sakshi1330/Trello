import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../services/user.service";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submitted = async (e) => {
    e.preventDefault();
    setError("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (user.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await createUser(user.email, user.password, user.name);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.code === "auth/email-already-in-use"
        ? "This email is already registered."
        : err.code === "permission-denied"
          ? "Firebase blocked saving the user profile. Check your Firestore rules."
          : err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <form onSubmit={submitted} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">Trello-style task manager</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-800">Create account</h1>
          <p className="mt-1 text-slate-500">Register to manage your tasks.</p>
        </div>

        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <label className="block text-sm font-medium text-slate-700">Full name
          <input name="name" value={user.name} onChange={handleChange} required
            className="mt-1 w-full rounded-lg border p-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Email
          <input name="email" type="email" value={user.email} onChange={handleChange} required
            className="mt-1 w-full rounded-lg border p-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Password
          <input name="password" type="password" value={user.password} onChange={handleChange} required minLength={6}
            className="mt-1 w-full rounded-lg border p-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" placeholder="At least 6 characters" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Confirm password
          <input name="confirmPassword" type="password" value={user.confirmPassword} onChange={handleChange} required
            className="mt-1 w-full rounded-lg border p-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" placeholder="Repeat password" />
        </label>
        <button disabled={loading} className="w-full rounded-lg bg-violet-600 p-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60">
          {loading ? "Creating account..." : "Register"}
        </button>
        <p className="text-center text-sm text-slate-600">Already registered? <Link className="font-semibold text-violet-600 hover:underline" to="/login">Login</Link></p>
      </form>
    </main>
  );
}
