import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DrawerModal } from "./";
import { Button, useDisclosure } from "@chakra-ui/react";

export default {
  component: DrawerModal,
  title: "DrawerModal",
} as ComponentMeta<typeof DrawerModal>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof DrawerModal> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const proposalBtnRef = useRef(undefined);
  return (
    <>
      <Button onClick={onOpen}>Click to Open Modal</Button>
      <DrawerModal isOpen={isOpen} onClose={onClose} btnRef={proposalBtnRef} />
    </>
  );
};

//👇 Each story then reuses that template
export const Default = Template.bind({});
