import { gql } from "@apollo/client";

export const CREATE_NOTES = gql`
  mutation CreateNotes($input: [NoteCreateInput!]!) {
    createNotes(input: $input) {
      notes {
        wallet {
          address
        }
        entities {
          name
        }
        tags {
          tag
        }
        sources {
          url
        }
      }
    }
  }
`;
export const UPDATE_NOTES = gql`
  mutation UpdateNotes(
    $update: NoteUpdateInput
    $where: NoteWhere
    $disconnect: NoteDisconnectInput
  ) {
    updateNotes(update: $update, where: $where, disconnect: $disconnect) {
      notes {
        wallet {
          address
        }
        entities {
          name
        }
        tags {
          tag
        }
        sources {
          url
        }
      }
    }
  }
`;
export const DELETE_NOTES = gql`
  mutation DeleteNotes($where: NoteWhere) {
    deleteNotes(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;
export const CREATE_RESPONSES = gql`
  mutation CreateResponses($input: [ResponseCreateInput!]!) {
    createResponses(input: $input) {
      responses {
        text
        wallet {
          address
        }
        prompt {
          text
        }
      }
    }
  }
`;
