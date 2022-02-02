import {
  Box,
  Grid,
  Heading,
  Container,
  Text,
  Avatar,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { borderStyles } from "@/common/theme";
import { useAccount } from "wagmi";
import { truncateAddress } from "@/common/utils";
import Router from "next/router";
import { PreferenceData } from "@/common/types";

const AccountInfoProperties = ({
  property,
  value,
}: {
  property: string;
  value: string;
}) => (
  <Box
    display={"flex"}
    width="100%"
    justifyContent={"space-between"}
    flexWrap={"wrap"}
  >
    <Text mr="5px" fontWeight="bold">
      {property}
    </Text>
    <Text>{value}</Text>
  </Box>
);

const Preferences: NextPage = () => {
  const [{ data, loading }] = useAccount({ fetchEns: true });

  const ens = data?.ens?.name;

  useEffect(() => {
    const checkIfAddressPresent = setTimeout(() => {
      if (!loading && !data) {
        Router.push("/");
      }
    }, 1000);

    return () => {
      clearTimeout(checkIfAddressPresent);
    };
  }, [data, loading]);

  const [preferences, setPreferences] = useState({} as PreferenceData);

  const accountName =
    (ens && ens.length > 11 ? truncateAddress(ens, 4) : ens) ||
    "0x" + truncateAddress(data?.address.slice(2), 5);

  useEffect(() => {
    if (!loading && data?.address) {
      const preferenceInfo = localStorage.getItem(
        `diamond-storage-${data?.address}`
      );
      setPreferences(JSON.parse(preferenceInfo!));
    }
  }, [loading, data?.address]);

  return (
    <Layout>
      {(loading || !data?.address) && <Box>Loading...</Box>}
      {!loading && data?.address && (
        <Container maxW="container.lg">
          <Box display="flex" justifyContent="center">
            <Heading mb="20px">Preferences</Heading>
          </Box>
          <Grid templateColumns={["1fr", null, "1fr 2fr"]} gap={6}>
            <Box
              display="flex"
              flexDir="column"
              alignItems={"center"}
              p="20px"
              {...borderStyles}
            >
              <Heading mb="10px" as="h1" size="md">
                Account Info
              </Heading>
              <Avatar size="xl" mb="20px" src="./img/logo-black.png" />
              <AccountInfoProperties property={"Wallet:"} value={accountName} />
              <AccountInfoProperties
                property={"Active Since:"}
                value={preferences?.activeSince}
              />
            </Box>
            <Box p="20px" {...borderStyles}>
              <Heading mb="10px" size="md">
                Reasons for joining DAOs
              </Heading>
              <UnorderedList pl="10px">
                {preferences?.purpose?.map((reason, idx) => (
                  <ListItem key={idx}>{reason}</ListItem>
                ))}
              </UnorderedList>
              <Heading my="10px" size="md">
                DAO Category Interests
              </Heading>
              <UnorderedList pl="10px">
                {preferences?.interests?.map((reason, idx) => (
                  <ListItem key={idx}>{reason}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default Preferences;
