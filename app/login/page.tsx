/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Invalid email address");
      return false;
    }
    if (!form.password || form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        console.error("Login error:", result.error);
        try {
          const parsedError = JSON.parse(result.error);
          setError(parsedError.error || parsedError.message || "Login failed");
        } catch {
          setError(result.error || "Login failed");
        }
        setLoading(false);
        return;
      }

      if (!result?.ok || !result?.url) {
        console.error("Login failed:", result);
        setError("Login failed unexpectedly");
        setLoading(false);
        return;
      }

      console.log("Login success:", result);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login catch error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-md shadow">
        <h2 className="text-2xl font-extrabold text-center text-[#25324B] mb-6">
          Welcome Back!
        </h2>

        <button
          className="w-full flex items-center justify-center border border-[#CCCCF5] rounded-md py-2 mb-4 hover:bg-gray-100 transition"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <img
            src="/google-icon.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm font-bold text-[#4640DE]">
            Sign In with Google
          </span>
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-400 text-sm">Or Sign In with Email</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm placeholder-[#A8ADB7]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm placeholder-[#A8ADB7]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-2 rounded-full"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-xs text-gray-400 mt-4">
          By clicking &apos;Sign In&apos;, you acknowledge that you have read and accepted our{" "}
          <a href="#" className="text-indigo-700 hover:underline">Terms of Service</a> and{" "}
          <a href="#" className="text-indigo-700 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
