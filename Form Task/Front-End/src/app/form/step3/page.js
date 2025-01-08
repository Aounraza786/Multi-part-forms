"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, prevStep } from "../../store/formSlice";
import { useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Step3() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [employmentStatus, setEmploymentStatus] = useState("");
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formData.employmentInfo || {},
  });

  React.useEffect(() => {
    reset(formData.employmentInfo);
  }, [formData.employmentInfo, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("resume", data.resume[0]);

    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const result = await response.json();

    // Store only the file URL in the Redux store
    const formDataToStore = {
      ...data,
      resume: result,
    };

    dispatch(
      updateFormData({ stepKey: "employmentInfo", data: formDataToStore })
    );
    if (mode === "edit") {
      router.push("/form/step6");
    } else {
      dispatch(nextStep());
      router.push("/form/step4");
    }
  };

  const handlePrevious = () => {
    dispatch(prevStep());
    router.push("/form/step2");
  };

  const watchEmploymentStatus = watch("employmentStatus");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">
          Current Job Title
        </label>
        <input
          type="text"
          {...register("jobTitle", { required: "Job Title is required" })}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.jobTitle && (
          <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Employment Status
        </label>
        <select
          {...register("employmentStatus", {
            required: "Employment Status is required",
          })}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
          onChange={(e) => setEmploymentStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Employed">Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Student">Student</option>
        </select>
        {errors.employmentStatus && (
          <p className="text-sm text-red-500">
            {errors.employmentStatus.message}
          </p>
        )}
      </div>

      {watchEmploymentStatus === "Employed" && (
        <div>
          <label className="block text-sm font-medium text-black">
            Company Name
          </label>
          <input
            type="text"
            {...register("companyName", {
              required: "Company Name is required for Employed",
            })}
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-black">
          Years of Experience
        </label>
        <input
          type="number"
          {...register("experience", {
            required: "Years of Experience is required",
            valueAsNumber: true,
          })}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.experience && (
          <p className="text-sm text-red-500">{errors.experience.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Resume Upload
        </label>
        <input
          type="file"
          {...register("resume", { required: "Resume is required" })}
          className="w-full mt-1"
        />
        {errors.resume && (
          <p className="text-sm text-red-500">{errors.resume.message}</p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        {" "}
        {!mode ||
          (mode !== "edit" && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-600 mr-2"
            >
              Previous
            </button>
          ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {mode === "edit" ? "Save" : "Next"}
        </button>
      </div>
    </form>
  );
}
