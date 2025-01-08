"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, prevStep } from "../../store/formSlice";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Step5() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formData.preferences || {},
  });

  React.useEffect(() => {
    reset(formData.preferences);
  }, [formData.preferences, reset]);

  const onSubmit = (data) => {
    dispatch(updateFormData({ stepKey: "preferences", data }));
    dispatch(nextStep());
    router.push("/form/step6");
  };
  const handlePrevious = () => {
    dispatch(prevStep());
    router.push("/form/step4");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">
          Preferred Mode of Contact
        </label>
        <div className="mt-1 flex space-x-4">
          <label className="text-black">
            <input
              type="radio"
              value="Email"
              {...register("preferredContact", {
                required: "Preferred Mode of Contact is required",
              })}
              className="mr-2"
            />
            Email
          </label>
          <label className="text-black">
            <input
              type="radio"
              value="Phone"
              {...register("preferredContact", {
                required: "Preferred Mode of Contact is required",
              })}
              className="mr-2"
            />
            Phone
          </label>
          <label className="text-black">
            <input
              type="radio"
              value="SMS"
              {...register("preferredContact", {
                required: "Preferred Mode of Contact is required",
              })}
              className="mr-2"
            />
            SMS
          </label>
        </div>
        {errors.preferredContact && (
          <p className="text-sm text-red-500">
            {errors.preferredContact.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Hobbies and Interests
        </label>
        <div className="mt-1 space-y-2">
          {["Sports", "Music", "Reading", "Traveling", "Cooking"].map(
            (hobby) => (
              <div key={hobby}>
                <label className="text-black">
                  <input
                    type="checkbox"
                    value={hobby}
                    {...register("hobbies")}
                    className="mr-2"
                  />
                  {hobby}
                </label>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Newsletter Subscription
        </label>
        <div className="mt-1">
          <label className="text-black">
            <input
              type="checkbox"
              {...register("newsletter")}
              className="mr-2"
            />
            Subscribe to Newsletter
          </label>
        </div>
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
