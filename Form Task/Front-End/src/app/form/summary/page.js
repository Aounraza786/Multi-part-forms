"use client";

import { useSelector } from "react-redux";
import { useState } from "react";

export default function Summary() {
  const formData = useSelector((state) => state.form.formData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDoneClick = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black">Form Submission Summary</h1>
      {!isSubmitted ? (
        <div className="space-y-4">
          {Object.keys(formData).map((step, idx) => (
            <div key={idx} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold capitalize text-black mb-2">
                {step}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData[step]).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <strong className="text-black">{key}:</strong>
                    <span className="text-black">
                      {Array.isArray(value)
                        ? value.join(", ")
                        : value.toString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDoneClick}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-lg font-semibold text-green-600">
          Thank you for your submission!
        </div>
      )}
    </div>
  );
}
