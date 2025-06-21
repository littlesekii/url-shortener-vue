<script setup>

import {  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, layouts } from "chart.js";
import { computed, onMounted, reactive, ref } from "vue";
import { Line } from "vue-chartjs";

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
        borderColor: "#444",
        pointBorderWidth: 0, // This removes the white border
        pointRadius: 5, // adjust circle size
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
    },
    scales: {
      x: {
        border: {
          display: false
        },
        grid: {
          display: false,
          color: "#444444"
        },
        ticks: {
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
          color: "#272727"
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
  min-width: 100%;
}
</style>