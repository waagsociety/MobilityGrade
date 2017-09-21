import { getPointsOfInterest } from './api.js'
import response from './response.js'

const address = '1083AA'
const modes = ['walking', 'bicycling', 'driving']
const types = ['atm', 'hospital', 'department_store']

if (0) getPointsOfInterest(address, modes, types)
  .then(result => JSON.stringify(result, null, 2))
  .then(console.log)
  .catch(console.warn)










