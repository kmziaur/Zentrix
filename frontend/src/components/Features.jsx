import React from "react";
import {
  Smartphone,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

const items = [
  {
    icon: <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" />,
    title: "Seamless Experience",
    desc: "A smooth and intuitive shopping experience across all devices.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" />,
    title: "Trusted & Secure",
    desc: "Your data and payments are protected with industry-grade security.",
  },
  {
    icon: <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" />,
    title: "Fast Delivery",
    desc: "Get your products delivered quickly and safely anywhere.",
  },
  {
    icon: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" />,
    title: "Premium Quality",
    desc: "Only the best curated gadgets and accessories for you.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 px-4 sm:px-6">
      
      {/* Soft Apple-style background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-pink-50/40 to-white" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-pink-200/30 blur-3xl" />

      {/* Container */}
      <div className="relative max-w-6xl mx-auto text-center">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
          Why <span className="text-pink-600">ZENTRIX</span> stands out
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          We combine technology, design, and trust to create a premium shopping experience
          inspired by world-class platforms.
        </p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-slate-100 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-100/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Icon */}
              <div className="relative mb-5 flex justify-center">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-pink-50 group-hover:bg-pink-100 transition">
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="relative text-base sm:text-lg font-semibold text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative mt-2 text-sm sm:text-base text-slate-600 leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;