import React from "react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient from-violet-100 via-white to-indigo-100 p-6">
      <section className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-3xl text-white">✓</div>
        <p className="font-semibold uppercase tracking-widest text-violet-600">Plan · Track · Complete</p>
        <h1 className="mt-3 text-4xl font-black text-slate-800">Trello Task Manager</h1>
        <p className="mt-4 text-slate-500">Keep your tasks, deadlines and checklist in one simple workspace.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link to="/register" className="rounded-xl bg-violet-600 p-3 font-semibold text-white hover:bg-violet-700">Create account</Link>
          <Link to="/login" className="rounded-xl border border-violet-200 p-3 font-semibold text-violet-700 hover:bg-violet-50">Login</Link>
        </div>
      </section>
    </main>
  );
}
