"use client";

import { useFormik } from "formik";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "../AppContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const formStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 bg-gray-800 text-white rounded-lg max-w-xl mx-auto p-8 mt-10 sm:mt-16";
  const labelStyling = "block text-white text-lg mb-2";
  const inputStyling =
    "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 w-full";
  const buttonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200";
  const errorStyling = "bg-red-500 text-white p-2 mb-2 rounded";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 401) {
            throw new Error("Invalid credentials");
          }
        })
        .then((data) => {
          setUser(data);
          router.push(`/users/${data.id}`);
        })
        .catch((error) => {
          alert(error.message);
        });

      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={formStyling}>
      <label htmlFor="email" className={labelStyling}>
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={inputStyling}
      />
      {formik.touched.email && formik.errors.email && (
        <div className={errorStyling}>{formik.errors.email}</div>
      )}

      <label htmlFor="password" className={labelStyling}>
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className={inputStyling}
      />
      {formik.touched.password && formik.errors.password && (
        <div className={errorStyling}>{formik.errors.password}</div>
      )}

      <button type="submit" className={buttonStyling}>
        Log In
      </button>
    </form>
  );
}
