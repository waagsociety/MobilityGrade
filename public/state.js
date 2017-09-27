export const state = {
  query: '',
  loading: false,
  result: null,
  modes: [
    {
      key: 'walking',
      treshold: 10,
      weigth: 1,
      active: true,
    },
    { 
      key: 'bicycling',
      treshold: 15,
      weigth: 0.8, 
      active: true
    },
    { 
      key: 'driving',
      treshold: 30,
      weigth: 0.4, 
      active: true
    },
  ],
  types: [
    {
      key: 'atm',
      active: true,
    },
    {
      key: 'hospital',
      active: true,
    },
    {
      key: 'department_store',
      active: true,
    },
  ]
}