
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save the token and basic user information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(`Welcome back, ${data.user.name}!`);

      // Navigate home after successful login
      navigate("/");
    } catch (error) {
      setMessage(
        error.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between bg-gray-950 px-6 py-5 text-white md:px-14">
        <Link to="/" className="text-3xl font-bold">
          <span className="text-amber-400">🛒</span>{" "}
          Bez-<span className="text-amber-400">Ora</span>
        </Link>

        <div className="flex gap-5 font-medium md:gap-8">
          <Link to="/" className="hover:text-amber-400">Home</Link>
          <Link to="/login" className="text-amber-400">Login</Link>
          <Link to="/register" className="hover:text-amber-400">
            Register
          </Link>
        </div>
      </nav>

      <main className="flex min-h-[85vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-10 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
              Bez-<span className="text-amber-500">Ora</span>
            </h1>
            <p className="mt-4 text-gray-500">
              Welcome back! Please login to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-gray-800"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-semibold text-gray-800"
              >
                Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 pr-4 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl bg-transparent px-4 py-4 outline-none"
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

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="accent-amber-500"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-amber-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {message && (
              <p
                role="alert"
                aria-live="polite"
                className="text-sm text-red-600"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-950 py-4 font-bold text-white transition hover:bg-amber-500 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-amber-600 hover:underline"
            >
              Register
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

export default Login;
