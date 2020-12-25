import _ from 'lodash'

interface stateDT {
  _id: string | null,
  dialogVisible: boolean,
  pageNumber: number,
  pageCount: number,
  pageTotal: number,
}

export const state = () => ({
  dialogVisible: false,
  _id: '',
  pageNumber: 1,
  pageCount: 10,
  pageTotal: 0,
})

export const mutations = {
  openDialog (state: stateDT) {
    state.dialogVisible = true
  },
  closeDialog (state: stateDT) {
    state.dialogVisible = false
  },
  selectID (state: stateDT, _id: string) {
    state._id = _id
  },
  clearID (state: stateDT) {
    state._id = null
  },
  setPage(state: stateDT, { pageNumber, pageTotal }: { pageNumber: number, pageTotal: number }) {
    console.log('setPage');
    console.log(pageNumber, pageTotal)
    _.assign(state, { pageNumber, pageTotal })
  },
  changePageCount(state: stateDT, pageCount: number) {
    state.pageCount = pageCount
  },
}

export const actions = {
}