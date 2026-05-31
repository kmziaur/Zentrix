import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  ShoppingCart,
  Package,
  Users,
  Loader2,
  LayoutDashboard,
  PlusCircle,
  Boxes,
  ClipboardList,
  RefreshCcw,
} from "lucide-react";

import { toast } from "sonner";

const Dashboard = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const isSuperAdmin = user?.role === "super-admin";

  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      const res = await axios.get("http://localhost:8000/api/v1/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
    const loadDashboardData = async () => {
      await fetchDashboardData();
    };

    loadDashboardData();
  }, []);

  const {
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    recentOrders,
  } = dashboardData;

  const orderStatusCounts = useMemo(() => {
    const totals = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    recentOrders?.forEach((order) => {
      const status = (order.status || "pending").toLowerCase();
      totals[status] = (totals[status] || 0) + 1;
    });

    return totals;
  }, [recentOrders]);

  const topProducts = useMemo(() => {
    const counts = {};

    recentOrders?.forEach((order) => {
      order.items?.forEach((item) => {
        const name = item.productId?.productName || item.productName || "Unknown";
        counts[name] = (counts[name] || 0) + (item.quantity || 1);
      });
    });

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([name, quantity]) => ({ name, quantity }));
  }, [recentOrders]);

  const salesTrend = useMemo(() => {
    const trend = (recentOrders || []).map((order) => ({
      label: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: order.totalAmount || 0,
    }));

    const maxValue = Math.max(1, ...trend.map((point) => point.value));

    return trend.map((point) => ({
      ...point,
      width: Math.round((point.value / maxValue) * 100),
    }));
  }, [recentOrders]);

  const averageOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Product",
      path: "/dashboard/add-product",
      icon: PlusCircle,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: Boxes,
    },
    ...(isSuperAdmin
      ? [
          {
            name: "Users",
            path: "/dashboard/user",
            icon: Users,
          },
        ]
      : []),
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: ClipboardList,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Loader2 className="animate-spin w-12 h-12 text-pink-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 mt-15">
      <aside className="hidden lg:block mt-15 w-72 bg-pink-700 text-white fixed inset-y-0 left-0 px-6 py-8 shadow-xl">
        <div className="mb-10">
          <span className="text-sm uppercase tracking-[0.25em] text-pink-200">Seller Center</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {isSuperAdmin ? "Zentrix Super Admin" : "Zentrix Admin"}
          </h1>
          <p className="mt-2 text-sm text-pink-200/80">
            {isSuperAdmin
              ? "Manage administrators, store operations, and system-wide metrics."
              : "Access your own product and order performance, plus customer data for your store only."}
          </p>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                  isActive
                    ? "bg-pink-600 text-white shadow-lg"
                    : "text-pink-100 hover:bg-pink-600/80 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-pink-100">
          <p className="font-semibold">Need help?</p>
          <p className="mt-2 leading-6 text-pink-100/80">
            Use quick links or review orders and customers to stay in control.
          </p>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-pink-700 text-white px-6 py-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-10">
              <span className="text-sm uppercase tracking-[0.25em] text-pink-200">Seller Center</span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">
                {isSuperAdmin ? "Zentrix Super Admin" : "Zentrix Admin"}
              </h1>
              <p className="mt-2 text-sm text-pink-200/80">
                {isSuperAdmin
                  ? "Manage administrators, store operations, and system-wide metrics."
                  : "Access your own product and order performance, plus customer data for your store only."}
              </p>
            </div>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                      isActive
                        ? "bg-pink-600 text-white shadow-lg"
                        : "text-pink-100 hover:bg-pink-600/80 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <main className="flex-1 lg:ml-72 p-6 md:p-10">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Admin Dashboard</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Dashboard</h1>
          </div>
          <Button onClick={() => setSidebarOpen(true)} className="bg-pink-600 text-white">
            Menu
          </Button>
        </div>

        {location.pathname === "/dashboard" && (
          <div className="space-y-8">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                  Admin Dashboard
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                  Store performance overview
                </h1>
                <p className="mt-3 max-w-2xl text-base text-slate-600">
                  {isSuperAdmin
                    ? "As super admin, you can oversee all admins, orders, products, and customers."
                    : "Track your products, orders, customers, and revenue for your own store data only."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={fetchDashboardData} className="bg-pink-300 hover:bg-pink-700">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <Link to="/dashboard/add-product" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700">
                  Add Product
                </Link>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader className="flex items-center gap-3">
                  <ShoppingCart className="text-pink-600" />
                  <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{totalOrders}</p>
                  <p className="mt-2 text-sm text-slate-500">Order volume for the store.</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader className="flex items-center gap-3">
                  <Package className="text-pink-600" />
                  <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{totalProducts}</p>
                  <p className="mt-2 text-sm text-slate-500">Published product listings.</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader className="flex items-center gap-3">
                  <Users className="text-pink-600" />
                  <CardTitle>Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{totalUsers}</p>
                  <p className="mt-2 text-sm text-slate-500">Registered users on the platform.</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader className="flex items-center gap-3">
                  <span className="text-pink-600 text-xl font-semibold">৳</span>
                  <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{formatCurrency(totalRevenue)}</p>
                  <p className="mt-2 text-sm text-slate-500">Total revenue from orders.</p>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle>Sales trend</CardTitle>
                      <p className="mt-1 text-sm text-slate-500">Revenue from latest orders</p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                      Updated now
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {salesTrend.length ? (
                    salesTrend.map((point) => (
                      <div key={point.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{point.label}</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(point.value)}</span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-pink-500 to-pink-300"
                            style={{ width: `${point.width}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No revenue data available yet.</p>
                  )}
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <Card className="border-slate-200/80 shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link
                      to="/dashboard/add-product"
                      className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                    >
                      Add a new product
                    </Link>
                    <Link
                      to="/dashboard/products"
                      className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                    >
                      Manage products
                    </Link>
                    <Link
                      to="/dashboard/orders"
                      className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                    >
                      Review orders
                    </Link>
                    <Link
                      to="/dashboard/user"
                      className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                    >
                      User management
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/80 shadow-sm">
                  <CardHeader>
                    <CardTitle>Order status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(orderStatusCounts).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="capitalize text-sm text-slate-700">{status}</span>
                        <span className="text-sm font-semibold text-slate-900">{count}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-slate-200/80 shadow-sm">
                  <CardHeader>
                    <CardTitle>Average order value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold">{formatCurrency(averageOrderValue)}</p>
                    <p className="mt-2 text-sm text-slate-500">Estimated average order amount.</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/80 shadow-sm">
                  <CardHeader>
                    <CardTitle>Top products</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topProducts.length ? (
                      topProducts.map((product) => (
                        <div key={product.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                          <span className="text-sm text-slate-700 truncate">{product.name}</span>
                          <span className="text-sm font-semibold text-slate-900">{product.quantity}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No product data available yet.</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Recent customers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(recentOrders || []).slice(0, 4).map((order) => (
                    <div key={order._id} className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{order.user?.fullname || "Guest"}</p>
                      <p className="mt-1 text-xs text-slate-500">Order {order._id.slice(-6)}</p>
                      <p className="mt-1 text-sm text-slate-600">{formatCurrency(order.totalAmount)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section className="space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">Latest orders</h2>
                  <p className="text-sm text-slate-500">An overview of the newest order activity.</p>
                </div>
                <Link
                  to="/dashboard/orders"
                  className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700"
                >
                  View all orders
                </Link>
              </div>

              {recentOrders?.length ? (
                <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
                  <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-5 py-4 text-sm font-medium">Order</th>
                        <th className="px-5 py-4 text-sm font-medium">Customer</th>
                        <th className="px-5 py-4 text-sm font-medium">Items</th>
                        <th className="px-5 py-4 text-sm font-medium">Amount</th>
                        <th className="px-5 py-4 text-sm font-medium">Status</th>
                        <th className="px-5 py-4 text-sm font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-slate-50">
                          <td className="px-5 py-4 text-sm font-medium text-slate-900">#{order._id.slice(-8)}</td>
                          <td className="px-5 py-4 text-sm text-slate-600">{order.user?.fullname || "Unknown"}</td>
                          <td className="px-5 py-4 text-sm text-slate-600">{order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0)}</td>
                          <td className="px-5 py-4 text-sm font-semibold text-slate-900">{formatCurrency(order.totalAmount)}</td>
                          <td className="px-5 py-4 text-sm capitalize text-pink-600">{order.status || "pending"}</td>
                          <td className="px-5 py-4 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
                  No recent orders available yet. Add products and drive sales to populate activity.
                </div>
              )}
            </section>
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
