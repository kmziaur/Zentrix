import React from "react";
import { Smartphone, Laptop, ShieldCheck, Truck, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: <Smartphone className="w-8 h-8 text-pink-600" />,
    title: "Latest Gadgets",
    desc: "Explore the newest smartphones, laptops, and smart devices.",
  },
  {
    icon: <Truck className="w-8 h-8 text-pink-600" />,
    title: "Fast Delivery",
    desc: "Get your products delivered quickly anywhere in the country.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-pink-600" />,
    title: "Secure Shopping",
    desc: "100% safe and secure payment system for all transactions.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-pink-600" />,
    title: "Easy Payments",
    desc: "Multiple payment options including cards & mobile banking.",
  },
  {
    icon: <Laptop className="w-8 h-8 text-pink-600" />,
    title: "Top Quality Products",
    desc: "Only verified and high-quality gadgets from trusted brands.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-pink-600" />,
    title: "24/7 Support",
    desc: "Our support team is always ready to help you anytime.",
  },
];

const Features = () => {
  return (
    <div className="w-full bg-white py-16 px-6">

      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Choose Us
        </h2>
        <p className="text-gray-600 mt-2">
          We provide the best service for your gadget shopping experience
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">

        {features.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-pink-50 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-2">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Features;