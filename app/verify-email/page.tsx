"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams ? searchParams.get("email") : null;

  useEffect(() => {
    if (!email) {
      setError("No email provided. Please try signing up again.");
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedOtp = otp.trim();
    if (!trimmedOtp || !/^\d{4}$/.test(trimmedOtp)) {
      setError("Please enter a valid 4-digit numeric OTP");
      return;
    }

    if (!email) {
      setError("No email provided. Please try signing up again.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: trimmedOtp }),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        result = await response.json();
      } else {
        result = { error: await response.text() };
      }

      if (!response.ok) {
        console.error("Verify email error:", {
          status: response.status,
          statusText: response.statusText,
          body: result,
        });
        setError(result.message || result.error || `Verification failed (${response.status})`);
        setLoading(false);
        return;
      }

      console.log("Verify email success:", result);
      setSuccess("Email verified successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      console.error("Verify email catch error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    setOtp(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-md shadow">
        <h2 className="text-2xl font-extrabold text-center text-[#25324B] mb-6">
          Verify Your Email
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center mb-4">{success}</p>
        )}

        {email ? (
          <p className="text-sm text-gray-600 text-center mb-4">
            A verification code has been sent to <strong>{email}</strong>.
          </p>
        ) : (
          <p className="text-sm text-red-500 text-center mb-4">
            No email provided. Please try signing up again.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Verification Code</label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 4-digit OTP"
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm placeholder-[#A8ADB7]"
              maxLength={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-2 rounded-full"
            disabled={loading || !email}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}