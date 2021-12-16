import { Box, HStack } from "@chakra-ui/react";
import React from "react";

export const participationOverviewSummaryFacts = [
  {
    key: "ACTIVATED MEMBERS",
    value: "-",
  },
  {
    key: "TOTAL MEMBERS",
    value: "-",
  },
];

export const participationOverviewGraphFixtures = [
  {
    title: "TOTAL NEW MEMBERS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "ACTIVATION RATE",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "TOTAL DROPOFF %",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];

export const newMemberSummaryFacts = [
  {
    key: "MEMBERS WITH FIRST PROPOSAL INTERACTION",
    value: "-",
  },
  {
    key: "MEMBERS WITH FIRST FORUM POST",
    value: "-",
  },
  {
    key: "MEMBERS WITH FIRST DISCORD POST",
    value: "-",
  },
  {
    key: "TOTAL ACTIVATED MEMBERS",
    value: "-",
  },
  {
    key: "TOTAL NEW MEMBERS",
    value: "-",
  },
];

export const participationNewMemberGraphFixtures = [
  {
    title: "ACTIVATION RATE",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "TOTAL NEW MEMBERS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];

export const newMemberData = [
  {
    memberAddress: "-",
    activated: "-",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "- interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "-",
    activated: "-",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "- interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "-",
    activated: "-",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "- interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "-",
    activated: "-",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "- interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "-",
    activated: "-",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "- interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "-",
    activated: "-",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "- interactions",
    joinDate: "Data",
  },
  {
    memberAddress: "-",
    activated: "-",
    activeDaos: 0,
    discordRoles: ["admin", "core"],
    totalActivity: "- interactions",
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
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "TOTAL FORUM INTERACTIONS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "TOTAL DISCORD MEMBERS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];
export const participationMemberGraphFixtures2 = [
  {
    title: "MEMBERS WITH PROPOSAL INTERACTIONS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "MEMBERS WITH FORUM INTERACTIONS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "MEMBERS WITH DISCORD ACTIVITY",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];

export const allActiveMembersData = [
  {
    member: "-",
    discordRoles: ["admin", "core"],
    voting: "- interaction",
    forum: "- interaction",
    discord: "- posts",
  },
  {
    member: "-",
    discordRoles: ["admin", "core"],
    voting: "- interaction",
    forum: "- interaction",
    discord: "- posts",
  },
  {
    member: "-",
    discordRoles: ["admin", "core"],
    voting: "- interaction",
    forum: "- interaction",
    discord: "- posts",
  },
  {
    member: "-",
    discordRoles: ["admin", "core"],
    voting: "- interaction",
    forum: "- interaction",
    discord: "- posts",
  },
  {
    member: "-",
    discordRoles: ["admin", "core"],
    voting: "- interaction",
    forum: "- interaction",
    discord: "- posts",
  },
  {
    member: "-",
    discordRoles: ["admin", "core"],
    voting: "- interaction",
    forum: "- interaction",
    discord: "- posts",
  },
  {
    member: "-",
    discordRoles: ["admin", "core"],
    voting: "- interaction",
    forum: "- interaction",
    discord: "- posts",
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
    participants: "- interactions",
    activity: "- interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "Discord",
    participants: "- interactions",
    activity: "- interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "Forum",
    participants: "- interactions",
    activity: "- interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "DAOHaus",
    participants: "- interactions",
    activity: "- interactions",
    link: "Open",
  },
  {
    title: "Thread title",
    source: "Forum",
    participants: "- interactions",
    activity: "- interactions",
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
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
    reverseSign: true,
  },
  {
    title: "ACTIVATED MEMBER DROPOFF %",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
    reverseSign: true,
  },
  {
    title: "TOTAL DROPOFF %",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
    reverseSign: true,
  },
];
