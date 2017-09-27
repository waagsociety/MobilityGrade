import { Component, createElement } from '../view.js'

export const report = new Component('report', store => {

  const { result, modes, types } = store.get()
  const report = result && createReport(result, modes, types)

  return report 
    ? createElement('ul', { className: 'report' }, report.map(reportItem))
    : createElement('h1', null, ['zoeken'])
})

function reportItem(item) {
  const { name, active, score } = item
  return createElement('li', { className: active ? 'active' : '' }, [
    createElement('h1', null, [name, ' - ', Math.round(score * 100) / 10]),
  ])
}




function createReport(data, modes, types) {
  return data.locations.map((location, index) => {
    
    const { active } = types[index]
    const { type, geometry, name } = location
    const report = modes.reduce((report, mode) => {
      
      const { treshold, weigth, key } = mode
      const { duration } = location.modes[key]
      
      const multiplier = (duration / (treshold * 60)) * 0.4
      const score = Math.max(0, 1 - multiplier)
      const grade = score * weigth

      return Object.assign(report, {
        [key]: { score, grade, weigth, duration }
      })

    }, {})

    console.log('active modes', modes.filter(isActive))

    const score = Math.max(0, ...modes.filter(isActive).map(({ key }) => report[key].grade))

    return { type, active, geometry, name, report, score }

  })
}

function isActive(object) {
  return object.active
}
