import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Player {
    id: ID!
    guide: Guide!
    group: Group
    playerCode: String!
    email: String!
    firstName: String
    lastName: String
    active: Boolean!
    createdDate: Date
    updatedDate: Date
    acceptedTos: Boolean!
  }

  input createPlayerType {
    guideId: ID!
    groupId: ID
    email: String!
    firstName: String
    lastName: String
  }

  extend type Query {
    player(id: ID!): Player
  }

  extend type Mutation {
    createPlayer(playerParams: createPlayerType!): Player
  }
`;
