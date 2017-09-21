const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLSchema } = require('graphql')
const { queryMapsSearch } = require('../../query')

const Location = new GraphQLObjectType({
  name: 'Location',
  description: '...',
  fields: () => ({
    geometry: {
      type: new GraphQLList(GraphQLFloat),
      resolve: item => {
        const { lat, lng } = item.geometry.location
        return [lat, lng]
      }
    },
    id: {
      type: GraphQLString,
      resolve: item => item.id,
    },
    name: {
      type: GraphQLString,
      resolve: item => item.name,
    },
    vicinity: {
      type: GraphQLString,
      resolve: item => item.vicinity,
    },
    rating: {
      type: GraphQLFloat,
      resolve: item => item.rating,
    },
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Results',
    description: '...',
    fields: () => ({
      results: {
        type: new GraphQLList(Location),
        args: {
          location: { type: GraphQLString },
          type: { type: GraphQLString },
          keyword: { type: GraphQLString },
        },
        resolve: (root, query) => queryMapsSearch(query).then(data => data.results)
      }
    })
  })
})
