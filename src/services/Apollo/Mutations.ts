import { gql } from "@apollo/client";

// Create
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

export const CREATE_WORKSPACES = gql`
  mutation CreateWorkspaces($input: [WorkspaceCreateInput!]!) {
    createWorkspaces(input: $input) {
      workspaces {
        name
        wallet {
          address
        }
      }
    }
  }
`;

export const ADD_SANDBOX_TO_WALLET = gql`
  mutation UpdateWallets(
    $where: WalletWhere
    $connectOrCreate: WalletConnectOrCreateInput
  ) {
    updateWallets(where: $where, connectOrCreate: $connectOrCreate) {
      wallets {
        sandbox {
          blocks {
            ... on Note {
              tags {
                tag
              }
              text
              entities {
                name
              }
            }
          }
        }
      }
    }
  }
`;

// UPDATE
export const UPDATE_SANDBOX = gql`
  mutation UpdateSandboxes(
    $where: SandboxWhere
    $connect: SandboxConnectInput
  ) {
    updateSandboxes(where: $where, connect: $connect) {
      info {
        relationshipsCreated
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
export const UPDATE_WORKSPACE = gql`
  mutation Mutation(
    $where: WorkspaceWhere
    $update: WorkspaceUpdateInput
    $connect: WorkspaceConnectInput
  ) {
    updateWorkspaces(where: $where, update: $update, connect: $connect) {
      info {
        relationshipsCreated
      }
    }
  }
`;
// DELETE
export const DELETE_NOTES = gql`
  mutation DeleteNotes($where: NoteWhere) {
    deleteNotes(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;

export const DELETE_WORKSPACE = gql`
  mutation DeleteWorkspaces($where: WorkspaceWhere) {
    deleteWorkspaces(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;

export const RESET_SANDBOX = gql`
  mutation UpdateSandboxes($disconnect: SandboxDisconnectInput) {
    updateSandboxes(disconnect: $disconnect) {
      info {
        relationshipsDeleted
      }
    }
  }
`;
