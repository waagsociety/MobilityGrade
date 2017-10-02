import { pluck } from './util.js'
import { getPointsOfInterest } from './api.js'

import Store from './Store.js'
import MobilityGrade from './MobilityGrade.js'
import View from './view.js'

import { state } from './state.js'
import { search } from './component/search.js'
import { report } from './component/report.js'
import { types } from './component/types.js'
import { modes } from './component/modes.js'



const store = new Store(state)
const view  = new View(search, types, modes, report)

let x = 0
const svg = {
  points: {}
}

store.subscribe(view.render)
store.subscribe(function(store) {
  const { types, modes, result } = store.get()
  if (!x++) store.get('types').forEach(type => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    element.setAttribute('cx', 0)
    element.setAttribute('cy', 0)
    element.setAttribute('r', 4)
    points.appendChild(element)
    svg.points[type.key] = element
  })
  else if (result) {
    
    const report = createReport(result, modes, types)
    const score = mean(report.filter(isActive).map(x => x.score))
    const [zeroX, zeroY] = result.geometry
    const cxy = report.forEach(item => {
      
      const { type, duration, active } = item
      const element = svg.points[type]
      const [pointX, pointY] = item.geometry
      const radian = angleRad(zeroX - pointX, zeroY - pointY)

      element.setAttribute('class', active ? 'active' : '')
      element.setAttribute('cx', Math.cos(radian) * (duration / 7.5))
      element.setAttribute('cy', Math.sin(radian) * (duration / 7.5))

    })

  }
})

function createReport(data, modes, types) {
  return data.locations.map((location, index) => {
    
    const { active } = types[index]
    const { type, geometry, name } = location
    const report = modes.reduce((report, mode) => {
      
      const { treshold, weigth, key } = mode
      const { duration, distance } = location.modes[key]
      
      const multiplier = (duration / (treshold * 60)) * 0.4
      const score = Math.max(0, 1 - multiplier)
      const grade = score * weigth

      return Object.assign(report, {
        [key]: { score, grade, weigth, duration, distance }
      })

    }, {})

    const score = Math.max(0, ...modes.filter(isActive).map(({ key }) => report[key].grade))
    const duration = Math.min(...modes.filter(isActive).map(({ key }) => report[key].duration))

    return { type, active, geometry, name, report, duration, score }

  })
}

function isActive(object) {
  return object.active
}


function mean(array) {
  return array.reduce((a, b) => a + b, 0) / array.length
}

function angleRad(x, y) {
  return Math.atan2(0 - y, 0 - x)
}
