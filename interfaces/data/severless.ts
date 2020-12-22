enum action {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  GET = 'GET',
}
export default interface formData {
  ACTION?: action,
  collection: string,
}

export { action as ACTION }