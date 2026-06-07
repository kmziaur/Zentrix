import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-white mt-16 overflow-hidden">
      
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black opacity-90" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-500">
            Zentrix
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-6">
            Your trusted gadget store for smartphones, laptops, and accessories
            at the best prices with premium experience and fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-slate-400 text-sm sm:text-base">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Cart", path: "/cart" },
              { name: "Profile", path: "/profile/123" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="hover:text-pink-500 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-4 text-slate-400 text-sm sm:text-base">
            <p className="flex items-center gap-2 hover:text-pink-500 transition">
              <Mail className="w-4 h-4" />
              support@zentrix.com
            </p>

            <p className="flex items-center gap-2 hover:text-pink-500 transition">
              <Phone className="w-4 h-4" />
              +880 1331966686
            </p>

            <p className="flex items-center gap-2 hover:text-pink-500 transition">
              <MapPin className="w-4 h-4" />
              Rangpur, Bangladesh
            </p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-3 sm:gap-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaGithub />, link: "#" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:border-pink-500 hover:text-pink-500 hover:scale-110 transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-slate-800 py-5 text-center text-xs sm:text-sm text-slate-500">
        © {new Date().getFullYear()} Zentrix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;