import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
const cors = Cors();

import { typeDefs } from "../../services/Apollo/typedefs";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
// TODO: uncomment after testing app deployed
// import { typeDefs } from "@chainverse/os";

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
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  return server.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
