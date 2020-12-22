<template>
  <div>
      <el-row :gutter="20" type="flex" justify="center" align="center">
        <el-col :span="10">
          <the-page-header :content="pageName" :links="links"></the-page-header>
          <el-table
            :data="tableData"
            v-loading="loading"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="武器"
              width="180">
            </el-table-column>
            <el-table-column
              prop="level"
              label="等级"
              width="180">
            </el-table-column>
            <el-table-column
              prop="Base_ATK"
              label="基础攻击力"
              width="180">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"
                  @click="$router.push('/weapon/edit/' + scope.row._id)"
                 >
                 编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="$_dialogDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <form-dialog :visible="visible" :info="dialogInfo" @fn-confirm="handleDelete">
      </form-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from '~/interfaces/cloudbase'
import weaponDT from '~/interfaces/data/weapon'
import linkType from '~/interfaces/view/link'

@Component
export default class WeaponPage extends Vue {
  private tableData: Array<weaponDT> = []
  private pageName: string = '武器信息'
  private errorMsg: string = ''
  private dialogInfo: string = '确定要删除吗？'
  private links: Array<linkType> = [{
    name: '添加',
    to: '/weapon/edit'
  }]
  private visible: Boolean = false
  private loading: Boolean = true
  transition: string = 'slide-bottom'
  
  async mounted() {
    await this.$_fetchTable()
  }
  async $_fetchTable() {
    this.loading = true;
    try {
      const res = await this.$cloudbase.callFunction({
        name: 'db-helper',
        data: {
          ACTION: 'GET',
          collection: 'weapon',
          page: 1,
          count: 10
        }
      });
      console.log(res)
      this.tableData = res.result.data
    } catch (e) {
      this.errorMsg = e.message
      console.log(e)
    }
    this.loading = false
  }
  $_dialogDelete($index: number, row: weaponDT) {
    const { _id } = row;
    this.dialogInfo = `确定要删除角色<b class='color-primary'>${row.name}</b>吗？`
    this.$store.commit('openDialog')
    this.$store.commit('selectID', _id)
  }
  async handleDelete() {
    this.$store.commit('closeDialog')
    const { _id } = this.$store.state;
    if (!_id) {
      this.$notify({
        title: '警告',
        message: '没有选中_id',
        type: 'warning'
      });
      return false
    }
    const res = await this.$cloudbase.callFunction({
      name: 'db-helper',
      data: {
        ACTION: 'DELETE',
        collection: 'weapon',
        page: 1,
        count: 10,
        _id
      }
    });
    this.$_fetchTable()
  }
}
</script>