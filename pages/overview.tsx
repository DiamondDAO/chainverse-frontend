import { Box, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { DirectoryHeader } from "../components/DirectoryHeader";
import { GraphGrid } from "../components/Graph/GraphGrid";
import { Layout } from "../components/Layout";
import { List } from "../components/List";
import { Properties } from "../components/Properties";
import { Section } from "../components/Section";
import { SummaryBanner } from "../components/SummaryBanner";
import {
  activityList,
  activitySummaryFacts,
  linksProperties,
  overviewGraphFixtures,
  overviewSummaryFacts,
} from "../fixtures/pages/overview";

const Overview: NextPage = () => {
  const linksArray = [
    { name: "Overview", id: "#overview" },
    { name: "All Activity", id: "#activity" },
    { name: "Links", id: "#links" },
  ];
  return (
    <Layout>
      <Grid templateColumns="2fr 5.175fr 1fr">
        <DirectoryHeader title="Overview" links={linksArray} />
        <Box>
          {/* Overview */}
          <Box id="overview">
            <Section
              header="Overview"
              subheader="Here's what's happening in Diamond DAO"
            >
              <SummaryBanner summaryFacts={overviewSummaryFacts} />
              <GraphGrid graphItems={overviewGraphFixtures} />
            </Section>
          </Box>
          <Box id="activity" mt="90px">
            {/* Activity */}

            <Section
              header="Activity"
              subheader="All activity across the forum, DAOHaus, "
            >
              <SummaryBanner summaryFacts={activitySummaryFacts} />
              <List name="Activity" listItems={activityList} />
            </Section>
          </Box>
          <Box id="links" mt="90px">
            {/* Links */}

            <Section header="Links" subheader="External links for Diamond DAO">
              <Properties title="Links" data={linksProperties} />
            </Section>
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Overview;
