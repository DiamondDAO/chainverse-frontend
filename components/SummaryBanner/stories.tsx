import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { SummaryBanner, ISummaryBanner } from "./";
import { DrawerModal } from "../Drawer";
import { useDisclosure } from "@chakra-ui/react";

interface IStorySummaryBanner extends ISummaryBanner {
  expandable: boolean;
}
export default {
  component: SummaryBanner,
  title: "SummaryBanner",
} as ComponentMeta<React.FC<IStorySummaryBanner>>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<React.FC<IStorySummaryBanner>> = ({
  expandable,
  summaryFacts,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef(undefined);

  return (
    <>
      <DrawerModal onClose={onClose} isOpen={isOpen} btnRef={ref} />
      <SummaryBanner
        expandable={expandable}
        onOpen={onOpen}
        summaryFacts={summaryFacts}
      />
    </>
  );
};

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  summaryFacts: [
    { key: "fact 1", value: "1234" },
    { key: "fact 2", value: "1234" },
    { key: "fact 3", value: "1234" },
    { key: "fact 4", value: "1234" },
  ],
  expandable: true,
};
