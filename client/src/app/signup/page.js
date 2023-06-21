"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  password: Yup.string()
    .required("Required")
    .min(12, "Must be at least 12 characters")
    .max(40, "Must be 40 characters or less"),
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
      confirmPassword: "",
      city: "",
      state: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      fetch("http://127.0.0.1:5555/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
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
