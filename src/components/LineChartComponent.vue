<script setup>

import {  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { computed } from "vue";
import { Line } from "vue-chartjs";
import util from "../utils/util";

const GRID_COLOR = window.matchMedia("(prefers-color-scheme: dark)").matches ? "#555555" : "#f2f2f2";
const LINE_COLOR = window.matchMedia("(prefers-color-scheme: dark)").matches ? "#BBBBBB" : "#AAAAAA";
const LEGEND_COLOR = window.matchMedia("(prefers-color-scheme: dark)").matches ? "#BBBBBB" : "#AAAAAA";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps(["data"]);

const database = computed(() => {
  return {
    labels: props.data.label,
    datasets: [
      {
        label: "Clicks",
        backgroundColor: "#9B32FF",
        borderWidth: 1,
        borderColor: LINE_COLOR,
        pointBorderWidth: 0, // This removes the white border
        pointRadius: 3, // adjust circle size
        data: props.data.value,
      }
    ]
  };  
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false // This removes the chart title
      },
      tooltip: {
        callbacks: {
          // Customize tooltip content (optional)
          title: (context) => `${context[0].label} - ${util.replaceCharAt(util.replaceCharAt(context[0].label, 3, 5), 4, 9)}`
        }
      },
    },
    scales: {
      x: {
        border: {
          display: false
        },
        grid: {
          display: false
        },
        ticks: {
          color: LEGEND_COLOR,
          font: {
            weight: 0
          },
          maxTicksLimit: 8,
          maxRotation: 0, // Sem rotação
          minRotation: 0  // Garante que não haverá rotação
        }
      },  
      y: {
        border: {
          display: false
        },
        grid: {
          color: GRID_COLOR
        },
        ticks: {
          precision: 0,
          display: false
        }
      }  
    }
  };
});

let dataLoaded = computed(() => (props.data.label.length > 0) ? true : false);


</script>

<template>
  <Line class="chart" v-if="dataLoaded" :data="database" :options="options" />
</template>

<style scoped>
.chart {
  cursor: pointer;
  min-width: 100%;
}
</style>