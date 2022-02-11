import { gql, ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./typdefs";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";

const URL = process.env["NEO4J_URL"] || "";
if (!URL) {
  console.error("Neo4j url is not defined");
}

const PASSWORD = process.env["NEO4J_PASSWORD"] || "";
if (!PASSWORD) {
  console.error("Neo4j password is not defined");
}

const driver = neo4j.driver(URL, neo4j.auth.basic("neo4j", PASSWORD));

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
  schema: neoSchema.schema,
});

const startServer = server.start();

export default async function handler(req, res) {
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
