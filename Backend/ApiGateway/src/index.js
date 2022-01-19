const { ApolloServer } = require('apollo-server');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const Apis = require('./sources')


const server = new ApolloServer({
  context: () => { },
  typeDefs, resolvers,
  dataSources: () => ({
    ProductsApi: new Apis.ProductsApi(),
    BillsApi: new Apis.BillsApi(),
    CommentsApi: new Apis.CommentsApi(),
  }),
  introspection: true,
  playground: true,
});




server.listen(process.env.PORT || 4000)
  .then(({ url }) => {
    console.log(`🚀 Servidor está corriendo en ${url}`);
  })