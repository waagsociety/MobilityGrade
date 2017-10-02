const express = require('express')
const cors = require('cors')
const graphql = require('express-graphql')
const { schemas } = require('./graphql')
const { port = 4000 } = process.env

const app = express()

app.use(express.static('public'))

Object.keys(schemas).forEach(route => {
  const schema = schemas[route]  
  app.use(`/graphql/${route}`, graphql({ schema, graphiql: true }))
  app.get(`/api/${route}`, cors(), graphql({ schema })) 
})

app.listen(port)
console.log('listening...')
