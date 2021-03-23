import { addResolversToSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { resolvers as bookResolvers } from './book.resolver';

export function wrapResolversToSchema(schema: GraphQLSchema): GraphQLSchema {
  addResolversToSchema({ schema, resolvers: bookResolvers });
  return schema;
}
