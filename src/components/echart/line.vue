<template>
  <div ref="dom" class="chartline"></div>
</template>

<script>
import echarts from "echarts";
import * as utils from "../../utils/utils";
import * as dayjs from "dayjs";

let option = {
  // color: darkcolorList,
  backgroundColor: "",
  tooltip: {
    trigger: "axis"
  },
  legend: {
    show: false
  },
  grid: {
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: "category",
    data: [],
    boundaryGap: true,
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      interval: 0,
      rotate: 20
    },
  },
  yAxis: {
    type: "value",
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true, //分割线
      lineStyle: {
        color: "#dcdcdc"
      }
    },
    // min: function(value) {
    //   return value.min - 100;
    // },
    // max: function(value) {
    //   return value.max + 100;
    // }
  },
  series: [
    {
      name: "成交价",
      type: "line",
      symbol: "none",
      data: [],
      itemStyle: {
        normal: {
          lineStyle: {
            color: "#4484ff"
          }
        }
      }
    }
  ]
};

export default {
  props: ["echartdata"],
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.dom = echarts.init(this.$refs.dom, "dark");
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      utils.on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    utils.off(window, "resize", this.resize);
  },
  watch: {
    echartdata(newval) {
      // if (newval.length) {
      //   let xAxisData = [];
      //   let seriesData = [];
      //   for (let i = 0; i < newval.length; i++) {
      //     xAxisData.push(dayjs(newval[i].createdAt).format("MM-DD"));
      //     seriesData.push(newval[i].tradePrice);
      //   }
      //   option.xAxis.data = xAxisData;
      //   option.series[0].data = seriesData;
      //   this.dom.setOption(option);
      //   utils.on(window, "resize", this.resize);
      // } else {
      //   option.xAxis.data = [];
      //   option.series[0].data = [];
      //   this.dom.setOption(option);
      //   utils.on(window, "resize", this.resize);
      // }
    }
  }
};
</script>

<style scoped lang="less">
.chartline {
  width: 100%;
  height: 100%;
}
</style>