import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ExpandableIcon } from "./ExpandableIcon";
import { Box, Text } from "@chakra-ui/react";

export default {
  title: "Icons",
};

const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {children}
    </Box>
  );
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<React.FC> = () => {
  return (
    <Box display={"inline-block"}>
      <IconContainer>
        <ExpandableIcon />
        <Text>Expandable Icon</Text>
      </IconContainer>
    </Box>
  );
};

//👇 Each story then reuses that template
export const Default = Template.bind({});
