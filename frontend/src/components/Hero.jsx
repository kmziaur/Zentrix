import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white text-slate-950 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-slate-100 opacity-90" />
      <div className="pointer-events-none absolute -left-16 top-16 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-slate-200/30 blur-3xl" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
            Best selection of premium tech
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Modern gadgets, smart experiences,{" "}
            <span className="text-pink-600">
              designed for tomorrow
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-7">
            Explore curated electronics and accessories that blend performance,
            style, and reliability. Create a smarter everyday setup with products
            you can trust.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/products">
              <Button className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-6">
                Shop Latest
              </Button>
            </Link>

            <Link to="/products">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-slate-300 bg-white hover:bg-pink-50 px-8 py-6"
              >
                See Collections
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-md">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Trusted quality
              </p>
              <p className="mt-2 text-xl sm:text-2xl font-semibold text-slate-950">
                4.9/5 rating
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-md">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Live support
              </p>
              <p className="mt-2 text-xl sm:text-2xl font-semibold text-slate-950">
                24/7 assistance
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative flex justify-center lg:justify-end">
          
          {/* Glow */}
          <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-amber-100/60 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-28 w-28 rounded-full bg-slate-200/70 blur-3xl" />

          {/* Card */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-[2rem] border border-slate-200 bg-white p-3 shadow-xl transition-transform duration-300 hover:-translate-y-2">
            
            {/* Header */}
            <div className="flex items-center justify-between rounded-[1.5rem] bg-slate-950 px-5 py-4 text-white">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Featured
                </p>
                <p className="text-sm font-semibold mt-1">
                  Zentrix Pro Pack
                </p>
              </div>

              <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-xl">
                New
              </span>
            </div>

            {/* Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="mt-4 w-full h-56 sm:h-72 md:h-80 lg:h-[420px] rounded-2xl object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Features */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-950">
                  Smart features
                </p>
                <p className="text-xs text-slate-500">
                  AI-powered recommendations
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-950">
                  Fast shipping
                </p>
                <p className="text-xs text-slate-500">
                  Delivered in 24 hours
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;