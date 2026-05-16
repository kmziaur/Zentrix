import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchDashboardData);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  const {
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    recentOrders,
  } = dashboardData;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Monitor your store performance in real time.</p>
        </div>
        <Button onClick={fetchDashboardData}>Refresh Data</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-pink-200 shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <ShoppingCart className="text-pink-600" />
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200 shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <Package className="text-pink-600" />
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200 shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <Users className="text-pink-600" />
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200 shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <DollarSign className="text-pink-600" />
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <span className="text-sm text-gray-500">Showing latest 5 orders</span>
        </div>

        {recentOrders?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Items</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-3 text-sm text-gray-700">{order._id.slice(-8)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{order.user?.fullname || "Unknown"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-4 py-3 text-sm capitalize text-pink-600">{order.status || "pending"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
            No recent orders available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
