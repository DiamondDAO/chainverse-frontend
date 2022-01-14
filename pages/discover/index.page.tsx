import {
  Box,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { DAOExplorer } from "../../components/DaoExplorer";
import { SearchIcon } from "@chakra-ui/icons";
import { Layout } from "../../components/Layout";
import { Assets, DAOData, Socials } from "../../common/types";
import Fuse from "fuse.js";

const data = [
  {
    name: "Diamond DAO",
    members: 15,
    type: ["product", "dapp"],
    summoned: "2021-07-21",
    impactAreas: [
      "Discover New DAOS",
      "Discover Collaborators",
      "Curate to Earn",
    ],
    description: `Diamond DAO mission is to transform community knowledge into actionable insights.
    Diamond DAO is beginning with Chainverse, a tool to connect Web3 communities and their members with curated knowledge and analysis.`,
    network: "xDAI",
    memberRequirements: "",
    successStories: "",
    investableAssets: [
      { type: Assets.ERC20, address: "" },
      { type: Assets.ERC721, address: "" },
    ],
    investDirections: "",
    social: [
      { type: Socials.Twitter, link: "" },
      { type: Socials.Discord, link: "" },
      { type: Socials.Website, link: "" },
      { type: Socials.DaoHAUS, link: "" },
      { type: Socials.Documentation, link: "" },
    ],
  },
  {
    name: "The Origins",
    members: 131,
    image:
      "https://daohaus.mypinata.cloud/ipfs/QmayfBynszyETRRu2eS9fSwEiJP3YjNBd8wNTmDPFjgu2H",
    type: ["NFT"],
    summoned: "",
    impactAreas: [],
    description: `on-chain space & time coordinates for use in decentralized applications, games, and generative art.`,
    network: "Mainnet",
    memberRequirements: "",
    successStories: "",
    investableAssets: [{ type: Assets.ERC721, address: "" }],
    investDirections: "",
    social: [
      { type: Socials.Twitter, link: "" },
      { type: Socials.Discord, link: "https://discord.gg/8AdpmhDKzr" },
      {
        type: Socials.DaoHAUS,
        link: "https://app.daohaus.club/dao/0x89/0xbdc5e0fb790672523c4977471ab5a28dbcd7d3a4",
      },
    ],
  },
  {
    name: "Raid Guild",
    members: 137,
    image:
      "https://daohaus.mypinata.cloud/ipfs/QmZ24prBMemP2zLPZs5GzSwhMnZ18F2ssny6uhTxMmZBVa",
    type: ["Guilds", "Service"],
    summoned: "",
    impactAreas: [],
    description: `slaying your web3 product demons`,
    network: "xDAI",
    memberRequirements: "",
    successStories: "",
    investableAssets: [
      { type: Assets.ERC20, address: "" },
      { type: Assets.ERC721, address: "" },
    ],
    investDirections: "",
    social: [
      { type: Socials.Twitter, link: "https://twitter.com/@raidguild" },
      { type: Socials.Discord, link: "https://discord.com/invite/rGFpfQf" },
      { type: Socials.Website, link: "https://www.raidguild.org/" },
    ],
  },
  {
    name: "MetaCartel Ventures",
    members: 72,
    image:
      "https://gateway.pinata.cloud/ipfs/QmZN7Pn2fJWgRbrBp6VrYAobUsuTQ5hT4oqFwUno1cGQEt",
    type: ["Guilds", "Service"],
    summoned: "",
    impactAreas: [],
    description: `MetaCartel Ventures (Venture DAO) is a for-profit DAO created by the MetaCartel community for the purposes of making investments into early-stage Decentralized Applications (DApps).`,
    network: "xDAI",
    memberRequirements: "",
    successStories: "",
    investableAssets: [
      { type: Assets.ERC20, address: "" },
      { type: Assets.ERC721, address: "" },
    ],
    investDirections: "",
    social: [
      { type: Socials.Twitter, link: "" },
      { type: Socials.Discord, link: "" },
      { type: Socials.Website, link: "" },
      {
        type: Socials.Documentation,
        link: " https://github.com/metacartel/MCV/wiki",
      },
    ],
  },
  {
    name: "DeFi Omega",
    members: 22,
    type: ["Investment"],
    summoned: "",
    impactAreas: [],
    description: `DeFi Omega is a global network of individuals in decentralized finance, with common goals, values, and objectives.`,
    network: "Mainnet",
    memberRequirements: "",
    successStories: "",
    investableAssets: [
      { type: Assets.ERC20, address: "" },
      { type: Assets.ERC721, address: "" },
    ],
    investDirections: "",
    social: [
      { type: Socials.Twitter, link: "https://twitter.com/DefiOmega" },
      { type: Socials.Discord, link: "" },
      { type: Socials.Website, link: "https://defiomega.com/" },
    ],
  },
  {
    name: "Hero DAO",
    members: 30,
    image:
      "https://daohaus.mypinata.cloud/ipfs/QmPF9gGxECQ8pZBrGhcAxsbKsNktQcoJgYh6v7LtQWZA9L",
    type: ["Media"],
    summoned: "",
    impactAreas: [],
    description: `An organization focused on creating, printing, distributing, selling, merchandising, and reviving comic book super heroes who have fallen into the public domain.`,
    network: "XDAI",
    memberRequirements: "",
    successStories: "",
    investableAssets: [
      { type: Assets.ERC20, address: "" },
      { type: Assets.ERC721, address: "" },
    ],
    investDirections: "",
    social: [
      { type: Socials.Twitter, link: "https://twitter.com/@hero_dao" },
      { type: Socials.Discord, link: "https://discord.gg/nzgQHaK5WZ" },
    ],
  },
];

const Discover: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchText);
  const [filteredData, setFilteredData] = useState<DAOData[]>(data);
  const searchData = useMemo(
    () =>
      data &&
      new Fuse(data, {
        threshold: 0.2,
        includeScore: false,
        keys: ["name", "network", "type"],
      }),
    [data]
  );

  useEffect(() => {
    if (searchText !== "") {
      setFilteredData(searchData.search(searchText).map((i) => i.item));
    } else {
      setFilteredData(data);
    }
  }, [searchText, data]);
  useEffect(() => {
    const timer = setTimeout(() => setSearchText(debouncedTerm), 200);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  const fuse = new Fuse(data);

  return (
    <Layout>
      <Box display="flex" justifyContent="center">
        <Heading>Explore Chainverse</Heading>
      </Box>
      <Box mx="100px" my="30px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            fontWeight="400"
            value={debouncedTerm}
            onChange={(e) => setDebouncedTerm(e.target.value)}
            placeholder="Search for DAO"
          />
        </InputGroup>
      </Box>
      <Box>
        <DAOExplorer title={"Results"} data={filteredData} height="700px" />
      </Box>
    </Layout>
  );
};

export default Discover;
