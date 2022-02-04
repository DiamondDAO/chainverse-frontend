import { Box, Heading, Text } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import { CheckboxContainer, CheckboxControl } from "formik-chakra-ui";

export const Skills: FC = () => {
  const SkillsOptions = [
    "Content creation",
    "Community Design",
    "Product Design",
    "Tokenomics design",
    "Engineering",
    "Data Science",
    "Product Management",
    "Marketing",
    "Sales",
    "Recruitment",
    "Project Management",
    "Art",
    "Performance",
    "Content editing",
  ];
  return (
    <Box>
      <Heading size="md" mb="20px">
        {Model.formTitle}
      </Heading>
      <CheckboxContainer
        sx={{ "& > label": { fontWeight: "bold", mb: "20px" } }}
        name={Model.fields.skills.name}
        label={Model.fields.skills.label}
      >
        {SkillsOptions.map((option, idx) => (
          <CheckboxControl
            key={idx}
            name={Model.fields.skills.name}
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
