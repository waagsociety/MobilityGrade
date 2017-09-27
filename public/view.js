
const isNode = value => value instanceof Node

export default function View(...components) {
  return Object.assign(this, {
    render(store) {
      components.forEach(component => {
        component.render(store)
      })
    },
  })
}

export function Component(id, template) {
  const root = document.getElementById(id)
  return Object.assign(this, {
    root,
    render(store) {
      this.root.innerHTML = ''
      toArray(template(store)).forEach(child => root.appendChild(child))
      return this
    },
  })
}

export const createElement = (tagName, properties, children) => {
  const element = document.createElement(tagName)
  if (properties) for (const key in properties) {
    const value = properties[key]
    if (key in element) element[key] = value
    else element.setAttribute(key, value)
  }
  if (children) toArray(children).forEach(append(element))
  return element
}

function createTextNode(content) {
  if (content == null) content = ''
  return document.createTextNode(content)
}

function append(parent) {
  return child => parent.appendChild(isNode(child) ? child : createTextNode(child))
}

function toArray(value) {
  return Array.isArray(value) ? value : [value]
}
