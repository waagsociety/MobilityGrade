import { getPointsOfInterest } from './api.js'

export default function MobilityGrades(modes, types) {
  
  const cache = {}
  const addToCache = address => data => {
    const cached = cache[address]
    Object.assign(cached, { data, loading: false })
    return data
  }

  function Cache(address) {
    return cache[address] = Object.assign(this, {
      data: null,
      error: null,
      loading: false,
      queue: [],
    })
  }

  return Object.assign(this, {
    modes,
    types,
    get(address) {
      return new Promise((resolve, reject) => {
        const cached = cache[address] || new Cache(address)
        if (cached.data) {
          console.log('cached')
          if (cached.error) reject(cached.error)
          else resolve(cached.data)
        }
        else if (cached.loading) {
          console.log('loading')
          cached.queue.push((data, error) => {
            if (error) reject(data)
            else resolve(data)
          })
        }
        else {
          cached.loading = true
          getPointsOfInterest(address, modes, types)
            .then(data => {
              resolve(data)
              cached.queue.forEach(resolve => resolve(data))
              Object.assign(cached, {
                data: data,
                error: null,
                loading: false,
                queue: []
              })
              return data
            })
            .catch(error => {
              if (error === 'Expects an array') {
                console.log('reset')
                cached.queue.push((data, error) => {
                  if (error) reject(data)
                  else resolve(data)
                })
                cached.loading = false
                this.get(address)
              }
              else {
                reject(error)
                cached.queue.forEach(resolve => resolve(error, true))
                Object.assign(cached, {
                  data: null,
                  error: error,
                  loading: false,
                  queue: []
                })
              }     
            })
        }
      })
    },
  })

}