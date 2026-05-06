import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [avatar, setAvatar] = useState("/profile.png");
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [user, setUser] = useState({
    firstName: "Ziaur",
    lastName: "Rahman",
    email: "ziaur@example.com",
    phone: "+8801XXXXXXXXX",
    role: "user",
    address: "Shaheed Moktar Elahi Hall, Tangail",
    city: "rangpur",
    zipcode: "1234",
  });

  const orders = [
    { id: "ORD-101", status: "Delivered", total: 1200 },
    { id: "ORD-102", status: "Pending", total: 3500 },
    { id: "ORD-103", status: "Shipped", total: 2200 },
    { id: "ORD-104", status: "Delivered", total: 1800 },
    { id: "ORD-105", status: "Processing", total: 5400 },
    { id: "ORD-106", status: "Cancelled", total: 900 },
    { id: "ORD-107", status: "Delivered", total: 2750 },
    { id: "ORD-108", status: "Shipped", total: 3200 },
    { id: "ORD-109", status: "Pending", total: 1500 },
    { id: "ORD-110", status: "Delivered", total: 4100 },
    { id: "ORD-111", status: "Processing", total: 2300 },
    { id: "ORD-112", status: "Shipped", total: 6700 },
    { id: "ORD-113", status: "Delivered", total: 1250 },
    { id: "ORD-114", status: "Cancelled", total: 3000 },
    { id: "ORD-115", status: "Pending", total: 890 },
    { id: "ORD-116", status: "Delivered", total: 5600 },
    { id: "ORD-117", status: "Shipped", total: 2400 },
    { id: "ORD-118", status: "Processing", total: 3100 },
    { id: "ORD-119", status: "Delivered", total: 1999 },
    { id: "ORD-120", status: "Pending", total: 4500 },
  ];

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated user:", user);
    alert("Profile updated!");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Section */}
      <div className="px-10">
        <div className="relative h-60 bg-gradient-to-r from-blue-600 to-indigo-600">
          {/* Profile Picture */}
          <div className="ml-50 absolute -bottom-50 left-10 relative group">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={avatar}
                alt="profile"
              />
            </div>

            {/* Edit Button (bottom-right) */}
            <label className="absolute -bottom-2 right-288 bg-white hover:bg-pink-600 hover:text-white text-pink-400 p-1 rounded-full cursor-pointer shadow-md">
              ✎
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>
        {/* Name Section */}
        <div className="ml-50 pl-10 pt-16">
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500">
            {user.role === "user"
              ? "Zentrix Proud Customer"
              : "Zentrix Proud Seller"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-blue-500 text-black grid grid-cols-2 w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* ================= PROFILE TAB ================= */}
          <TabsContent value="profile">
            <Card className="w-full mt-5 shadow-lg rounded-2xl border bg-white">
              <CardContent className="p-6 space-y-6">
                {/* Section Title */}
                <div className="border-b pb-3">
                  <h2 className="text-lg font-semibold">
                    Personal Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Update your account details below
                  </p>
                </div>

                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-5 pt-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="text-sm font-medium text-gray-700"
                    >
                      Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                      placeholder="Enter your role"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700"
                    >
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={user.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="zipcode"
                      className="text-sm font-medium text-gray-700"
                    >
                      ZipCode
                    </Label>
                    <Input
                      id="zipcode"
                      name="zipcode"
                      value={user.zipcode}
                      onChange={handleChange}
                      placeholder="Enter your zipcode"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleSave}
                    type="submit"
                    className="bg-amber-700 hover:bg-amber-900 px-6 py-2 rounded-lg shadow-md"
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= ORDERS TAB ================= */}
          <TabsContent value="orders">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
              </CardHeader>

              <CardContent>
                {/* ================= ORDER LIST ================= */}
                {!selectedOrder && (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100 transition"
                      >
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-500">
                            Status: {order.status}
                          </p>
                        </div>

                        <div className="font-bold text-blue-600">
                          ৳{order.total}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ================= ORDER DETAILS ================= */}
                {selectedOrder && (
                  <div className="space-y-4">
                    {/* Back Button */}
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ← Back to Orders
                    </button>

                    {/* Order Header */}
                    <div className="p-4 border rounded-lg bg-white">
                      <h2 className="text-lg font-semibold">
                        Order #{selectedOrder.id}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Status: {selectedOrder.status}
                      </p>
                    </div>

                    {/* Order Details Box */}
                    <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
                      <p>
                        <span className="font-medium">Total Amount:</span> ৳
                        {selectedOrder.total}
                      </p>

                      {/* You can extend this later */}
                      <p>
                        <span className="font-medium">Payment Method:</span>{" "}
                        Cash on Delivery
                      </p>

                      <p>
                        <span className="font-medium">Delivery Address:</span>{" "}
                        Shaheed Moktar Elahi Hall, Tangail
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
