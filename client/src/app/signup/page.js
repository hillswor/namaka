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

export default function Signup() {
  const { setUser } = useContext(UserContext);

  const formStyling =
    "flex flex-col items-center border-4 border-blue-500 bg-gray-800 text-white rounded-lg max-w-xl mx-auto p-8 mt-10 sm:mt-16";
  const labelStyling = "block text-white text-lg mb-2";
  const inputStyling =
    "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full";
  const buttonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200";
  const errorStyling = "text-red-500 mb-2 rounded text-xs";
  const router = useRouter();

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
    <form onSubmit={handleSubmit} className={formStyling}>
      <label htmlFor="firstName" className={labelStyling}>
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        type="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="First Name"
        className={inputStyling}
      />
      {errors.firstName && touched.firstName ? (
        <div className={errorStyling}>{errors.firstName}</div>
      ) : (
        <div className="h-6"></div>
      )}
      <label htmlFor="lastName" className={labelStyling}>
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        type="lastName"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Last Name"
        className={inputStyling}
      />
      {errors.lastName && touched.lastName ? (
        <div className={errorStyling}>{errors.lastName}</div>
      ) : (
        <div className="h-6"></div>
      )}
      <label htmlFor="email" className={labelStyling}>
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email Address"
        className={inputStyling}
      />
      {errors.email && touched.email ? (
        <div className={errorStyling}>{errors.email}</div>
      ) : (
        <div className="h-6"></div>
      )}
      <label htmlFor="password" className={labelStyling}>
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
        className={inputStyling}
      />
      {errors.password && touched.password ? (
        <div className={errorStyling}>{errors.password}</div>
      ) : (
        <div className="h-6"></div>
      )}
      <label htmlFor="confirmPassword" className={labelStyling}>
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Confirm Password"
        className={inputStyling}
      />
      {errors.confirmPassword && touched.confirmPassword ? (
        <div className={errorStyling}>{errors.confirmPassword}</div>
      ) : (
        <div className="h-6"></div>
      )}
      <label htmlFor="city" className={labelStyling}>
        City
      </label>
      <input
        id="city"
        name="city"
        type="city"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="City"
        className={inputStyling}
      />
      {errors.city && touched.city ? (
        <div className={errorStyling}>{errors.city}</div>
      ) : null}
      <label htmlFor="state" className={labelStyling}>
        State
      </label>
      <input
        id="state"
        name="state"
        type="state"
        value={values.state}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="State"
        className={inputStyling}
      />
      {errors.state && touched.state ? (
        <div className={errorStyling}>{errors.state}</div>
      ) : (
        <div className="h-6"></div>
      )}
      <button type="submit" className={buttonStyling}>
        Register
      </button>
    </form>
  );
}
