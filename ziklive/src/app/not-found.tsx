import Link from "next/link";
import { Construction } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#fefefe]">
      <div className="max-w-xl w-full mx-auto">
        <Construction className="w-16 h-16 text-orange-500 mb-6 animate-bounce mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          This page is under construction or maintenance
        </h1>
        <p className="text-gray-600 mb-6">
          The page you're trying to access is currently being developed.
          Thank you for your patience. Please check back soon to discover
          new content on ZikLive.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
