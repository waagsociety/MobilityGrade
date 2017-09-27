const fetch = require('node-fetch')
const { GoogleMapsAPIKey } = process.env

module.exports = {
  queryMapsSearch: defineQueryFetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { 
    key: GoogleMapsAPIKey,
    rankby: 'distance',
  }),
  queryMapsDirections: defineQueryFetch('https://maps.googleapis.com/maps/api/directions/json', {
    key: GoogleMapsAPIKey,
  }),
  queryMapsGeocode: defineQueryFetch('http://maps.googleapis.com/maps/api/geocode/json', {
    keys: GoogleMapsAPIKey,
  }),
  queryMapsDistanceMatrix: defineQueryFetch('https://maps.googleapis.com/maps/api/distancematrix/json', {
    keys: GoogleMapsAPIKey,
  }),
}

function reduceQuery(endpoint, query) {
  return endpoint + '?' + Object.keys(query).reduce(function(parameters, key) {
    const value = query[key].toString().replace(/\s|\s+/g, '+')
    return parameters.concat([key, value].join('='))
  }, []).join('&')
}

function defineQuery(endpoint, config) {
  return query => reduceQuery(endpoint, Object.assign({}, config, query))
}

function defineQueryFetch(endpoint, config) {
  const transform = defineQuery(endpoint, config)
  return query => fetch(transform(query)).then(response => response.json())
}

