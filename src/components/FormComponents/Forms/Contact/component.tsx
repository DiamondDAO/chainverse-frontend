import { Box, Heading, Text } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import {
  CheckboxContainer,
  CheckboxControl,
  CheckboxSingleControl,
  InputControl,
  TextareaControl,
} from "formik-chakra-ui";

export const Contact: FC = () => {
  const ContactOptions = ["Discord", "Twitter", "Email"];

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
        {ContactOptions.map((option, idx) => (
          <CheckboxControl key={idx} name={Model.fields[0].name} value={option}>
            <Text fontSize={["sm", null, "md"]} ml="5px">
              {option}
            </Text>
          </CheckboxControl>
        ))}
      </CheckboxContainer>
      <InputControl
        mt="25px"
        name={Model.fields[1].name}
        //@ts-ignore
        label={
          <Box>
            <Box>{Model.fields[1].label}</Box>
            <Text
              as="i"
              fontWeight={"400"}
              fontSize="12px"
              color="diamond.gray.4"
            >
              {Model.fields[1].subtitle}
            </Text>
          </Box>
        }
      />
      <InputControl
        mt="25px"
        name={Model.fields[2].name}
        label={Model.fields[2].name}
      />
      <InputControl
        mt="25px"
        name={Model.fields[3].name}
        //@ts-ignore
        label={
          <Box>
            <Box>{Model.fields[3].label}</Box>
            <Text
              as="i"
              fontWeight={"400"}
              fontSize="12px"
              color="diamond.gray.4"
            >
              {Model.fields[3].subtitle}
            </Text>
          </Box>
        }
      />
      <CheckboxContainer
        mt="25px"
        name={Model.fields[4].name}
        label={Model.fields[4].label}
      >
        <CheckboxSingleControl name={Model.fields[4].name}>
          Sign me up!
        </CheckboxSingleControl>
      </CheckboxContainer>

      <TextareaControl
        mt="25px"
        name={Model.fields[5].name}
        label={Model.fields[5].name}
      />
    </Box>
  );
};
