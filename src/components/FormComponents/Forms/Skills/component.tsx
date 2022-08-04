import { Box, Heading, Text } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import {
  CheckboxContainer,
  CheckboxControl,
  TextareaControl,
} from "formik-chakra-ui";

export const Skills: FC = () => {
  const SkillsOptions = [
    "Data Science / Analytics",
    "Investing",
    "Engineering",
    "Content creation",
    "Legal",
    "Product design",
    "Business Development / Partnership",
    "Community design",
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
        {SkillsOptions.map((option, idx) => (
          <CheckboxControl key={idx} name={Model.fields[0].name} value={option}>
            <Text fontSize={["sm", null, "md"]} ml="5px">
              {option}
            </Text>
          </CheckboxControl>
        ))}
      </CheckboxContainer>
      <TextareaControl
        mt="25px"
        name={Model.fields[1].name}
        label={Model.fields[1].label}
      />
    </Box>
  );
};
