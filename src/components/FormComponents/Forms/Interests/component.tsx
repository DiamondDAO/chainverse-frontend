import { Box, Heading, Text } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import { CheckboxContainer, CheckboxControl } from "formik-chakra-ui";

export const Topics: FC = () => {
  const TopicOptions = [
    "Objective-oriented fundraising",
    "DAO Tooling",
    "Protocol",
    "Education & Workshops",
    "IRL events",
    "Liquidity Provision",
    "Philanthrophy",
    "Investment",
    "Research and Advocacy",
    "Collecting and Curation",
    "Product",
    "Services & Guilds",
    "Media",
    "Grants",
    "Other",
  ];
  const ThemeOptions = [
    "Publishing",
    "Curation",
    "Physical goods",
    "NFT",
    "Creator economy",
    "Data analytics",
    "Gaming",
    "Decentralized Science",
    "Real Estate",
    "Music",
    "Security",
    "Regenerative Finance",
    "Research and Advocacy",
    "Sports",
    "Visual Art",
    "Social Justice",
    "DeFi",
    "Other",
  ];
  return (
    <Box>
      <Heading size="md" mb="20px">
        {Model.formTitle}
      </Heading>
      <CheckboxContainer
        mt="25px"
        name={Model.fields[0].name}
        label={Model.fields[0].label}
      >
        {TopicOptions.map((option, idx) => (
          <CheckboxControl key={idx} name={Model.fields[0].name} value={option}>
            <Text fontSize={["sm", null, "md"]} ml="5px">
              {option}
            </Text>
          </CheckboxControl>
        ))}
      </CheckboxContainer>
      <CheckboxContainer
        mt="25px"
        name={Model.fields[1].name}
        label={Model.fields[1].label}
      >
        {ThemeOptions.map((option, idx) => (
          <CheckboxControl key={idx} name={Model.fields[1].name} value={option}>
            <Text fontSize={["sm", null, "md"]} ml="5px">
              {option}
            </Text>
          </CheckboxControl>
        ))}
      </CheckboxContainer>
    </Box>
  );
};
