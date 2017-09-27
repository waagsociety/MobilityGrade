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
    onkeyup({ target, keyCode }) {
      const value = target.value.replace(/\s*/g, '').toUpperCase()
      if (value !== store.get('query') && keyCode === 13) {        
        if (/^[0-9]{4}[A-Z]{2}$/.test(value)) {
          grade.get(value).then(result => store.dispatch({ result, query: value }))
        }
        else {
          alert("postcode niet geldig (vier cijfers, twee letters)")
          store.dispatch({ query: '' })
        }
      }
    },
  }),
])





