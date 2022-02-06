const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const cors = require("cors");
const db = require("./config/connection");
const path = require("path");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const { authMiddleware } = require("./utils/auth");
const PORT = process.env.PORT || 3001;

const app = express();

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    cors: true,
    context: authMiddleware,
  });

  db.once("open", function () {
    console.log("Connected to the database");
  });

  db.on("error", function (error) {
    console.log("Mongoose connection error: " + error);
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`);
}
startApolloServer(typeDefs, resolvers, authMiddleware);
