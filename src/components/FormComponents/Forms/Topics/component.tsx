import { Box, Heading, Text } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import { CheckboxContainer, CheckboxControl } from "formik-chakra-ui";

export const Topics: FC = () => {
  const TopicOptions = [
    "Community design",
    "Complex systems",
    "Physics",
    "DeFi",
    "Investment",
    "Women in Web3",
    "Black in Web3",
    "Gaming",
    "Research",
    "Social Justice",
    "Philanthropy ",
    "Climate Justice",
    "Web3 IRL",
    "Guilds",
    "Consulting",
    "Sports",
    "Entertainment",
    "NFT",
  ];
  return (
    <Box>
      <Heading size="md" mb="20px">
        {Model.formTitle}
      </Heading>
      <CheckboxContainer
        sx={{ "& > label": { fontWeight: "bold", mb: "20px" } }}
        name={Model.fields.topics.name}
        label={Model.fields.topics.label}
      >
        {TopicOptions.map((option, idx) => (
          <CheckboxControl
            key={idx}
            name={Model.fields.topics.name}
            value={option}
          >
            <Text fontSize={["sm", null, "md"]} ml="5px">
              {option}
            </Text>
          </CheckboxControl>
        ))}
      </CheckboxContainer>
    </Box>
  );
};
