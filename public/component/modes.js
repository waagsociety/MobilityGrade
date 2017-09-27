import { Component, createElement } from '../view.js'

export const modes = new Component('travel-modes', store => {
  return createElement('ul', { className: 'tabs' }, store.get('modes').map(modeItem(store)))
})

function modeItem(store) {
  return mode => createElement('li', null, [
    createElement('input', {
      id: 'mode-' + mode.key,
      type: 'checkbox',
      checked: mode.active,
      onclick() {
        mode.active = this.checked
        store.dispatch()
      },
    }),
    createElement('label', { for: 'mode-' + mode.key }, mode.key),
  ])
}

//   store.get('modes').map(
//   mode => createElement('input', {
//     id: mode.key,
//     type: 'checkbox',
//     checked: mode.active,
//     onclick() {
//       mode.active = this.checked
//       store.dispatch()
//     },
//   })
// ))
