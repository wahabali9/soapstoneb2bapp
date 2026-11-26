// "use client";
// import { useState, useEffect } from "react";
// import AnimatedHeading from "./AnimateHeading";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function ProductShowroom() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/admin/products`);
//         const contentType = res.headers.get("content-type");
//         if (!contentType || !contentType.includes("application/json")) {
//           throw new Error("API endpoint not found or returned HTML.");
//         }
//         const data = await res.json();
//         if (data.success && data.products.length > 0) {
//           setProducts(data.products);
//         }
//       } catch (error) {
//         console.warn("Using fallback products:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const fallbackProducts = [
//     {
//       _id: "default-1",
//       title: "High-Grade Raw Soapstone Blocks",
//       description:
//         "100% Asbestos-Free massive crystalline soapstone chunks mined directly from Hazara quarries with zero impurities, ideal for architectural slabs, carving, and heavy industrial milling.",
//       purityOrBrightness: "Purity: 96-98% | Asbestos-Free",
//       imageUrl:
//         "https://images.unsplash.com/photo-1615800098774-e346b0883f3a?auto=format&fit=crop&q=80&w=800",
//     },
//     {
//       _id: "default-2",
//       title: "Super-Fine Processed Talc Powder",
//       description:
//         "100% Asbestos-Free finely milled premium mesh talcum powder optimized as functional filler agents for high-grade paints, cosmetics, and pharmaceutical formulations.",
//       purityOrBrightness: "Brightness: 95%+ | Mesh: 300 - 600",
//       imageUrl:
//         "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&q=80&w=800",
//     },
//   ];

//   const displayProducts = products.length > 0 ? products : fallbackProducts;

//   return (
//     <main id="showroom" className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
//       <div className="text-center mb-10 md:mb-14">
//         <span className="bg-teal-950 border border-teal-800 text-teal-400 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest inline-block mb-3">
//           Direct Mine-to-Fob Supply
//         </span>

//         {/* Centered & White text for dark background */}
//         <div className="flex justify-center">
//           <AnimatedHeading
//             firstText="Our Mineral Portfolio"
//             secondText="Industrial Grade SoapStone"

//             className="text-2xl md:text-5xl font-bold text-white tracking-tight text-center"
//             typingSpeed={180}
//             deletingSpeed={130} />
//         </div>

//     <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed px-4">
//   Quarried and processed in the mineral-rich{" "}
//   <span className="text-teal-400 font-semibold">
//     Hazara Division, KPK (Northern Pakistan)
//   </span>
//   . A metamorphic magnesium silicate rock (
//   <span className="font-mono text-teal-300">
//     H<sub>2</sub>Mg<sub>3</sub>O<sub>12</sub>Si<sub>4</sub>
//   </span>
//   ) composed predominantly of talc with natural traces of magnesite, carbonate, mica, and quartz—certified{" "}
//   <span className="text-slate-200 font-semibold">100% asbestos-free</span>. Widely used across{" "}
//   <span className="text-slate-200 font-semibold">
//     paints, cosmetics, pharmaceuticals, ceramics
//   </span>
//   , and architectural countertops, floor tiles, facing stone, electrical panels, wood stoves, cooking slabs, ornamental carvings, and marking pencils.
// </p>
//       </div>

//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[1, 2].map((n) => (
//             <div
//               key={n}
//               className="bg-slate-900/50 border border-slate-800 rounded-2xl h-80 animate-pulse"
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//           {displayProducts.map((product) => (
//             <div
//               key={product._id}
//               className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-teal-700/60 transition duration-300 flex flex-col"
//             >
//               {/* Product Image with Certification Badge Overlay */}
//               <div className="h-52 sm:h-60 bg-slate-800 relative overflow-hidden">
//                 <img
//                   src={product.imageurl || product.imageUrl || product.url}
//                   alt={product.title}
//                   className="w-full h-full object-cover hover:scale-105 transition duration-500"
//                 />
//                 <div className="absolute top-3 right-3 bg-slate-950/90 border border-teal-800/80 text-teal-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-lg flex items-center gap-1.5">
//                   <span>🛡️</span> 100% Asbestos-Free • Lab Assay
//                 </div>
//               </div>

//               {/* Card Details */}
//               <div className="p-6 text-xs flex-1 flex flex-col justify-between space-y-4">
//                 <div>
//                   <h4 className="text-sm sm:text-base font-black text-slate-100 mb-2">
//                     {product.title}
//                   </h4>
//                   <p className="text-slate-400 leading-relaxed">
//                     {product.description}
//                   </p>
//                 </div>

//                 {/* Technical Specs Footer */}
//                 <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
//                   <span className="font-mono font-bold text-teal-300 bg-teal-950/80 border border-teal-800/80 px-3 py-1.5 rounded-lg text-[11px] tracking-wide md:text-xs">
//                     {product.purityorbrightness ||
//                       product.purityOrBrightness ||
//                       product.tag ||
//                       "Export Grade A+"}
//                   </span>
//                   <span className="text-[10px] text-slate-400 font-medium md:text-xs">
//                     📦 Bulk FOB Ready
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import AnimatedHeading from "./AnimateHeading";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductShowroom() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fallbackProducts = [
    {
      _id: "default-1",
      title: "High-Grade Raw Soapstone Blocks",
      description:
        "100% Asbestos-Free massive crystalline soapstone chunks mined directly from Hazara quarries with zero impurities, ideal for architectural slabs, carving, and heavy industrial milling.",
      purityOrBrightness: "Purity: 96-98% | Asbestos-Free",
      imageUrl:
        "https://images.unsplash.com/photo-1615800098774-e346b0883f3a?auto=format&fit=crop&q=80&w=800",
    },
    {
      _id: "default-2",
      title: "Super-Fine Processed Talc Powder",
      description:
        "100% Asbestos-Free finely milled premium mesh talcum powder optimized as functional filler agents for high-grade paints, cosmetics, and pharmaceutical formulations.",
      purityOrBrightness: "Brightness: 95%+ | Mesh: 300 - 600",
      imageUrl:
        "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <main id="showroom" className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-14">
        <span className="bg-teal-950 border border-teal-800 text-teal-400 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest inline-block mb-3">
          Direct Mine-to-FOB Supply
        </span>

        <div className="flex justify-center">
          <AnimatedHeading
            firstText="Our Mineral Portfolio"
            secondText="Industrial Grade SoapStone"
            className="text-2xl md:text-5xl font-bold text-slate-300 tracking-tight text-center"
            typingSpeed={180}
            deletingSpeed={130}
          />
        </div>

        <p className="text-slate-400 text-xs sm:text-xs mt-3 max-w-2xl mx-auto leading-relaxed px-2">
          Quarried and processed in the mineral-rich Hazara Division, KPK (Northern Pakistan). A metamorphic magnesium silicate rock (H
          <sub>2</sub>Mg<sub>3</sub>O<sub>12</sub>Si<sub>4</sub>) composed predominantly of talc with natural traces of magnesite, carbonate, mica, and quartz—certified 100% asbestos-free. Widely used across paints, cosmetics, pharmaceuticals, ceramics, and architectural countertops, floor tiles, facing stone, electrical panels, wood stoves, cooking slabs, ornamental carvings, and marking pencils.
        </p>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl h-96 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayProducts.map((product) => {
            const imgSrc = product.imageurl || product.imageUrl || product.url;
            const purityText =
              product.purityorbrightness ||
              product.purityOrBrightness ||
              product.tag ||
              "Export Grade A+";

            return (
              <div
                key={product._id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-teal-700/60 transition duration-300 flex flex-col"
              >
                {/* Larger Clickable Product Image */}
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="h-72 sm:h-80 w-full bg-slate-800 relative overflow-hidden group text-left cursor-pointer focus:outline-none"
                  aria-label={`Open ${product.title} photo`}
                >
                  <img
                    src={imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/90 border border-teal-800/80 text-teal-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-lg">
                     Asbestos-Free • Lab Assay
                  </div>
                </button>

                {/* Card Details */}
                <div className="p-5 sm:p-6 text-xs flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-slate-300">
                      {product.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
                      {product.description}
                    </p>
                  
                  </div>

                  {/* Technical Specs Footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-teal-300 bg-teal-950/80 border border-teal-800/80 px-3 py-1.5 rounded-lg text-[11px] tracking-wide md:text-xs">
                      {purityText}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium md:text-xs">
                      Bulk FOB Ready
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Why Frontier Stone — Single Text Color & Bullet Points */}
      <section className="mt-16 pt-12 border-t border-slate-800/80">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-3xl font-bold text-slate-300 tracking-tight">
            Why Frontier Stone
          </h3>
          <p className="text-slate-400 text-xs sm:text-xs mt-2 max-w-2xl mx-auto leading-relaxed px-2">
            Direct mine-to-port mineral supply built for international industrial buyers with consistent bulk quality and transparent export execution.
          </p>
        </div>

        <ul className="max-w-2xl mx-auto space-y-2.5 text-slate-400 text-xs sm:text-sm leading-relaxed px-4 list-disc list-outside marker:text-slate-400">
          <li>
            Direct sourcing from verified mines in Hazara and Abbottabad for consistent bulk tonnage and zero middleman markup.
          </li>
          <li>
            Hand-sorted lump selection and custom grading handled through our Industrial Estate Hattar processing yard.
          </li>
          <li>
            Export-ready packaging and containerized shipping coordination via FOB Karachi / Port Qasim with sample support.
          </li>
        </ul>
      </section>

      {/* Simple Full Photo Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-300">
                {selectedProduct.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>
            <img
              src={
                selectedProduct.imageurl ||
                selectedProduct.imageUrl ||
                selectedProduct.url
              }
              alt={selectedProduct.title}
              className="w-full max-h-[75vh] object-contain rounded-xl bg-slate-950"
            />
          </div>
        </div>
      )}
    </main>
  );
}