import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  return (
    <form className="space-y-6">

      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Send Reset Link
      </button>

      <p className="text-center text-sm">
        Remember your password?{" "}
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

export default ForgotPasswordForm;