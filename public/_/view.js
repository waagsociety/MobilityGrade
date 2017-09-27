const modes = [
  { 
    key: 'walking',
    treshold: 10,
    weigth: 1,
    active: true,
  },
  { 
    key: 'bicycling',
    treshold: 20,
    weigth: 0.8, 
    active: true
  },
]

console.log('hello')

(function() {
  console.log('x')
  const root = document.getElementById('travel-modes')
  modes.forEach(mode => {
    console.log(mode)
    const button = Object.assign(document.createElement('input'), {
      id: mode.key,
      type: 'checkbox',
      active: mode.active,
      onclick() {
        checkbox.active = mode.active = !mode.active
      },
    })
  })
})()