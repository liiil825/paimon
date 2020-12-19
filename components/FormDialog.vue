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

<script>
  export default {
    props: {
      title: {
        type: String,
        required: false,
      },
      info: {
        type: String,
        required: true,
      },
      visible: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        isOpen: this.visible,
        titleName: this.title || '提示',
      };
    },
    methods: {
      fnCancle() {
        this.$store.commit('closeDialog')
      },
      confirm() {
        this.$emit('fn-confirm')
      },
    }
  };
</script>