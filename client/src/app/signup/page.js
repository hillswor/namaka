"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";

import { UserContext } from "../AppContext";

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

export default function Signup() {
  const { setUser } = useContext(UserContext);

  const formStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 bg-gray-800 text-white rounded-lg max-w-xl mx-auto p-8 mt-10 sm:mt-16";
  const labelStyling = "block text-white text-lg mb-2";
  const inputStyling =
    "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 w-full";
  const buttonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200";
  const errorStyling = "bg-red-500 text-white p-2 mb-2 rounded";
  const router = useRouter();

  const formik = useFormik({
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
    onSubmit: (values, { resetForm }) => {
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
    <form onSubmit={formik.handleSubmit} className={formStyling}>
      <label htmlFor="firstName" className={labelStyling}>
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        type="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        className={inputStyling}
      />
      {formik.errors.firstName && formik.touched.firstName ? (
        <div className={errorStyling}>{formik.errors.firstName}</div>
      ) : null}
      <label htmlFor="lastName" className={labelStyling}>
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        type="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        className={inputStyling}
      />
      {formik.errors.lastName && formik.touched.lastName ? (
        <div className={errorStyling}>{formik.errors.lastName}</div>
      ) : null}
      <label htmlFor="email" className={labelStyling}>
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        className={inputStyling}
      />
      {formik.errors.email && formik.touched.email ? (
        <div className={errorStyling}>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="password" className={labelStyling}>
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        className={inputStyling}
      />
      {formik.errors.password && formik.touched.password ? (
        <div className={errorStyling}>{formik.errors.password}</div>
      ) : null}
      <label htmlFor="confirmPassword" className={labelStyling}>
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        className={inputStyling}
      />
      {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
        <div className={errorStyling}>{formik.errors.confirmPassword}</div>
      ) : null}
      <label htmlFor="city" className={labelStyling}>
        City
      </label>
      <input
        id="city"
        name="city"
        type="city"
        onChange={formik.handleChange}
        value={formik.values.city}
        className={inputStyling}
      />
      {formik.errors.city && formik.touched.city ? (
        <div className={errorStyling}>{formik.errors.city}</div>
      ) : null}
      <label htmlFor="state" className={labelStyling}>
        State
      </label>
      <input
        id="state"
        name="state"
        type="state"
        onChange={formik.handleChange}
        value={formik.values.state}
        className={inputStyling}
      />
      {formik.errors.state && formik.touched.state ? (
        <div className={errorStyling}>{formik.errors.state}</div>
      ) : null}
      <button type="submit" className={buttonStyling}>
        Submit
      </button>
    </form>
  );
}
