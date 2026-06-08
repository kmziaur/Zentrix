import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ShowUserOrders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load user orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadOrders();
    }
  }, [userId]);

  return (
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">User Orders</h1>
            <p className="text-sm text-slate-500">
              Orders placed by this customer.
            </p>
          </div>
          <Link
            to="/dashboard/user"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to users
          </Link>
        </div>

        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Order history</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
                Loading user orders...
              </div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-4 text-sm font-medium">Order</th>
                      <th className="px-5 py-4 text-sm font-medium">Items</th>
                      <th className="px-5 py-4 text-sm font-medium">Total</th>
                      <th className="px-5 py-4 text-sm font-medium">Status</th>
                      <th className="px-5 py-4 text-sm font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50">
                        <td className="px-5 py-4 text-sm font-medium text-slate-900">#{order._id.slice(-8)}</td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-slate-900">BDT {order.totalAmount}</td>
                        <td className="px-5 py-4 text-sm capitalize text-pink-600">{order.status}</td>
                        <td className="px-5 py-4 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                No orders found for this user.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShowUserOrders;
