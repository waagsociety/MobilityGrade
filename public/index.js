import { pluck } from './util.js'
import { getPointsOfInterest } from './api.js'

import Store from './store.js'
import MobilityGrade from './MobilityGrade.js'
import View from './view.js'

import { state } from './state.js'
import { search } from './component/search.js'
import { report } from './component/report.js'
import { types } from './component/types.js'
import { modes } from './component/modes.js'

const store = new Store(state)
const view  = new View(search, types, modes, report)

store.subscribe(view.render)

const address = '1083AA'





















function scoreLocationModes(location) {
  const { modes } = location
  const scores = {}
  for (const key in modes) {    
    const duration = modes[key].duration
    const treshold = (tresholds[key] * 60)
    const weigth = weigths[key]
    scores[key] =  new Rating(duration, treshold, weigth)
  }
  return scores
}

function Rating(duration, treshold, weigth) {
  const multiplier = (duration / treshold) * 0.4
  const score = Math.max(0, 1 - multiplier)
  const grade = score * weigth
  return Object.assign(this, { duration, treshold, weigth, score, grade })
}

function toOverallGrade(rating) {
  return Math.max(...Object.values(rating).map(get('grade')))
}




