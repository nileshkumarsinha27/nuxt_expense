<script>
import Vue from 'vue';
import { Doughnut } from 'vue-chartjs';
export default {
  name: 'DonoughtChart',
  mixins: [Doughnut],
  props: {
    chartLabels: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  mounted() {
    this.renderChart(this.chartInfo, this.chartOptions);
  },
  data: () => ({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
       legend: {
            display: false
         }
    },
  }),
  computed: {
    chartInfo() {
      return {
        labels: this.chartLabels,
        datasets: this.chartData,
      };
    },
  },
   methods: {
    update() {
      this.$data._chart.update()
    }
  }
};
</script>
