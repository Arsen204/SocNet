const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { MONGODB } = require('./config.js')
const typeDefs = require('./graphql/typDefs')
const resolvers = require('./graphql/resolvers/index')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() =>{
        console.log('MongoDB connected')
        return server.listen({ port: 5000 })
    })
    .then(res => {
    console.log(`Server running at ${res.url}`)
    })