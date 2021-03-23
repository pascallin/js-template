import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { wrapResolversToSchema } from './resolvers';

const typeDefs = importSchema('**/*.graphql');
const schema = wrapResolversToSchema(makeExecutableSchema({ typeDefs }));
const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
