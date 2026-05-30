import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.product);

  const [paymentMethod, setPaymentMethod] = useState("VisaCard");
  const [shippingAddress, setShippingAddress] = useState("");

  const discount = location.state?.discount || 0;
  const coupon = location.state?.coupon || "";
  const distanceKm = location.state?.distanceKm || 5;
  const SHIPPING_BASE = 60;

  const formatTk = (amount) =>
    new Intl.NumberFormat("en-BD").format(amount || 0);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [cart]);

  const shipping = useMemo(() => {
    if (subtotal >= 10000) return 0;
    if (distanceKm <= 5) return 40;
    if (distanceKm <= 15) return 80;
    return SHIPPING_BASE;
  }, [subtotal, distanceKm]);

  const total = Math.max(subtotal + shipping - discount, 0);

  useEffect(() => {
    if (user) {
      const addressParts = [user.address, user.city, user.zipCode].filter(Boolean);
      setShippingAddress(addressParts.join(", "));
    }
  }, [user]);

  const handleConfirmPayment = async () => {
    if (!cart?.items?.length) {
      toast.error("Your cart is empty.");
      navigate("/products");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/payment/create-session`,
        {
          paymentMethod,
          shippingAddress,
          coupon,
          discount,
          distanceKm,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.data.checkoutUrl) {
        // Redirect to Stripe checkout page
        window.location.href = res.data.checkoutUrl;
      } else {
        const message = res.data?.message || "Unable to start payment. Please try again.";
        toast.error(message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Payment initiation failed. Please check your credentials and cart.";
      console.error("Payment initiation error:", error);
      toast.error(message);
    }
  };

  if (!cart?.items?.length) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-xl font-semibold text-gray-700">No items in cart.</p>
        <Button onClick={() => navigate("/products")} className="mt-4 bg-pink-600">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your order and shipping details before completing payment.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="space-y-4 p-4">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium text-slate-900">
                  {user?.firstName || "-"} {user?.lastName || ""}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{user?.email || "-"}</p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-900">{user?.phoneNo || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="font-medium text-slate-900">
                  {user?.address ? `${user.address}, ${user.city || ""} ${user.zipCode || ""}` : "Not provided"}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-500" htmlFor="shippingAddress">
                Shipping address
              </label>
              <textarea
                id="shippingAddress"
                className="w-full rounded border border-slate-200 p-2"
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="space-y-4 p-4">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-500" htmlFor="paymentMethod">
                Choose payment gateway
              </label>
              <select
                id="paymentMethod"
                className="mt-2 w-full rounded border border-slate-200 p-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="VisaCard">Visa / Mastercard</option>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="space-y-4 p-4">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item._id} className="flex justify-between gap-3 border-b pb-3">
                  <div>
                    <p className="font-medium text-slate-900">{item.productId?.productName || "Product"}</p>
                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-slate-900">৳ {formatTk(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {formatTk(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `৳ ${formatTk(shipping)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ৳ {formatTk(discount)}</span>
              </div>
              {coupon ? (
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Coupon</span>
                  <span>{coupon}</span>
                </div>
              ) : null}
            </div>

            <div className="flex justify-between border-t pt-3 font-semibold text-slate-900">
              <span>Total</span>
              <span>৳ {formatTk(total)}</span>
            </div>

            <Button onClick={handleConfirmPayment} className="w-full bg-green-600">
              Confirm and Pay
            </Button>
            <Button onClick={() => navigate("/cart")} className="w-full bg-pink-50 text-pink-700 hover:bg-pink-100">
              Back to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
