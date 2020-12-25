<template>
  <div class="container">
    <div>
      <!-- <logo /> -->
      <h1 class="title">派蒙永远的伙伴</h1>
      <h2 class="subtitle">原神数据分析系统</h2>
      <div id="main"></div>
      <NuxtLink to="character">角色</NuxtLink>
      <NuxtLink to="weapon">武器</NuxtLink>
      <el-button @click="handleClick">给我数据啊</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator' 

@Component
export default class HomePage extends Vue {
  transition(to: any, from: any) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
  async handleClick() {
    const rel = await this.$cloudbase.callFunction({
      name: 'paimon-data-helper',
      data: {
        // _id: 'eb0c51035fdc9d99001eca843b20d132',
        // name: '迪卢克',
        nickname: 'Diluc'
      }
    })
    const xAxis = []
    for (let i = 0; i < 39; i++) {
      xAxis.push(i + 1)
    }
    console.log(rel.result)
    const config:any = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: []
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        data: xAxis
      },
      yAxis: {
        type: 'value'
      },
      series: []
    }
    for (let i = 0, len = rel.result.length; i < len; i++) {
      const value = {
        name: rel.result[i].weaponName,
        type: 'line',
        data: rel.result[i].bestGrownList,
      }
      config.series[i] = value
      config.legend.data.push(value.name)
    }
    this.$echartsInit('main', config)
  }
}
</script>

<style>
.home-enter-active, .home-leave-active { transition: opacity .5s; }
.home-enter, .home-leave-active { opacity: 0; }
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.links a {
  margin-bottom: 8px;
}

.subtitle {
  font-weight: 400;
  font-size: 20px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

h2,
p {
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

h2 {
  padding: 20px;
}

a {
  color: #3b8070;
}
#main {
  width: 100vw;
  height: 800px;
}
</style>
