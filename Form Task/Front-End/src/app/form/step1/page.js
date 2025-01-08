"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep } from "../../store/formSlice";
import React from "react";
import { useSearchParams } from "next/navigation";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  gender: yup.string().required("Gender is required"),
  dob: yup.string().required("Date of Birth is required"),
});

export default function Step1() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const mode = searchParams.get("mode");
  const formData = useSelector((state) => state.form.formData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData.userProfile || {},
  });

  React.useEffect(() => {
    reset(formData.userProfile);
  }, [formData.userProfile, reset]);

  const onSubmit = (data) => {
    dispatch(updateFormData({ stepKey: "userProfile", data }));
    if (mode === "edit") {
      router.push("/form/step6");
    } else {
      dispatch(nextStep());
      router.push("/form/step2");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">
          Full Name
        </label>
        <input
          {...register("fullName")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Gender</label>
        <div className="mt-1 flex space-x-4">
          <label className="text-black">
            <input
              type="radio"
              value="Male"
              {...register("gender")}
              className="mr-2"
            />
            Male
          </label>
          <label className="text-black">
            <input
              type="radio"
              value="Female"
              {...register("gender")}
              className="mr-2"
            />
            Female
          </label>
          <label className="text-black">
            <input
              type="radio"
              value="Other"
              {...register("gender")}
              className="mr-2"
            />
            Other
          </label>
        </div>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Date of Birth
        </label>
        <input
          type="date"
          {...register("dob")}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        {errors.dob && (
          <p className="text-sm text-red-500">{errors.dob.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {mode === "edit" ? "Save" : "Next"}
      </button>
    </form>
  );
}
