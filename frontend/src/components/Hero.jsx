import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover the Best{" "}
            <span className="text-yellow-300">Gadgets</span>{" "}
            for Your Daily Life
          </h1>

          <p className="mt-4 text-lg text-pink-100">
            Shop the latest electronics, smart devices, and accessories at the best prices. Fast delivery & trusted quality.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="bg-white text-pink-600 hover:bg-gray-100 font-semibold">
                Shop Now
              </Button>
            </Link>

            <Link to="/products">
              <Button
                variant="outline"
                className="border-white text-gray-700 hover:bg-white hover:text-pink-600"
              >
                Explore Deals
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center mt-10">
          <img
            src="/hero-01.png"
            alt="Gadgets"
            className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;