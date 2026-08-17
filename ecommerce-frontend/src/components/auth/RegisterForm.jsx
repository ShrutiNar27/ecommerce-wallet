import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register } from "@/services/authService";
import PasswordInput from "./PasswordInput";

function RegisterForm() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      setIsSubmitting(true);

      await register({
        name: fullName.trim(),
        email: email.trim(),
        password,
      });

      toast.success("Account created successfully");

      navigate("/login");

    } catch (error) {

      console.error("Registration failed:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to create account"
      );

    } finally {

      setIsSubmitting(false);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* Full Name */}

      <div>

        <label className="block text-sm font-medium mb-2">
          Full Name
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>


      {/* Email */}

      <div>

        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>


      {/* Password */}

      <PasswordInput
        label="Password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      {/* Confirm Password */}

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />


      {/* Create Account */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? "Creating Account..."
          : "Create Account"}
      </button>


      {/* Login Link */}

      <p className="text-center text-sm">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>

      </p>

    </form>

  );

}

export default RegisterForm;