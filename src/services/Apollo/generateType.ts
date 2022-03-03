import { OGM, generate } from "@neo4j/graphql-ogm";
import { typeDefs } from "./typedefs";
require("dotenv").config();

import neo4j from "neo4j-driver";

const URL = process.env["NEO4J_URL"] || "";
if (!URL) {
  console.error("Neo4j url is not defined");
}

const PASSWORD = process.env["NEO4J_PASSWORD"] || "";
if (!PASSWORD) {
  console.error("Neo4j password is not defined");
}

const driver = neo4j.driver(URL, neo4j.auth.basic("neo4j", PASSWORD));
const ogm = new OGM({ typeDefs, driver });

async function main() {
  await generate({
    ogm,
    outFile: "./test.ts",
  });
}

main();
