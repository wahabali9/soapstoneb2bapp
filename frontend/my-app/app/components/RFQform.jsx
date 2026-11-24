
"use client";
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";



export default function RFQForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    organisationname: '',
    orderquanitity: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCreatedOrder(null);

    try {
      const res = await fetch(`${API_URL}/api/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setCreatedOrder(data.neworder);
        alert(`Inquiry Registered Successfully! Tracking ID: ${data.neworder.trackingId}`);
        setFormData({ fullname: '', email: '', phonenumber: '', organisationname: '', orderquanitity: '', location: '' });
      } else {
        alert(data.message || "Failed to submit inquiry.");
      }
    } catch (error) {
      alert("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-segment" className="bg-slate-950 border-t border-slate-900 py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-2xl space-y-10">

        {/* 📋 1. RFQ Form Box */}
        <div id="inquiry" className="bg-slate-900 border border-slate-800 p-5 sm:p-8 rounded-2xl shadow-xl text-xs text-slate-200">
          <div className="text-center mb-6">
            <span className="bg-teal-950 border border-teal-800 text-teal-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest inline-block mb-2">
              B2B Inquiry Portal
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-100">Request a Custom Quote</h3>

            <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed mt-2 max-w-lg mx-auto">
              Please submit your initial requirements using this form to connect directly with our export team for detailed discussions on mineral specs, lab reports, and FOB pricing.
            </p>
          </div>

          {createdOrder && (
            <div className="mb-6 p-4 bg-teal-950/80 border border-teal-700 rounded-xl text-center">
              <p className="text-xs text-teal-300 font-bold">Inquiry Registered Successfully!</p>
              <p className="text-sm font-mono text-white font-black mt-1">Tracking ID: {createdOrder.trackingId}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Your Full Name *</label>
                <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" placeholder="Giovanni Rossi" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Company Name *</label>
                <input type="text" name="organisationname" value={formData.organisationname} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" placeholder="Italy Stone Imports" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Business Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" placeholder="buyer@company.com" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Phone Number *</label>
                <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" placeholder="+39..." />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Required Quantity *</label>
                <input type="text" name="orderquanitity" value={formData.orderquanitity} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" placeholder="e.g. 25 Metric Tons" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Destination Port *</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" placeholder="e.g. Genoa Port, Italy" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-teal-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-teal-600 transition cursor-pointer disabled:opacity-50 mt-2">
              {loading ? "Submitting Inquiry..." : "Submit Quote Request"}
            </button>
          </form>
        </div>

        {/* 🔀 Section Divider Border */}
        <div className="border-t border-slate-800/80 pt-2" />
        {/* 📞 2. Direct Contact Channels & Procurement Heading */}
        <div id="contact-cards" className="space-y-4">
          <div className="text-center">
            <h4 className="text-xs uppercase font-black tracking-widest text-teal-400">
              Connect with Procurement & Sales Desk
            </h4>
            <p className="text-[13px] text-slate-400 mt-1">
              <span className="text-slate-300 font-black">Wahab Ali (Managing Director)</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
            <a
              href="https://wa.me/923259344808"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/90 border border-emerald-900/60 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md hover:bg-slate-900 transition"
            >
              <span className="text-xl">💬</span>
              <span className="font-bold text-emerald-400">WhatsApp Support</span>
              <span className="text-[12px] text-slate-400">+92 3259344808</span>
            </a>

            <a
              href="mailto:infofrontierstone@gmail.com"
              className="bg-slate-900/90 border border-teal-900/60 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md hover:bg-slate-900 transition"
            >
              <span className="text-xl">✉️</span>
              <span className="font-bold text-teal-400">Official Email</span>
              <span className="text-[12px] text-slate-400 truncate w-full">infofrontierstone@gmail.com</span>
            </a>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-teal-400 mb-0.5"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-bold text-teal-400">Processing Yard</span>
              <span className="text-[11px] text-slate-400 leading-snug">
                Industrial Estate Hattar, Haripur, Hazara Division, KPK
              </span>
              <div className="w-full border-t border-slate-800/90 pt-2 mt-1.5 flex flex-col items-center gap-0.5">
                <span className="font-bold text-teal-400">Export Coordination Office</span>
                <span className="text-[11px] text-slate-400">Gulberg Greens, Islamabad</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}