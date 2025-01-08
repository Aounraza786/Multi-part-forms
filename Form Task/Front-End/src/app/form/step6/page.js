"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { submitForm, deleteFormData } from "../../store/formSlice";

export default function Step6() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);

  const handleSubmit = () => {
    dispatch(submitForm());
    const subForm = async () => {
      const response = await fetch("http://localhost:3001/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
    };
    subForm();
    alert("Form submitted successfully!");
    router.push("/form/summary");
  };

  const handleEdit = (stepIndex) => {
    router.push(`/form/step${stepIndex}?mode=edit`);
  };

  const handleDelete = (step) => {
    dispatch(deleteFormData({ stepKey: step }));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-black mb-4">Form Steps</h1>
      <div className="space-y-4">
        {formData && Object.keys(formData).length > 0 ? (
          Object.keys(formData).map((step, idx) => {
            const stepData = formData[step];
            if (!stepData || typeof stepData !== "object") {
              return null;
            }

            return (
              <div
                key={idx}
                className="border p-4 rounded-lg bg-white shadow-md"
              >
                <h2 className="text-lg font-semibold capitalize text-black mb-2">
                  {step}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(stepData).map(([key, value]) => (
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
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => handleEdit(idx + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(step)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-black">No form data available to display.</p>
        )}
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
