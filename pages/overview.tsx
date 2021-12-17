import { Box, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { useGetDiscoursePosts } from "../common/hooks/api/useGetDiscoursePosts";
import { useGetOverview } from "../common/hooks/api/useGetOverview";
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
} from "../fixtures/pages/overview";

const Overview: NextPage = () => {
  const linksArray = [
    { name: "Overview", id: "#overview" },
    { name: "All Activity", id: "#activity" },
    { name: "Links", id: "#links" },
  ];
  const { data: overviewData, isError } = useGetOverview(792);
  const { data: discourseData } = useGetDiscoursePosts(106);
  const dataAvailable = Boolean(overviewData && discourseData);

  return (
    <Layout>
      {!dataAvailable && !isError && <div>Loading Dashboard...</div>}
      {isError && <div>There was an error loading this Dashboard</div>}
      {dataAvailable && !isError && (
        <Grid templateColumns="2fr 5.175fr 1fr">
          <DirectoryHeader title="Overview" links={linksArray} />
          <Box>
            {/* Overview */}
            <Box id="overview">
              <Section
                header="Overview"
                subheader="Here's what's happening in Diamond DAO"
              >
                <SummaryBanner
                  summaryFacts={[
                    {
                      key: "TOTAL MEMBERS",
                      value: overviewData?.members.toString() || "-",
                    },
                    {
                      key: "NEW PROPOSALS",
                      value: overviewData?.new_proposals.toString() || "-",
                    },
                    {
                      key: "PROPOSALS PASSED",
                      value: overviewData?.new_passed.toString() || "-",
                    },
                    {
                      key: "NEW FORUM POSTS",
                      value: discourseData?.count.toString() || "-",
                    },
                  ]}
                />
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

              <Section
                header="Links"
                subheader="External links for Diamond DAO"
              >
                <Properties title="Links" data={linksProperties} />
              </Section>
            </Box>
          </Box>
        </Grid>
      )}
    </Layout>
  );
};

export default Overview;
