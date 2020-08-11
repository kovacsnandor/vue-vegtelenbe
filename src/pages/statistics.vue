<template>
  <div class="container my-5">
    <div class="mb-5">
      <h3>Kitöltések száma munkakörönként</h3>
      <DoughnutChart :height="200" :chartData="jobFillData"></DoughnutChart>
    </div>
    <div class="mb-5">
      <h3>Átlagfizetések munkakörönként</h3>
      <BarChart :height="100" :chartData="jobIncomeData" :options="BarChartOptions"></BarChart>
    </div>
    <div>
      <h3>jobIncomeData</h3>
      <pre>
				{{jobIncomeData}}
			</pre>
    </div>
    <div>
      <h3>jobs</h3>
      <pre>
				{{jobs}}
			</pre>
    </div>
    <div>
      <h3>rawData</h3>
      <pre>
				{{rawData}}
			</pre>
    </div>
  </div>
</template>

<script>
//data
import DataService from "../DataService";

//chart
import BarChart from "../components/BarChart.vue";
import DoughnutChart from "../components/DoughnutChart.vue";
export default {
  components: {
    BarChart,
    DoughnutChart,
  },
  data() {
    return {
      rawData: [],
      chartDemoData: {
        labels: ["January", "February"],
        datasets: [
          {
            backgroundColor: ["red", "blue"],
            data: [40, 20],
          },
        ],
      },
      defaultColors: [
        "red",
        "blue",
        "green",
        "aqua",
        "purple",
        "yellow",
        "pink",
      ],
    };
  },
  created() {
    DataService.GetSurveyResponses().then((result) => {
      this.rawData = Object.values(result);
    });
  },
  computed: {
    jobFillData() {
      let counts = this.jobs.map((job) => {
        const count = this.rawData.filter((response) => {
          return job == response.job;
        }).length;
        return count;
      });
      return {
        labels: this.jobs,
        datasets: [
          {
            backgroundColor: this.defaultColors.slice(0, this.jobs.length),
            data: counts,
          },
        ],
      };
    },
    //oszlopdiagram
    jobIncomeData() {
      let datasets = this.jobs.map((job, index) => {
        let responsesInJob = this.rawData.filter((response) => {
          return response.job == job;
        });

        //átlag számítás (a + jellel számmá alakítom)
        let totalIncome = responsesInJob
          .map((response) => {
            return response.income;
          })
          .reduce((accumulator, income) => {
            return +accumulator + +income;
          });

        let avgIncome = totalIncome / responsesInJob.length;

        return {
					label: job,
					backgroundColor: this.defaultColors[index],
					data: [avgIncome]
				};
      });

      return {
        datasets: datasets,
      };

      // return {
      //   datasets: [
      //     {
      //       label: "Data 1",
      //       backgroundColor: "blue",
      //       data: [40],
      //     },
      //     {
      //       label: "Data 2",
      //       backgroundColor: "red",
      //       data: [20],
      //     },
      //     {
      //       label: "Data 3",
      //       backgroundColor: "orange",
      //       data: [30],
      //     },
      //   ],
      // };
    },

    jobs() {
      let jobs = this.rawData.map((response) => {
        return response.job;
      });
      return jobs.filter((job, index) => {
        return index == jobs.indexOf(job);
      });
    },
    BarChartOptions() {
      return {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    },
  },
};
</script>



      