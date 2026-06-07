import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { setCart } from "@/redux/productSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const admin =
    user?.role === "admin" || user?.role === "super-admin";

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
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        dispatch(setUser(null));
        dispatch(setCart({ items: [] }));

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          dispatch(setCart(res.data.cart));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [dispatch]);

  const menuItems = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Products",
      to: "/products",
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-pink-50 border-b border-pink-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center shrink-0"
            >
              <img
                src="/logo.png"
                alt="Zentrix"
                className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8">
              <ul className="flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-semibold text-slate-700">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.to;

                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold transition ${
                          isActive
                            ? "text-pink-700 after:absolute after:left-1/2 after:bottom-1 after:h-0.5 after:w-1/5 after:-translate-x-1/2 after:rounded-full after:bg-pink-600"
                            : "text-slate-700 hover:text-pink-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}

                {user && (
                  <li>
                    <Link
                      to={`/profile/${user._id}`}
                      className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold transition ${
                        location.pathname === `/profile/${user._id}`
                          ? "text-pink-700 after:absolute after:left-1/2 after:bottom-1 after:h-0.5 after:w-1/5 after:-translate-x-1/2 after:rounded-full after:bg-pink-600"
                          : "text-slate-700 hover:text-pink-700"
                      }`}
                    >
                      <span className="max-w-35 truncate">
                        Hello,{" "}
                        <span className="text-pink-600">
                          {user.firstName}
                        </span>
                      </span>
                    </Link>
                  </li>
                )}

                {admin && (
                  <li>
                    <Link
                      to="/dashboard"
                      className={`relative px-3 py-2 text-sm font-semibold transition ${
                        location.pathname.startsWith("/dashboard")
                          ? "text-pink-700 after:absolute after:left-1/2 after:bottom-1 after:h-0.5 after:w-1/5 after:-translate-x-1/2 after:rounded-full after:bg-pink-600"
                          : "text-slate-700 hover:text-pink-700"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center justify-center h-11 w-11 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition"
              >
                <ShoppingCart className="h-5 w-5" />

                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white">
                  {cart?.items?.length || 0}
                </span>
              </Link>

              {user ? (
                <Button
                  onClick={logoutHandler}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white">
                    Login
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 md:hidden">
              <Link
                to="/cart"
                className="relative flex items-center justify-center h-10 w-10 rounded-full bg-pink-100 text-pink-700"
              >
                <ShoppingCart className="h-5 w-5" />

                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white">
                  {cart?.items?.length || 0}
                </span>
              </Link>

              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow hover:bg-slate-100 transition"
              >
                {menuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 bg-white border-t border-pink-200 shadow-xl md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "text-pink-700"
                    : "text-slate-700 hover:text-pink-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {user && (
            <Link
              to={`/profile/${user._id}`}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-semibold transition ${
                location.pathname === `/profile/${user._id}`
                  ? "text-pink-700"
                  : "text-slate-700 hover:text-pink-700"
              }`}
            >
              Hello,{" "}
              <span className="text-pink-600">
                {user.firstName}
              </span>
            </Link>
          )}

          {admin && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-semibold transition ${
                location.pathname.startsWith("/dashboard")
                  ? "text-pink-700"
                  : "text-slate-700 hover:text-pink-700"
              }`}
            >
              Dashboard
            </Link>
          )}

          <div className="pt-2">
            {user ? (
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  logoutHandler();
                }}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                Logout
              </Button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;