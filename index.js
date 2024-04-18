import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from './_db.js'

// types
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        reviews() {
            return db.reviews
        },
        review(_, args, ){
            return db.reviews.find(({ id }) => id === args.id )
        },
        games() {
            return db.games
        },
        game(_, args){
           return db.games.find(({ id }) => id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(({ id }) => id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(({ id }) => id === parent.id)
        },
        game(parent) {
            return db.games.find(({ id }) => id === parent.id)}
    }
}

// Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port : 4000 }
})

console.log('Server running on port ', 4000)
