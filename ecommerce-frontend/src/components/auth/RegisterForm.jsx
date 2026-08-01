import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <form className="space-y-5">

      <div>
        <label className="block text-sm font-medium mb-2">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Password
        </label>

        <PasswordInput
            label="Password"
            placeholder="Create a password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Confirm Password
        </label>

        <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Create Account
      </button>

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