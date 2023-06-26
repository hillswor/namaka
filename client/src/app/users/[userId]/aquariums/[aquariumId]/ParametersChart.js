import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "tailwindcss/tailwind.css"; // Import tailwind css

Chart.register(...registerables);

export default function ParametersChart({ aquarium }) {
  const dates = aquarium.water_parameters.map(
    (param) => new Date(param.date_recorded)
  );
  const salinityLevels = aquarium.water_parameters.map(
    (param) => param.salinity
  );
  const pHLevels = aquarium.water_parameters.map((param) => param.ph);
  const ammoniaLevels = aquarium.water_parameters.map((param) => param.ammonia);
  const nitrateLevels = aquarium.water_parameters.map((param) => param.nitrate);
  const phosphateLevels = aquarium.water_parameters.map(
    (param) => param.phosphate
  );
  const calciumLevels = aquarium.water_parameters.map((param) => param.calcium);
  const magnesiumLevels = aquarium.water_parameters.map(
    (param) => param.magnesium
  );
  const alkalinityLevels = aquarium.water_parameters.map(
    (param) => param.alkalinity
  );

  const chartStyling =
    "flex flex-col items-center justify-center mt-4 mb-4 bg-gray-200 p-2 rounded-md";

  const salinity = {
    labels: dates,
    datasets: [
      {
        label: "Salinity",
        data: salinityLevels,
        fill: false,
        backgroundColor: "#3268a8",
        borderColor: "#3268a8",
      },
    ],
  };

  const ph = {
    labels: dates,
    datasets: [
      {
        label: "pH",
        data: pHLevels,
        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
      },
    ],
  };

  const ammonia = {
    labels: dates,
    datasets: [
      {
        label: "Ammonia",
        data: ammoniaLevels,
        fill: false,
        backgroundColor: "#05f2c7",
        borderColor: "#05f2c7",
      },
    ],
  };

  const nitrates = {
    labels: dates,
    datasets: [
      {
        label: "Nitrates",
        data: nitrateLevels,
        fill: false,
        backgroundColor: "#f205af",
        borderColor: "#f205af",
      },
    ],
  };

  const phosphates = {
    labels: dates,
    datasets: [
      {
        label: "Phosphates",
        data: phosphateLevels,
        fill: false,
        backgroundColor: "#9305f2",
        borderColor: "#9305f2",
      },
    ],
  };

  const calcium = {
    labels: dates,
    datasets: [
      {
        label: "Calcium",
        data: calciumLevels,
        fill: false,
        backgroundColor: "#f2bf05",
        borderColor: "#f2bf05",
      },
    ],
  };

  const magnesium = {
    labels: dates,
    datasets: [
      {
        label: "Magnesium",
        data: magnesiumLevels,
        fill: false,
        backgroundColor: "#fa57f4",
        borderColor: "#fa57f4",
      },
    ],
  };

  const alkalinity = {
    labels: dates,
    datasets: [
      {
        label: "Alkalinity",
        data: alkalinityLevels,
        fill: false,
        backgroundColor: "#0cf518",
        borderColor: "#0cf518",
      },
    ],
  };

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

  return (
    <>
      <div className={chartStyling}>
        <Line data={salinity} options={options} />
      </div>
      <div className={chartStyling}>
        <Line data={ph} options={options} />
      </div>
      <div className={chartStyling}>
        <Line data={ammonia} options={options} />
      </div>
      <div className={chartStyling}>
        <Line data={nitrates} options={options} />
      </div>
      <div className={chartStyling}>
        <Line data={phosphates} options={options} />
      </div>
      <div className={chartStyling}>
        <Line data={calcium} options={options} />
      </div>
      <div className={chartStyling}>
        <Line data={magnesium} options={options} />
      </div>
      <div className={chartStyling}>
        <Line data={alkalinity} options={options} />
      </div>
    </>
  );
}
