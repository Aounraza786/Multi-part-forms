"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, prevStep } from "../../store/formSlice";
import React from "react";
import { useSearchParams } from "next/navigation";

const schema = yup.object().shape({
  phoneNumber: yup
    .number()
    .typeError("Phone Number must be a number")
    .required("Phone Number is required"),
  alternatePhone: yup.number().typeError("Phone Number must be a number"),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string(),
  city: yup.string().required("City is required"),
  postalCode: yup
    .number()
    .typeError("Postal Code must be a number")
    .required("Postal Code is required"),
  country: yup.string().required("Country is required"),
});

export default function Step2() {
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
    resolver: yupResolver(schema),
    defaultValues: formData.contactInfo || {},
  });

  React.useEffect(() => {
    reset(formData.contactInfo);
  }, [formData.contactInfo, reset]);

  const onSubmit = (data) => {
    dispatch(updateFormData({ stepKey: "contactInfo", data }));
    if (mode === "edit") {
      router.push("/form/step6");
    } else {
      dispatch(nextStep());
      router.push("/form/step3");
    }
  };

  const handlePrevious = () => {
    dispatch(prevStep());
    router.push("/form/step1");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">
          Phone Number
        </label>
        <input
          type="text"
          {...register("phoneNumber")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Alternate Phone Number
        </label>
        <input
          type="text"
          {...register("alternatePhone")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Address Line 1
        </label>
        <input
          type="text"
          {...register("address1")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.address1 && (
          <p className="text-sm text-red-500">{errors.address1.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Address Line 2
        </label>
        <input
          type="text"
          {...register("address2")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">City</label>
        <select
          {...register("city")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        >
          <option value="">Select City</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Postal Code
        </label>
        <input
          type="text"
          {...register("postalCode")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.postalCode && (
          <p className="text-sm text-red-500">{errors.postalCode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Country</label>
        <select
          {...register("country")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
        </select>
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
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
