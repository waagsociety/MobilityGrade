const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLSchema } = require('graphql')
const { queryMapsGeocode } = require('../../query')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Results',
    description: '...',
    fields: () => ({
      geometry: {
        type: new GraphQLList(GraphQLFloat),
        args: {
          address: { type: GraphQLString },
        },
        resolve: (root, query) => queryMapsGeocode(query).then(data => {
          const { lat, lng } = data.results[0].geometry.location
          return [lat, lng]
        })
      }
    })
  })
})
