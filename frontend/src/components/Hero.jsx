import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-pink-700 text-white py-24">
      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
        {/* Left Content */}
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-pink-200/80 mb-4">
            Welcome to Zentrix
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover the Best <span className="text-yellow-300">Gadgets</span> for Your Daily Life
          </h1>

          <p className="mt-4 max-w-xl text-lg text-pink-100/90">
            Shop the latest electronics, smart devices, and accessories at the best prices. Fast delivery & trusted quality.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/products">
              <Button className="bg-white text-pink-700 hover:bg-pink-600 hover:text-white font-semibold">
                Shop Now
              </Button>
            </Link>

            <Link to="/products">
              <Button
                variant="outline"
                className="border-white bg-transparent text-white hover:border-pink-300 hover:bg-white/10"
              >
                Explore Deals
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 shadow-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Fast delivery</p>
              <p className="mt-3 text-2xl font-semibold">Next-day shipping</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 shadow-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Secure payments</p>
              <p className="mt-3 text-2xl font-semibold">Safe checkout</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center mt-10 md:mt-0">
          <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-pink-500/30 blur-3xl" />
          <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-yellow-300/20 blur-3xl" />
          <img
            src="/hero-01.png"
            alt="Gadgets"
            className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl transition-transform duration-500 hover:-translate-y-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;