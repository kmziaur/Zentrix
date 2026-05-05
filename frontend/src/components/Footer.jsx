import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-pink-500 hover:scale-105 transition-transform duration-300">
            Zentrix
          </h2>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Your trusted gadget store for smartphones, laptops, and accessories
            at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            {["/", "/products", "/cart", "/profile"].map((path, i) => (
              <li key={i}>
                <Link
                  to={path}
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-gray-400">
            <p className="flex items-center gap-2 hover:text-pink-500 transition">
              <Mail className="w-4 h-4" /> support@zentrix.com
            </p>

            <p className="flex items-center gap-2 hover:text-pink-500 transition">
              <Phone className="w-4 h-4" /> +880 123 456 789
            </p>

            <p className="flex items-center gap-2 hover:text-pink-500 transition">
              <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:scale-110 transition-all duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:scale-110 transition-all duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:scale-110 transition-all duration-300"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:scale-110 transition-all duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Zentrix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
