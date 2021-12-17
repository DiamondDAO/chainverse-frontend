import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useRef } from "react";
import { DirectoryHeader } from "../../components/DirectoryHeader";
import { DrawerModal } from "../../components/Drawer";
import { GraphGrid } from "../../components/Graph/GraphGrid";
import { Inspector } from "../../components/Inspector";
import { Layout } from "../../components/Layout";
import { List } from "../../components/List";
import { Section } from "../../components/Section";
import { SummaryBanner } from "../../components/SummaryBanner";
import { Table } from "../../components/Table";
import {
  governanceActiveVotersCols,
  governanceActiveVotersRows,
  governanceOverviewSumamryFacts,
  governanceParticipationGraph,
  governanceProposalActivityFixtures,
  governanceProposals,
  governanceVotingActivityGraph1,
  governanceVotingActivityGraph2,
  proposalActivitySummaryFacts,
  votingPowerGraph,
} from "../../fixtures/pages/governance";
import { activityList } from "../../fixtures/pages/overview";
import { useGetGovernanceData } from "./useGetGovernanceData";

const Governance: NextPage = () => {
  const linksArray = [
    { name: "Overview", id: "#overview" },
    { name: "Proposal Activity", id: "#proposal-activity" },
    { name: "Voting Activity", id: "#voting-activity" },
    { name: "Voting Power", id: "#voting-power" },
    { name: "All Activity", id: "#all-activity" },
  ];
  const { isLoading, data } = useGetGovernanceData();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const proposalBtnRef = useRef(undefined);
  return (
    <Layout>
      {isLoading && <div>Loading Dashboard...</div>}{" "}
      <DrawerModal isOpen={isOpen} onClose={onClose} btnRef={proposalBtnRef} />
      {!isLoading && (
        <Grid templateColumns="2fr 5.175fr 1fr">
          <DirectoryHeader
            title={"Governance"}
            links={linksArray}
            description="Explore the governance of your DAO from the inception of ideas in the Forum to the passage of proposals."
          />
          <Box>
            {/* Overview */}
            <Box id="overview">
              <Section
                header="Overview"
                subheader="Summary of participation over the last 14 days."
              >
                <SummaryBanner summaryFacts={data.overviewSummaryFacts} />
                <GraphGrid graphItems={governanceParticipationGraph} />
              </Section>
            </Box>
            <Box id="proposal-activity" mt="90px">
              {/* Proposal Activity */}

              <Section
                header="Proposal Activity"
                subheader="Proposals posted to {DAOHaus / Snapshot} during the selected timeframe."
              >
                <SummaryBanner
                  summaryFacts={data.proposalActivitySummaryFacts}
                  expandable
                  onOpen={onOpen}
                />

                <GraphGrid
                  graphItems={governanceProposalActivityFixtures.map((t) => ({
                    ...t,
                    expandable: true,
                    onOpen,
                  }))}
                />
                <Inspector
                  title={"Proposal Inspector"}
                  data={governanceProposals(4)}
                />
              </Section>
            </Box>
            <Box id="voting-activity" mt="90px">
              {/* Voting Activity */}

              <Section
                header="Voting Activity"
                subheader="Analyze voter participation rates, eligible votes cast, and your voters."
              >
                <GraphGrid graphItems={governanceVotingActivityGraph1} />
                <GraphGrid graphItems={governanceVotingActivityGraph2} />
                <Table<{
                  wallet: string;
                  proposalsSubmitted: string;
                  proposalsSponsored: string;
                  proposalsPassed: string;
                  timesVoted: string;
                }>
                  title={"Active Voters"}
                  columns={governanceActiveVotersCols as any}
                  data={governanceActiveVotersRows}
                />
              </Section>
            </Box>
            <Box id="voting-power" mt="90px">
              {/* Voting Power */}

              <Section
                header="Voting Power"
                subheader="Understand the distribution of power in your organization."
              >
                <GraphGrid graphItems={votingPowerGraph} />
                <Inspector
                  title={"Proposals by Power Brokers"}
                  data={governanceProposals(4)}
                />
              </Section>
            </Box>
            <Box id="all-activity" mt="90px">
              {/* All Activity */}
              <Section header="All Activity">
                <List name="Activity" listItems={activityList} />
              </Section>
            </Box>
          </Box>
        </Grid>
      )}
    </Layout>
  );
};

export default Governance;
