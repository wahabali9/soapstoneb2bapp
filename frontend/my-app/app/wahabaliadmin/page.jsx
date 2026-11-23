"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuth() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const endpoint = isRegistered ? "/api/wahabaliadmin/login" : "/api/wahabaliadmin/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (data.success) {
        if (isRegistered) {
          setSuccessMsg("Login successful! Redirecting...");
          localStorage.setItem("adminToken", data.token);
          setTimeout(() => {
            router.push("/wahabaliadmin/dashboard");
          }, 1000);
        } else {
          setSuccessMsg("Admin registered successfully! Please log in.");
          setIsRegistered(true);
        }
      } else {
        setErrorMsg(data.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg("Server connection error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        
        <div className="text-center mb-8">
          <span className="bg-teal-950 border border-teal-800 text-teal-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest inline-block mb-3">
            Hidden Portal
          </span>
          <h1 className="text-xl font-black text-slate-100 tracking-wider">
            {isRegistered ? "Admin Login" : "Initial Admin Setup"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isRegistered 
              ? "Access live order feed & management controls." 
              : "Register primary owner account (Allowed only once)."}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-rose-950/60 border border-rose-800 text-rose-300 p-3 rounded-xl text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-3 rounded-xl text-xs font-medium text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {!isRegistered && (
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Username *</label>
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-teal-500 text-slate-200" 
                placeholder="e.g. wahabali"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Admin Email *</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-teal-500 text-slate-200" 
              placeholder="admin@frontierstone.com"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Password *</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-teal-500 text-slate-200" 
              placeholder="••••••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-teal-600 transition cursor-pointer shadow-md mt-2"
          >
            {isRegistered ? "Login to Dashboard" : "Register Owner Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          {isRegistered ? (
            <p>
              Setting up first time?{" "}
              <button onClick={() => setIsRegistered(false)} className="text-teal-400 font-bold hover:underline cursor-pointer">
                Register Owner
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button onClick={() => setIsRegistered(true)} className="text-teal-400 font-bold hover:underline cursor-pointer">
                Go to Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}