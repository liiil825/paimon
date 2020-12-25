<template>
  <div>
    <el-form
      class="page"
      ref="form"
      v-loading.fullscreen.lock="loading"
      :model="form" label-width="120px" label-position="left">
      <el-row :gutter="20" type="flex" justify="center" align="center">
        <el-col :span="10">
          <ThePageHeader :content="pageName" />
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center" align="center">
        <el-col :span="5">
          <el-form-item label="武器名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item-rate" label="星级">
            <el-rate v-model.number="form.rate"></el-rate>
          </el-form-item>
          <el-form-item label="基础攻击力">
            <el-input v-model.number="form.Base_ATK" type="number"></el-input>
          </el-form-item>
          <el-form-item label="暴击率(%)">
            <el-input v-model.number="form.CRIT_Rate" type="number"></el-input>
          </el-form-item>
          <el-form-item label="元素伤害加成(%)">
            <el-input v-model.number="form.Elemental_DMG_Bonus" type="number"></el-input>
          </el-form-item>
          <el-form-item label="元素精通">
            <el-input v-model.number="form.Elemental_Mastery" type="number"></el-input>
          </el-form-item>
          <el-form-item label="武器类型">
            <el-select v-model.number="form.Weapon_Type" placeholder="请选择武器">
              <el-option label="双手剑" :value="1"></el-option>
              <el-option label="法器" :value="2"></el-option>
              <el-option label="弓" :value="3"></el-option>
              <el-option label="单手剑" :value="4"></el-option>
              <el-option label="长柄武器" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
            type="primary"
            @click="onSubmit">
              提交
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="名称简写">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="等级">
            <el-select v-model.number="form.level" placeholder="请选择等级">
              <el-option label="1" :value="1"></el-option>
              <el-option label="20" :value="20"></el-option>
              <el-option label="40" :value="40"></el-option>
              <el-option label="60" :value="60"></el-option>
              <el-option label="80" :value="80"></el-option>
              <el-option label="90" :value="90"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="攻击力百分比(%)">
            <el-input v-model.number="form.ATK_Percent" type="number"></el-input>
          </el-form-item>
          <el-form-item label="暴击伤害(%)">
            <el-input v-model.number="form.CRIT_DMG" type="number"></el-input>
          </el-form-item>
          <el-form-item label="物理伤害加成(%)">
            <el-input v-model.number="form.Physical_DMG_Bonus" type="number"></el-input>
          </el-form-item>
          <el-form-item label="元素充能效率(%)">
            <el-input v-model.number="form.Energy_Recharge" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import weaponDT from '~/interfaces/data/weapon'
import severlessDT, { ACTION } from '~/interfaces/data/severless'

interface formDT extends weaponDT, severlessDT {
}

@Component
export default class CharacterDetailPage extends Vue {
  private pageName: string = this._id ? '修改武器信息' : '添加武器信息' 
  private errorMsg: string = ''
  private loading: Boolean = this._id ? true : false
  private form: weaponDT = {
    name: '',
    Level: 1,
    Base_ATK: 0,
    CRIT_Rate: 0,
    CRIT_DMG: 0,
    Elemental_DMG_Bonus: 0,
    Elemental_Mastery: 0,
    Elemental_Type: 1,
    ATK_Percent: 0,
    Physical_DMG_Bonus: 0,
    Energy_Recharge: 0,
    Weapon_Type: 0,
  }

  get _id () {
    return this.$route.params.slug
  }

  async mounted() {
    const { _id } = this
    if (!_id) {
      return false
    }
    try {
      const res = await this.$cloudbase.callFunction({
        name: 'db-helper',
        data: {
          collection: 'weapon',
          _id,
        }
      })
      this.form = res.result.data[0]
    } catch (e) {
      this.errorMsg = e.message
      console.log(e)
    }
    this.loading = false
  }
  async onSubmit() {
    const { _id } = this
    this.loading = true
    const defaultValue = {
      collection: 'weapon',
    }
    const data: formDT = Object.assign(defaultValue, this.form)
    if (_id) {
      data._id = _id
      data.ACTION = ACTION.UPDATE
    } else {
      data.ACTION = ACTION.ADD
    }
    try {
      const res = await this.$cloudbase.callFunction({
        name: 'db-helper',
        data
      })
      this.$router.go(-1)
    } catch (e) {
      this.errorMsg = e.message
    }
    this.loading = false
  }
}
</script>