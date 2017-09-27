import { pluck } from '../util.js'
import { state } from '../state.js'
import { Component, createElement } from '../view.js'
import MobilityGrade from '../MobilityGrade.js'

const pluckKey = pluck('key')
const modes = pluckKey(state.modes)
const types = pluckKey(state.types)

const grade = new MobilityGrade(modes, types)

export const search = new Component('search', store => [
  createElement('input', {
    type: 'text',
    value: store.get('query'),
    placeholder: 'Zoeken op postcode...',
    pattern: '[0-9]{4}[A-Za-z]{2}',
    onkeyup(event) {
      const { value } = event.target
      if (value !== store.get('query') && event.keyCode === 13) {
        const valid = /^[0-9]{4}\s*[a-z]{2}$/i.test(value)
        if (!valid) alert("postcode niet geldig (vier cijfers, twee letters)")
        else {
          const query = value.replace(/\s*/g, '').toUpperCase()
          grade.get(query).then(result => {
            store.dispatch({ result })
          })
        }
        store.dispatch({ query: value })
      }
    },
  }),
])





