import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { GraphGrid, IGraphGrid } from "./GraphGrid";
import { DrawerModal } from "../Drawer";
import { useDisclosure } from "@chakra-ui/react";

interface IStoryGraphGrid extends IGraphGrid {
  expandable: boolean;
}
export default {
  component: GraphGrid,
  title: "GraphGrid",
} as ComponentMeta<React.FC<IStoryGraphGrid>>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<React.FC<IStoryGraphGrid>> = ({
  expandable,
  ...args
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef(undefined);
  if (expandable) {
    args.graphItems.map((item) => {
      item.expandable = true;
      item.onOpen = onOpen;
    });
  } else {
    args.graphItems.map((item) => {
      item.expandable = false;
      item.onOpen = undefined;
    });
  }
  return (
    <>
      <DrawerModal onClose={onClose} isOpen={isOpen} btnRef={ref} />
      <GraphGrid {...args} />
    </>
  );
};

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  graphItems: [
    {
      title: "item 1",
      value: "30",
      metric: "+30% COMPARED TO PREV 14D",
      reverseSign: true,
    },
    { title: "item 1", value: "50", metric: "-30% COMPARED TO PREV 14D" },
    { title: "item 1", value: "30", metric: "+30% COMPARED TO PREV 14D" },
  ],
  expandable: true,
};
