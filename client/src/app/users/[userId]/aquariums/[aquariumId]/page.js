"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "tailwindcss/tailwind.css"; // Import tailwind css

import { AquariumContext } from "../../../../AppContext";
import ParmatersForm from "./ParametersForm";

Chart.register(...registerables);

export default function AquariumPage() {
  const { aquarium } = useContext(AquariumContext);
  const [parameterForm, setParameterForm] = useState(false);
  const [chartIndex, setChartIndex] = useState(0);

  const router = useRouter();

  const toggleParameterForm = () => {
    setParameterForm(!parameterForm);
  };

  const imgStyling =
    "rounded-lg shadow-lg transform transition duration-500 mt-5 mb-3 border-2 border-white";
  const buttonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-md hover:text-gray-800 transition-all duration-200 border-2 border-white hover:border-gray-800";
  const formStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-8 bg-gray-800 text-white";
  const labelStyling = "block text-blue-400 text-lg mb-2";
  const inputStyling =
    "border-4 border-blue-500 rounded-md px-4 py-2 mb-4 w-full text-gray-800";
  const errorStyling = "bg-red-600 text-white p-2 mb-2 rounded";
  const mainStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-16 bg-gray-800 text-white";
  const chartStyling =
    "flex flex-col items-center justify-center mt-4 mb-4 bg-gray-200 p-2 rounded-md";
  const chartContainerStyling =
    "relative flex flex-col items-center justify-center";
  const toggleButtonContainerStyling =
    "flex items-center justify-between w-full mt-2";

  const dates = aquarium.water_parameters
    .map((param) => new Date(param.date_recorded))
    .sort((a, b) => a - b);

  const salinityLevels = aquarium.water_parameters
    .map((param) => param.salinity)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const pHLevels = aquarium.water_parameters
    .map((param) => param.ph)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const ammoniaLevels = aquarium.water_parameters
    .map((param) => param.ammonia)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const nitrateLevels = aquarium.water_parameters
    .map((param) => param.nitrate)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const phosphateLevels = aquarium.water_parameters
    .map((param) => param.phosphate)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const calciumLevels = aquarium.water_parameters
    .map((param) => param.calcium)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const magnesiumLevels = aquarium.water_parameters
    .map((param) => param.magnesium)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const alkalinityLevels = aquarium.water_parameters
    .map((param) => param.alkalinity)
    .sort(
      (a, b) =>
        dates.indexOf(new Date(a.date_recorded)) -
        dates.indexOf(new Date(b.date_recorded))
    );

  const chartData = [
    {
      label: "Salinity",
      data: salinityLevels,
      fill: false,
      backgroundColor: "#3268a8",
      borderColor: "#3268a8",
    },
    {
      label: "pH",
      data: pHLevels,
      fill: false,
      backgroundColor: "#FF6384",
      borderColor: "#FF6384",
    },
    {
      label: "Ammonia",
      data: ammoniaLevels,
      fill: false,
      backgroundColor: "#05f2c7",
      borderColor: "#05f2c7",
    },
    {
      label: "Nitrates",
      data: nitrateLevels,
      fill: false,
      backgroundColor: "#f205af",
      borderColor: "#f205af",
    },
    {
      label: "Phosphates",
      data: phosphateLevels,
      fill: false,
      backgroundColor: "#9305f2",
      borderColor: "#9305f2",
    },
    {
      label: "Calcium",
      data: calciumLevels,
      fill: false,
      backgroundColor: "#f2bf05",
      borderColor: "#f2bf05",
    },
    {
      label: "Magnesium",
      data: magnesiumLevels,
      fill: false,
      backgroundColor: "#fa57f4",
      borderColor: "#fa57f4",
    },
    {
      label: "Alkalinity",
      data: alkalinityLevels,
      fill: false,
      backgroundColor: "#0cf518",
      borderColor: "#0cf518",
    },
  ];

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  const nextChart = () => {
    setChartIndex((prevIndex) =>
      prevIndex === chartData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousChart = () => {
    setChartIndex((prevIndex) =>
      prevIndex === 0 ? chartData.length - 1 : prevIndex - 1
    );
  };

  return parameterForm ? (
    <ParmatersForm toggleParameterForm={toggleParameterForm} />
  ) : (
    <main className={mainStyling}>
      <button
        onClick={() => router.back()}
        className={
          "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200"
        }
      >
        Back
      </button>
      <Image
        src="/reef-tank.jpeg"
        alt="Reef Tank"
        width={500}
        height={500}
        className={imgStyling}
      />
      <h1>{aquarium.brand}</h1>
      <p>{aquarium.model}</p>
      <button
        className={
          "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200 mt-2"
        }
        onClick={toggleParameterForm}
      >
        Log Parameters
      </button>
      <div className={chartContainerStyling}>
        <div className={toggleButtonContainerStyling}>
          <button
            onClick={previousChart}
            className={
              "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200 mr-4"
            }
          >
            {"<"}
          </button>
          <div className={chartStyling}>
            <Line
              data={{
                labels: dates,
                datasets: [chartData[chartIndex]],
              }}
              options={options}
            />
          </div>
          <button
            onClick={nextChart}
            className={
              "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200 ml-4"
            }
          >
            {">"}
          </button>
        </div>
      </div>
    </main>
  );
}
