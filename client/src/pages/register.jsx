
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim().toLowerCase();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    setMessage("");
    setMessageType("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage("Account created successfully! You can now log in.");
      setMessageType("success");
      form.reset();
      setShowPassword(false);
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Make sure your backend is running."
          : error.message
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gray-950 px-6 py-5 text-white md:px-14">
        <Link to="/" className="text-3xl font-bold">
          <span className="text-amber-400">🛒</span>{" "}
          Bez-<span className="text-amber-400">Ora</span>
        </Link>

        <div className="flex gap-4 font-medium md:gap-8">
          <Link to="/" className="hover:text-amber-400">Home</Link>
          <Link to="/login" className="hover:text-amber-400">Login</Link>
          <Link to="/register" className="text-amber-400">Register</Link>
        </div>
      </nav>

      {/* Registration Form */}
      <main className="flex min-h-[85vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
              Join Bez-<span className="text-amber-500">Ora</span>
            </h1>

            <p className="mt-4 text-gray-500">
              Create your account and start shopping!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Password
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 pr-4 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password (8+ characters)"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full rounded-xl bg-transparent px-4 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-gray-500 hover:text-amber-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter your password again"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                required
                className="mt-1 accent-amber-500"
              />
              <span>
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </label>

            {/* Status Message */}
            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-lg p-3 text-sm ${
                  messageType === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-950 py-4 font-bold text-white transition hover:bg-amber-500 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-amber-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      <footer className="pb-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Bez-Ora. All rights reserved.
      </footer>
    </div>
  );
}

export default Register;
