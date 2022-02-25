import { Box, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";

export const CompletedFormContent: FC = () => {
  return (
    <Box>
      <Heading size="md" mb="20px">
        Thank you!
      </Heading>
      <Text>
        Come build Chainverse! Remember, your preferences can be changed anytime
        in the preference page.
      </Text>
    </Box>
  );
};
