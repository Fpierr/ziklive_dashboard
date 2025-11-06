"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormInput from "@/components/form_input";
import { useAuth } from "@/context/auth_context";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { CardDescription, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email format");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!form.password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      await login(form.email, form.password);
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 text-gray-700 dark:text-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 w-full max-w-sm z-10 space-y-6 overflow-auto"
      >
        <CardTitle className="text-2xl font-bold mb-1 text-center text-gray-800 dark:text-white">Log In</CardTitle>
          <CardDescription className="text-[1rem] text-center" >
            Enter your email below to login to your account
          </CardDescription>

        {error && (
          <p className="text-center text-sm text-red-500 bg-red-100 dark:bg-red-900 p-2 rounded">
            {error}
          </p>
        )}

        <FormInput
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          error={emailError}
        />

        <div>
          <FormInput
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            error={error.includes("password") ? error : ""}
            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            showToggle
            onToggle={() => setShowPassword(!showPassword)}
          />

          <div className="flex justify-end mt-0 mb-1">
            <a
              href="/forgot-password"
              className="text-sm text-pink-600 hover:underline justify-end"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Bouton Google */}
        <button
          type="button"
          className="w-full border border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-pink-600 hover:underline">
            Sign Up
          </a>
        </p>

        {/* politic privacy */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-8">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="text-pink-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-pink-600 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </form>
    </div>
  );
}
