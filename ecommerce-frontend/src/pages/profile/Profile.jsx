import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  updateCurrentUser,
} from "@/services/userService";

import { toast } from "react-toastify";

function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    try {

      const data = await getCurrentUser();

      setUser(data);
      setName(data.name);

    } catch (error) {

      console.error("Failed to load profile:", error);

    } finally {

      setLoading(false);

    }

  };

  const handleSave = async () => {

    if (!name.trim()) {

      toast.error("Name cannot be empty");

      return;
    }

    try {

      setSaving(true);

      const updatedUser = await updateCurrentUser({
        name: name.trim(),
      });

      setUser(updatedUser);
      setName(updatedUser.name);
      setEditing(false);

      toast.success("Profile updated successfully");

    } catch (error) {

      console.error("Failed to update profile:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update profile"
      );

    } finally {

      setSaving(false);

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");

  };

  if (loading) {

    return (
      <div className="max-w-4xl mx-auto py-8 sm:py-10 px-5 sm:px-6">

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          My Profile
        </h1>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow text-center">
          Loading...
        </div>

      </div>
    );

  }

  if (!user) {

    return (
      <div className="max-w-4xl mx-auto py-8 sm:py-10 px-5 sm:px-6">

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          My Profile
        </h1>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow text-center">

          <h2 className="text-xl sm:text-2xl font-semibold">
            Failed to load profile
          </h2>

        </div>

      </div>
    );

  }

  return (

    <div className="max-w-4xl mx-auto py-8 sm:py-10 px-5 sm:px-6">

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
        My Profile
      </h1>

      <div className="bg-white rounded-xl shadow p-5 sm:p-8">

        {/* Name */}

        <div className="mb-6">

          <p className="text-gray-500 text-sm">
            Name
          </p>

          {editing ? (

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          ) : (

            <p className="text-lg sm:text-xl font-semibold mt-1 break-words">
              {user.name}
            </p>

          )}

        </div>


        {/* Email */}

        <div>

          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p className="text-lg sm:text-xl font-semibold mt-1 break-words">
            {user.email}
          </p>

        </div>


        {/* Edit / Save / Cancel */}

        <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">

          {!editing ? (

            <button
              onClick={() => setEditing(true)}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>

          ) : (

            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => {
                  setEditing(false);
                  setName(user.name);
                }}
                disabled={saving}
                className="w-full sm:w-auto bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </>

          )}

        </div>


        {/* Account Navigation */}

        <div className="mt-6">

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg font-semibold"
          >
            📦 My Orders
          </button>

        </div>

        <div className="mt-3">

          <button
            onClick={() => navigate("/wishlist")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg font-semibold"
          >
            ❤️ My Wishlist
          </button>

        </div>

        <div className="mt-3">

          <button
            onClick={() => navigate("/addresses")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg font-semibold"
          >
            📍 My Addresses
          </button>

        </div>

        <div className="mt-3">

          <button
            onClick={() => navigate("/wallet")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg font-semibold"
          >
            💳 My Wallet
          </button>

        </div>

        <div className="mt-3">

          <button
            onClick={handleLogout}
            className="w-full bg-red-100 hover:bg-red-200 text-red-600 text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg font-semibold"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Profile;