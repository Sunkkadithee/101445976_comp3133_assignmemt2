const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const typeDefs = require("./schemas/schema");
const resolvers = require("./resolvers/resolver");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🚀 GraphQL playground available at http://localhost:${PORT}/graphql`);
    });
}
startServer();