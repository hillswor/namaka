import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ParametersForm() {
  const formStyling =
    "flex flex-col items-center justify-center border-4 border-namaka-blue rounded-md max-w-xl m-auto p-8 mt-16";
  const labelStyling = "block text-zinc-500 text-lg mb-2";
  const numberInputStyling =
    "number-input border-4 border-namaka-blue rounded-md px-4 py-2 mb-4 w-full";

  const parametersSchema = yup.object().shape({
    ph: yup.number().required("Required").positive().min(0).max(14),
    ammonia: yup.number().required("Required").positive().min(0).max(8),
  });

  const { values, handleBlur, handleChange } = useFormik({
    initialValues: {
      ph: "",
      ammonia: "",
      nitrite: "",
      nitrate: "",
      phosphate: "",
      calcium: "",
      magnesium: "",
      alkalinity: "",
    },
  });

  return (
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
        className={numberInputStyling}
      />
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
        className={numberInputStyling}
      />
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
        className={numberInputStyling}
      />
      <label htmlFor="nitrite" className={labelStyling}>
        Nitrite (ppm)
      </label>
      <input
        id="nitrite"
        name="nitrite"
        type="number"
        value={values.nitrite}
        onChange={handleChange}
        onBlur={handleBlur}
        className={numberInputStyling}
      />
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
        className={numberInputStyling}
      />
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
        className={numberInputStyling}
      />
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
        className={numberInputStyling}
      />
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
        className={numberInputStyling}
      />
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
        className={numberInputStyling}
      />
    </form>
  );
}
