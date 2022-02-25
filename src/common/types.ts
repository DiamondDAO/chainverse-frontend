export enum Socials {
  Twitter = "twitter",
  Discord = "discord",
  Website = "website",
  DaoHAUS = "dauhaus",
  Snapshot = "snapshot",
  Documentation = "documentation",
}

export enum Assets {
  ERC20 = "ERC-20",
  ERC721 = "ERC-721",
}

export type InvestableAssets = { type: Assets; address: string }[];

export type SocialType = { type: Socials; link: string }[];

export type PreferenceData = {
  activeSince: string;
  purpose: string[];
  interests: string[];
};

export type DAOData = {
  name: string;
  members: number;
  image?: string;
  type: string[];
  summoned: string;
  impactAreas: string[];
  description: string;
  network: string;
  memberRequirements: string;
  successStories: string;
  investableAssets: InvestableAssets;
  investDirections: string;
  social: SocialType;
};
