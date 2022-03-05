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
import { useLazyQuery } from "@apollo/client";
import { GET_PROMPT_INFO } from "@/services/Apollo/Queries";

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

// TODO: fix hard coding of questions
const Preferences: NextPage = () => {
  const [{ data, loading }] = useAccount({ fetchEns: true });
  const [activeSince, setActiveSince] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const ens = data?.ens?.name;
  const [getPromptInfo, { data: promptData, loading: promptLoading, error }] =
    useLazyQuery(GET_PROMPT_INFO);

  useEffect(() => {
    if (data?.address) {
      getPromptInfo({
        variables: {
          promptWhere: {
            text_IN: [
              "What skills do you bring to the Web3 community space?", //skills
              "What topics are you interested in?", //interets
            ],
          },
          blockWhere: {
            Response: {
              wallet: {
                address: data?.address,
              },
            },
          },
        },
      });
    }
  }, [data?.address]);

  const parseBlocks = (prompts, setter) => {
    setter(prompts.blocks.map((i) => i.text));
  };

  useEffect(() => {
    if (promptData) {
      console.log(promptData);
      parseBlocks(
        promptData.prompts?.find(
          (i) =>
            i.text === "What skills do you bring to the Web3 community space?"
        ),
        setSkills
      );
      parseBlocks(
        promptData.prompts?.find(
          (i) => i.text === "What topics are you interested in?"
        ),
        setInterests
      );
      setActiveSince(
        promptData.prompts?.find(
          (i) =>
            i.text === "What skills do you bring to the Web3 community space?"
        )?.blocks[0]?.wallet.dateAdded
      );
    }
  }, [promptData]);

  useEffect(() => {
    const checkIfAddressPresent = setTimeout(() => {
      if (!loading && !data) {
        Router.push("/home");
      }
    }, 500);

    return () => {
      clearTimeout(checkIfAddressPresent);
    };
  }, [data, loading]);

  const accountName =
    (ens && ens.length > 11 ? truncateAddress(ens, 4) : ens) ||
    "0x" + truncateAddress(data?.address.slice(2), 5);
  return (
    <Layout>
      {!promptLoading && error && (
        <Box>There was an error loading this page.</Box>
      )}
      {(promptLoading || !data?.address) && <Box>Loading...</Box>}
      {!promptLoading && data?.address && (
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
                value={activeSince?.split("T")[0]}
              />
            </Box>
            <Box p="20px" {...borderStyles}>
              <Heading mb="10px" size="md">
                Skills
              </Heading>
              <UnorderedList pl="10px">
                {skills?.map((reason, idx) => (
                  <ListItem key={idx}>{reason}</ListItem>
                ))}
              </UnorderedList>
              <Heading my="10px" size="md">
                Interests
              </Heading>
              <UnorderedList pl="10px">
                {interests?.map((reason, idx) => (
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
