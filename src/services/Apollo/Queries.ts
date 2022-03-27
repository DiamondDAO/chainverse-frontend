import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query Notes($where: WalletWhere) {
    wallets(where: $where) {
      blocks {
        ... on Note {
          text
          uuid
          sources {
            url
          }
          tags {
            tag
          }
          createdAt
          wallet {
            address
          }
          entities {
            name
          }
        }
      }
    }
  }
`;
export const GET_ALL_NOTES = gql`
  query Notes {
    notes {
      text
      createdAt
      sources {
        url
      }
      tags {
        tag
      }
      createdAt
      wallet {
        address
      }
      entities {
        name
      }
    }
  }
`;
export const GET_TAGS_AND_ENTITIES = gql`
  query Tags {
    tags {
      tag
    }
    entities {
      name
    }
  }
`;

export const GET_ENTITIES_DATA = gql`
  query Entities($where: EntityWhere) {
    entities(where: $where) {
      id
      minScore
      name
      network
      onlyMembers
      symbol
      proposalsAggregate {
        count
      }
    }
  }
`;

export const GET_BLOCK_DATA = gql`
  query Entities($where: NoteWhere) {
    notes(where: $where) {
      text
      createdAt
      sources {
        url
      }
      tags {
        tag
      }
      createdAt
      wallet {
        address
      }
      entities {
        name
      }
    }
  }
`;

export const GET_WALLET_COUNT = gql`
  query Query($where: WalletWhere) {
    walletsCount(where: $where)
  }
`;

export const GET_PROMPT_INFO = gql`
  query Prompts($promptWhere: PromptWhere, $blockWhere: BlockWhere) {
    prompts(where: $promptWhere) {
      text
      blocks(where: $blockWhere) {
        ... on Response {
          text
          wallet {
            createdAt
          }
        }
      }
    }
  }
`;
