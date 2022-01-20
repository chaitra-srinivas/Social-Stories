const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const cors = require('cors');
const db = require("./config/connection");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const PORT = 3001;

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  db.once("open", function () {
    console.log("Connected to the database");
  });

  db.on("error", function (error) {
    console.log("Mongoose connection error: " + error);
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    cors: true
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 3001 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`);
}
startApolloServer(typeDefs, resolvers);
