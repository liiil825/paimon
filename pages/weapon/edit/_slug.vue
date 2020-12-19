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
          <el-form-item label="基础攻击力">
            <el-input v-model="form.Base_ATK" type="number"></el-input>
          </el-form-item>
          <el-form-item label="暴击率(%)">
            <el-input v-model="form.CRIT_Rate" type="number"></el-input>
          </el-form-item>
          <el-form-item label="元素伤害加成(%)">
            <el-input v-model="form.Elemental_DMG_Bonus" type="number"></el-input>
          </el-form-item>
          <el-form-item label="元素精通">
            <el-input v-model="form.Elemental_Mastery" type="number"></el-input>
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
          <el-form-item label="等级">
            <el-select v-model="form.level" placeholder="请选择等级">
              <el-option label="1" value="1"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="40" value="40"></el-option>
              <el-option label="60" value="60"></el-option>
              <el-option label="80" value="80"></el-option>
              <el-option label="90" value="90"></el-option>
            </el-select>
            <!-- <el-input v-model="form.level" type="number"></el-input> -->
          </el-form-item>
          <el-form-item label="攻击力百分比(%)">
            <el-input v-model="form.ATK_Percent" type="number"></el-input>
          </el-form-item>
          <el-form-item label="暴击伤害(%)">
            <el-input v-model="form.CRIT_DMG" type="number"></el-input>
          </el-form-item>
          <el-form-item label="物理伤害加成(%)">
            <el-input v-model="form.Physical_DMG_Bonus" type="number"></el-input>
          </el-form-item>
          <el-form-item label="元素充能效率(%)">
            <el-input v-model="form.Energy_Recharge" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      const _id = this.$route.params.slug
      const pageName = _id ? '修改武器信息' : '添加武器信息'
      return {
        loading: !_id ? false : true,
        pageName,
        _id,
        form: {
          name: '',
          level: 1,
          region: "1",
          CRIT_Rate: 0,
          Elemental_DMG_Bonus: 0,
          Elemental_Mastery: 0,
          ATK_Percent: 0,
          CRIT_DMG: 0,
          Physical_DMG_Bonus: 0,
          Energy_Recharge: 0,
        }
      }
    },
    async mounted() {
      const _id = this.$route.params.slug
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
    },
    methods: {
      async onSubmit() {
        const _id = this.$route.params.slug
        this.loading = true
        const defaultValue = {
          collection: 'weapon',
        }
        const data = Object.assign(defaultValue, this.form)
        if (_id) {
          data._id = _id
          data.ACTION = 'UPDATE'
        } else {
          data.ACTION = 'ADD'
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
  }
</script>