import { get } from './util.js'

export default function Store(state) {
  const handlers = []
  return Object.assign(this, {
    dispatch(nextState) {
      console.log('store dispatch')
      Object.assign(state, nextState)
      handlers.forEach(handler => handler(this))
      return this
    },
    subscribe(callback) {
      callback(this)
      handlers.push(callback)
      return this
    },
    get() {
      const path = arguments
      const length = path.length
      let index = -1
      let result = state
      while (++index < length && result != null) {
        const key = path[index]
        result = state[key]
      }
      return result
    },
  })
}