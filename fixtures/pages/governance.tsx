import { Box, HStack } from "@chakra-ui/react";
import React from "react";

export const governanceOverviewSumamryFacts = [
  {
    key: "PROPOSAL PASSED",
    value: "5",
  },
  {
    key: "NEW PROPOSALS",
    value: "7",
  },
  {
    key: "NEW FORUM POSTS",
    value: "7",
  },
];

export const governanceParticipationGraph = [
  {
    title: "VOTER PARTICIPATION RATE",
    value: "16",
    metric: "-32% COMPARED TO PREV 14D",
  },
  {
    title: "NUMBER OF ACTIVE VOTERS",
    value: "40%",
    metric: "-40% COMPARED TO PREV 14D",
  },
  {
    title: "VOTING POWER CONCENTRATION",
    value: "VALUE",
    metric: "-40% COMPARED TO PREV 14D",
  },
];

export const proposalActivitySummaryFacts = [
  {
    key: "PROPOSALS PASSED",
    value: "5",
  },
  {
    key: "PROPOSALS FAILED",
    value: "0",
  },
  {
    key: "PROPOSALS POSTED",
    value: "8",
  },
  {
    key: "OPEN PROPOSALS",
    value: "Value",
  },
  {
    key: "PROPOSALS W/O SPONSORS",
    value: "Value",
  },
];

export const governanceProposalActivityFixtures = [
  {
    title: "PROPOSAL PASSED",
    value: "VALUE",
    metric: "-32% COMPARED TO PREV 14D",
  },
  {
    title: "PROPOSAL POSTED",
    value: "16",
    metric: "-32% COMPARED TO PREV 14D",
  },
];

export const governanceProposals = (proposalAmt: number) => {
  return Array.from(Array(proposalAmt).keys()).map((i) => {
    return {
      name: `Proposal ${i + 1}`,
      Y: Math.round(Math.random() * 100),
      N: Math.round(Math.random() * 100),
      timeRemain: Math.round(Math.random() * 36),
      particaptionRate: Math.round(Math.random() * 100),
      voteCastPercentage: Math.round(Math.random() * 100),
      proposalLink: `/link`,
      voters: Array.from(Array(7).keys()).map((i) => ({
        wallet: `0x1234561234123434`,
        vote: i % 3 ? "Yes" : "No",
        votes: "55%",
        votingPower: 1,
      })),
    };
  });
};
export const governanceVotingActivityGraph1 = [
  {
    title: "AVG % VOTER PARTICIPATION",
    value: "8%",
    metric: "-32% COMPARED TO PREV 14D",
  },
  {
    title: "AVG % ELIGIBLE VOTES CAST",
    value: "16",
    metric: "-32% COMPARED TO PREV 14D",
  },
];
export const governanceVotingActivityGraph2 = [
  {
    title: "TOTAL NUM. OF VOTERS",
    value: "VALUE",
    metric: "-32% COMPARED TO PREV 14D",
  },
  {
    title: "AVG NUM. VOTERS PER PROPOSAL",
    value: "16",
    metric: "-32% COMPARED TO PREV 14D",
  },
];
export const governanceActiveVotersRows = Array.from(Array(9).keys()).map(
  (i) => ({
    wallet: "wallet.eth",
    proposalsSubmitted: "4",
    proposalsSponsored: "3",
    proposalsPassed: "1",
    timesVoted: "12",
  })
);
export const governanceActiveVotersCols = [
  {
    Header: "Wallet",
    accessor: "wallet",
    Cell: ({ cell: { value } }: { cell: any }) => (
      <Box color="diamond.link">{value}</Box>
    ),
  },
  {
    Header: "Proposals Submitted",
    accessor: "proposalsSubmitted",
  },
  {
    Header: "Proposals Sponsored",
    accessor: "proposalsSponsored",
  },
  {
    Header: "Proposals Passed",
    accessor: "proposalsPassed",
  },
  {
    Header: "Times Voted",
    accessor: "timesVoted",
  },
];
export const votingPowerGraph = [
  {
    title: "MINIMUM VOTING COALITION",
    value: "6 Power Brokers",
    metric: "61% COMPARED TO PREV 14D",
  },
  {
    title: "VOTING POWER CONCENTRATION",
    value: "VALUE",
    metric: "-40% COMPARED TO PREV 14D",
  },
];
