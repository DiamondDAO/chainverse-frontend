import { Box, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";

export const CompletedFormContent: FC = () => {
  return (
    <Box>
      <Heading size="md" mb="20px">
        Thanks for completing the form!
      </Heading>
      <Text>
        Your submission has been noted and we will surface content relevant to
        your form submission! Remember, your preferences can be changed anytime
        in the preference page.
      </Text>
    </Box>
  );
};
