import { Box, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { useGetDaoParticipation } from "../../common/hooks/api/useGetDaoParticipation";
import { DirectoryHeader } from "../../components/DirectoryHeader";
import { GraphGrid } from "../../components/Graph/GraphGrid";
import { Layout } from "../../components/Layout";
import { Section } from "../../components/Section";
import { SummaryBanner } from "../../components/SummaryBanner";
import { Table } from "../../components/Table";
import {
  activeSpaces,
  activeSpacesData,
  allActiveMembers,
  allActiveMembersData,
  newMemberColumns,
  newMemberData,
  newMemberSummaryFacts,
  participationMemberGraphFixtures,
  participationNewMemberGraphFixtures,
  participationOverviewGraphFixtures,
  participationOverviewSummaryFacts,
  participationRetentionGraphs,
} from "../../fixtures/pages/participation";
import { useGetParticipationData } from "./useGetParticipationData";

const Participation: NextPage = () => {
  const linksArray = [
    { name: "Overview", id: "#overview" },
    { name: "New Members", id: "#new-members" },
    { name: "Member Activity", id: "#member-activity" },
    { name: "Retention", id: "#retention" },
  ];
  const { isLoading, data } = useGetParticipationData();

  return (
    <Layout>
      {isLoading && <div>Loading Dashboard...</div>}
      {!isLoading && (
        <Grid templateColumns="2fr 5.175fr 1fr">
          <DirectoryHeader
            title={"Participation"}
            links={linksArray}
            description="Description..."
          />
          <Box>
            {/* Overview */}
            <Box id="overview">
              <Section
                header="Overview"
                subheader="Summary of participation over the last 14 days."
              >
                <SummaryBanner summaryFacts={data.overviewSummaryFacts} />
                <GraphGrid graphItems={data.overviewGraph} />
              </Section>
            </Box>
            <Box id="new-members" mt="90px">
              {/* New Members */}

              <Section
                header="New Members"
                subheader="Everyone who joined your community"
              >
                <SummaryBanner summaryFacts={data.newMembersSummaryFacts} />

                <GraphGrid graphItems={data.newMemberGraph} />

                <Table<{
                  memberAddress: string;
                  activated: string;
                  activeDaos: number;
                  discordRoles: string[];
                  totalActivity: string;
                  joinDate: string;
                }>
                  title={"New Members"}
                  columns={newMemberColumns as any}
                  data={newMemberData}
                />
              </Section>
            </Box>
            <Box id="member-activity" mt="90px">
              {/* Member Activity */}
              <Section
                header="Member Activity"
                subheader="Analyze active members in your organization"
              >
                <GraphGrid graphItems={data.memberActivityGraph} />
                <Table<{
                  member: string;
                  discordRoles: string[];
                  voting: string;
                  forum: string;
                  discord: string;
                }>
                  title={"All Active Members"}
                  columns={allActiveMembers as any}
                  data={allActiveMembersData}
                />
                <Table<{
                  title: string;
                  source: string;
                  participants: string;
                  activity: string;
                  link: string;
                }>
                  title={"Active Spaces"}
                  columns={activeSpaces as any}
                  data={activeSpacesData}
                />
              </Section>
            </Box>
            <Box id="retention" mt="90px">
              {/*  Retention */}
              <Section
                header="Retention"
                subheader="Understand the distribution of power in your organization."
              >
                <GraphGrid graphItems={participationRetentionGraphs} />
                <Table<{
                  member: string;
                  discordRoles: string[];
                  voting: string;
                  forum: string;
                  discord: string;
                }>
                  title={"All Active Members"}
                  columns={allActiveMembers as any}
                  data={allActiveMembersData}
                />
              </Section>
            </Box>
          </Box>
        </Grid>
      )}
    </Layout>
  );
};

export default Participation;