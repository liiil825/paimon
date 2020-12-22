import { Vue, Component, Prop } from 'vue-property-decorator'

interface tcb {
  config: any
  callFunction: Function
}

class TCBVue extends Vue {
  $cloudbase: any
}

export { TCBVue as Vue }

export { Component, Prop }