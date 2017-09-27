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
      treshold: 10,
      weigth: 1, 
      active: true
    },
    { 
      key: 'driving',
      treshold: 10,
      weigth: 1, 
      active: false
    },
  ],
  types: [
    {
      key: 'grocery_or_supermarket',
      active: true,
    },
    {
      key: 'department_store',
      active: true,
    },
    {
      key: 'atm',
      active: true,
    },
    {
      key: 'doctor',
      active: true,
    },
    {
      key: 'hospital',
      active: true,
    },
    {
      key: 'gas_station',
      active: false,
    },
    {
      key: 'hair_care',
      active: false,
    }
  ]
}