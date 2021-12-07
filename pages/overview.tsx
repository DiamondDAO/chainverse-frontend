import { Box, Grid, Heading, Text, Image, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { borderStyles } from "../common/theme";
import { AnchorSidebar } from "../components/AnchorSidebar";
import { Graph } from "../components/Graph";
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
      <Grid templateColumns="2fr 5fr 1fr">
        <Box>
          <Heading as="h1" fontSize="2xl" mb="20px">
            Diamond DAO
          </Heading>
          <AnchorSidebar links={linksArray} />
        </Box>

        <Box>
          {/* Overview */}
          <Box id="overview">
            <Section
              header="Overview"
              subheader="Here's what's happening in Diamond DAO"
            >
              <SummaryBanner summaryFacts={overviewSummaryFacts} />
              {overviewGraphFixtures.map(
                (graph: { title: string; value: string; metric: string }) => {
                  return (
                    <Box key={graph.title} gridRow="span 2">
                      <Graph
                        title={graph.title}
                        value={graph.value}
                        metric={graph.metric}
                      />
                    </Box>
                  );
                }
              )}
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
              <Properties
                title="Links"
                leftCol={linksProperties.leftCol}
                rightCol={linksProperties.rightCol}
              />
            </Section>
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Overview;
