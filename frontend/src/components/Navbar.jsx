import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  console.log("TOKEN FROM STORAGE:", localStorage.getItem("accessToken"));

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("accessToken"); 

      if (!token) {
        toast.error("No token found");
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        dispatch(setUser(null));

        navigate("/");
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      console.log("FULL ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="w-full bg-pink-50 fixed z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <div>
          <img className="w-20 h-15 " src="/logo.png" alt="logo" />
        </div>

        <nav className="flex items-center gap-8">
          <ul className="flex gap-6 items-center text-lg font-semibold">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/products">
              <li>Products</li>
            </Link>

            {user && (
              <Link to="/profile">
                <li>
                  Hello, <span className="text-pink-600">{user.firstName}</span>
                </li>
              </Link>
            )}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-4 -right-5 px-2 ">
              0
            </span>
          </Link>

          {/* Button */}
          {user ? (
            <Button onClick={logoutHandler} className="bg-pink-600 text-white">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
