"use client";
import { useState } from 'react';

export default function TrackOrderModal({ isOpen, onClose }) {
  const [trackIdInput, setTrackIdInput] = useState('');
  const [trackedOrderResult, setTrackedOrderResult] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);

  if (!isOpen) return null;

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackIdInput.trim()) return;
    setTrackLoading(true);
    try {
      const res = await fetch(`/api/orders/track/${trackIdInput.trim()}`);
      const data = await res.json();
      if (data.success) setTrackedOrderResult(data);
      else alert(data.message || "No active order found.");
    } catch (error) {
      alert("Server connection error.");
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 sm:p-6 text-xs relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer text-sm font-bold">✕</button>
        <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-1">Track Consignment Status</h3>
        <p className="text-slate-400 mb-4 text-[11px] sm:text-xs">Enter your tracking ID (e.g., FS-123456).</p>

        <form onSubmit={handleTrackOrder} className="flex gap-2 mb-4">
          <input 
            type="text" 
            required 
            value={trackIdInput}
            onChange={(e) => setTrackIdInput(e.target.value)}
            placeholder="FS-XXXXXX"
            className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 uppercase font-mono focus:outline-none focus:border-teal-500 text-xs"
          />
          <button type="submit" disabled={trackLoading} className="bg-teal-700 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-teal-600 cursor-pointer text-xs whitespace-nowrap">
            {trackLoading ? "..." : "Track"}
          </button>
        </form>

        {trackedOrderResult && (
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Client:</span>
              <span className="font-bold text-slate-200 text-right">{trackedOrderResult.name} ({trackedOrderResult.organisation})</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Destination:</span>
              <span className="text-slate-200">{trackedOrderResult.destination}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-400">Status:</span>
              <span className="bg-teal-950 text-teal-400 border border-teal-800 px-2 py-0.5 rounded uppercase font-bold text-[10px]">
                {trackedOrderResult.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}