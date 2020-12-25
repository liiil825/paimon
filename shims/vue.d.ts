import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $cloudbase: any
    $echartsInit: any
  }
}