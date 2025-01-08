"use client";
import ProgressBar from "../components/ProgressBar";

export default function FormLayout({ children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <ProgressBar />
      {children}
    </div>
  );
}
