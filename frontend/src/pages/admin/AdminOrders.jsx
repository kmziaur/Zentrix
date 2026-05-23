import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8000/api/v1/admin/orders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdating(true);
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:8000/api/v1/admin/orders/status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Order status updated.");
      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to update order status.");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Orders</h1>
          <p className="text-sm text-slate-500">
            Review every order placed through the store.
          </p>
        </div>

        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Order overview</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
                Loading orders...
              </div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-4 text-sm font-medium">Order</th>
                      <th className="px-5 py-4 text-sm font-medium">Customer</th>
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
                          {order.user?._id ? (
                            <Link to={`/dashboard/user/${order.user._id}`} className="text-pink-600 font-medium hover:underline">
                              {order.user?.firstName} {order.user?.lastName}
                            </Link>
                          ) : (
                            `${order.user?.firstName || ''} ${order.user?.lastName || ''}`
                          )}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-slate-900">BDT {order.totalAmount}</td>
                        <td className="px-5 py-4 text-sm text-slate-700">
                          <div className="flex items-center gap-3">
                            <select
                              value={order.status}
                              onChange={(event) => handleStatusChange(order._id, event.target.value)}
                              disabled={updating}
                              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                            >
                              {STATUS_OPTIONS.map((statusOption) => (
                                <option key={statusOption} value={statusOption}>
                                  {statusOption}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                No orders have been placed yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;
