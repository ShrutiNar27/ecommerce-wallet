import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

import Products from "@/pages/products/Products";
import ProductDetails from "@/pages/products/ProductDetails";
import Cart from "@/pages/cart/Cart";
import Wishlist from "@/pages/wishlist/Wishlist";
import Checkout from "@/pages/orders/Checkout";
import Orders from "@/pages/orders/Orders";
import Addresses from "@/pages/address/Addresses";

import MainLayout from "@/components/layout/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Home */}

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Products */}

        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        {/* Cart */}

        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <MainLayout>
              <Orders />
            </MainLayout>
          }
        />

        <Route
          path="/addresses"
          element={
            <MainLayout>
              <Addresses />
            </MainLayout>
          }
        />

        {/* Wishlist */}

        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <Wishlist />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}