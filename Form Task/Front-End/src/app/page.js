"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to the Multi-Step Form
        </h1>
        <p className="text-center text-gray-600 mb-6">
          This form will guide you through multiple steps to collect detailed
          information. You can review your data and make changes before the
          final submission.
        </p>
        <div className="flex justify-center">
          <Link
            href="/form/step1"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Start the Form
          </Link>
        </div>
      </div>
    </div>
  );
}
