import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8000/api/v1/user/all-user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = users.filter((u) => {
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      return (
        fullName.includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phoneNo || "").toLowerCase().includes(q)
      );
    });

    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">User Management</h1>
          <p className="text-sm text-slate-500">
            Browse registered users and access their profile or order history.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <Input
            placeholder="Search users by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:max-w-md"
          />
          <p className="text-sm text-slate-500">{filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found</p>
        </div>

        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Registered users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
                Loading users...
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-4 text-sm font-medium">Avatar</th>
                      <th className="px-5 py-4 text-sm font-medium">Name</th>
                      <th className="px-5 py-4 text-sm font-medium">Email</th>
                      <th className="px-5 py-4 text-sm font-medium">Role</th>
                      <th className="px-5 py-4 text-sm font-medium">Verified</th>
                      <th className="px-5 py-4 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-50">
                        <td className="px-5 py-4 text-sm text-slate-900">
                          {user.profilePic ? (
                            <img
                              src={user.profilePic}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                              N/A
                            </div>
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">{user.email}</td>
                        <td className="px-5 py-4 text-sm text-slate-600">{user.role || "user"}</td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {user.isVerified ? "Yes" : "No"}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          <div className="flex flex-wrap gap-2">
                            <Link
                              to={`/dashboard/user/${user._id}`}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              View profile
                            </Link>
                            <Link
                              to={`/dashboard/users/orders/${user._id}`}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Orders
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                No registered users found yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;
