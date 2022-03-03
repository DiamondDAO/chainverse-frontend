import { SelectionSetNode, DocumentNode } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date and time, represented as an ISO-8601 string */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  entities: Array<Entity>;
  entitiesAggregate: EntityAggregateSelection;
  accounts: Array<Account>;
  accountsAggregate: AccountAggregateSelection;
  prompts: Array<Prompt>;
  promptsAggregate: PromptAggregateSelection;
  wallets: Array<Wallet>;
  walletsAggregate: WalletAggregateSelection;
  tags: Array<Tag>;
  tagsAggregate: TagAggregateSelection;
  narratives: Array<Narrative>;
  narrativesAggregate: NarrativeAggregateSelection;
  notes: Array<Note>;
  notesAggregate: NoteAggregateSelection;
  responses: Array<Response>;
  responsesAggregate: ResponseAggregateSelection;
};

export type QueryEntitiesArgs = {
  where?: InputMaybe<EntityWhere>;
  options?: InputMaybe<EntityOptions>;
};

export type QueryEntitiesAggregateArgs = {
  where?: InputMaybe<EntityWhere>;
};

export type QueryAccountsArgs = {
  where?: InputMaybe<AccountWhere>;
  options?: InputMaybe<AccountOptions>;
};

export type QueryAccountsAggregateArgs = {
  where?: InputMaybe<AccountWhere>;
};

export type QueryPromptsArgs = {
  where?: InputMaybe<PromptWhere>;
  options?: InputMaybe<PromptOptions>;
};

export type QueryPromptsAggregateArgs = {
  where?: InputMaybe<PromptWhere>;
};

export type QueryWalletsArgs = {
  where?: InputMaybe<WalletWhere>;
  options?: InputMaybe<WalletOptions>;
};

export type QueryWalletsAggregateArgs = {
  where?: InputMaybe<WalletWhere>;
};

export type QueryTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
};

export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
};

export type QueryNarrativesArgs = {
  where?: InputMaybe<NarrativeWhere>;
  options?: InputMaybe<NarrativeOptions>;
};

export type QueryNarrativesAggregateArgs = {
  where?: InputMaybe<NarrativeWhere>;
};

export type QueryNotesArgs = {
  where?: InputMaybe<NoteWhere>;
  options?: InputMaybe<NoteOptions>;
};

export type QueryNotesAggregateArgs = {
  where?: InputMaybe<NoteWhere>;
};

export type QueryResponsesArgs = {
  where?: InputMaybe<ResponseWhere>;
  options?: InputMaybe<ResponseOptions>;
};

export type QueryResponsesAggregateArgs = {
  where?: InputMaybe<ResponseWhere>;
};

export type Mutation = {
  __typename?: "Mutation";
  createEntities: CreateEntitiesMutationResponse;
  deleteEntities: DeleteInfo;
  updateEntities: UpdateEntitiesMutationResponse;
  createAccounts: CreateAccountsMutationResponse;
  deleteAccounts: DeleteInfo;
  updateAccounts: UpdateAccountsMutationResponse;
  createPrompts: CreatePromptsMutationResponse;
  deletePrompts: DeleteInfo;
  updatePrompts: UpdatePromptsMutationResponse;
  createWallets: CreateWalletsMutationResponse;
  deleteWallets: DeleteInfo;
  updateWallets: UpdateWalletsMutationResponse;
  createTags: CreateTagsMutationResponse;
  deleteTags: DeleteInfo;
  updateTags: UpdateTagsMutationResponse;
  createNarratives: CreateNarrativesMutationResponse;
  deleteNarratives: DeleteInfo;
  updateNarratives: UpdateNarrativesMutationResponse;
  createNotes: CreateNotesMutationResponse;
  deleteNotes: DeleteInfo;
  updateNotes: UpdateNotesMutationResponse;
  createResponses: CreateResponsesMutationResponse;
  deleteResponses: DeleteInfo;
  updateResponses: UpdateResponsesMutationResponse;
};

export type MutationCreateEntitiesArgs = {
  input: Array<EntityCreateInput>;
};

export type MutationDeleteEntitiesArgs = {
  where?: InputMaybe<EntityWhere>;
};

export type MutationUpdateEntitiesArgs = {
  where?: InputMaybe<EntityWhere>;
  update?: InputMaybe<EntityUpdateInput>;
};

export type MutationCreateAccountsArgs = {
  input: Array<AccountCreateInput>;
};

export type MutationDeleteAccountsArgs = {
  where?: InputMaybe<AccountWhere>;
};

export type MutationUpdateAccountsArgs = {
  where?: InputMaybe<AccountWhere>;
  update?: InputMaybe<AccountUpdateInput>;
};

export type MutationCreatePromptsArgs = {
  input: Array<PromptCreateInput>;
};

export type MutationDeletePromptsArgs = {
  where?: InputMaybe<PromptWhere>;
  delete?: InputMaybe<PromptDeleteInput>;
};

export type MutationUpdatePromptsArgs = {
  where?: InputMaybe<PromptWhere>;
  update?: InputMaybe<PromptUpdateInput>;
  connect?: InputMaybe<PromptConnectInput>;
  disconnect?: InputMaybe<PromptDisconnectInput>;
  create?: InputMaybe<PromptRelationInput>;
  delete?: InputMaybe<PromptDeleteInput>;
  connectOrCreate?: InputMaybe<PromptConnectOrCreateInput>;
};

export type MutationCreateWalletsArgs = {
  input: Array<WalletCreateInput>;
};

export type MutationDeleteWalletsArgs = {
  where?: InputMaybe<WalletWhere>;
  delete?: InputMaybe<WalletDeleteInput>;
};

export type MutationUpdateWalletsArgs = {
  where?: InputMaybe<WalletWhere>;
  update?: InputMaybe<WalletUpdateInput>;
  connect?: InputMaybe<WalletConnectInput>;
  disconnect?: InputMaybe<WalletDisconnectInput>;
  create?: InputMaybe<WalletRelationInput>;
  delete?: InputMaybe<WalletDeleteInput>;
  connectOrCreate?: InputMaybe<WalletConnectOrCreateInput>;
};

export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>;
};

export type MutationDeleteTagsArgs = {
  where?: InputMaybe<TagWhere>;
};

export type MutationUpdateTagsArgs = {
  where?: InputMaybe<TagWhere>;
  update?: InputMaybe<TagUpdateInput>;
};

export type MutationCreateNarrativesArgs = {
  input: Array<NarrativeCreateInput>;
};

export type MutationDeleteNarrativesArgs = {
  where?: InputMaybe<NarrativeWhere>;
  delete?: InputMaybe<NarrativeDeleteInput>;
};

export type MutationUpdateNarrativesArgs = {
  where?: InputMaybe<NarrativeWhere>;
  update?: InputMaybe<NarrativeUpdateInput>;
  connect?: InputMaybe<NarrativeConnectInput>;
  disconnect?: InputMaybe<NarrativeDisconnectInput>;
  create?: InputMaybe<NarrativeRelationInput>;
  delete?: InputMaybe<NarrativeDeleteInput>;
  connectOrCreate?: InputMaybe<NarrativeConnectOrCreateInput>;
};

export type MutationCreateNotesArgs = {
  input: Array<NoteCreateInput>;
};

export type MutationDeleteNotesArgs = {
  where?: InputMaybe<NoteWhere>;
  delete?: InputMaybe<NoteDeleteInput>;
};

export type MutationUpdateNotesArgs = {
  where?: InputMaybe<NoteWhere>;
  update?: InputMaybe<NoteUpdateInput>;
  connect?: InputMaybe<NoteConnectInput>;
  disconnect?: InputMaybe<NoteDisconnectInput>;
  create?: InputMaybe<NoteRelationInput>;
  delete?: InputMaybe<NoteDeleteInput>;
  connectOrCreate?: InputMaybe<NoteConnectOrCreateInput>;
};

export type MutationCreateResponsesArgs = {
  input: Array<ResponseCreateInput>;
};

export type MutationDeleteResponsesArgs = {
  where?: InputMaybe<ResponseWhere>;
  delete?: InputMaybe<ResponseDeleteInput>;
};

export type MutationUpdateResponsesArgs = {
  where?: InputMaybe<ResponseWhere>;
  update?: InputMaybe<ResponseUpdateInput>;
  connect?: InputMaybe<ResponseConnectInput>;
  disconnect?: InputMaybe<ResponseDisconnectInput>;
  create?: InputMaybe<ResponseRelationInput>;
  delete?: InputMaybe<ResponseDeleteInput>;
  connectOrCreate?: InputMaybe<ResponseConnectOrCreateInput>;
};

export enum PromptType {
  /** Denotes the types of Prompt for the 'type' property */
  Seed = "SEED",
  Survey = "SURVEY",
}

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = "ASC",
  /** Sort by field values in descending order. */
  Desc = "DESC",
}

export type Block = Note | Response;

export type Account = {
  __typename?: "Account";
  /** TODO: Should this be restricted */
  uuid: Scalars["ID"];
  profileUrl: Scalars["String"];
};

export type AccountAggregateSelection = {
  __typename?: "AccountAggregateSelection";
  count: Scalars["Int"];
  uuid: IdAggregateSelectionNonNullable;
  profileUrl: StringAggregateSelectionNonNullable;
};

export type CreateAccountsMutationResponse = {
  __typename?: "CreateAccountsMutationResponse";
  info: CreateInfo;
  accounts: Array<Account>;
};

export type CreateEntitiesMutationResponse = {
  __typename?: "CreateEntitiesMutationResponse";
  info: CreateInfo;
  entities: Array<Entity>;
};

export type CreateInfo = {
  __typename?: "CreateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
};

export type CreateNarrativesMutationResponse = {
  __typename?: "CreateNarrativesMutationResponse";
  info: CreateInfo;
  narratives: Array<Narrative>;
};

export type CreateNotesMutationResponse = {
  __typename?: "CreateNotesMutationResponse";
  info: CreateInfo;
  notes: Array<Note>;
};

export type CreatePromptsMutationResponse = {
  __typename?: "CreatePromptsMutationResponse";
  info: CreateInfo;
  prompts: Array<Prompt>;
};

export type CreateResponsesMutationResponse = {
  __typename?: "CreateResponsesMutationResponse";
  info: CreateInfo;
  responses: Array<Response>;
};

export type CreateTagsMutationResponse = {
  __typename?: "CreateTagsMutationResponse";
  info: CreateInfo;
  tags: Array<Tag>;
};

export type CreateWalletsMutationResponse = {
  __typename?: "CreateWalletsMutationResponse";
  info: CreateInfo;
  wallets: Array<Wallet>;
};

export type DateTimeAggregateSelectionNonNullable = {
  __typename?: "DateTimeAggregateSelectionNonNullable";
  min: Scalars["DateTime"];
  max: Scalars["DateTime"];
};

export type DeleteInfo = {
  __typename?: "DeleteInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesDeleted: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type Entity = {
  __typename?: "Entity";
  /** TODO: Should this be restricted */
  name?: Maybe<Scalars["String"]>;
  dataAdded: Scalars["DateTime"];
};

export type EntityAggregateSelection = {
  __typename?: "EntityAggregateSelection";
  count: Scalars["Int"];
  name: StringAggregateSelectionNullable;
  dataAdded: DateTimeAggregateSelectionNonNullable;
};

export type IdAggregateSelectionNonNullable = {
  __typename?: "IDAggregateSelectionNonNullable";
  shortest: Scalars["ID"];
  longest: Scalars["ID"];
};

export type Narrative = {
  __typename?: "Narrative";
  uuid: Scalars["ID"];
  dateAdded: Scalars["DateTime"];
  blocks: Array<Block>;
  blocksConnection: NarrativeBlocksConnection;
};

export type NarrativeBlocksArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<BlockWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NarrativeBlocksConnectionArgs = {
  where?: InputMaybe<NarrativeBlocksConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NarrativeAggregateSelection = {
  __typename?: "NarrativeAggregateSelection";
  count: Scalars["Int"];
  uuid: IdAggregateSelectionNonNullable;
  dateAdded: DateTimeAggregateSelectionNonNullable;
};

export type NarrativeBlocksConnection = {
  __typename?: "NarrativeBlocksConnection";
  edges: Array<NarrativeBlocksRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type NarrativeBlocksRelationship = {
  __typename?: "NarrativeBlocksRelationship";
  cursor: Scalars["String"];
  node: Block;
};

export type Note = {
  __typename?: "Note";
  uuid: Scalars["ID"];
  text: Scalars["String"];
  entities: Array<Entity>;
  entitiesAggregate?: Maybe<NoteEntityEntitiesAggregationSelection>;
  tags: Array<Tag>;
  tagsAggregate?: Maybe<NoteTagTagsAggregationSelection>;
  wallet: Wallet;
  walletAggregate?: Maybe<NoteWalletWalletAggregationSelection>;
  entitiesConnection: NoteEntitiesConnection;
  tagsConnection: NoteTagsConnection;
  walletConnection: NoteWalletConnection;
};

export type NoteEntitiesArgs = {
  where?: InputMaybe<EntityWhere>;
  options?: InputMaybe<EntityOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NoteEntitiesAggregateArgs = {
  where?: InputMaybe<EntityWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NoteTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NoteTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NoteWalletArgs = {
  where?: InputMaybe<WalletWhere>;
  options?: InputMaybe<WalletOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NoteWalletAggregateArgs = {
  where?: InputMaybe<WalletWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type NoteEntitiesConnectionArgs = {
  where?: InputMaybe<NoteEntitiesConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<NoteEntitiesConnectionSort>>;
};

export type NoteTagsConnectionArgs = {
  where?: InputMaybe<NoteTagsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<NoteTagsConnectionSort>>;
};

export type NoteWalletConnectionArgs = {
  where?: InputMaybe<NoteWalletConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<NoteWalletConnectionSort>>;
};

export type NoteAggregateSelection = {
  __typename?: "NoteAggregateSelection";
  count: Scalars["Int"];
  uuid: IdAggregateSelectionNonNullable;
  text: StringAggregateSelectionNonNullable;
};

export type NoteEntitiesConnection = {
  __typename?: "NoteEntitiesConnection";
  edges: Array<NoteEntitiesRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type NoteEntitiesRelationship = {
  __typename?: "NoteEntitiesRelationship";
  cursor: Scalars["String"];
  node: Entity;
};

export type NoteEntityEntitiesAggregationSelection = {
  __typename?: "NoteEntityEntitiesAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<NoteEntityEntitiesNodeAggregateSelection>;
};

export type NoteEntityEntitiesNodeAggregateSelection = {
  __typename?: "NoteEntityEntitiesNodeAggregateSelection";
  name: StringAggregateSelectionNullable;
  dataAdded: DateTimeAggregateSelectionNonNullable;
};

export type NoteTagsConnection = {
  __typename?: "NoteTagsConnection";
  edges: Array<NoteTagsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type NoteTagsRelationship = {
  __typename?: "NoteTagsRelationship";
  cursor: Scalars["String"];
  node: Tag;
};

export type NoteTagTagsAggregationSelection = {
  __typename?: "NoteTagTagsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<NoteTagTagsNodeAggregateSelection>;
};

export type NoteTagTagsNodeAggregateSelection = {
  __typename?: "NoteTagTagsNodeAggregateSelection";
  uuid: IdAggregateSelectionNonNullable;
  text: StringAggregateSelectionNonNullable;
  date_added: DateTimeAggregateSelectionNonNullable;
};

export type NoteWalletConnection = {
  __typename?: "NoteWalletConnection";
  edges: Array<NoteWalletRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type NoteWalletRelationship = {
  __typename?: "NoteWalletRelationship";
  cursor: Scalars["String"];
  node: Wallet;
};

export type NoteWalletWalletAggregationSelection = {
  __typename?: "NoteWalletWalletAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<NoteWalletWalletNodeAggregateSelection>;
};

export type NoteWalletWalletNodeAggregateSelection = {
  __typename?: "NoteWalletWalletNodeAggregateSelection";
  address: StringAggregateSelectionNonNullable;
  dateAdded: DateTimeAggregateSelectionNonNullable;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type Prompt = {
  __typename?: "Prompt";
  uuid: Scalars["ID"];
  text?: Maybe<Scalars["String"]>;
  type: PromptType;
  dateAdded: Scalars["DateTime"];
  blocks: Array<Block>;
  blocksConnection: PromptBlocksConnection;
};

export type PromptBlocksArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<BlockWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PromptBlocksConnectionArgs = {
  where?: InputMaybe<PromptBlocksConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PromptAggregateSelection = {
  __typename?: "PromptAggregateSelection";
  count: Scalars["Int"];
  uuid: IdAggregateSelectionNonNullable;
  text: StringAggregateSelectionNullable;
  dateAdded: DateTimeAggregateSelectionNonNullable;
};

export type PromptBlocksConnection = {
  __typename?: "PromptBlocksConnection";
  edges: Array<PromptBlocksRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type PromptBlocksRelationship = {
  __typename?: "PromptBlocksRelationship";
  cursor: Scalars["String"];
  node: Block;
};

export type Response = {
  __typename?: "Response";
  uuid: Scalars["ID"];
  text: Scalars["String"];
  prompt: Prompt;
  promptAggregate?: Maybe<ResponsePromptPromptAggregationSelection>;
  wallet: Wallet;
  walletAggregate?: Maybe<ResponseWalletWalletAggregationSelection>;
  promptConnection: ResponsePromptConnection;
  walletConnection: ResponseWalletConnection;
};

export type ResponsePromptArgs = {
  where?: InputMaybe<PromptWhere>;
  options?: InputMaybe<PromptOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResponsePromptAggregateArgs = {
  where?: InputMaybe<PromptWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResponseWalletArgs = {
  where?: InputMaybe<WalletWhere>;
  options?: InputMaybe<WalletOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResponseWalletAggregateArgs = {
  where?: InputMaybe<WalletWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResponsePromptConnectionArgs = {
  where?: InputMaybe<ResponsePromptConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ResponsePromptConnectionSort>>;
};

export type ResponseWalletConnectionArgs = {
  where?: InputMaybe<ResponseWalletConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ResponseWalletConnectionSort>>;
};

export type ResponseAggregateSelection = {
  __typename?: "ResponseAggregateSelection";
  count: Scalars["Int"];
  uuid: IdAggregateSelectionNonNullable;
  text: StringAggregateSelectionNonNullable;
};

export type ResponsePromptConnection = {
  __typename?: "ResponsePromptConnection";
  edges: Array<ResponsePromptRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ResponsePromptPromptAggregationSelection = {
  __typename?: "ResponsePromptPromptAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ResponsePromptPromptNodeAggregateSelection>;
};

export type ResponsePromptPromptNodeAggregateSelection = {
  __typename?: "ResponsePromptPromptNodeAggregateSelection";
  uuid: IdAggregateSelectionNonNullable;
  text: StringAggregateSelectionNullable;
  dateAdded: DateTimeAggregateSelectionNonNullable;
};

export type ResponsePromptRelationship = {
  __typename?: "ResponsePromptRelationship";
  cursor: Scalars["String"];
  node: Prompt;
};

export type ResponseWalletConnection = {
  __typename?: "ResponseWalletConnection";
  edges: Array<ResponseWalletRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ResponseWalletRelationship = {
  __typename?: "ResponseWalletRelationship";
  cursor: Scalars["String"];
  node: Wallet;
};

export type ResponseWalletWalletAggregationSelection = {
  __typename?: "ResponseWalletWalletAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ResponseWalletWalletNodeAggregateSelection>;
};

export type ResponseWalletWalletNodeAggregateSelection = {
  __typename?: "ResponseWalletWalletNodeAggregateSelection";
  address: StringAggregateSelectionNonNullable;
  dateAdded: DateTimeAggregateSelectionNonNullable;
};

export type StringAggregateSelectionNonNullable = {
  __typename?: "StringAggregateSelectionNonNullable";
  shortest: Scalars["String"];
  longest: Scalars["String"];
};

export type StringAggregateSelectionNullable = {
  __typename?: "StringAggregateSelectionNullable";
  shortest?: Maybe<Scalars["String"]>;
  longest?: Maybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  uuid: Scalars["ID"];
  text: Scalars["String"];
  date_added: Scalars["DateTime"];
};

export type TagAggregateSelection = {
  __typename?: "TagAggregateSelection";
  count: Scalars["Int"];
  uuid: IdAggregateSelectionNonNullable;
  text: StringAggregateSelectionNonNullable;
  date_added: DateTimeAggregateSelectionNonNullable;
};

export type UpdateAccountsMutationResponse = {
  __typename?: "UpdateAccountsMutationResponse";
  info: UpdateInfo;
  accounts: Array<Account>;
};

export type UpdateEntitiesMutationResponse = {
  __typename?: "UpdateEntitiesMutationResponse";
  info: UpdateInfo;
  entities: Array<Entity>;
};

export type UpdateInfo = {
  __typename?: "UpdateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  nodesDeleted: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type UpdateNarrativesMutationResponse = {
  __typename?: "UpdateNarrativesMutationResponse";
  info: UpdateInfo;
  narratives: Array<Narrative>;
};

export type UpdateNotesMutationResponse = {
  __typename?: "UpdateNotesMutationResponse";
  info: UpdateInfo;
  notes: Array<Note>;
};

export type UpdatePromptsMutationResponse = {
  __typename?: "UpdatePromptsMutationResponse";
  info: UpdateInfo;
  prompts: Array<Prompt>;
};

export type UpdateResponsesMutationResponse = {
  __typename?: "UpdateResponsesMutationResponse";
  info: UpdateInfo;
  responses: Array<Response>;
};

export type UpdateTagsMutationResponse = {
  __typename?: "UpdateTagsMutationResponse";
  info: UpdateInfo;
  tags: Array<Tag>;
};

export type UpdateWalletsMutationResponse = {
  __typename?: "UpdateWalletsMutationResponse";
  info: UpdateInfo;
  wallets: Array<Wallet>;
};

export type Wallet = {
  __typename?: "Wallet";
  /** A blockchain wallet address. */
  address: Scalars["String"];
  dateAdded: Scalars["DateTime"];
  blocks: Array<Block>;
  blocksConnection: WalletBlocksConnection;
};

export type WalletBlocksArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<BlockWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type WalletBlocksConnectionArgs = {
  where?: InputMaybe<WalletBlocksConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type WalletAggregateSelection = {
  __typename?: "WalletAggregateSelection";
  count: Scalars["Int"];
  address: StringAggregateSelectionNonNullable;
  dateAdded: DateTimeAggregateSelectionNonNullable;
};

export type WalletBlocksConnection = {
  __typename?: "WalletBlocksConnection";
  edges: Array<WalletBlocksRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type WalletBlocksRelationship = {
  __typename?: "WalletBlocksRelationship";
  cursor: Scalars["String"];
  node: Block;
};

export type AccountCreateInput = {
  profileUrl: Scalars["String"];
};

export type AccountOptions = {
  /** Specify one or more AccountSort objects to sort Accounts by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AccountSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Accounts by. The order in which sorts are applied is not guaranteed when specifying many fields in one AccountSort object. */
export type AccountSort = {
  uuid?: InputMaybe<SortDirection>;
  profileUrl?: InputMaybe<SortDirection>;
};

export type AccountUpdateInput = {
  profileUrl?: InputMaybe<Scalars["String"]>;
};

export type AccountWhere = {
  OR?: InputMaybe<Array<AccountWhere>>;
  AND?: InputMaybe<Array<AccountWhere>>;
  uuid?: InputMaybe<Scalars["ID"]>;
  uuid_NOT?: InputMaybe<Scalars["ID"]>;
  uuid_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  profileUrl?: InputMaybe<Scalars["String"]>;
  profileUrl_NOT?: InputMaybe<Scalars["String"]>;
  profileUrl_IN?: InputMaybe<Array<Scalars["String"]>>;
  profileUrl_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  profileUrl_CONTAINS?: InputMaybe<Scalars["String"]>;
  profileUrl_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  profileUrl_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  profileUrl_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  profileUrl_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  profileUrl_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
};

export type BlockWhere = {
  Note?: InputMaybe<NoteWhere>;
  Response?: InputMaybe<ResponseWhere>;
};

export type EntityConnectWhere = {
  node: EntityWhere;
};

export type EntityCreateInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export type EntityOptions = {
  /** Specify one or more EntitySort objects to sort Entities by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EntitySort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Entities by. The order in which sorts are applied is not guaranteed when specifying many fields in one EntitySort object. */
export type EntitySort = {
  name?: InputMaybe<SortDirection>;
  dataAdded?: InputMaybe<SortDirection>;
};

export type EntityUpdateInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export type EntityWhere = {
  OR?: InputMaybe<Array<EntityWhere>>;
  AND?: InputMaybe<Array<EntityWhere>>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  dataAdded?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_NOT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dataAdded_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dataAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type NarrativeBlocksConnectInput = {
  Note?: InputMaybe<Array<NarrativeBlocksNoteConnectFieldInput>>;
  Response?: InputMaybe<Array<NarrativeBlocksResponseConnectFieldInput>>;
};

export type NarrativeBlocksConnectionWhere = {
  Note?: InputMaybe<NarrativeBlocksNoteConnectionWhere>;
  Response?: InputMaybe<NarrativeBlocksResponseConnectionWhere>;
};

export type NarrativeBlocksConnectOrCreateInput = {
  Note?: InputMaybe<Array<NarrativeBlocksNoteConnectOrCreateFieldInput>>;
  Response?: InputMaybe<
    Array<NarrativeBlocksResponseConnectOrCreateFieldInput>
  >;
};

export type NarrativeBlocksCreateFieldInput = {
  Note?: InputMaybe<Array<NarrativeBlocksNoteCreateFieldInput>>;
  Response?: InputMaybe<Array<NarrativeBlocksResponseCreateFieldInput>>;
};

export type NarrativeBlocksCreateInput = {
  Note?: InputMaybe<NarrativeBlocksNoteFieldInput>;
  Response?: InputMaybe<NarrativeBlocksResponseFieldInput>;
};

export type NarrativeBlocksDeleteInput = {
  Note?: InputMaybe<Array<NarrativeBlocksNoteDeleteFieldInput>>;
  Response?: InputMaybe<Array<NarrativeBlocksResponseDeleteFieldInput>>;
};

export type NarrativeBlocksDisconnectInput = {
  Note?: InputMaybe<Array<NarrativeBlocksNoteDisconnectFieldInput>>;
  Response?: InputMaybe<Array<NarrativeBlocksResponseDisconnectFieldInput>>;
};

export type NarrativeBlocksNoteConnectFieldInput = {
  where?: InputMaybe<NoteConnectWhere>;
  connect?: InputMaybe<Array<NoteConnectInput>>;
};

export type NarrativeBlocksNoteConnectionWhere = {
  OR?: InputMaybe<Array<NarrativeBlocksNoteConnectionWhere>>;
  AND?: InputMaybe<Array<NarrativeBlocksNoteConnectionWhere>>;
  node?: InputMaybe<NoteWhere>;
  node_NOT?: InputMaybe<NoteWhere>;
};

export type NarrativeBlocksNoteConnectOrCreateFieldInput = {
  where: NoteConnectOrCreateWhere;
  onCreate: NarrativeBlocksNoteConnectOrCreateFieldInputOnCreate;
};

export type NarrativeBlocksNoteConnectOrCreateFieldInputOnCreate = {
  node: NoteOnCreateInput;
};

export type NarrativeBlocksNoteCreateFieldInput = {
  node: NoteCreateInput;
};

export type NarrativeBlocksNoteDeleteFieldInput = {
  where?: InputMaybe<NarrativeBlocksNoteConnectionWhere>;
  delete?: InputMaybe<NoteDeleteInput>;
};

export type NarrativeBlocksNoteDisconnectFieldInput = {
  where?: InputMaybe<NarrativeBlocksNoteConnectionWhere>;
  disconnect?: InputMaybe<NoteDisconnectInput>;
};

export type NarrativeBlocksNoteFieldInput = {
  create?: InputMaybe<Array<NarrativeBlocksNoteCreateFieldInput>>;
  connect?: InputMaybe<Array<NarrativeBlocksNoteConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<NarrativeBlocksNoteConnectOrCreateFieldInput>
  >;
};

export type NarrativeBlocksNoteUpdateConnectionInput = {
  node?: InputMaybe<NoteUpdateInput>;
};

export type NarrativeBlocksNoteUpdateFieldInput = {
  where?: InputMaybe<NarrativeBlocksNoteConnectionWhere>;
  update?: InputMaybe<NarrativeBlocksNoteUpdateConnectionInput>;
  connect?: InputMaybe<Array<NarrativeBlocksNoteConnectFieldInput>>;
  disconnect?: InputMaybe<Array<NarrativeBlocksNoteDisconnectFieldInput>>;
  create?: InputMaybe<Array<NarrativeBlocksNoteCreateFieldInput>>;
  delete?: InputMaybe<Array<NarrativeBlocksNoteDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<NarrativeBlocksNoteConnectOrCreateFieldInput>
  >;
};

export type NarrativeBlocksResponseConnectFieldInput = {
  where?: InputMaybe<ResponseConnectWhere>;
  connect?: InputMaybe<Array<ResponseConnectInput>>;
};

export type NarrativeBlocksResponseConnectionWhere = {
  OR?: InputMaybe<Array<NarrativeBlocksResponseConnectionWhere>>;
  AND?: InputMaybe<Array<NarrativeBlocksResponseConnectionWhere>>;
  node?: InputMaybe<ResponseWhere>;
  node_NOT?: InputMaybe<ResponseWhere>;
};

export type NarrativeBlocksResponseConnectOrCreateFieldInput = {
  where: ResponseConnectOrCreateWhere;
  onCreate: NarrativeBlocksResponseConnectOrCreateFieldInputOnCreate;
};

export type NarrativeBlocksResponseConnectOrCreateFieldInputOnCreate = {
  node: ResponseOnCreateInput;
};

export type NarrativeBlocksResponseCreateFieldInput = {
  node: ResponseCreateInput;
};

export type NarrativeBlocksResponseDeleteFieldInput = {
  where?: InputMaybe<NarrativeBlocksResponseConnectionWhere>;
  delete?: InputMaybe<ResponseDeleteInput>;
};

export type NarrativeBlocksResponseDisconnectFieldInput = {
  where?: InputMaybe<NarrativeBlocksResponseConnectionWhere>;
  disconnect?: InputMaybe<ResponseDisconnectInput>;
};

export type NarrativeBlocksResponseFieldInput = {
  create?: InputMaybe<Array<NarrativeBlocksResponseCreateFieldInput>>;
  connect?: InputMaybe<Array<NarrativeBlocksResponseConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<NarrativeBlocksResponseConnectOrCreateFieldInput>
  >;
};

export type NarrativeBlocksResponseUpdateConnectionInput = {
  node?: InputMaybe<ResponseUpdateInput>;
};

export type NarrativeBlocksResponseUpdateFieldInput = {
  where?: InputMaybe<NarrativeBlocksResponseConnectionWhere>;
  update?: InputMaybe<NarrativeBlocksResponseUpdateConnectionInput>;
  connect?: InputMaybe<Array<NarrativeBlocksResponseConnectFieldInput>>;
  disconnect?: InputMaybe<Array<NarrativeBlocksResponseDisconnectFieldInput>>;
  create?: InputMaybe<Array<NarrativeBlocksResponseCreateFieldInput>>;
  delete?: InputMaybe<Array<NarrativeBlocksResponseDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<NarrativeBlocksResponseConnectOrCreateFieldInput>
  >;
};

export type NarrativeBlocksUpdateInput = {
  Note?: InputMaybe<Array<NarrativeBlocksNoteUpdateFieldInput>>;
  Response?: InputMaybe<Array<NarrativeBlocksResponseUpdateFieldInput>>;
};

export type NarrativeConnectInput = {
  blocks?: InputMaybe<NarrativeBlocksConnectInput>;
};

export type NarrativeConnectOrCreateInput = {
  blocks?: InputMaybe<NarrativeBlocksConnectOrCreateInput>;
};

export type NarrativeCreateInput = {
  blocks?: InputMaybe<NarrativeBlocksCreateInput>;
};

export type NarrativeDeleteInput = {
  blocks?: InputMaybe<NarrativeBlocksDeleteInput>;
};

export type NarrativeDisconnectInput = {
  blocks?: InputMaybe<NarrativeBlocksDisconnectInput>;
};

export type NarrativeOptions = {
  /** Specify one or more NarrativeSort objects to sort Narratives by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<NarrativeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type NarrativeRelationInput = {
  blocks?: InputMaybe<NarrativeBlocksCreateFieldInput>;
};

/** Fields to sort Narratives by. The order in which sorts are applied is not guaranteed when specifying many fields in one NarrativeSort object. */
export type NarrativeSort = {
  uuid?: InputMaybe<SortDirection>;
  dateAdded?: InputMaybe<SortDirection>;
};

export type NarrativeUpdateInput = {
  blocks?: InputMaybe<NarrativeBlocksUpdateInput>;
};

export type NarrativeWhere = {
  OR?: InputMaybe<Array<NarrativeWhere>>;
  AND?: InputMaybe<Array<NarrativeWhere>>;
  uuid?: InputMaybe<Scalars["ID"]>;
  uuid_NOT?: InputMaybe<Scalars["ID"]>;
  uuid_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  dateAdded?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_NOT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dateAdded_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dateAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
  blocksConnection?: InputMaybe<NarrativeBlocksConnectionWhere>;
  blocksConnection_NOT?: InputMaybe<NarrativeBlocksConnectionWhere>;
  blocksConnection_ALL?: InputMaybe<NarrativeBlocksConnectionWhere>;
  blocksConnection_NONE?: InputMaybe<NarrativeBlocksConnectionWhere>;
  blocksConnection_SINGLE?: InputMaybe<NarrativeBlocksConnectionWhere>;
  blocksConnection_SOME?: InputMaybe<NarrativeBlocksConnectionWhere>;
};

export type NoteConnectInput = {
  entities?: InputMaybe<Array<NoteEntitiesConnectFieldInput>>;
  tags?: InputMaybe<Array<NoteTagsConnectFieldInput>>;
  wallet?: InputMaybe<NoteWalletConnectFieldInput>;
};

export type NoteConnectOrCreateInput = {
  tags?: InputMaybe<Array<NoteTagsConnectOrCreateFieldInput>>;
  wallet?: InputMaybe<NoteWalletConnectOrCreateFieldInput>;
};

export type NoteConnectOrCreateWhere = {
  node: NoteUniqueWhere;
};

export type NoteConnectWhere = {
  node: NoteWhere;
};

export type NoteCreateInput = {
  text: Scalars["String"];
  entities?: InputMaybe<NoteEntitiesFieldInput>;
  tags?: InputMaybe<NoteTagsFieldInput>;
  wallet?: InputMaybe<NoteWalletFieldInput>;
};

export type NoteDeleteInput = {
  entities?: InputMaybe<Array<NoteEntitiesDeleteFieldInput>>;
  tags?: InputMaybe<Array<NoteTagsDeleteFieldInput>>;
  wallet?: InputMaybe<NoteWalletDeleteFieldInput>;
};

export type NoteDisconnectInput = {
  entities?: InputMaybe<Array<NoteEntitiesDisconnectFieldInput>>;
  tags?: InputMaybe<Array<NoteTagsDisconnectFieldInput>>;
  wallet?: InputMaybe<NoteWalletDisconnectFieldInput>;
};

export type NoteEntitiesAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<NoteEntitiesAggregateInput>>;
  OR?: InputMaybe<Array<NoteEntitiesAggregateInput>>;
  node?: InputMaybe<NoteEntitiesNodeAggregationWhereInput>;
};

export type NoteEntitiesConnectFieldInput = {
  where?: InputMaybe<EntityConnectWhere>;
};

export type NoteEntitiesConnectionSort = {
  node?: InputMaybe<EntitySort>;
};

export type NoteEntitiesConnectionWhere = {
  AND?: InputMaybe<Array<NoteEntitiesConnectionWhere>>;
  OR?: InputMaybe<Array<NoteEntitiesConnectionWhere>>;
  node?: InputMaybe<EntityWhere>;
  node_NOT?: InputMaybe<EntityWhere>;
};

export type NoteEntitiesCreateFieldInput = {
  node: EntityCreateInput;
};

export type NoteEntitiesDeleteFieldInput = {
  where?: InputMaybe<NoteEntitiesConnectionWhere>;
};

export type NoteEntitiesDisconnectFieldInput = {
  where?: InputMaybe<NoteEntitiesConnectionWhere>;
};

export type NoteEntitiesFieldInput = {
  create?: InputMaybe<Array<NoteEntitiesCreateFieldInput>>;
  connect?: InputMaybe<Array<NoteEntitiesConnectFieldInput>>;
};

export type NoteEntitiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NoteEntitiesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NoteEntitiesNodeAggregationWhereInput>>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  dataAdded_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  dataAdded_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type NoteEntitiesUpdateConnectionInput = {
  node?: InputMaybe<EntityUpdateInput>;
};

export type NoteEntitiesUpdateFieldInput = {
  where?: InputMaybe<NoteEntitiesConnectionWhere>;
  update?: InputMaybe<NoteEntitiesUpdateConnectionInput>;
  connect?: InputMaybe<Array<NoteEntitiesConnectFieldInput>>;
  disconnect?: InputMaybe<Array<NoteEntitiesDisconnectFieldInput>>;
  create?: InputMaybe<Array<NoteEntitiesCreateFieldInput>>;
  delete?: InputMaybe<Array<NoteEntitiesDeleteFieldInput>>;
};

export type NoteOnCreateInput = {
  uuid?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
};

export type NoteOptions = {
  /** Specify one or more NoteSort objects to sort Notes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<NoteSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type NoteRelationInput = {
  entities?: InputMaybe<Array<NoteEntitiesCreateFieldInput>>;
  tags?: InputMaybe<Array<NoteTagsCreateFieldInput>>;
  wallet?: InputMaybe<NoteWalletCreateFieldInput>;
};

/** Fields to sort Notes by. The order in which sorts are applied is not guaranteed when specifying many fields in one NoteSort object. */
export type NoteSort = {
  uuid?: InputMaybe<SortDirection>;
  text?: InputMaybe<SortDirection>;
};

export type NoteTagsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<NoteTagsAggregateInput>>;
  OR?: InputMaybe<Array<NoteTagsAggregateInput>>;
  node?: InputMaybe<NoteTagsNodeAggregationWhereInput>;
};

export type NoteTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
};

export type NoteTagsConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type NoteTagsConnectionWhere = {
  AND?: InputMaybe<Array<NoteTagsConnectionWhere>>;
  OR?: InputMaybe<Array<NoteTagsConnectionWhere>>;
  node?: InputMaybe<TagWhere>;
  node_NOT?: InputMaybe<TagWhere>;
};

export type NoteTagsConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere;
  onCreate: NoteTagsConnectOrCreateFieldInputOnCreate;
};

export type NoteTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput;
};

export type NoteTagsCreateFieldInput = {
  node: TagCreateInput;
};

export type NoteTagsDeleteFieldInput = {
  where?: InputMaybe<NoteTagsConnectionWhere>;
};

export type NoteTagsDisconnectFieldInput = {
  where?: InputMaybe<NoteTagsConnectionWhere>;
};

export type NoteTagsFieldInput = {
  create?: InputMaybe<Array<NoteTagsCreateFieldInput>>;
  connect?: InputMaybe<Array<NoteTagsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NoteTagsConnectOrCreateFieldInput>>;
};

export type NoteTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NoteTagsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NoteTagsNodeAggregationWhereInput>>;
  uuid_EQUAL?: InputMaybe<Scalars["ID"]>;
  text_EQUAL?: InputMaybe<Scalars["String"]>;
  text_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  text_GT?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  text_GTE?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  text_LT?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  text_LTE?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  date_added_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  date_added_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  date_added_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  date_added_GT?: InputMaybe<Scalars["DateTime"]>;
  date_added_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  date_added_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  date_added_GTE?: InputMaybe<Scalars["DateTime"]>;
  date_added_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  date_added_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  date_added_LT?: InputMaybe<Scalars["DateTime"]>;
  date_added_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  date_added_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  date_added_LTE?: InputMaybe<Scalars["DateTime"]>;
  date_added_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  date_added_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type NoteTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>;
};

export type NoteTagsUpdateFieldInput = {
  where?: InputMaybe<NoteTagsConnectionWhere>;
  update?: InputMaybe<NoteTagsUpdateConnectionInput>;
  connect?: InputMaybe<Array<NoteTagsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<NoteTagsDisconnectFieldInput>>;
  create?: InputMaybe<Array<NoteTagsCreateFieldInput>>;
  delete?: InputMaybe<Array<NoteTagsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NoteTagsConnectOrCreateFieldInput>>;
};

export type NoteUniqueWhere = {
  uuid?: InputMaybe<Scalars["ID"]>;
};

export type NoteUpdateInput = {
  text?: InputMaybe<Scalars["String"]>;
  entities?: InputMaybe<Array<NoteEntitiesUpdateFieldInput>>;
  tags?: InputMaybe<Array<NoteTagsUpdateFieldInput>>;
  wallet?: InputMaybe<NoteWalletUpdateFieldInput>;
};

export type NoteWalletAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<NoteWalletAggregateInput>>;
  OR?: InputMaybe<Array<NoteWalletAggregateInput>>;
  node?: InputMaybe<NoteWalletNodeAggregationWhereInput>;
};

export type NoteWalletConnectFieldInput = {
  where?: InputMaybe<WalletConnectWhere>;
  connect?: InputMaybe<WalletConnectInput>;
};

export type NoteWalletConnectionSort = {
  node?: InputMaybe<WalletSort>;
};

export type NoteWalletConnectionWhere = {
  AND?: InputMaybe<Array<NoteWalletConnectionWhere>>;
  OR?: InputMaybe<Array<NoteWalletConnectionWhere>>;
  node?: InputMaybe<WalletWhere>;
  node_NOT?: InputMaybe<WalletWhere>;
};

export type NoteWalletConnectOrCreateFieldInput = {
  where: WalletConnectOrCreateWhere;
  onCreate: NoteWalletConnectOrCreateFieldInputOnCreate;
};

export type NoteWalletConnectOrCreateFieldInputOnCreate = {
  node: WalletOnCreateInput;
};

export type NoteWalletCreateFieldInput = {
  node: WalletCreateInput;
};

export type NoteWalletDeleteFieldInput = {
  where?: InputMaybe<NoteWalletConnectionWhere>;
  delete?: InputMaybe<WalletDeleteInput>;
};

export type NoteWalletDisconnectFieldInput = {
  where?: InputMaybe<NoteWalletConnectionWhere>;
  disconnect?: InputMaybe<WalletDisconnectInput>;
};

export type NoteWalletFieldInput = {
  create?: InputMaybe<NoteWalletCreateFieldInput>;
  connect?: InputMaybe<NoteWalletConnectFieldInput>;
  connectOrCreate?: InputMaybe<NoteWalletConnectOrCreateFieldInput>;
};

export type NoteWalletNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NoteWalletNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NoteWalletNodeAggregationWhereInput>>;
  address_EQUAL?: InputMaybe<Scalars["String"]>;
  address_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  address_GT?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  address_GTE?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  address_LT?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  address_LTE?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  dateAdded_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type NoteWalletUpdateConnectionInput = {
  node?: InputMaybe<WalletUpdateInput>;
};

export type NoteWalletUpdateFieldInput = {
  where?: InputMaybe<NoteWalletConnectionWhere>;
  update?: InputMaybe<NoteWalletUpdateConnectionInput>;
  connect?: InputMaybe<NoteWalletConnectFieldInput>;
  disconnect?: InputMaybe<NoteWalletDisconnectFieldInput>;
  create?: InputMaybe<NoteWalletCreateFieldInput>;
  delete?: InputMaybe<NoteWalletDeleteFieldInput>;
  connectOrCreate?: InputMaybe<NoteWalletConnectOrCreateFieldInput>;
};

export type NoteWhere = {
  OR?: InputMaybe<Array<NoteWhere>>;
  AND?: InputMaybe<Array<NoteWhere>>;
  uuid?: InputMaybe<Scalars["ID"]>;
  uuid_NOT?: InputMaybe<Scalars["ID"]>;
  uuid_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
  text_NOT?: InputMaybe<Scalars["String"]>;
  text_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  entities?: InputMaybe<EntityWhere>;
  entities_NOT?: InputMaybe<EntityWhere>;
  entitiesAggregate?: InputMaybe<NoteEntitiesAggregateInput>;
  /** Return Notes where all of the related Entities match this filter */
  entities_ALL?: InputMaybe<EntityWhere>;
  /** Return Notes where none of the related Entities match this filter */
  entities_NONE?: InputMaybe<EntityWhere>;
  /** Return Notes where one of the related Entities match this filter */
  entities_SINGLE?: InputMaybe<EntityWhere>;
  /** Return Notes where some of the related Entities match this filter */
  entities_SOME?: InputMaybe<EntityWhere>;
  tags?: InputMaybe<TagWhere>;
  tags_NOT?: InputMaybe<TagWhere>;
  tagsAggregate?: InputMaybe<NoteTagsAggregateInput>;
  /** Return Notes where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>;
  /** Return Notes where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>;
  /** Return Notes where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>;
  /** Return Notes where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>;
  wallet?: InputMaybe<WalletWhere>;
  wallet_NOT?: InputMaybe<WalletWhere>;
  walletAggregate?: InputMaybe<NoteWalletAggregateInput>;
  entitiesConnection?: InputMaybe<NoteEntitiesConnectionWhere>;
  entitiesConnection_NOT?: InputMaybe<NoteEntitiesConnectionWhere>;
  entitiesConnection_ALL?: InputMaybe<NoteEntitiesConnectionWhere>;
  entitiesConnection_NONE?: InputMaybe<NoteEntitiesConnectionWhere>;
  entitiesConnection_SINGLE?: InputMaybe<NoteEntitiesConnectionWhere>;
  entitiesConnection_SOME?: InputMaybe<NoteEntitiesConnectionWhere>;
  tagsConnection?: InputMaybe<NoteTagsConnectionWhere>;
  tagsConnection_NOT?: InputMaybe<NoteTagsConnectionWhere>;
  tagsConnection_ALL?: InputMaybe<NoteTagsConnectionWhere>;
  tagsConnection_NONE?: InputMaybe<NoteTagsConnectionWhere>;
  tagsConnection_SINGLE?: InputMaybe<NoteTagsConnectionWhere>;
  tagsConnection_SOME?: InputMaybe<NoteTagsConnectionWhere>;
  walletConnection?: InputMaybe<NoteWalletConnectionWhere>;
  walletConnection_NOT?: InputMaybe<NoteWalletConnectionWhere>;
};

export type PromptBlocksConnectInput = {
  Note?: InputMaybe<Array<PromptBlocksNoteConnectFieldInput>>;
  Response?: InputMaybe<Array<PromptBlocksResponseConnectFieldInput>>;
};

export type PromptBlocksConnectionWhere = {
  Note?: InputMaybe<PromptBlocksNoteConnectionWhere>;
  Response?: InputMaybe<PromptBlocksResponseConnectionWhere>;
};

export type PromptBlocksConnectOrCreateInput = {
  Note?: InputMaybe<Array<PromptBlocksNoteConnectOrCreateFieldInput>>;
  Response?: InputMaybe<Array<PromptBlocksResponseConnectOrCreateFieldInput>>;
};

export type PromptBlocksCreateFieldInput = {
  Note?: InputMaybe<Array<PromptBlocksNoteCreateFieldInput>>;
  Response?: InputMaybe<Array<PromptBlocksResponseCreateFieldInput>>;
};

export type PromptBlocksCreateInput = {
  Note?: InputMaybe<PromptBlocksNoteFieldInput>;
  Response?: InputMaybe<PromptBlocksResponseFieldInput>;
};

export type PromptBlocksDeleteInput = {
  Note?: InputMaybe<Array<PromptBlocksNoteDeleteFieldInput>>;
  Response?: InputMaybe<Array<PromptBlocksResponseDeleteFieldInput>>;
};

export type PromptBlocksDisconnectInput = {
  Note?: InputMaybe<Array<PromptBlocksNoteDisconnectFieldInput>>;
  Response?: InputMaybe<Array<PromptBlocksResponseDisconnectFieldInput>>;
};

export type PromptBlocksNoteConnectFieldInput = {
  where?: InputMaybe<NoteConnectWhere>;
  connect?: InputMaybe<Array<NoteConnectInput>>;
};

export type PromptBlocksNoteConnectionWhere = {
  OR?: InputMaybe<Array<PromptBlocksNoteConnectionWhere>>;
  AND?: InputMaybe<Array<PromptBlocksNoteConnectionWhere>>;
  node?: InputMaybe<NoteWhere>;
  node_NOT?: InputMaybe<NoteWhere>;
};

export type PromptBlocksNoteConnectOrCreateFieldInput = {
  where: NoteConnectOrCreateWhere;
  onCreate: PromptBlocksNoteConnectOrCreateFieldInputOnCreate;
};

export type PromptBlocksNoteConnectOrCreateFieldInputOnCreate = {
  node: NoteOnCreateInput;
};

export type PromptBlocksNoteCreateFieldInput = {
  node: NoteCreateInput;
};

export type PromptBlocksNoteDeleteFieldInput = {
  where?: InputMaybe<PromptBlocksNoteConnectionWhere>;
  delete?: InputMaybe<NoteDeleteInput>;
};

export type PromptBlocksNoteDisconnectFieldInput = {
  where?: InputMaybe<PromptBlocksNoteConnectionWhere>;
  disconnect?: InputMaybe<NoteDisconnectInput>;
};

export type PromptBlocksNoteFieldInput = {
  create?: InputMaybe<Array<PromptBlocksNoteCreateFieldInput>>;
  connect?: InputMaybe<Array<PromptBlocksNoteConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<PromptBlocksNoteConnectOrCreateFieldInput>
  >;
};

export type PromptBlocksNoteUpdateConnectionInput = {
  node?: InputMaybe<NoteUpdateInput>;
};

export type PromptBlocksNoteUpdateFieldInput = {
  where?: InputMaybe<PromptBlocksNoteConnectionWhere>;
  update?: InputMaybe<PromptBlocksNoteUpdateConnectionInput>;
  connect?: InputMaybe<Array<PromptBlocksNoteConnectFieldInput>>;
  disconnect?: InputMaybe<Array<PromptBlocksNoteDisconnectFieldInput>>;
  create?: InputMaybe<Array<PromptBlocksNoteCreateFieldInput>>;
  delete?: InputMaybe<Array<PromptBlocksNoteDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<PromptBlocksNoteConnectOrCreateFieldInput>
  >;
};

export type PromptBlocksResponseConnectFieldInput = {
  where?: InputMaybe<ResponseConnectWhere>;
  connect?: InputMaybe<Array<ResponseConnectInput>>;
};

export type PromptBlocksResponseConnectionWhere = {
  OR?: InputMaybe<Array<PromptBlocksResponseConnectionWhere>>;
  AND?: InputMaybe<Array<PromptBlocksResponseConnectionWhere>>;
  node?: InputMaybe<ResponseWhere>;
  node_NOT?: InputMaybe<ResponseWhere>;
};

export type PromptBlocksResponseConnectOrCreateFieldInput = {
  where: ResponseConnectOrCreateWhere;
  onCreate: PromptBlocksResponseConnectOrCreateFieldInputOnCreate;
};

export type PromptBlocksResponseConnectOrCreateFieldInputOnCreate = {
  node: ResponseOnCreateInput;
};

export type PromptBlocksResponseCreateFieldInput = {
  node: ResponseCreateInput;
};

export type PromptBlocksResponseDeleteFieldInput = {
  where?: InputMaybe<PromptBlocksResponseConnectionWhere>;
  delete?: InputMaybe<ResponseDeleteInput>;
};

export type PromptBlocksResponseDisconnectFieldInput = {
  where?: InputMaybe<PromptBlocksResponseConnectionWhere>;
  disconnect?: InputMaybe<ResponseDisconnectInput>;
};

export type PromptBlocksResponseFieldInput = {
  create?: InputMaybe<Array<PromptBlocksResponseCreateFieldInput>>;
  connect?: InputMaybe<Array<PromptBlocksResponseConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<PromptBlocksResponseConnectOrCreateFieldInput>
  >;
};

export type PromptBlocksResponseUpdateConnectionInput = {
  node?: InputMaybe<ResponseUpdateInput>;
};

export type PromptBlocksResponseUpdateFieldInput = {
  where?: InputMaybe<PromptBlocksResponseConnectionWhere>;
  update?: InputMaybe<PromptBlocksResponseUpdateConnectionInput>;
  connect?: InputMaybe<Array<PromptBlocksResponseConnectFieldInput>>;
  disconnect?: InputMaybe<Array<PromptBlocksResponseDisconnectFieldInput>>;
  create?: InputMaybe<Array<PromptBlocksResponseCreateFieldInput>>;
  delete?: InputMaybe<Array<PromptBlocksResponseDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<PromptBlocksResponseConnectOrCreateFieldInput>
  >;
};

export type PromptBlocksUpdateInput = {
  Note?: InputMaybe<Array<PromptBlocksNoteUpdateFieldInput>>;
  Response?: InputMaybe<Array<PromptBlocksResponseUpdateFieldInput>>;
};

export type PromptConnectInput = {
  blocks?: InputMaybe<PromptBlocksConnectInput>;
};

export type PromptConnectOrCreateInput = {
  blocks?: InputMaybe<PromptBlocksConnectOrCreateInput>;
};

export type PromptConnectOrCreateWhere = {
  node: PromptUniqueWhere;
};

export type PromptConnectWhere = {
  node: PromptWhere;
};

export type PromptCreateInput = {
  text?: InputMaybe<Scalars["String"]>;
  type: PromptType;
  blocks?: InputMaybe<PromptBlocksCreateInput>;
};

export type PromptDeleteInput = {
  blocks?: InputMaybe<PromptBlocksDeleteInput>;
};

export type PromptDisconnectInput = {
  blocks?: InputMaybe<PromptBlocksDisconnectInput>;
};

export type PromptOnCreateInput = {
  uuid?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
};

export type PromptOptions = {
  /** Specify one or more PromptSort objects to sort Prompts by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PromptSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type PromptRelationInput = {
  blocks?: InputMaybe<PromptBlocksCreateFieldInput>;
};

/** Fields to sort Prompts by. The order in which sorts are applied is not guaranteed when specifying many fields in one PromptSort object. */
export type PromptSort = {
  uuid?: InputMaybe<SortDirection>;
  text?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
  dateAdded?: InputMaybe<SortDirection>;
};

export type PromptUniqueWhere = {
  uuid?: InputMaybe<Scalars["ID"]>;
};

export type PromptUpdateInput = {
  text?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<PromptType>;
  blocks?: InputMaybe<PromptBlocksUpdateInput>;
};

export type PromptWhere = {
  OR?: InputMaybe<Array<PromptWhere>>;
  AND?: InputMaybe<Array<PromptWhere>>;
  uuid?: InputMaybe<Scalars["ID"]>;
  uuid_NOT?: InputMaybe<Scalars["ID"]>;
  uuid_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
  text_NOT?: InputMaybe<Scalars["String"]>;
  text_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  text_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  text_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  dateAdded?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_NOT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dateAdded_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dateAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
  type?: InputMaybe<PromptType>;
  type_NOT?: InputMaybe<PromptType>;
  type_IN?: InputMaybe<Array<PromptType>>;
  type_NOT_IN?: InputMaybe<Array<PromptType>>;
  blocksConnection?: InputMaybe<PromptBlocksConnectionWhere>;
  blocksConnection_NOT?: InputMaybe<PromptBlocksConnectionWhere>;
  blocksConnection_ALL?: InputMaybe<PromptBlocksConnectionWhere>;
  blocksConnection_NONE?: InputMaybe<PromptBlocksConnectionWhere>;
  blocksConnection_SINGLE?: InputMaybe<PromptBlocksConnectionWhere>;
  blocksConnection_SOME?: InputMaybe<PromptBlocksConnectionWhere>;
};

export type QueryOptions = {
  offset?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type ResponseConnectInput = {
  prompt?: InputMaybe<ResponsePromptConnectFieldInput>;
  wallet?: InputMaybe<ResponseWalletConnectFieldInput>;
};

export type ResponseConnectOrCreateInput = {
  prompt?: InputMaybe<ResponsePromptConnectOrCreateFieldInput>;
  wallet?: InputMaybe<ResponseWalletConnectOrCreateFieldInput>;
};

export type ResponseConnectOrCreateWhere = {
  node: ResponseUniqueWhere;
};

export type ResponseConnectWhere = {
  node: ResponseWhere;
};

export type ResponseCreateInput = {
  text: Scalars["String"];
  prompt?: InputMaybe<ResponsePromptFieldInput>;
  wallet?: InputMaybe<ResponseWalletFieldInput>;
};

export type ResponseDeleteInput = {
  prompt?: InputMaybe<ResponsePromptDeleteFieldInput>;
  wallet?: InputMaybe<ResponseWalletDeleteFieldInput>;
};

export type ResponseDisconnectInput = {
  prompt?: InputMaybe<ResponsePromptDisconnectFieldInput>;
  wallet?: InputMaybe<ResponseWalletDisconnectFieldInput>;
};

export type ResponseOnCreateInput = {
  uuid?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
};

export type ResponseOptions = {
  /** Specify one or more ResponseSort objects to sort Responses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResponseSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ResponsePromptAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ResponsePromptAggregateInput>>;
  OR?: InputMaybe<Array<ResponsePromptAggregateInput>>;
  node?: InputMaybe<ResponsePromptNodeAggregationWhereInput>;
};

export type ResponsePromptConnectFieldInput = {
  where?: InputMaybe<PromptConnectWhere>;
  connect?: InputMaybe<PromptConnectInput>;
};

export type ResponsePromptConnectionSort = {
  node?: InputMaybe<PromptSort>;
};

export type ResponsePromptConnectionWhere = {
  AND?: InputMaybe<Array<ResponsePromptConnectionWhere>>;
  OR?: InputMaybe<Array<ResponsePromptConnectionWhere>>;
  node?: InputMaybe<PromptWhere>;
  node_NOT?: InputMaybe<PromptWhere>;
};

export type ResponsePromptConnectOrCreateFieldInput = {
  where: PromptConnectOrCreateWhere;
  onCreate: ResponsePromptConnectOrCreateFieldInputOnCreate;
};

export type ResponsePromptConnectOrCreateFieldInputOnCreate = {
  node: PromptOnCreateInput;
};

export type ResponsePromptCreateFieldInput = {
  node: PromptCreateInput;
};

export type ResponsePromptDeleteFieldInput = {
  where?: InputMaybe<ResponsePromptConnectionWhere>;
  delete?: InputMaybe<PromptDeleteInput>;
};

export type ResponsePromptDisconnectFieldInput = {
  where?: InputMaybe<ResponsePromptConnectionWhere>;
  disconnect?: InputMaybe<PromptDisconnectInput>;
};

export type ResponsePromptFieldInput = {
  create?: InputMaybe<ResponsePromptCreateFieldInput>;
  connect?: InputMaybe<ResponsePromptConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResponsePromptConnectOrCreateFieldInput>;
};

export type ResponsePromptNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResponsePromptNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResponsePromptNodeAggregationWhereInput>>;
  uuid_EQUAL?: InputMaybe<Scalars["ID"]>;
  text_EQUAL?: InputMaybe<Scalars["String"]>;
  text_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  text_GT?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  text_GTE?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  text_LT?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  text_LTE?: InputMaybe<Scalars["Int"]>;
  text_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  text_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  text_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  dateAdded_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type ResponsePromptUpdateConnectionInput = {
  node?: InputMaybe<PromptUpdateInput>;
};

export type ResponsePromptUpdateFieldInput = {
  where?: InputMaybe<ResponsePromptConnectionWhere>;
  update?: InputMaybe<ResponsePromptUpdateConnectionInput>;
  connect?: InputMaybe<ResponsePromptConnectFieldInput>;
  disconnect?: InputMaybe<ResponsePromptDisconnectFieldInput>;
  create?: InputMaybe<ResponsePromptCreateFieldInput>;
  delete?: InputMaybe<ResponsePromptDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResponsePromptConnectOrCreateFieldInput>;
};

export type ResponseRelationInput = {
  prompt?: InputMaybe<ResponsePromptCreateFieldInput>;
  wallet?: InputMaybe<ResponseWalletCreateFieldInput>;
};

/** Fields to sort Responses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResponseSort object. */
export type ResponseSort = {
  uuid?: InputMaybe<SortDirection>;
  text?: InputMaybe<SortDirection>;
};

export type ResponseUniqueWhere = {
  uuid?: InputMaybe<Scalars["ID"]>;
};

export type ResponseUpdateInput = {
  text?: InputMaybe<Scalars["String"]>;
  prompt?: InputMaybe<ResponsePromptUpdateFieldInput>;
  wallet?: InputMaybe<ResponseWalletUpdateFieldInput>;
};

export type ResponseWalletAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ResponseWalletAggregateInput>>;
  OR?: InputMaybe<Array<ResponseWalletAggregateInput>>;
  node?: InputMaybe<ResponseWalletNodeAggregationWhereInput>;
};

export type ResponseWalletConnectFieldInput = {
  where?: InputMaybe<WalletConnectWhere>;
  connect?: InputMaybe<WalletConnectInput>;
};

export type ResponseWalletConnectionSort = {
  node?: InputMaybe<WalletSort>;
};

export type ResponseWalletConnectionWhere = {
  AND?: InputMaybe<Array<ResponseWalletConnectionWhere>>;
  OR?: InputMaybe<Array<ResponseWalletConnectionWhere>>;
  node?: InputMaybe<WalletWhere>;
  node_NOT?: InputMaybe<WalletWhere>;
};

export type ResponseWalletConnectOrCreateFieldInput = {
  where: WalletConnectOrCreateWhere;
  onCreate: ResponseWalletConnectOrCreateFieldInputOnCreate;
};

export type ResponseWalletConnectOrCreateFieldInputOnCreate = {
  node: WalletOnCreateInput;
};

export type ResponseWalletCreateFieldInput = {
  node: WalletCreateInput;
};

export type ResponseWalletDeleteFieldInput = {
  where?: InputMaybe<ResponseWalletConnectionWhere>;
  delete?: InputMaybe<WalletDeleteInput>;
};

export type ResponseWalletDisconnectFieldInput = {
  where?: InputMaybe<ResponseWalletConnectionWhere>;
  disconnect?: InputMaybe<WalletDisconnectInput>;
};

export type ResponseWalletFieldInput = {
  create?: InputMaybe<ResponseWalletCreateFieldInput>;
  connect?: InputMaybe<ResponseWalletConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResponseWalletConnectOrCreateFieldInput>;
};

export type ResponseWalletNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResponseWalletNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResponseWalletNodeAggregationWhereInput>>;
  address_EQUAL?: InputMaybe<Scalars["String"]>;
  address_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  address_GT?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  address_GTE?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  address_LT?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  address_LTE?: InputMaybe<Scalars["Int"]>;
  address_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  address_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  address_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  dateAdded_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type ResponseWalletUpdateConnectionInput = {
  node?: InputMaybe<WalletUpdateInput>;
};

export type ResponseWalletUpdateFieldInput = {
  where?: InputMaybe<ResponseWalletConnectionWhere>;
  update?: InputMaybe<ResponseWalletUpdateConnectionInput>;
  connect?: InputMaybe<ResponseWalletConnectFieldInput>;
  disconnect?: InputMaybe<ResponseWalletDisconnectFieldInput>;
  create?: InputMaybe<ResponseWalletCreateFieldInput>;
  delete?: InputMaybe<ResponseWalletDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResponseWalletConnectOrCreateFieldInput>;
};

export type ResponseWhere = {
  OR?: InputMaybe<Array<ResponseWhere>>;
  AND?: InputMaybe<Array<ResponseWhere>>;
  uuid?: InputMaybe<Scalars["ID"]>;
  uuid_NOT?: InputMaybe<Scalars["ID"]>;
  uuid_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
  text_NOT?: InputMaybe<Scalars["String"]>;
  text_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  prompt?: InputMaybe<PromptWhere>;
  prompt_NOT?: InputMaybe<PromptWhere>;
  promptAggregate?: InputMaybe<ResponsePromptAggregateInput>;
  wallet?: InputMaybe<WalletWhere>;
  wallet_NOT?: InputMaybe<WalletWhere>;
  walletAggregate?: InputMaybe<ResponseWalletAggregateInput>;
  promptConnection?: InputMaybe<ResponsePromptConnectionWhere>;
  promptConnection_NOT?: InputMaybe<ResponsePromptConnectionWhere>;
  walletConnection?: InputMaybe<ResponseWalletConnectionWhere>;
  walletConnection_NOT?: InputMaybe<ResponseWalletConnectionWhere>;
};

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere;
};

export type TagConnectWhere = {
  node: TagWhere;
};

export type TagCreateInput = {
  text: Scalars["String"];
};

export type TagOnCreateInput = {
  uuid?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
};

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  uuid?: InputMaybe<SortDirection>;
  text?: InputMaybe<SortDirection>;
  date_added?: InputMaybe<SortDirection>;
};

export type TagUniqueWhere = {
  uuid?: InputMaybe<Scalars["ID"]>;
};

export type TagUpdateInput = {
  text?: InputMaybe<Scalars["String"]>;
};

export type TagWhere = {
  OR?: InputMaybe<Array<TagWhere>>;
  AND?: InputMaybe<Array<TagWhere>>;
  uuid?: InputMaybe<Scalars["ID"]>;
  uuid_NOT?: InputMaybe<Scalars["ID"]>;
  uuid_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  uuid_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  uuid_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  uuid_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
  text_NOT?: InputMaybe<Scalars["String"]>;
  text_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  date_added?: InputMaybe<Scalars["DateTime"]>;
  date_added_NOT?: InputMaybe<Scalars["DateTime"]>;
  date_added_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  date_added_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  date_added_LT?: InputMaybe<Scalars["DateTime"]>;
  date_added_LTE?: InputMaybe<Scalars["DateTime"]>;
  date_added_GT?: InputMaybe<Scalars["DateTime"]>;
  date_added_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type WalletBlocksConnectInput = {
  Note?: InputMaybe<Array<WalletBlocksNoteConnectFieldInput>>;
  Response?: InputMaybe<Array<WalletBlocksResponseConnectFieldInput>>;
};

export type WalletBlocksConnectionWhere = {
  Note?: InputMaybe<WalletBlocksNoteConnectionWhere>;
  Response?: InputMaybe<WalletBlocksResponseConnectionWhere>;
};

export type WalletBlocksConnectOrCreateInput = {
  Note?: InputMaybe<Array<WalletBlocksNoteConnectOrCreateFieldInput>>;
  Response?: InputMaybe<Array<WalletBlocksResponseConnectOrCreateFieldInput>>;
};

export type WalletBlocksCreateFieldInput = {
  Note?: InputMaybe<Array<WalletBlocksNoteCreateFieldInput>>;
  Response?: InputMaybe<Array<WalletBlocksResponseCreateFieldInput>>;
};

export type WalletBlocksCreateInput = {
  Note?: InputMaybe<WalletBlocksNoteFieldInput>;
  Response?: InputMaybe<WalletBlocksResponseFieldInput>;
};

export type WalletBlocksDeleteInput = {
  Note?: InputMaybe<Array<WalletBlocksNoteDeleteFieldInput>>;
  Response?: InputMaybe<Array<WalletBlocksResponseDeleteFieldInput>>;
};

export type WalletBlocksDisconnectInput = {
  Note?: InputMaybe<Array<WalletBlocksNoteDisconnectFieldInput>>;
  Response?: InputMaybe<Array<WalletBlocksResponseDisconnectFieldInput>>;
};

export type WalletBlocksNoteConnectFieldInput = {
  where?: InputMaybe<NoteConnectWhere>;
  connect?: InputMaybe<Array<NoteConnectInput>>;
};

export type WalletBlocksNoteConnectionWhere = {
  OR?: InputMaybe<Array<WalletBlocksNoteConnectionWhere>>;
  AND?: InputMaybe<Array<WalletBlocksNoteConnectionWhere>>;
  node?: InputMaybe<NoteWhere>;
  node_NOT?: InputMaybe<NoteWhere>;
};

export type WalletBlocksNoteConnectOrCreateFieldInput = {
  where: NoteConnectOrCreateWhere;
  onCreate: WalletBlocksNoteConnectOrCreateFieldInputOnCreate;
};

export type WalletBlocksNoteConnectOrCreateFieldInputOnCreate = {
  node: NoteOnCreateInput;
};

export type WalletBlocksNoteCreateFieldInput = {
  node: NoteCreateInput;
};

export type WalletBlocksNoteDeleteFieldInput = {
  where?: InputMaybe<WalletBlocksNoteConnectionWhere>;
  delete?: InputMaybe<NoteDeleteInput>;
};

export type WalletBlocksNoteDisconnectFieldInput = {
  where?: InputMaybe<WalletBlocksNoteConnectionWhere>;
  disconnect?: InputMaybe<NoteDisconnectInput>;
};

export type WalletBlocksNoteFieldInput = {
  create?: InputMaybe<Array<WalletBlocksNoteCreateFieldInput>>;
  connect?: InputMaybe<Array<WalletBlocksNoteConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<WalletBlocksNoteConnectOrCreateFieldInput>
  >;
};

export type WalletBlocksNoteUpdateConnectionInput = {
  node?: InputMaybe<NoteUpdateInput>;
};

export type WalletBlocksNoteUpdateFieldInput = {
  where?: InputMaybe<WalletBlocksNoteConnectionWhere>;
  update?: InputMaybe<WalletBlocksNoteUpdateConnectionInput>;
  connect?: InputMaybe<Array<WalletBlocksNoteConnectFieldInput>>;
  disconnect?: InputMaybe<Array<WalletBlocksNoteDisconnectFieldInput>>;
  create?: InputMaybe<Array<WalletBlocksNoteCreateFieldInput>>;
  delete?: InputMaybe<Array<WalletBlocksNoteDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<WalletBlocksNoteConnectOrCreateFieldInput>
  >;
};

export type WalletBlocksResponseConnectFieldInput = {
  where?: InputMaybe<ResponseConnectWhere>;
  connect?: InputMaybe<Array<ResponseConnectInput>>;
};

export type WalletBlocksResponseConnectionWhere = {
  OR?: InputMaybe<Array<WalletBlocksResponseConnectionWhere>>;
  AND?: InputMaybe<Array<WalletBlocksResponseConnectionWhere>>;
  node?: InputMaybe<ResponseWhere>;
  node_NOT?: InputMaybe<ResponseWhere>;
};

export type WalletBlocksResponseConnectOrCreateFieldInput = {
  where: ResponseConnectOrCreateWhere;
  onCreate: WalletBlocksResponseConnectOrCreateFieldInputOnCreate;
};

export type WalletBlocksResponseConnectOrCreateFieldInputOnCreate = {
  node: ResponseOnCreateInput;
};

export type WalletBlocksResponseCreateFieldInput = {
  node: ResponseCreateInput;
};

export type WalletBlocksResponseDeleteFieldInput = {
  where?: InputMaybe<WalletBlocksResponseConnectionWhere>;
  delete?: InputMaybe<ResponseDeleteInput>;
};

export type WalletBlocksResponseDisconnectFieldInput = {
  where?: InputMaybe<WalletBlocksResponseConnectionWhere>;
  disconnect?: InputMaybe<ResponseDisconnectInput>;
};

export type WalletBlocksResponseFieldInput = {
  create?: InputMaybe<Array<WalletBlocksResponseCreateFieldInput>>;
  connect?: InputMaybe<Array<WalletBlocksResponseConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<WalletBlocksResponseConnectOrCreateFieldInput>
  >;
};

export type WalletBlocksResponseUpdateConnectionInput = {
  node?: InputMaybe<ResponseUpdateInput>;
};

export type WalletBlocksResponseUpdateFieldInput = {
  where?: InputMaybe<WalletBlocksResponseConnectionWhere>;
  update?: InputMaybe<WalletBlocksResponseUpdateConnectionInput>;
  connect?: InputMaybe<Array<WalletBlocksResponseConnectFieldInput>>;
  disconnect?: InputMaybe<Array<WalletBlocksResponseDisconnectFieldInput>>;
  create?: InputMaybe<Array<WalletBlocksResponseCreateFieldInput>>;
  delete?: InputMaybe<Array<WalletBlocksResponseDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<WalletBlocksResponseConnectOrCreateFieldInput>
  >;
};

export type WalletBlocksUpdateInput = {
  Note?: InputMaybe<Array<WalletBlocksNoteUpdateFieldInput>>;
  Response?: InputMaybe<Array<WalletBlocksResponseUpdateFieldInput>>;
};

export type WalletConnectInput = {
  blocks?: InputMaybe<WalletBlocksConnectInput>;
};

export type WalletConnectOrCreateInput = {
  blocks?: InputMaybe<WalletBlocksConnectOrCreateInput>;
};

export type WalletConnectOrCreateWhere = {
  node: WalletUniqueWhere;
};

export type WalletConnectWhere = {
  node: WalletWhere;
};

export type WalletCreateInput = {
  address: Scalars["String"];
  blocks?: InputMaybe<WalletBlocksCreateInput>;
};

export type WalletDeleteInput = {
  blocks?: InputMaybe<WalletBlocksDeleteInput>;
};

export type WalletDisconnectInput = {
  blocks?: InputMaybe<WalletBlocksDisconnectInput>;
};

export type WalletOnCreateInput = {
  address?: InputMaybe<Scalars["String"]>;
};

export type WalletOptions = {
  /** Specify one or more WalletSort objects to sort Wallets by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<WalletSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type WalletRelationInput = {
  blocks?: InputMaybe<WalletBlocksCreateFieldInput>;
};

/** Fields to sort Wallets by. The order in which sorts are applied is not guaranteed when specifying many fields in one WalletSort object. */
export type WalletSort = {
  address?: InputMaybe<SortDirection>;
  dateAdded?: InputMaybe<SortDirection>;
};

export type WalletUniqueWhere = {
  address?: InputMaybe<Scalars["String"]>;
};

export type WalletUpdateInput = {
  address?: InputMaybe<Scalars["String"]>;
  blocks?: InputMaybe<WalletBlocksUpdateInput>;
};

export type WalletWhere = {
  OR?: InputMaybe<Array<WalletWhere>>;
  AND?: InputMaybe<Array<WalletWhere>>;
  address?: InputMaybe<Scalars["String"]>;
  address_NOT?: InputMaybe<Scalars["String"]>;
  address_IN?: InputMaybe<Array<Scalars["String"]>>;
  address_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  address_CONTAINS?: InputMaybe<Scalars["String"]>;
  address_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  address_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  address_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  address_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  address_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  dateAdded?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_NOT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dateAdded_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  dateAdded_LT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_LTE?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GT?: InputMaybe<Scalars["DateTime"]>;
  dateAdded_GTE?: InputMaybe<Scalars["DateTime"]>;
  blocksConnection?: InputMaybe<WalletBlocksConnectionWhere>;
  blocksConnection_NOT?: InputMaybe<WalletBlocksConnectionWhere>;
  blocksConnection_ALL?: InputMaybe<WalletBlocksConnectionWhere>;
  blocksConnection_NONE?: InputMaybe<WalletBlocksConnectionWhere>;
  blocksConnection_SINGLE?: InputMaybe<WalletBlocksConnectionWhere>;
  blocksConnection_SOME?: InputMaybe<WalletBlocksConnectionWhere>;
};

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface EntityAggregateSelectionInput {
  count?: boolean;
  name?: StringAggregateInputNullable;
  dataAdded?: DateTimeAggregateInputNonNullable;
}

export declare class EntityModel {
  public find(args?: {
    where?: EntityWhere;

    options?: EntityOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Entity[]>;
  public create(args: {
    input: EntityCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateEntitiesMutationResponse>;
  public update(args: {
    where?: EntityWhere;
    update?: EntityUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateEntitiesMutationResponse>;
  public delete(args: {
    where?: EntityWhere;

    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: EntityWhere;

    aggregate: EntityAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<EntityAggregateSelection>;
}

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface AccountAggregateSelectionInput {
  count?: boolean;
  uuid?: IdAggregateInputNonNullable;
  profileUrl?: StringAggregateInputNonNullable;
}

export declare class AccountModel {
  public find(args?: {
    where?: AccountWhere;

    options?: AccountOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Account[]>;
  public create(args: {
    input: AccountCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateAccountsMutationResponse>;
  public update(args: {
    where?: AccountWhere;
    update?: AccountUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateAccountsMutationResponse>;
  public delete(args: {
    where?: AccountWhere;

    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: AccountWhere;

    aggregate: AccountAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<AccountAggregateSelection>;
}

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface PromptAggregateSelectionInput {
  count?: boolean;
  uuid?: IdAggregateInputNonNullable;
  text?: StringAggregateInputNullable;
  dateAdded?: DateTimeAggregateInputNonNullable;
}

export declare class PromptModel {
  public find(args?: {
    where?: PromptWhere;

    options?: PromptOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Prompt[]>;
  public create(args: {
    input: PromptCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreatePromptsMutationResponse>;
  public update(args: {
    where?: PromptWhere;
    update?: PromptUpdateInput;
    connect?: PromptConnectInput;
    disconnect?: PromptDisconnectInput;
    create?: PromptCreateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdatePromptsMutationResponse>;
  public delete(args: {
    where?: PromptWhere;
    delete?: PromptDeleteInput;
    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: PromptWhere;

    aggregate: PromptAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<PromptAggregateSelection>;
}

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface WalletAggregateSelectionInput {
  count?: boolean;
  address?: StringAggregateInputNonNullable;
  dateAdded?: DateTimeAggregateInputNonNullable;
}

export declare class WalletModel {
  public find(args?: {
    where?: WalletWhere;

    options?: WalletOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Wallet[]>;
  public create(args: {
    input: WalletCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateWalletsMutationResponse>;
  public update(args: {
    where?: WalletWhere;
    update?: WalletUpdateInput;
    connect?: WalletConnectInput;
    disconnect?: WalletDisconnectInput;
    create?: WalletCreateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateWalletsMutationResponse>;
  public delete(args: {
    where?: WalletWhere;
    delete?: WalletDeleteInput;
    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: WalletWhere;

    aggregate: WalletAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<WalletAggregateSelection>;
}

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface TagAggregateSelectionInput {
  count?: boolean;
  uuid?: IdAggregateInputNonNullable;
  text?: StringAggregateInputNonNullable;
  date_added?: DateTimeAggregateInputNonNullable;
}

export declare class TagModel {
  public find(args?: {
    where?: TagWhere;

    options?: TagOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Tag[]>;
  public create(args: {
    input: TagCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTagsMutationResponse>;
  public update(args: {
    where?: TagWhere;
    update?: TagUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTagsMutationResponse>;
  public delete(args: {
    where?: TagWhere;

    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TagWhere;

    aggregate: TagAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TagAggregateSelection>;
}

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface NarrativeAggregateSelectionInput {
  count?: boolean;
  uuid?: IdAggregateInputNonNullable;
  dateAdded?: DateTimeAggregateInputNonNullable;
}

export declare class NarrativeModel {
  public find(args?: {
    where?: NarrativeWhere;

    options?: NarrativeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Narrative[]>;
  public create(args: {
    input: NarrativeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateNarrativesMutationResponse>;
  public update(args: {
    where?: NarrativeWhere;
    update?: NarrativeUpdateInput;
    connect?: NarrativeConnectInput;
    disconnect?: NarrativeDisconnectInput;
    create?: NarrativeCreateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateNarrativesMutationResponse>;
  public delete(args: {
    where?: NarrativeWhere;
    delete?: NarrativeDeleteInput;
    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: NarrativeWhere;

    aggregate: NarrativeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<NarrativeAggregateSelection>;
}

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface NoteAggregateSelectionInput {
  count?: boolean;
  uuid?: IdAggregateInputNonNullable;
  text?: StringAggregateInputNonNullable;
}

export declare class NoteModel {
  public find(args?: {
    where?: NoteWhere;

    options?: NoteOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Note[]>;
  public create(args: {
    input: NoteCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateNotesMutationResponse>;
  public update(args: {
    where?: NoteWhere;
    update?: NoteUpdateInput;
    connect?: NoteConnectInput;
    disconnect?: NoteDisconnectInput;
    create?: NoteCreateInput;
    connectOrCreate?: NoteConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateNotesMutationResponse>;
  public delete(args: {
    where?: NoteWhere;
    delete?: NoteDeleteInput;
    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: NoteWhere;

    aggregate: NoteAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<NoteAggregateSelection>;
}

export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface ResponseAggregateSelectionInput {
  count?: boolean;
  uuid?: IdAggregateInputNonNullable;
  text?: StringAggregateInputNonNullable;
}

export declare class ResponseModel {
  public find(args?: {
    where?: ResponseWhere;

    options?: ResponseOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Response[]>;
  public create(args: {
    input: ResponseCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateResponsesMutationResponse>;
  public update(args: {
    where?: ResponseWhere;
    update?: ResponseUpdateInput;
    connect?: ResponseConnectInput;
    disconnect?: ResponseDisconnectInput;
    create?: ResponseCreateInput;
    connectOrCreate?: ResponseConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateResponsesMutationResponse>;
  public delete(args: {
    where?: ResponseWhere;
    delete?: ResponseDeleteInput;
    context?: any;
    rootValue: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ResponseWhere;

    aggregate: ResponseAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ResponseAggregateSelection>;
}

export interface ModelMap {
  Entity: EntityModel;
  Account: AccountModel;
  Prompt: PromptModel;
  Wallet: WalletModel;
  Tag: TagModel;
  Narrative: NarrativeModel;
  Note: NoteModel;
  Response: ResponseModel;
}
