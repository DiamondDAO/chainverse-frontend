import { Box, HStack } from "@chakra-ui/react";
import React from "react";

export const governanceOverviewSumamryFacts = [
  {
    key: "PROPOSAL PASSED",
    value: "-",
  },
  {
    key: "NEW PROPOSALS",
    value: "-",
  },
  {
    key: "NEW FORUM POSTS",
    value: "-",
  },
];

export const governanceParticipationGraph = [
  {
    title: "VOTER PARTICIPATION RATE",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "NUMBER OF ACTIVE VOTERS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "VOTING POWER CONCENTRATION",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];

export const proposalActivitySummaryFacts = [
  {
    key: "PROPOSALS PASSED",
    value: "-",
  },
  {
    key: "PROPOSALS FAILED",
    value: "-",
  },
  {
    key: "PROPOSALS POSTED",
    value: "-",
  },
  {
    key: "OPEN PROPOSALS",
    value: "-",
  },
  {
    key: "PROPOSALS W/O SPONSORS",
    value: "-",
  },
];

export const governanceProposalActivityFixtures = [
  {
    title: "PROPOSAL PASSED",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "PROPOSAL POSTED",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];

export const governanceProposals = (proposalAmt: number) => {
  return Array.from(Array(proposalAmt).keys()).map((i) => {
    return {
      name: `Proposal -`,
      Y: "",
      N: "",
      timeRemain: "-",
      particaptionRate: "-",
      voteCastPercentage: "-",
      proposalLink: `/link`,
      voters: Array.from(Array(7).keys()).map((i) => ({
        wallet: `-`,
        vote: i % 3 ? "Yes" : "No",
        votes: "",
        votingPower: 0,
      })),
    };
  });
};
export const governanceVotingActivityGraph1 = [
  {
    title: "AVG % VOTER PARTICIPATION",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "AVG % ELIGIBLE VOTES CAST",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];
export const governanceVotingActivityGraph2 = [
  {
    title: "TOTAL NUM. OF VOTERS",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "AVG NUM. VOTERS PER PROPOSAL",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];
export const governanceActiveVotersRows = Array.from(Array(9).keys()).map(
  (i) => ({
    wallet: "-",
    proposalsSubmitted: "-",
    proposalsSponsored: "-",
    proposalsPassed: "-",
    timesVoted: "-",
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
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
  {
    title: "VOTING POWER CONCENTRATION",
    value: "-",
    metric: "N/A COMPARED TO PREV 14D",
  },
];
