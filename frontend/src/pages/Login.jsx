import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const token = res.data.accessToken;
        const user = res.data.user;

        console.log("TOKEN RECEIVED:", token);

        if (!token) {
          toast.error("No token received from backend");
          return;
        }

        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(setUser(user));

        navigate("/");
      }

    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>

        <form onSubmit={submitHandler}>
          <CardContent>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />

                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      className="w-5 h-5 text-gray-700 absolute right-4 top-2 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="w-5 h-5 text-gray-700 absolute right-4 top-2 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2 mt-5">
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-gray-700 text-sm">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="hover:underline text-pink-800 cursor-pointer"
              >
                Signup
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
