export const state = () => ({
  dialogVisible: false,
  _id: '',
})

export const mutations = {
  openDialog (state) {
    state.dialogVisible = true
  },
  closeDialog (state) {
    state.dialogVisible = false
  },
  selectID (state, _id) {
    state._id = _id
  },
  clearID (state) {
    state._id = null
  },
}

export const actions = {
}