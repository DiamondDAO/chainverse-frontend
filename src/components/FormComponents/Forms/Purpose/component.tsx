import { Box, Heading, Radio } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import { CheckboxContainer, CheckboxControl } from "formik-chakra-ui";

export const Purpose: FC = () => {
  const PurposeOptions = [
    "I want to learn more about Web3 communities",
    "Invest in Web3 communities",
    "Earn a living by contributing (i.e. working) for Web3 communities",
    "I'm looking for interesting Web3 community bounties",
    "I'm looking to find community",
    "I'm thinking about starting a Web3 community",
    "I want to research Web3 communities",
    "Other",
  ];
  return (
    <Box>
      <Heading size="md" mb="20px">
        {Model.formTitle}
      </Heading>
      <CheckboxContainer
        sx={{ "& > label": { fontWeight: "bold", mb: "20px" } }}
        name={Model.fields.purpose.name}
        label={Model.fields.purpose.label}
      >
        {PurposeOptions.map((option, id) => (
          <CheckboxControl
            key={option + +"-" + id}
            name={Model.fields.purpose.name}
            value={option}
          >
            {option}
          </CheckboxControl>
        ))}
      </CheckboxContainer>
    </Box>
  );
};
