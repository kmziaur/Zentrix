import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [distanceKm, setDistanceKm] = useState(5); // later from API

  const SHIPPING_BASE = 60;

  // ================= FORMAT =================
  const formatTk = (amount) =>
    new Intl.NumberFormat("en-BD").format(amount || 0);

  // ================= FETCH CART =================
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get("http://localhost:8000/api/v1/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          dispatch(setCart(res.data.cart));
        }
      } catch (error) {
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  // ================= SUBTOTAL =================
  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [cart]);

  // ================= SHIPPING (FREE + DISTANCE BASED) =================
  const shipping = useMemo(() => {
    if (subtotal >= 10000) return 0; // free shipping

    if (distanceKm <= 5) return 40;
    if (distanceKm <= 15) return 80;
    return SHIPPING_BASE;
  }, [subtotal, distanceKm]);

  // ================= TOTAL =================
  const total = Math.max(subtotal + shipping - discount, 0);

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (productId, type) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.put(
        "http://localhost:8000/api/v1/cart/update",
        { productId, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.delete(
        `http://localhost:8000/api/v1/cart/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Item removed");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // ================= COUPON (BACKEND VALIDATION) =================
  const applyCoupon = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        "http://localhost:8000/api/v1/coupon/apply",
        { code: coupon, subtotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setDiscount(res.data.discount);
        toast.success("Coupon applied");
      }
    } catch (error) {
      setDiscount(0);
      toast.error("Invalid coupon");
    }
  };

  // ================= PAYMENT =================
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // Example: Stripe / SSLCommerz session creation
      const res = await axios.post(
        "http://localhost:8000/api/v1/payment/create-session",
        {
          amount: total,
          items: cart.items,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.url) {
        window.location.href = res.data.url; // redirect to gateway
      }
    } catch (error) {
      toast.error("Payment initiation failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {!cart?.items?.length ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6  mt-24">
          {/* ITEMS */}
          <div className="flex-1 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.productId?.productImg?.[0]?.url}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="line-clamp-2 w-80 font-semibold">
                      {item.productId?.productName}
                    </h2>
                    <p className="text-pink-500">৳ {formatTk(item.price)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      updateQuantity(item.productId._id, "decrease")
                    }
                    className="bg-pink-700"
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() =>
                      updateQuantity(item.productId._id, "increase")
                    }
                    className="bg-pink-700"
                  >
                    +
                  </Button>
                </div>

                <p>৳ {formatTk(item.price * item.quantity)}</p>

                <Button
                  className="bg-red-500"
                  onClick={() => removeItem(item.productId._id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <Card className="w-full lg:w-80 h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {formatTk(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `৳ ${formatTk(shipping)}`}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  className="border p-2 w-full rounded"
                  placeholder="Coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button onClick={applyCoupon} className="bg-pink-700">Apply</Button>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ৳ {formatTk(discount)}</span>
              </div>

              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>৳ {formatTk(total)}</span>
              </div>

              <Button
                className="w-full bg-green-600"
                onClick={handleCheckout}
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Cart;