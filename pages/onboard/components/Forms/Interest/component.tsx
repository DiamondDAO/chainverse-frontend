import { Box, Heading, Radio } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import { CheckboxContainer, CheckboxControl } from "formik-chakra-ui";

export const Interest: FC = () => {
  const PurposeOptions = [
    "Engineering: Raid Guild, Developer DAOs",
    "Community-focused: Panvala",
    "DeFi: Index Coop, Tracer",
    "Investment-focused: Seed Club",
    "Women in Web3: Web3 Baddies",
    "Minority-focused: 40Acres DAO",
    "Research: Jovian Network",
    "Social Justice: KlimaDAO",
    "Entertainment: Midsummar DAO",
  ];
  return (
    <Box>
      <Heading size="md" mb="20px">
        {Model.formTitle}
      </Heading>
      <CheckboxContainer
        sx={{ "& > label": { fontWeight: "bold", mb: "20px" } }}
        name={Model.fields.interests.name}
        label={Model.fields.interests.label}
      >
        {PurposeOptions.map((option, idx) => (
          <CheckboxControl
            key={idx}
            name={Model.fields.interests.name}
            value={option}
          >
            {option}
          </CheckboxControl>
        ))}
      </CheckboxContainer>
    </Box>
  );
};
