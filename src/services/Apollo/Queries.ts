import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query Notes($where: WalletWhere) {
    wallets(where: $where) {
      blocks {
        ... on Note {
          text
          uuid
          tags {
            text
          }
        }
      }
    }
  }
`;

export const GET_TAGS_AND_ENTITIES = gql`
  query Tags {
    tags {
      text
    }
    entities {
      name
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
            dateAdded
          }
        }
      }
    }
  }
`;
