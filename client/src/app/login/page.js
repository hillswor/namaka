"use client";

import { useFormik } from "formik";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "../UserContext";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const formStyling =
    "flex flex-col items-center justify-center border-4 border-namaka-blue rounded-md max-w-xl m-auto p-8 mt-16";
  const labelStyling = "block text-zinc-500 text-lg mb-2";
  const inputStyling =
    "border-4 border-namaka-blue rounded-md px-4 py-2 mb-4 w-full";
  const buttonStyling =
    "bg-zinc-500 text-namaka-blue px-4 py-2 rounded-md hover:text-namaka-red transition-all duration-200 border-2 border-namaka-blue hover:border-namaka-red";
  const errorStyling = "bg-red-200 text-namaka-red p-2 mb-2 rounded";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setUser(values);
      router.push(`/users/${values.id}`);
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
