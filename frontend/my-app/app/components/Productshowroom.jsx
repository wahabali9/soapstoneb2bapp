
"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export default function ProductShowroom() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/products`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API endpoint not found or returned HTML.");
        }
        const data = await res.json();
        if (data.success && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (error) {
        console.warn("Using fallback products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fallbackProducts = [
    {
      _id: "default-1",
      title: "High-Grade Raw Soapstone Blocks",
      description: "Massive pure crystalline soapstone chunks mined directly from Hazara quarries with zero impurities, ideal for architectural countertops, carving, and heavy industrial milling.",
      purityOrBrightness: "Purity: 96-98% ",
      imageUrl: "https://images.unsplash.com/photo-1615800098774-e346b0883f3a?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: "default-2",
      title: "Super-Fine Processed Talc Powder",
      description: "Finely milled premium mesh talcum powder optimized perfectly as functional filler agents for high-grade paints, cosmetics, and pharmaceutical formulations.",
      purityOrBrightness: "Brightness: 95%+ | Mesh: 300 - 600",
      imageUrl: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <main id="showroom" className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      <div className="text-center mb-10 md:mb-14">
        <span className="bg-teal-950 border border-teal-800 text-teal-400 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest inline-block mb-3">
          Direct Mine-to-Port Supply
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Our Premium Mineral Portfolio
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed px-4">
          Quarried and processed in the mineral-rich <span className="text-teal-400 font-semibold">Hazara Division, KPK (Northern Pakistan)</span>. Our high-brightness soapstone and talc are extensively utilized across <span className="text-slate-200 font-semibold">paints, cosmetics, pharmaceuticals, ceramics, and architectural countertops</span>, calibrated to strict international chemical and mesh specifications.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="bg-slate-900/50 border border-slate-800 rounded-2xl h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayProducts.map((product) => (
            <div key={product._id} className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-teal-700/60 transition duration-300 flex flex-col">
              
              {/* Product Image with Certification Badge Overlay */}
              <div className="h-52 sm:h-60 bg-slate-800 relative overflow-hidden">
                <img 
                  src={product.imageurl || product.url} 
                  alt={product.title} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-500" 
                />
                <div className="absolute top-3 right-3 bg-slate-950/90 border border-teal-800/80 text-teal-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <span>🛡️</span> Lab Certified Assay
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 text-xs flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-100 mb-2">{product.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{product.description}</p>
                </div>

                {/* Technical Specs Footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="font-mono font-bold text-teal-300 bg-teal-950/80 border border-teal-800/80 px-3 py-1.5 rounded-lg text-[11px] tracking-wide md:text-xs">
                    {product.purityorbrightness || product.tag || "Export Grade A+"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium md:text-xs">
                    📦 Bulk Supply Ready
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}