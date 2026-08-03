import { ShoppingCart, Heart, User, Search, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

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

        <div className="flex items-center border rounded-lg px-3 py-2 w-[340px]">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            className="ml-2 outline-none w-full"
          />

        </div>

        {/* Menu */}

        <div className="flex gap-6 items-center">

          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Heart className="cursor-pointer" />

          <Link to="/cart">
            <ShoppingCart className="cursor-pointer" />
          </Link>

          <User className="cursor-pointer" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;