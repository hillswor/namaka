"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../AppContext";

export default function LoginForm() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
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
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
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
    <section>
      <form handleSubmit={handleSubmit}>
        <label htmlFor="email" className={"text-white text-lg mb-2"}>
          Email Address
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email Address"
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
