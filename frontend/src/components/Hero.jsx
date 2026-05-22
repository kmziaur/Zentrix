import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white text-slate-950 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-slate-100 opacity-90" />
      <div className="pointer-events-none absolute -left-16 top-16 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-slate-200/30 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
            Best selection of premium tech
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-950">
              Modern gadgets, smart experiences, <span className="text-amber-500">designed for tomorrow</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Explore curated electronics and accessories that blend performance, style, and reliability. Create a smarter everyday setup with products you can trust.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/products">
              <Button className="bg-slate-950 text-white hover:bg-slate-800 font-semibold px-8 py-3">
                Shop Latest
              </Button>
            </Link>
            <Link to="/products">
              <Button
                variant="outline"
                className="border-slate-300 bg-white text-slate-950 hover:bg-slate-50 px-8 py-3"
              >
                See Collections
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-100/80">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Trusted quality</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">4.9/5 rating</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-100/80">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live support</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">24/7 assistance</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center mt-10 md:mt-0">
          <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-amber-100/60 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-28 w-28 rounded-full bg-slate-200/70 blur-3xl" />

          <div className="relative w-full max-w-md rounded-[2.5rem] border border-slate-200 bg-white/90 p-3 shadow-[0_50px_80px_-40px_rgba(15,23,42,0.2)] transition-transform duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between gap-3 rounded-[2rem] bg-slate-950/95 px-5 py-4 text-white shadow-inner">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Featured</p>
                <p className="mt-1 text-sm font-semibold">Zentrix Pro Pack</p>
              </div>
              <div className="rounded-2xl bg-amber-500 px-3 py-1 text-xs font-semibold uppercase text-slate-950">
                New
              </div>
            </div>

            <video
              autoPlay
              muted
              loop
              playsInline
              className="mt-4 h-[420px] w-full rounded-[1.75rem] object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-950">Smart features</p>
                <p className="text-xs text-slate-500">AI-powered recommendations</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-950">Fast shipping</p>
                <p className="text-xs text-slate-500">Delivered in 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
