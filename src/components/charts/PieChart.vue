<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import Chart from "chart.js";
import colors from "@/config/colors";

export default {
  name: "pie-chart",
  props: ["data", "options"],
  data() {
    return {
      chart: null
    };
  },
  computed: {
    colors() {
      return Object.values(colors);
    }
  },
  mounted() {
    const datasetWithColors = this.data.datasets;
    datasetWithColors.forEach(ds => {
      ds.backgroundColor = Object.values(colors);
    });
    this.data.dataset = datasetWithColors;
    const ctx = this.$refs["canvas"].getContext("2d");
    this.chart = new Chart(ctx, {
      type: "pie",
      data: this.data,
      options: Object.assign({ colors: this.colors }, this.options)
    });
  }
};
</script>

<style scopped>
canvas {
  width: 100% !important;
  max-width: 800px;
  height: auto !important;
}
</style>
