import { Component, createElement } from '../view.js'

export const types = new Component('interest-types', store => store.get('types').map(
  type => createElement('li', { className: type.active ? 'active' : '' }, [
    createElement('input', {
      id: 'type-' + type.key,
      type: 'checkbox',
      checked: type.active,
      onclick() {
        type.active = this.checked
        store.dispatch()
      }
    }),
    createElement('label', { for: 'type-' + type.key }, [type.key]),
  ])
))
