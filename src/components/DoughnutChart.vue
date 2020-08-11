<script>
import { Doughnut, mixins } from "vue-chartjs";
export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData);
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
};
</script>