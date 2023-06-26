import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "tailwindcss/tailwind.css"; // Import tailwind css

Chart.register(...registerables);

export default function ParametersChart({ aquarium }) {
  const dates = aquarium.water_parameters.map(
    (param) => new Date(param.date_recorded)
  );
  const pHLevels = aquarium.water_parameters.map((param) => param.ph);

  const chartStyling =
    "flex flex-col items-center justify-center mt-4 mb-4 bg-gray-200 p-2 border-2 border-blue-500 rounded-md";
  const lineStyling = "bg-namaka-blue border-zinc-500"; // set the line and point color here

  const data = {
    labels: dates,
    datasets: [
      {
        label: "pH Levels",
        data: pHLevels,
        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
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
    <div className={chartStyling}>
      <Line data={data} options={options} />
    </div>
  );
}
