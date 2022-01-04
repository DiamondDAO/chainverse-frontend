import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Inspector } from "./";
import { governanceProposals } from "../../fixtures/pages/governance";

export default {
  component: Inspector,
  title: "Inspector",
} as ComponentMeta<typeof Inspector>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Inspector> = (args) => (
  <Inspector {...args} />
);

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  title: "Proposal Inspector",
  data: governanceProposals(4),
};
