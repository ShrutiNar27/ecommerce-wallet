import { ShoppingCart, Heart, User, Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          E-Commerce
        </h1>

        {/* Search */}
        <div className="flex items-center border rounded-lg px-3 py-2 w-[400px]">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="ml-2 outline-none w-full"
          />
        </div>

        {/* Menu */}
        <div className="flex gap-6 items-center">

          <a href="/">Home</a>

          <a href="/products">Products</a>

          <Heart className="cursor-pointer" />

          <ShoppingCart className="cursor-pointer" />

          <User className="cursor-pointer" />

        </div>

      </div>
    </nav>
  );
}

export default Navbar;