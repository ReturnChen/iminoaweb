import store from 'store2'

export default {
  get: key => {
    return store(key)
  },
  set: (key, data) => {
    store(key, data)
  },
  clear: key => {
    store.remove(key)
  },
  clearall: () => {
    store.clearAll()
  }
}
