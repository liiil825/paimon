declare module 'element-ui/*'
declare module '@cloudbase/vue-provider'

declare module "*.json" {
  const value: any
  export default value
}

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}