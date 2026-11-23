"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export default function HeroSlider() {
  const [currentslider, setcurrentslider] = useState(0);
  const [sliders, setSliders] = useState([]);

  // 1. Backend se sliders fetch karein
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/sliders`);
        const data = await res.json();
        if (data.success && data.sliders && data.sliders.length > 0) {
          setSliders(data.sliders);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };
    fetchSliders();
  }, []);

  // 2. Fallback data agar database khali ho
  const defaultSlides = [
    {
      _id: 1,
      imageurl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
      title: "Direct Mining & Bulk Processing Yard – Hazara Division, KPK",
      description: "Quarried at source and processed under strict quality controls. Supplying 100% asbestos-free raw soapstone lumps and micronized talc in bulk quantities for global industrial exporters."
    }
  ];

  const activeSlides = sliders.length > 0 ? sliders : defaultSlides;

  // 3. Auto slide timer
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setcurrentslider((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <div className="relative w-full h-[280px] sm:h-[350px] md:h-[460px] bg-slate-900 overflow-hidden shadow-md">
      {activeSlides.map((slide, index) => (
        <div
          key={slide._id || slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentslider ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img 
            src={slide.imageurl || slide.url} 
            alt={slide.title} 
            className="w-full h-full object-cover opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end p-4 sm:p-8 text-white">
            <div className="max-w-xl">
              <span className="bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                Direct Source / Abbottabad Hazara KPK 
              </span>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black mb-1 text-slate-100">{slide.title}</h2>
              <p className="text-slate-300 text-[11px] sm:text-xs md:text-sm font-medium">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}