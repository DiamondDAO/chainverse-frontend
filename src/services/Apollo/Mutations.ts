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
          text
        }
        sources {
          url
        }
      }
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
          uuid
        }
      }
    }
  }
`;
