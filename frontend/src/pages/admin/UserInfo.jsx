import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:8000/api/v1/user/get-user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  return (
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">User Profile</h1>
            <p className="text-sm text-slate-500">
              Review detailed user information and account data.
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
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
                Loading user details...
              </div>
            ) : user ? (
              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-sm text-slate-500">No image</div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{user.firstName} {user.lastName}</h2>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Role</p>
                      <p className="text-lg font-semibold text-slate-900">{user.role || "user"}</p>
                    </div>
                    <div className="space-y-2 rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Verified</p>
                      <p className="text-lg font-semibold text-slate-900">{user.isVerified ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Address</p>
                    <p className="text-sm text-slate-700">{user.address || "Not provided"}</p>
                  </div>

                  <div className="space-y-2 rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Contact</p>
                    <p className="text-sm text-slate-700">Phone: {user.phoneNo || "Not set"}</p>
                    <p className="text-sm text-slate-700">City: {user.city || "Not set"}</p>
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl bg-slate-50 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">User ID</p>
                    <p className="text-sm text-slate-700">{user._id}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Created</p>
                    <p className="text-sm text-slate-700">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Last updated</p>
                    <p className="text-sm text-slate-700">{new Date(user.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                User not found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserInfo;
