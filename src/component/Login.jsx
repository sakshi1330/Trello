import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../services/user.service";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitted = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await signInUser(user.email, user.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.code === "auth/invalid-credential"
        ? "Incorrect email or password."
        : err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <form onSubmit={submitted} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl space-y-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-800">Login</h1>
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <label className="block text-sm font-medium text-slate-700">Email
          <input type="email" required value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 w-full rounded-lg border p-3 focus:border-violet-500 focus:outline-none" placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Password
          <input type="password" required value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="mt-1 w-full rounded-lg border p-3 focus:border-violet-500 focus:outline-none" placeholder="Your password" />
        </label>
        <button disabled={loading} className="w-full rounded-lg bg-violet-600 p-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-slate-600">New here? <Link className="font-semibold text-violet-600 hover:underline" to="/register">Create an account</Link></p>
      </form>
    </main>
  );
}
