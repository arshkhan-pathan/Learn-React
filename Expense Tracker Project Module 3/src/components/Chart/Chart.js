// import React from "react";
// import ChartBar from "./ChartBar";
// import "./Chart.css";

// const Chart = (props) => {
//   console.log(props);
//   return (
//     <div className="chart">
//       {props.datapoints.map((datapoint) => {
//         <ChartBar
//           key={datapoint.label}
//           value={datapoint.value}
//           maxValue={100}
//           label={datapoint.label}
//         ></ChartBar>;
//       })}
//     </div>
//   );
// };

// export default Chart;

import React from "react";

import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
