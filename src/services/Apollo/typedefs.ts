import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  enum PromptType {
    """
    Denotes the types of Prompt for the 'type' property
    """
    SEED
    SURVEY
  }

  type Entity {
    """
    TODO: Should this be restricted
    """
    uuid: ID! @id(autogenerate: true)
    name: String! @unique #under assumption name for entities are unique
    id: String @unique
    avatar: String
    onChain: Boolean
    network: String @unique
    address: Wallet @relationship(type: "HAS_WALLET", direction: OUT)
    addressSource: Source @relationship(type: "HAS_SOURCE", direction: OUT)
    twitter: AccountTwitter @relationship(type: "HAS_ACCOUNT", direction: OUT)
    discord: String @unique
    github: String @unique
    website: String @unique
    createdAt: DateTime! @timestamp
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }

  interface Account {
    """
    TODO: Should this be restricted
    """
    uuid: ID! @id(autogenerate: true)
    profileUrl: String!
  }

  type AccountTwitter implements Account @node(additionalLabels: ["Twitter"]){
    """
    Node type of a Twitter Account
    """
    uuid: ID! @id(autogenerate: true)
    profileUrl: String! @unique
    twitterID: Int
  }

  type Prompt {
    uuid: ID! @id(autogenerate: true)
    text: String @unique
    type: PromptType!
    createdAt: DateTime! @timestamp
    blocks: [Block!]! @relationship(type: "RESPONDS_TO", direction: IN)
  }

  type Wallet {
    """
    A blockchain wallet address.
    """
    address: String! @unique
    createdAt: DateTime! @timestamp
    blocks: [Block!] @relationship(type: "CREATED", direction: OUT)
    sandbox: Sandbox @relationship(type: "CREATED", direction: OUT)
    entities: [Entity!] @relationship(type: "CREATED", direction: OUT)
  }

  type Tag {
    uuid: ID! @id(autogenerate: true)
    tag: String @unique #todo: should be non-nullable but db currently has null fields ingested
    createdAt: DateTime! @timestamp
    blocks: [Block!]! @relationship(type: "HAS_TAG", direction: IN)
  }

  type Narrative {
    uuid: ID! @id(autogenerate: true)
    createdAt: DateTime! @timestamp
    blocks: [Block!]! @relationship(type: "CONTAINS", direction: IN)
  }

  type Workspace {
    uuid: ID! @id(autogenerate: true)
    createdAt: DateTime! @timestamp
    updatedAt: DateTime @timestamp
    name: String!
    rfObject: String
    blocks: [Block!]! @relationship(type: "CONTAINS", direction: OUT)
    entities: [Entity!]! @relationship(type: "CONTAINS", direction: OUT)
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }

  # Sandbox is a special type of workspace where every user only has one
  type Sandbox {
    uuid: ID! @id(autogenerate: true)
    createdAt: DateTime! @timestamp
    name: String! @unique
    blocks: [Block!]! @relationship(type: "CONTAINS", direction: OUT)
    entities: [Entity!]! @relationship(type: "CONTAINS", direction: OUT)
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }

  union Block = Note | Partnership | Response

  type Note @node(additionalLabels: ["Block"]) {
    uuid: ID! @id(autogenerate: true)
    text: String!
    createdAt: DateTime! @timestamp #todo: should be non-nullable but db currently has null fields ingested
    entities: [Entity!]! @relationship(type: "REFERENCES", direction: OUT)
    tags: [Tag!]! @relationship(type: "HAS_TAG", direction: OUT)
    sources: [Source!]! @relationship(type: "HAS_SOURCE", direction: OUT)
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }

  type Response @node(additionalLabels: ["Block"]) {
    uuid: ID! @id(autogenerate: true)
    text: String!
    prompt: Prompt! @relationship(type: "RESPONDS_TO", direction: OUT)
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }

  type Partnership @node(additionalLabels: ["Block"]) {
    uuid: ID! @id(autogenerate: true)
    text: String!
    createdAt: DateTime! @timestamp
    type: String
    entities: [Entity!]! @relationship(type: "REFERENCES", direction: OUT)
    tags: [Tag!]! @relationship(type: "HAS_TAG", direction: OUT)
    sources: [Source!]! @relationship(type: "HAS_SOURCE", direction: OUT)
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }

  type Source {
    uuid: ID! @id(autogenerate: true)
    createdAt: DateTime! @timestamp
    source: String! @unique
  }

  type Proposal {
    body: String
    choices: [String]
    createdAt: DateTime! @timestamp
    id: String
    ipfs: String
    link: String
    network: Int
    start: DateTime! @timestamp
    state: String
    title: String
    type: String
    entity: Entity @relationship(type: "HAS_PROPOSAL", direction: IN)
  }

  union SearchNodes = Note | Partnership | Response | Proposal

  type Query {
    fuzzyChainversePortalSearch(searchString: String, skip: Int, limit: Int): [SearchNodes] @cypher(
      statement: """
        CALL db.index.fulltext.queryNodes(
          'chainversePortalSearchIndex', $searchString+'~')
        YIELD node RETURN node
        SKIP $skip LIMIT $limit
      """
    )
  }
`;
