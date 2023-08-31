import "./style.css";
import * as echarts from "echarts";

document.addEventListener("DOMContentLoaded", () => {
  const chartContainer = document.getElementById("app");
  if (!chartContainer) return;
  chartContainer.style.width = "100%";
  chartContainer.style.height = "600px";
  document.body.appendChild(chartContainer);

  const chart = echarts.init(chartContainer);

  const option: echarts.EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],

    // tooltip: {
    //   formatter: (params) => {
    //     return `${params.name}, ${params.seriesName}`; // BUG: `name` and `seriesName` are unavailable because of incorrect typing
    //   },
    // },

    // Awkward workaround to access `name` and `seriesName` fields without a TypeScript error (this shouldn't ):
    tooltip: {
      formatter: ((params: echarts.DefaultLabelFormatterCallbackParams) => {
        return `${params.name}, ${params.seriesName}`;
      }) as echarts.TooltipComponentFormatterCallback<echarts.TooltipComponentFormatterCallbackParams>,
    },
  };

  chart.setOption(option);
});
