export enum Socials {
  Twitter = "twitter",
  Discord = "discord",
  Website = "website",
  DaoHAUS = "dauhaus",
  Snapshot = "snapshot",
  Documentation = "documentation",
}

export enum IconVariants {
  Default = "default",
  White = "white",
  Black = "black",
}

export enum AddWorkspaceType {
  Workspace = "Workspace",
  Sandbox = "Sandbox",
}

export type Block = {
  uuid: string;
  __typename: string;
};
