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
    name: String
    dataAdded: DateTime! @timestamp
  }

  type Account {
    """
    TODO: Should this be restricted
    """
    uuid: ID! @id(autogenerate: true)
    profileUrl: String!
  }

  type Prompt {
    uuid: ID! @id(autogenerate: true)
    text: String
    type: PromptType!
    dateAdded: DateTime! @timestamp
    blocks: [Block] @relationship(type: "RESPONDS_TO", direction: IN)
  }

  type Wallet {
    """
    A blockchain wallet address.
    """
    address: String! @unique
    dateAdded: DateTime! @timestamp
    blocks: [Block] @relationship(type: "CREATED", direction: OUT)
  }

  type Tag {
    uuid: ID! @id(autogenerate: true)
    text: String!
    date_added: DateTime! @timestamp
  }

  type Narrative {
    uuid: ID! @id(autogenerate: true)
    dateAdded: DateTime! @timestamp
    blocks: [Block] @relationship(type: "CONTAINS", direction: IN)
  }

  union Block = Note | Response

  type Note {
    uuid: ID! @id(autogenerate: true)
    text: String!
    entity: Entity! @relationship(type: "REFERENCES", direction: OUT)
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }

  type Response {
    uuid: ID! @id(autogenerate: true)
    text: String!
    prompt: Prompt! @relationship(type: "RESPONDS_TO", direction: OUT)
    wallet: Wallet! @relationship(type: "CREATED", direction: IN)
  }
`;
