import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentGateway = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderId");
  const paymentMethod = searchParams.get("paymentMethod") || "VisaCard";

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        toast.error("Invalid payment session.");
        navigate("/cart");
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:8000/api/v1/payment/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrder(res.data.order);
        } else {
          toast.error(res.data.message || "Unable to load payment session.");
          navigate("/cart");
        }
      } catch (error) {
        toast.error("Unable to fetch order details.");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handlePay = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `http://localhost:8000/api/v1/payment/confirm/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.data.success) {
        navigate(`/payment/success?orderId=${orderId}`);
      } else {
        toast.error(res.data.message || "Payment failed.");
      }
    } catch (error) {
      toast.error("Payment failed. Try again.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading payment details...</p>;
  }

  if (!order) {
    return <p className="text-center mt-10 text-red-500">No payment session found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="space-y-4 p-4">
        <CardHeader>
          <CardTitle>Payment Gateway</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
            <p className="text-sm text-slate-500">Selected gateway</p>
            <p className="text-xl font-semibold text-slate-900">{paymentMethod}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Order ID</span>
              <span className="font-medium">#{order._id.slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total amount</span>
              <span className="font-medium">৳ {order.totalAmount.toLocaleString("en-BD")}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-medium capitalize">{order.status}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p>Select your payment source to complete the order.</p>
            <p>If this were a live gateway, you would be redirected to bank/bkash/nagad/rocket now.</p>
          </div>

          <Button onClick={handlePay} className="w-full bg-green-600">
            Pay {order.totalAmount.toLocaleString("en-BD")} with {paymentMethod}
          </Button>

          <Button onClick={() => navigate("/payment")} className="w-full bg-pink-50 text-pink-700 hover:bg-pink-100">
            Back to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentGateway;
