import { assign, join, map, get, pipe } from './_/index.js'
import { resolveJSON, createGraphQuery } from './util.js'
import ThrottledQueue from './ThrottledQueue.js'

const geo = '52.32243649999999,4.890777'
const endpoint = 'http://localhost:4000/api/'

const queue = new ThrottledQueue(25)
const createSearchQuery = createGraphQuery(endpoint + 'search', 'results', ['id', 'name', 'geometry'])
const createGeometryQuery = createGraphQuery(endpoint + 'geocode', 'geometry')
const createMatrixQuery = createGraphQuery(endpoint + 'distancematrix', 'results', ['distance', 'duration'])

const joinComma = join(',')
const getGeometry = get('geometry')
const getDataGeometry = get('data', 'geometry')
const getResults = get('data', 'results')
const getTopResult = get('data', 'results', 0)

const mapResults = map(getResults)
const mapTopResult = map(getTopResult)

const mapResolveJSON = pipe(map(resolveJSON), x => Promise.all(x))

const mapDestinationsQuery = pipe(
  map(pipe(getGeometry, joinComma)), 
  join('|')
)

const promiseAssert = (assert, message) => value => new Promise((resolve, reject) => {
  assert(value) ? resolve(value) : reject(message)
})

const mapToObject = (key, array) => object => 
  array.map(item => assign({ [key]: item }, object))

const mapToArray = (key, array) => locations => {
  return locations.map((location, index) => assign(location, { [key]: array[index] }))
}

const mapTypesToSearchQuery = types => pipe(
  mapToObject('type', types), 
  map(createSearchQuery)
)

const mapModesToMatrixQuery = modes => pipe(
  mapToObject('mode', modes), 
  map(createMatrixQuery)
)

export const getPointsOfInterest = (address, modes, types) => {
  
  const mapLocationType = mapToArray('type', types)
  const createSearchQueries = mapTypesToSearchQuery(types)
  const createMatrixQueries = mapModesToMatrixQuery(modes)
  
  return fetch(createGeometryQuery({ address }))
    .then(resolveJSON)
    .then(getDataGeometry)
    .then(promiseAssert(Array.isArray, "Expects an array"))
    .then(geometry => {

      const origins = joinComma(geometry)
      return queue.fetch(createSearchQueries({ location: origins }))
        .then(mapResolveJSON)
        .then(mapTopResult)
        .then(mapLocationType)
        .then(locations => {         
          
          const destinations = mapDestinationsQuery(locations)
          return queue.fetch(createMatrixQueries({ origins, destinations }))
            .then(mapResolveJSON)
            .then(mapResults)
            .then(distanceMatrix => {        
              
              return locations.map((location, locationIndex) => {
                return assign(location, {
                  modes: modes.reduce((object, type, typeIndex) => {
                    return assign(object, { 
                      [type]: distanceMatrix[typeIndex][locationIndex]
                    })
                  }, {})
                })
              })

            })
            .then(locations => ({ 
              address, 
              modes, 
              types, 
              geometry, 
              locations,
            }))
        })
    })

}





