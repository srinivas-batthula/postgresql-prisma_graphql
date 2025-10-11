import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema.ts';
import { resolvers } from './resolvers.ts';

export const createGraphQLServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    return server;
};

//_-_-_-_-_-_-_-_-_-_-_- Sample GraphQL Query... _-_-_-_-_-_-_-_-_-_-_-//

// -->> http://localhost:8080/graphql?query={ users { id name } }       <<-->> Fetch only { id, name } fields from all the `users`...
// Response -->> {
//                  "data": {
//                      "users": [
//                          {
//                              "id": 3,
//                              "name": "Srinivas05"
//                          }
//                      ]
//                  }
//               }
