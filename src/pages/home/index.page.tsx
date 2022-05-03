import { Box, Spinner, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { Layout } from "@/components/Layout";
import { useGetAccountName } from "@/common/hooks/use-get-account-name";
import * as styles from "./styles";
const FillerBox = () => (
  <Box minWidth="300px" height="200px" bg="#C4C4C4" border="1px solid black" />
);

const Home: NextPage = () => {
  const { accountName } = useGetAccountName({ loadingComponent: <Spinner /> });
  return (
    <Layout>
      <Box sx={styles.HomeContainer}>
        <Box>
          <Text sx={styles.HomeText}>Welcome back {accountName}</Text>
        </Box>
        <Box mt="80px">
          <Text sx={styles.Header}>Jump back in</Text>
          <Box sx={styles.ContentRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FillerBox key={i} />
            ))}
          </Box>
          <Box>
            <Text mt="8px">Viewed on:</Text> <Text>Last edit made on:</Text>
          </Box>
        </Box>
        <Box mt="45px">
          <Text sx={styles.Header}>
            Since you’ve engaged with , you might also like:{" "}
          </Text>
          <Box sx={styles.ContentRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FillerBox key={i} />
            ))}
          </Box>
        </Box>
        <Box mt="45px">
          <Text sx={styles.Header}>Based on your interests in</Text>
          <Box sx={styles.ContentRow}>
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
