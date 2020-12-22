<template>
  <el-dialog
    :title="titleName"
    :visible="$store.state.dialogVisible"
    width="30%"
    @close="fnCancle"
    center>
    <span v-html="info"></span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 定</el-button>
      <el-button @click="fnCancle">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '~/interfaces/cloudbase'

@Component
export default class FormDialog extends Vue {
  @Prop(String) title: string
  @Prop(String) info: string
  @Prop(Boolean) visible: boolean
  get isOpen() {
    return this.visible
  }
  get titleName() {
    return this.title || '提示'
  }

  fnCancle() {
    this.$store.commit('closeDialog')
  }
  confirm() {
    this.$emit('fn-confirm')
  }
}
</script>