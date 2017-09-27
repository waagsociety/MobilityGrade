import { Component, createElement } from '../view.js'
import { pluck } from '../util.js'

const pluckActiveKey = pluck('key', 'active')

export const report = new Component('report', store => {

  const { result, modes, types } = store.get()
  const modeActivity = pluckActiveKey(modes)
  const report = result && createReport(result, modes, types)
  const score = report && mean(report.filter(isActive).map(x => x.score)) || 0
  console.log(score)

  return report 
    ? createElement('ul', { className: 'report' }, report.map(reportItem(modeActivity)))
    : createElement('h1', null, ['zoeken'])
})

function reportItem(modeActivity) {
  return function(item) {
    const { type, name, active, score, report } = item
    return createElement('li', { hidden: !active }, [
      createElement('h1', null, [type, ': ', name, ' - ', Math.round(score * 20) / 2]),
      createElement('ul', null, Object.keys(report).map(key => {
        return createElement('li', { 
          className: modeActivity[key] ? 'active' : ''
        }, `${key} takes ${Math.round(report[key].duration / 6) / 10} minutes`)
      }))
    ])
  }
}

function mean(array) {
  return array.reduce((a, b) => a + b, 0) / array.length
}




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

    return { type, active, geometry, name, report, score }

  })
}

function isActive(object) {
  return object.active
}
