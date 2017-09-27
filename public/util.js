
export const resolveJSON = response => response.json()

export const createGraphQuery = (endpoint, field, keys) => {
  keys = keys ? `{${keys.join(' ')}}` : ''
  return parameters => `${endpoint}?query={${field}(${toGraphParameters(parameters)})${keys}}`
}

function toGraphParameters(parameters) {
  return Object.keys(parameters).map(key => {
    return [key, toGraphParameterValue(parameters[key])].join(':')
  }).join(' ')
}

function toGraphParameterValue(value) {
  return typeof value === 'string' ? `"${value}"` : value
}

export const pluck = (propertyKey, valueKey) => array =>
  valueKey
    ? array.reduce((object, item) => {
        const key = item[propertyKey]
        return Object.assign(object, { [key]: item[valueKey] })
      }, {})
    : array.map(item => item[propertyKey])
  

export const createRequestURL = baseURL => object => 
  baseURL + '?' + Object.keys(object).reduce(function(result, key) {
    return result.concat([key, object[key].toString().replace(/\s|\s+/g, '+')].join('='))
  }, []).join('&')

export const createFetchRequest = (baseURL, setup) => {
  const createURL = createRequestURL(baseURL)
  return object => fetch(createURL(object), setup)
}

export const prepareQueryParameter = key => value => ({
  [key]: value
})

export const createMapsRequest = (key, baseURL) => {
  const createQueryKey = prepareQueryParameter('key')
  const resolveRequest = createFetchRequest(baseURL)
  return setup => resolveRequest(assign(createQueryKey(key), setup))
}

export const map = transform => array => array.map(transform)

export const pipe = (...pipeline) => value =>
  pipeline.reduce((value, transformer) => transformer(value), value)

export function get() {
  const path = arguments
  const length = path.length
  return function(value) {
    let index = -1
    while (++index < length && value != null) {
      const key = path[index]
      value = value[key]
    }
    if (index === length) return value
  }
}
