import Vue from 'vue'
import * as echarts from 'echarts'

function echartsInit(idname, option) {
  let myChart = echarts.init(document.getElementById(idname), 'macarons');
  myChart.setOption(option);
}

Vue.prototype.$echartsInit = echartsInit