import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: Int!
    name: String
    email: String!
    createdAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    id: Int!
    name: String
    email: String
  }

  input GetUserByIdInput {
    id: Int!
  }

  type Query {
    users: [User!]!
    user(input: GetUserByIdInput!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User
    deleteUser(input: GetUserByIdInput!): User!
  }
`;
