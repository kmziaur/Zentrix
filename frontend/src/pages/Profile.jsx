import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import axios from "axios";

import { setUser } from "@/redux/userSlice";
import userLogo from "../assets/profile.png";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    zipCode: "",
    profilePic: "",
    role: "",
  });
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  // Sync Redux user → local state
  // eslint-disable-next-line
  useEffect(() => {
    if (user) {
      setUpdateUser({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNo: user?.phoneNo || "",
        address: user?.address || "",
        city: user?.city || "",
        zipCode: user?.zipCode || "",
        profilePic: user?.profilePic || "",
        role: user?.role || "",
      });
    }
  }, [user]);

  // Cleanup blob URL (memory leak fix)
  useEffect(() => {
    return () => {
      if (updateUser.profilePic?.startsWith("blob:")) {
        URL.revokeObjectURL(updateUser.profilePic);
      }
    };
  }, [updateUser.profilePic]);

  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      setUpdateUser({
        ...updateUser,
        profilePic: URL.createObjectURL(selectedFile),
      });
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:8000/api/v1/user/orders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        setOrdersError(res.data.message || "Unable to load orders.");
      }
    } catch {
      setOrdersError("Unable to load orders. Please try again.");
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // Redux update
        dispatch(setUser(res.data.user));

        // localStorage sync (IMPORTANT for refresh)
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-30 pb-10">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* PROFILE */}
        <TabsContent value="profile">
          <div className="flex flex-col justify-center items-center bg-gray-100">
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>

            <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
              {/* PROFILE IMAGE */}
              <div className="flex flex-col items-center">
                <img
                  src={
                    updateUser?.profilePic?.trim()
                      ? updateUser.profilePic
                      : userLogo
                  }
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                />

                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 whitespace-nowrap">
                  Change Picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    value={updateUser.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  <Input
                    name="lastName"
                    value={updateUser.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>

                <Input name="email" value={updateUser.email} disabled />

                <Input
                  name="phoneNo"
                  value={updateUser.phoneNo}
                  onChange={handleChange}
                  placeholder="Phone"
                />

                <Input
                  name="address"
                  value={updateUser.address}
                  onChange={handleChange}
                  placeholder="Address"
                />

                <Input
                  name="city"
                  value={updateUser.city}
                  onChange={handleChange}
                  placeholder="City"
                />

                <Input
                  name="zipCode"
                  value={updateUser.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-pink-700 hover:bg-amber-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Updating Profile...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        {/* ORDERS */}
        <TabsContent value="orders">
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Your Orders</h2>

            {ordersLoading ? (
              <p className="text-center text-slate-500">Loading your orders...</p>
            ) : ordersError ? (
              <p className="text-center text-red-500">{ordersError}</p>
            ) : !orders.length ? (
              <p className="text-center text-slate-500">
                You have no orders yet. Start shopping to place your first order.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Order ID</p>
                        <p className="font-semibold text-slate-900">#{order._id.slice(-8)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Date</p>
                        <p className="font-medium text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Status</p>
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "shipped"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Total</p>
                        <p className="font-semibold text-slate-900">৳ {order.totalAmount.toLocaleString("en-BD")}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Items</p>
                        <p className="font-medium text-slate-900">{order.items?.length || 0} products</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Payment</p>
                        <p className="font-medium text-slate-900">{order.paymentMethod || "Not set"}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-slate-500">Order items</p>
                      <div className="mt-2 space-y-2">
                        {order.items.map((item) => (
                          <div key={`${order._id}-${item.productId?._id || item.productId}`} className="flex justify-between rounded-xl border border-slate-200 p-3">
                            <div>
                              <p className="font-medium text-slate-900">{item.productId?.productName || "Product"}</p>
                              <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-slate-900">৳ {(item.price * item.quantity).toLocaleString("en-BD")}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
