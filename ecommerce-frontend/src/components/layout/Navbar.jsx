import {
  ShoppingCart,
  Heart,
  User,
  Search,
  LogOut,
  LogIn,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ShopEase
        </Link>

        {/* Search */}
        <div className="flex items-center border rounded-lg px-3 py-2 w-[400px]">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            className="ml-2 outline-none w-full"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-blue-600 transition"
          >
            Products
          </Link>

          {token ? (
            <>
              <Link to="/wishlist">
                <Heart
                  className="cursor-pointer hover:text-red-500 transition"
                />
              </Link>

              <Link to="/cart">
                <ShoppingCart
                  className="cursor-pointer hover:text-blue-600 transition"
                />
              </Link>

              <Link to="/profile">
                <User
                  className="cursor-pointer hover:text-blue-600 transition"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <LogIn size={18} />
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;