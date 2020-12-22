interface stateDT {
  _id: string | null,
  dialogVisible: boolean,
}

export const state = () => ({
  dialogVisible: false,
  _id: '',
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
}

export const actions = {
}