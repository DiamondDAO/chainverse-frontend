import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { DirectoryHeader } from "./";

export default {
  component: DirectoryHeader,
  title: "DirectoryHeader",
} as ComponentMeta<typeof DirectoryHeader>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof DirectoryHeader> = (args) => (
  <DirectoryHeader {...args} />
);

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  title: "SidebarTitle",
  description: "This is the sidebar title",
  links: [
    { id: "item1", name: "Item 1" },
    { id: "item2", name: "Item 2" },
  ],
};
