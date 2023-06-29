"use client";

import React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../AppContext";

export default function SignupForm() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const stateCodes = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    city: Yup.string()
      .required("Required")
      .min(2, "Must be at least 2 characters")
      .max(50, "Must be 50 characters or less"),
    state: Yup.string()
      .required("Required")
      .length(2, "State code must be 2 characters")
      .transform((value) => value.toUpperCase())
      .oneOf(stateCodes, "Invalid state code"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      state: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
          router.push(`/users/${data.id}`);
        });
      resetForm();
    },
  });

  return (
    <section>
      <form handleSubmit={handleSubmit}>
        <label htmlFor="firstName" className={"text-white text-lg mb-2"}>
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First Name"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.firstName && errors.firstName ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.firstName}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="lastName" className={"block text-white text-lg mb-2"}>
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Last Name"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.lastName && errors.lastName ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.lastName}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="email" className={"block text-white text-lg mb-2"}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.email && errors.email ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>{errors.email}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="password" className={"block text-white text-lg mb-2"}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.password && errors.password ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.password}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label
          htmlFor="confirmPassword"
          className={"block text-white text-lg mb-2"}
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm Password"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.confirmPassword}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="city" className={"block text-white text-lg mb-2"}>
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="City"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.city && errors.city ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>{errors.city}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="state" className={"block text-white text-lg mb-2"}>
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="State"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.state && errors.state ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>{errors.state}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <div className={"flex flex-col items-center"}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
