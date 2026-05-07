import React, { useState } from "react";

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

  const [avatar, setAvatar] = useState("/profile.png");
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [updateUser, setUpdateUser] = useState({
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

  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    }); // preview only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      // formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file); // image file for backend multer
      }

      //for debug 
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-30 pb-10">
      {/* Tabs */}
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* ================= PROFILE TAB ================= */}
        <TabsContent value="profile">
          <div>
            <div className="flex flex-col justify-center items-center bg-gray-100">
              <h1 className="font-bold mb-7 text-2xl text-gray-800">
                Update Profile
              </h1>
              <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
                {/* profile picture */}
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser?.profilePic || userLogo}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                  />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 whitespace-nowrap ">
                    Change Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>

                {/* profile form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="block text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        value={updateUser.firstName}
                        onChange={handleChange}
                        placeholder="jony"
                        className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="block text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        value={updateUser.lastName}
                        onChange={handleChange}
                        placeholder="mia"
                        className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="block text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      disabled
                      value={updateUser.email}
                      onChange={handleChange}
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      name="phoneNo"
                      value={updateUser.phoneNo}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={updateUser.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium">City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={updateUser.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium">
                      Zip Code
                    </Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                      placeholder="Enter your zipcode"
                      className="rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="justify-center items-center  bg-amber-700 hover:bg-amber-900 px-6 py-3 rounded-lg shadow-md"
                  >
                    Update Profile
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ================= ORDERS TAB ================= */}
        <TabsContent value="orders">
          <div>
            <h2>Order page </h2>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
