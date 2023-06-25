"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ParametersForm({ toggleShowForm }) {
  const sectionStyling = "flex flex-col  items-center justify-center";
  const formStyling =
    "flex flex-col items-center justify-center border-4 border-namaka-blue rounded-md max-w-xl m-auto p-8 mt-";
  const labelStyling = "block text-zinc-500 text-lg mb-2";
  const numberInputStyling =
    "number-input border-4 border-namaka-blue rounded-md px-4 py-2 mb-2 w-full";
  const errorStyling = "text-xs text-namaka-red mb-2";
  const buttonStyling =
    "bg-zinc-500 text-namaka-blue px-4 py-2 rounded-md hover:text-namaka-red transition-all duration-200 border-2 border-namaka-blue hover:border-namaka-red mt-2 mb-2";

  const parametersSchema = yup.object().shape({
    salinity: yup
      .number()
      .required("Required")
      .positive()
      .min(1.01, "Must Be At Least 1.010 d SG")
      .max(1.04, "Must Be No More Than 1.040 d SG"),
    ph: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0")
      .max(14, "Must Be No More Than 14"),
    ammonia: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(8, "Must Be No More Than 8 ppm"),
    nitrate: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(5, "Must Be No More Than 5 ppm"),
    phosphate: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(0.06, "Must Be No More Than 0.06 ppm"),
    calcium: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(900, "Must Be No More Than 900 ppm"),
    magnesium: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(2000, "Must Be No More Than 2000 ppm"),
    alkalinity: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 dKH")
      .max(20, "Must Be No More Than 20 dKH"),
  });

  const { values, handleBlur, handleChange, touched, resetForm, errors } =
    useFormik({
      initialValues: {
        salinity: "",
        ph: "",
        ammonia: "",
        nitrate: "",
        phosphate: "",
        calcium: "",
        magnesium: "",
        alkalinity: "",
      },
      validationSchema: parametersSchema,
      onSubmit: (values, resetForm) => {
        fetch("/api/water-parameters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        resetForm();
      },
    });

  return (
    <section className={sectionStyling}>
      <button onClick={toggleShowForm} className={buttonStyling}>
        Back
      </button>
      <form className={formStyling}>
        <label htmlFor="salinity" className={labelStyling}>
          Salinity (d SG)
        </label>
        <input
          id="salinity"
          name="salinity"
          type="number"
          value={values.salinity}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 1.025 - 1.027"
          className={numberInputStyling}
        />
        {touched.salinity && errors.salinity ? (
          <p className={errorStyling}>{errors.salinity}</p>
        ) : null}
        <label htmlFor="ph" className={labelStyling}>
          pH
        </label>
        <input
          id="ph"
          name="ph"
          type="number"
          value={values.ph}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 7.8 - 8.5"
          className={numberInputStyling}
        />
        {touched.ph && errors.ph ? (
          <p className={errorStyling}>{errors.ph}</p>
        ) : null}
        <label htmlFor="ammonia" className={labelStyling}>
          Ammonia (ppm)
        </label>
        <input
          id="ammonia"
          name="ammonia"
          type="number"
          value={values.ammonia}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 0 - 0.1 ppm"
          className={numberInputStyling}
        />
        {touched.ammonia && errors.ammonia ? (
          <p className={errorStyling}>{errors.ammonia}</p>
        ) : null}
        <label htmlFor="nitrate" className={labelStyling}>
          Nitrate (ppm)
        </label>
        <input
          id="nitrate"
          name="nitrate"
          type="number"
          value={values.nitrate}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 0 - 5 ppm"
          className={numberInputStyling}
        />
        {touched.nitrate && errors.nitrate ? (
          <p className={errorStyling}>{errors.nitrate}</p>
        ) : null}
        <label htmlFor="phosphate" className={labelStyling}>
          Phosphate (ppm)
        </label>
        <input
          id="phosphate"
          name="phosphate"
          type="number"
          value={values.phosphate}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 0 - 0.03 ppm"
          className={numberInputStyling}
        />
        {touched.phosphate && errors.phosphate ? (
          <p className={errorStyling}>{errors.phosphate}</p>
        ) : null}
        <label htmlFor="calcium" className={labelStyling}>
          Calcium (ppm)
        </label>
        <input
          id="calcium"
          name="calcium"
          type="number"
          value={values.calcium}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 375 - 450 ppm"
          className={numberInputStyling}
        />
        {touched.calcium && errors.calcium ? (
          <p className={errorStyling}>{errors.calcium}</p>
        ) : null}
        <label htmlFor="magnesium" className={labelStyling}>
          Magnesium (ppm)
        </label>
        <input
          id="magnesium"
          name="magnesium"
          type="number"
          value={values.magnesium}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 1250 - 1350 ppm"
          className={numberInputStyling}
        />
        {touched.magnesium && errors.magnesium ? (
          <p className={errorStyling}>{errors.magnesium}</p>
        ) : null}
        <label htmlFor="alkalinity" className={labelStyling}>
          Alkalinity (dKH)
        </label>
        <input
          id="alkalinity"
          name="alkalinity"
          type="number"
          value={values.alkalinity}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 7 - 11 dKH"
          className={numberInputStyling}
        />
        {touched.alkalinity && errors.alkalinity ? (
          <p className={errorStyling}>{errors.alkalinity}</p>
        ) : null}
        <button type="submit" className={buttonStyling}>
          Submit
        </button>
      </form>
    </section>
  );
}
