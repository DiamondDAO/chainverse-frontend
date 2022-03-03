import { Box, Spinner, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { Layout } from "@/components/Layout";
import { useGetAccountName } from "@/common/hooks/use-get-account-name";

const FillerBox = () => (
  <Box minWidth="300px" height="200px" bg="#C4C4C4" border="1px solid black" />
);

const Home: NextPage = () => {
  const { accountName } = useGetAccountName({ loadingComponent: <Spinner /> });
  return (
    <Layout>
      <Box display="flex" width="100%" flexDir="column">
        <Box>
          <Text fontWeight="600" fontSize="2rem">
            Welcome back {accountName}
          </Text>
        </Box>
        <Box mt="80px">
          <Text fontSize="1.25rem" fontWeight="500">
            Jump back in
          </Text>
          <Box
            mt="12px"
            display="flex"
            overflow="scroll"
            sx={{ columnGap: "24px" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FillerBox key={i} />
            ))}
          </Box>
          <Box>
            <Text mt="8px">Viewed on:</Text> <Text>Last edit made on:</Text>
          </Box>
        </Box>
        <Box mt="45px">
          <Text fontSize="1.25rem" fontWeight="500">
            Since you’ve engaged with , you might also like:{" "}
          </Text>
          <Box
            mt="12px"
            display="flex"
            overflow="scroll"
            sx={{ columnGap: "24px" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FillerBox key={i} />
            ))}
          </Box>
        </Box>
        <Box mt="45px">
          <Text fontSize="1.25rem" fontWeight="500">
            Based on your interests in
          </Text>
          <Box
            mt="12px"
            display="flex"
            overflow="scroll"
            sx={{ columnGap: "24px" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FillerBox key={i} />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
