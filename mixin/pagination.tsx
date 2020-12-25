import { Component, Vue } from 'vue-property-decorator' 

@Component
export default class PaginationMixin extends Vue {
  $_fetchTable(pageNumber: number) {
  }
  async nextPage() {
    this.$_fetchTable(this.$store.state.pageNumber + 1)
  }
  async prevPage() {
    this.$_fetchTable(this.$store.state.pageNumber - 1)
  }
  async changePage(pageNumber: number) {
    this.$_fetchTable(pageNumber)
  }
}