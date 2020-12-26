<template>
  <div class="container">
    <div>
      <!-- <logo /> -->
      <h1 class="title">派蒙永远的伙伴</h1>
      <h2 class="subtitle">原神数据分析系统</h2>
      <div id="main"></div>
      <el-row :gutter="20" type="flex" justify="center" align="center">
        <el-col :span="10">
          <el-select v-model="characterId" placeholder="请选择角色">
            <el-option
              v-for="item in characterList"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
          <el-button @click="handleClick">查询</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator' 
import characterDT from '~/interfaces/data/character'

@Component
export default class HomePage extends Vue {
  private loading: Boolean = true
  private characterList: Array<characterDT> = []
  private errorMsg: string = ''
  private characterId: string = ''

  async mounted() {
    await this.$_fetchTable(1)
  }

  async $_fetchTable(pageNumber: number) {
    this.loading = true
    try {
      const res = await this.$cloudbase.callFunction({
        name: 'db-helper',
        data: {
          ACTION: 'GET',
          collection: 'character',
          page: pageNumber,
          count: 100
        }
      });
      const { data, total } = res.result
      this.characterList = data
    } catch (e) {
      this.errorMsg = e.message
      console.log(e)
    }
    this.loading = false
  }
  async handleClick() {
    const rel = await this.$cloudbase.callFunction({
      name: 'paimon-data-helper',
      data: {
        _id: this.characterId
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
