import { Box, HStack } from "@chakra-ui/react";
import React from "react";

export const participationOverviewSummaryFacts = [
  {
    key: "ACTIVATED MEMBERS",
    value: "50",
  },
  {
    key: "TOTAL MEMBERS",
    value: "140",
  },
];

export const participationOverviewGraphFixtures = [
  {
    title: "TOTAL NEW MEMBERS",
    value: "16",
    metric: "+40% COMPARED TO PREV 7D",
  },
  {
    title: "ACTIVATION RATE",
    value: "40%",
    metric: "+18% COMPARED TO PREV 7D",
  },
  {
    title: "TOTAL DROPOFF %",
    value: "40%",
    metric: "-18% COMPARED TO PREV 7D",
  },
];

export const newMemberSummaryFacts = [
  {
    key: "MEMBERS WITH FIRST PROPOSAL INTERACTION",
    value: "50",
  },
  {
    key: "MEMBERS WITH FIRST FORUM POST",
    value: "140",
  },
  {
    key: "MEMBERS WITH FIRST DISCORD POST",
    value: "140",
  },
  {
    key: "TOTAL ACTIVATED MEMBERS",
    value: "140",
  },
  {
    key: "TOTAL NEW MEMBERS",
    value: "140",
  },
];

export const participationNewMemberGraphFixtures = [
  {
    title: "ACTIVATION RATE",
    value: "40%",
    metric: "+18% COMPARED TO PREV 7D",
  },
  {
    title: "TOTAL NEW MEMBERS",
    value: "16",
    metric: "+40% COMPARED TO PREV 7D",
  },
];

export const newMemberData = [
  {
    memberAddress: "wallet.eth",
    activated: "Yes",
    activeDaos: 3,
    discordRoles: ["admin", "core"],
    totalActivity: "1 interaction",
    joinDate: "Data",
  },
  {
    memberAddress: "wallet.eth",
    activated: "No",
    activeDaos: 3,
    discordRoles: ["admin", "core"],
    totalActivity: "150 interactions ",
    joinDate: "Data",
  },
  {
    memberAddress: "wallet.eth",
    activated: "Yes",
    activeDaos: 5,
    discordRoles: ["admin", "core"],
    totalActivity: "12 interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "wallet.eth",
    activated: "Yes",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "34 interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "wallet.eth",
    activated: "No",
    activeDaos: 2,
    discordRoles: ["admin", "core"],
    totalActivity: "10 interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "wallet.eth",
    activated: "Yes",
    activeDaos: 3,
    discordRoles: ["admin", "core"],
    totalActivity: "14 interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "wallet.eth",
    activated: "Yes",
    activeDaos: 3,
    discordRoles: ["admin", "core"],
    totalActivity: "12 interactions",
    joinDate: "Data",
  },
];
export const newMemberColumns = [
  {
    Header: "Member Address",
    accessor: "memberAddress",
    Cell: ({ cell: { value } }: { cell: any }) => (
      <Box color="diamond.link">{value}</Box>
    ),
  },
  {
    Header: "Activated?",
    accessor: "activated",
  },
  {
    Header: "Active DAOs",
    accessor: "activeDaos",
  },
  {
    Header: "Discord Roles",
    accessor: "discordRoles",
    Cell: ({ cell: { value } }: { cell: any }) => {
      return (
        <HStack>
          {value.map((item: string) => (
            <Box bg="diamond.gray.1" p="3px" borderRadius="3px" fontSize="xs">
              {item}
            </Box>
          ))}
        </HStack>
      );
    },
  },
  {
    Header: "Total Activity",
    accessor: "totalActivity",
  },
  {
    Header: "Join date",
    accessor: "joinDate",
  },
];
export const participationMemberGraphFixtures1 = [
  {
    title: "TOTAL PROPOSAL INTERACTIONS",
    value: "5",
    metric: "+20% COMPARED TO PREV 7D",
  },
  {
    title: "TOTAL FORUM INTERACTIONS",
    value: "16",
    metric: "-12.5% COMPARED TO PREV 7D",
  },
  {
    title: "TOTAL DISCORD MEMBERS",
    value: "140",
    metric: "-40% COMPARED TO PREV 7D",
  },
];
export const participationMemberGraphFixtures2 = [
  {
    title: "MEMBERS WITH PROPOSAL INTERACTIONS",
    value: "5",
    metric: "+20% COMPARED TO PREV 7D",
  },
  {
    title: "MEMBERS WITH FORUM INTERACTIONS",
    value: "16",
    metric: "-12.5% COMPARED TO PREV 7D",
  },
  {
    title: "MEMBERS WITH DISCORD ACTIVITY",
    value: "140",
    metric: "-40% COMPARED TO PREV 7D",
  },
];

export const allActiveMembersData = [
  {
    member: "wallet.eth",
    discordRoles: ["admin", "core"],
    voting: "1 interaction",
    forum: "1 interaction",
    discord: "12 posts",
  },
  {
    member: "wallet.eth",
    discordRoles: ["admin", "core"],
    voting: "1 interaction",
    forum: "1 interaction",
    discord: "12 posts",
  },
  {
    member: "wallet.eth",
    discordRoles: ["admin", "core"],
    voting: "1 interaction",
    forum: "1 interaction",
    discord: "12 posts",
  },
  {
    member: "wallet.eth",
    discordRoles: ["admin", "core"],
    voting: "1 interaction",
    forum: "1 interaction",
    discord: "12 posts",
  },
  {
    member: "wallet.eth",
    discordRoles: ["admin", "core"],
    voting: "1 interaction",
    forum: "1 interaction",
    discord: "12 posts",
  },
  {
    member: "wallet.eth",
    discordRoles: ["admin", "core"],
    voting: "1 interaction",
    forum: "1 interaction",
    discord: "12 posts",
  },
  {
    member: "wallet.eth",
    discordRoles: ["admin", "core"],
    voting: "1 interaction",
    forum: "1 interaction",
    discord: "12 posts",
  },
];
export const allActiveMembers = [
  {
    Header: "Member",
    accessor: "member",
    Cell: ({ cell: { value } }: { cell: any }) => (
      <Box color="diamond.link">{value}</Box>
    ),
  },
  {
    Header: "Discord Roles",
    accessor: "discordRoles",
    Cell: ({ cell: { value } }: { cell: any }) => {
      return (
        <HStack>
          {value.map((item: string) => (
            <Box bg="diamond.gray.1" p="3px" borderRadius="3px" fontSize="xs">
              {item}
            </Box>
          ))}
        </HStack>
      );
    },
  },
  {
    Header: "Voting",
    accessor: "voting",
  },
  {
    Header: "Forum",
    accessor: "forum",
  },
  {
    Header: "Discord",
    accessor: "discord",
  },
];
export const activeSpacesData = [
  {
    title: "Thread title",
    source: "Forum",
    participants: "4 interactions",
    activity: "4 interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "Discord",
    participants: "4 interactions",
    activity: "4 interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "Forum",
    participants: "4 interactions",
    activity: "4 interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "DAOHaus",
    participants: "4 interactions",
    activity: "4 interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "Forum",
    participants: "4 interactions",
    activity: "4 interactions",
    link: "Open",
  },
];
export const activeSpaces = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Source",
    accessor: "source",
  },
  {
    Header: "Participants",
    accessor: "participants",
  },
  {
    Header: "Activity",
    accessor: "activity",
  },
  {
    Header: "Link",
    accessor: "link",
    Cell: ({ cell: { value } }: { cell: any }) => (
      <Box color="diamond.link">{value}</Box>
    ),
  },
];
export const participationRetentionGraphs = [
  {
    title: "NEW MEMBER DROPOFF %",
    value: "65%",
    metric: "+20% COMPARED TO PREV 7D",
    reverseSign: true,
  },
  {
    title: "ACTIVATED MEMBER DROPOFF %",
    value: "12%",
    metric: "-12.5% COMPARED TO PREV 7D",
    reverseSign: true,
  },
  {
    title: "TOTAL DROPOFF %",
    value: "22%",
    metric: "+20% COMPARED TO PREV 7D",
    reverseSign: true,
  },
];
