import { Box, Heading, Radio, Text, Textarea } from "@chakra-ui/react";
import Model from "./model";
import React, { FC } from "react";
import {
  InputControl,
  RadioGroupControl,
  TextareaControl,
} from "formik-chakra-ui";

export const Intro: FC = () => {
  return (
    <Box>
      <Heading size="md" mb="20px">
        {Model.formTitle}
      </Heading>
      <InputControl name={Model.fields[0].name} label={Model.fields[0].label} />
      <TextareaControl
        mt="25px"
        name={Model.fields[1].name}
        label={Model.fields[1].label}
      />
      <RadioGroupControl
        mt="25px"
        name={Model.fields[2].name}
        label={Model.fields[2].label}
      >
        <Radio value="0-2">0-2</Radio>
        <Radio value="3-5">3-5</Radio>
        <Radio value="5+">5+</Radio>
        <Radio value="10+">10+</Radio>
      </RadioGroupControl>
    </Box>
  );
};
