import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList, GraphQLBoolean, GraphQLError,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

let count = 0

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => {
        // First, the query resolves normally.
        if (count++ === 0) {
          return peopleData
        }
        // And subsequent calls throw.
        // This mimics authentication errors after a logout.
        throw new GraphQLError('Authentication error!')
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    logout: {
      type: GraphQLBoolean,
      resolve: () => true
    }
  }
})

export const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });
