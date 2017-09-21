const express = require('express')
const cors = require('cors')
const graphql = require('express-graphql')
const { schemas } = require('./graphql')

const app = express()
const root = [__dirname, 'public'].join('/')

Object.keys(schemas).forEach(route => {
  const schema = schemas[route]  
  app.use(`/graphql/${route}`, graphql({ schema, graphiql: true }))
  app.get(`/api/${route}`, cors(), graphql({ schema })) 
})

app.listen(4000)
console.log('listening...')
