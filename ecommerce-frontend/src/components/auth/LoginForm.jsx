import { login } from "@/services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/authSchemas";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
  try {
    const response = await login(data);

    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);

    console.log("Login successful");

    navigate("/");
  } catch (error) {
    console.error(error);(
      error.response?.data?.message || "Invalid email or password"
    );
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex justify-between items-center text-sm">

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>

      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      {/* Register Link */}
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </Link>
      </p>

    </form>
  );
}

export default LoginForm;