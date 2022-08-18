<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "ECharts",
  data() {
    return {
      //折线图和柱状图Option
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [], //x轴数据
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [], //数据
      },
      //饼图Option
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart: null,
    };
  },
  props: {
    //是否为折线图和柱状图/饼图
    isAxisChart: { type: Boolean, default: true },
    //图表数据
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  methods: {
    //初始化图配置
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    //初始化数据
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
  },
  watch: {
    //监听数据变化
    chartData: {
      handler() {
        this.initChart();
      },
      deep: true,
    },
  },
  computed: {
    //配置
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
};
</script>

<style scoped lang="css"></style>
