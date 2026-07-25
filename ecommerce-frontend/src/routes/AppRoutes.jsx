import ProductDetails from "@/pages/products/ProductDetails";
import Products from "@/pages/products/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/home/Home";

function Login() {
  return <h1 className="text-3xl p-10">🔐 Login Page</h1>;
}

function Register() {
  return <h1 className="text-3xl p-10">📝 Register Page</h1>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

