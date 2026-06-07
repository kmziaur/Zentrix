import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        toast.error("Missing order information.");
        navigate("/products");
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        
        // Confirm payment with session ID if available
        if (sessionId && !order) {
          await axios.post(
            `${API_BASE_URL}/api/v1/payment/confirm/${orderId}`,
            { sessionId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        // Fetch order details
        const res = await axios.get(`${API_BASE_URL}/api/v1/payment/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrder(res.data.order);
        } else {
          toast.error(res.data.message || "Unable to load order.");
          navigate("/products");
        }
      } catch {
        toast.error("Unable to load order.");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, sessionId, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-10 lg:mt-15 min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 text-slate-900 flex items-center justify-center ">
      <Card className="space-y-4 p-4">
        {/* <CardHeader>
          <CardTitle>Payment Completed</CardTitle>
        </CardHeader> */}

        <CardContent className="space-y-4">
          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 text-center">
            <h2 className="text-2xl font-semibold text-green-900">Thank you!</h2>
            <p className="mt-2 text-slate-700">Your payment was successful and your order is being processed.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-slate-500">Order ID</p>
              <p className="font-medium">#{order._id.slice(-8)}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-sm text-slate-500">Amount paid</p>
              <p className="font-medium">৳ {order.totalAmount.toLocaleString("en-BD")}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p>Payment method: {order.paymentMethod}</p>
            <p>Order status: {order.status}</p>
          </div>

          <div className="w-full h-20 flex gap-3 flex-col sm:flex-row">
            <Button onClick={() => navigate("/products")} className="flex-1 bg-pink-600">
              Continue Shopping
            </Button>
            <Button onClick={() => navigate(`/profile/${order.user}`)} className="flex-1 bg-pink-50 text-pink-700 hover:bg-pink-100">
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
