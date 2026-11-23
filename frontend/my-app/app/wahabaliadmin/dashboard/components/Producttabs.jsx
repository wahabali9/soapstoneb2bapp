"use client";
import { useState } from 'react';

export default function Productstabs({ products, newProduct, setNewProduct, setImageFile, onAddProduct, onDeleteProduct }) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onAddProduct(e);
    setSubmitting(false);
  };

  return (
    <div className="space-y-8">
      
      {/* ➕ Add Product Form Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h3 className="text-sm font-black text-slate-100 mb-4 uppercase tracking-wider flex items-center gap-2">
          <span>💎</span> Add New Mineral Product (Export Grade)
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Product Title *</label>
              <input 
                type="text" 
                value={newProduct.title} 
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} 
                required 
                placeholder="e.g. Super-Fine Processed Talc Powder" 
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" 
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Purity / Brightness / Mesh Spec *</label>
              <input 
                type="text" 
                value={newProduct.purityOrBrightness} 
                onChange={(e) => setNewProduct({ ...newProduct, purityOrBrightness: e.target.value })} 
                required 
                placeholder="e.g. Brightness: 95%+ | Mesh: 300 - 600" 
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" 
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Description & Industrial Applications *</label>
            <textarea 
              value={newProduct.description} 
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
              required 
              rows="3"
              placeholder="Describe industrial use cases (e.g. paints, cosmetics, pharma, countertops)..." 
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" 
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Product Image (Cloudinary Upload) *</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])} 
              required 
              className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-950 file:text-teal-300 hover:file:bg-teal-900 cursor-pointer" 
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full bg-teal-700 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition cursor-pointer disabled:opacity-50 shadow-md"
          >
            {submitting ? "Uploading to Cloud & Saving..." : "Publish Mineral to Showroom 🚀"}
          </button>
        </form>
      </div>

      {/* 📦 Existing Products Grid */}
      <div>
        <h3 className="text-sm font-black text-slate-200 mb-4 uppercase tracking-wider">
          Active Portfolio Items ({products.length})
        </h3>

        {products.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center text-slate-400">
            No mineral products added yet. Use the form above to add your first product!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product._id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={product.imageurl || product.url} alt={product.title} className="w-16 h-16 object-cover rounded-xl border border-slate-800" />
                  <div>
                    <h4 className="font-bold text-slate-100">{product.title}</h4>
                    <p className="text-[11px] text-teal-400 font-mono mt-0.5">{product.purityorbrightness}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{product.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteProduct(product._id)}
                  className="bg-red-950/80 border border-red-900 text-red-400 px-3 py-2 rounded-xl hover:bg-red-900 transition text-xs font-bold cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}