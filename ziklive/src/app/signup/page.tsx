"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/text_field";
import EmailField from "@/components/email_field";
import PasswordField from "@/components/password_field";
import { signupUser } from "@/lib/fetch_endpoints";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Please enter a valid email address.");
    }

    if (name === "fullName") {
      setFullNameError(value.trim().length < 3 ? "Please enter a valid full name." : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid) {
      setError("Password is too weak or does not meet requirements.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.fullName.trim().length < 3) {
      setError("Please enter a valid name.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signupUser(form.fullName.trim(), form.email.trim(), form.password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 w-full max-w-sm z-10 overflow-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-xs mb-4 text-center">{error}</p>
        )}

        <TextField
          label="Full Name or Business Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        {fullNameError && (
          <p className="text-red-500 text-xs mt-1 mb-4">{fullNameError}</p>
        )}

        <EmailField value={form.email} onChange={handleChange} />
        {emailError && (
          <p className="text-red-500 text-xs mt-1 mb-4">{emailError}</p>
        )}

        <PasswordField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          onValidityChange={setIsPasswordValid}
        />

        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E60DA9] hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-[#E60DA9] hover:underline">
            Sign In
          </a>
        </p>

        {/* politic privacy */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-8">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="text-pink-600 hover:underline ">
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
