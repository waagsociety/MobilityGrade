import { assign } from './_/index.js'

export default function ThrottledQueue(interval) {
  
  const queue = new Queue()
  return assign(this, {
    fetch(collection) {
      return this.add(collection, fetch)
    },
    add(collection, callback) {      
      const action = promiseInterval(callback)            
      return new Promise((resolve, reject) => {
        queue.add(function() {
          Promise.all(collection.map(action))
            .then(result => {
              resolve(result)
              queue.next()
            })
            .catch(error => {
              reject(error)
              queue.next()
            })
        }).start()
      })
    },
  })

  function promiseInterval(callback) {
    return (item, index) => new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(callback(item))
        }
        catch (error) {
          reject(error)
        }
      }, interval * index)
    })
  }

}

function Queue() {
  const queue = []
  return assign(this, {
    active: false,
    add(next) {
      queue.push(next)
      return this
    },
    next() {
      this.active = false
      return this.start()
    },
    start() {
      if (!this.active) {
        const next = queue.shift()
        if (next) {
          this.active = true
          next()
        }
      }
      return this
    },
  })
}
