const { gql } = require('apollo-server')

module.exports = gql`
    type Post  {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input registerInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        getPosts: [Post]
    }

    type Mutation {
        register(registerInput: registerInput): User!
        login(username: String!, password: String!): User!
    }
`