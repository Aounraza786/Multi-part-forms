"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, prevStep } from "../../store/formSlice";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Step4() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formData.loanStatus || {},
  });

  React.useEffect(() => {
    reset(formData.financialInfo);
  }, [formData.financialInfo, reset]);

  const watchLoanStatus = watch("loanStatus");

  const onSubmit = (data) => {
    dispatch(updateFormData({ stepKey: "financialInfo", data }));
    if (mode === "edit") {
      router.push("/form/step6");
    } else {
      dispatch(nextStep());
      router.push("/form/step5");
    }
  };

  const handlePrevious = () => {
    dispatch(prevStep());
    router.push("/form/step3");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">
          Monthly Income
        </label>
        <input
          type="number"
          {...register("monthlyIncome", {
            required: "Monthly Income is required",
          })}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.monthlyIncome && (
          <p className="text-sm text-red-500">{errors.monthlyIncome.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Loan Status
        </label>
        <div className="mt-1 flex space-x-4">
          <label className="text-black">
            <input
              type="radio"
              value="Yes"
              {...register("loanStatus", {
                required: "Loan Status is required",
              })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="text-black">
            <input
              type="radio"
              value="No"
              {...register("loanStatus", {
                required: "Loan Status is required",
              })}
              className="mr-2"
            />
            No
          </label>
        </div>
        {errors.loanStatus && (
          <p className="text-sm text-red-500">{errors.loanStatus.message}</p>
        )}
      </div>

      {watchLoanStatus === "Yes" && (
        <div>
          <label className="block text-sm font-medium text-black">
            Loan Amount
          </label>
          <input
            type="number"
            {...register("loanAmount", {
              required: "Loan Amount is required for Yes",
            })}
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {errors.loanAmount && (
            <p className="text-sm text-red-500">{errors.loanAmount.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-black">
          Credit Score
        </label>
        <input
          type="number"
          {...register("creditScore", { required: "Credit Score is required" })}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.creditScore && (
          <p className="text-sm text-red-500">{errors.creditScore.message}</p>
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
