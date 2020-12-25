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
              label="角色"
              width="180">
            </el-table-column>
            <el-table-column
              prop="Weapon_Type"
              label="武器类型"
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
                  @click="$router.push('/character/edit/' + scope.row._id)"
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
          <el-pagination
            layout="prev, pager, next"
            @prev-click="prevPage"
            @next-click="nextPage"
            @current-change="changePage"
            :total="$store.state.pageTotal"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <form-dialog :visible="visible" :info="dialogInfo" @fn-confirm="handleDelete">
      </form-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PaginationVue from '~/mixin/pagination'
import characterDT from '~/interfaces/data/character'
import linkType from '~/interfaces/view/link'

@Component
export default class CharacterPage extends PaginationVue {
  private tableData: Array<characterDT> = []
  private pageName: string = '角色信息'
  private errorMsg: string = ''
  private dialogInfo: string = '确定要删除吗？'
  private links: Array<linkType> = [{
    name: '添加',
    to: '/character/edit'
  }]
  private visible: Boolean = false
  private loading: Boolean = true
  transition: string = 'bounce'

  async mounted() {
    await this.$_fetchTable(1)
  }

  async $_fetchTable(pageNumber: number) {
    this.loading = true
    const { pageCount } = this.$store.state
    try {
      const res = await this.$cloudbase.callFunction({
        name: 'db-helper',
        data: {
          ACTION: 'GET',
          collection: 'character',
          page: pageNumber,
          count: pageCount
        }
      });
      const { data, total } = res.result
      this.tableData = data
      this.$store.commit('setPage', { pageNumber, pageTotal: total })
    } catch (e) {
      this.errorMsg = e.message
      console.log(e)
    }
    this.loading = false
  }
  $_dialogDelete($index: number, row: characterDT) {
    const { _id } = row
    this.dialogInfo = `确定要删除武器<b class='color-primary'>${row.name}</b>吗？`
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
      })
      return false
    }
    const res = await this.$cloudbase.callFunction({
      name: 'db-helper',
      data: {
        ACTION: 'DELETE',
        collection: 'character',
        _id
      }
    })
    this.$_fetchTable(this.$store.state.pageNumber)
  }
}
</script>

<style>
</style>
