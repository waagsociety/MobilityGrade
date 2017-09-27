const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLSchema } = require('graphql')
const { queryMapsDistanceMatrix } = require('../../query')

const Distance = new GraphQLObjectType({
  name: 'Distance',
  description: '...',
  fields: () => ({
    distance: {
      type: GraphQLInt,
      resolve: item => item.distance.value,
    },
    duration: {
      type: GraphQLInt,
      resolve: item => item.duration.value,
    },
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'DistanceMatrix',
    description: '...',
    fields: () => ({
      results: {
        type: new GraphQLList(Distance),
        args: {
          origins: { type: GraphQLString },
          destinations: { type: GraphQLString },
          mode: { type: GraphQLString },
        },
        resolve: (root, query) => queryMapsDistanceMatrix(query).then(data => data.rows[0].elements)
      }
    })
  })
})
