require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const db = require("./config/connection");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");

const { authMiddleware } = require("./utils/auth");
const app = express();

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(process.env.PORT, () => {
      console.log(`API server running on port ${process.env.PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${process.env.PORT}${server.graphqlPath}`
      );
    });
  });

  db.on("error", function (error) {
    console.log("Mongoose connection error: " + error);
  });
}
startApolloServer(typeDefs, resolvers, authMiddleware);
