import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../../AppContext";

export default function AddAquariumForm({ toggleAddForm }) {
  const { user, setUser } = useContext(UserContext);

  const AquariumSchema = Yup.object().shape({
    brand: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    volume: Yup.number().required("Required"),
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
      brand: "",
      model: "",
      volume: "",
    },
    validationSchema: AquariumSchema,
    onSubmit: (values) => {
      values.owner_id = user.id;
      fetch("/api/aquariums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedUser = { ...user, aquariums: [...user.aquariums, data] };
          setUser(updatedUser);
        });
      resetForm();
      toggleAddForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      brand: "",
      model: "",
      volume: "",
    },
    validationSchema: AquariumSchema,
    onSubmit: (values, { resetForm }) => {
      values.owner_id = user.id;
      fetch("/api/aquariums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedUser = { ...user, aquariums: [...user.aquariums, data] };
          setUser(updatedUser);
          toggleAddForm();
        });
      resetForm();
      setShowForm(false);
    },
  });

  return (
    <section
      className={
        "flex flex-col items-center justify-center border-4 border-blue-500 bg-gray-800 text-white rounded-lg max-w-xl mx-auto p-8 mt-10 sm:mt-16"
      }
    >
      <button
        onClick={() => toggleAddForm()}
        className={
          "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200"
        }
      >
        Back
      </button>
      <form onSubmit={handleSubmit} className={"w-full"}>
        <label htmlFor="brand" className={"block text-white text-lg mb-2"}>
          Brand
        </label>
        <input
          id="brand"
          name="brand"
          type="String"
          value={values.brand}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Brand"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.brand && errors.brand ? (
          <p className={"text-red-500 p-2 mb-4 rounded text-s"}>
            {errors.brand}
          </p>
        ) : (
          <div className="h-14"></div>
        )}
        <label htmlFor="model" className={"block text-white text-lg mb-2"}>
          Model
        </label>
        <input
          id="model"
          name="model"
          type="String"
          value={values.model}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Model"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 w-full"
          }
        />
        {touched.model && errors.model ? (
          <p className={"text-red-500 p-2 mb-4 rounded text-s"}>
            {errors.model}
          </p>
        ) : (
          <div className="h-14"></div>
        )}
        <label htmlFor="volume" className={"block text-white text-lg mb-2"}>
          Volume
        </label>
        <input
          id="volume"
          name="volume"
          type="number"
          value={values.volume}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Volume"
          className={
            "border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 w-full"
          }
        />
        {touched.volume && errors.volume ? (
          <p className={"text-red-500 p-2 mb-4 rounded text-s"}>
            {errors.volume}
          </p>
        ) : (
          <div className="h-14"></div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className={
              "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200 mt-4"
            }
            onClick={handleSubmit}
          >
            Add Aquarium
          </button>
        </div>
      </form>
    </section>
  );
}
