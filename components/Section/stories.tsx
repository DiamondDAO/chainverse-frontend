import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Section } from "./";

export default {
  component: Section,
  title: "Section",
} as ComponentMeta<typeof Section>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args} />
);

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  header: "header",
  subheader: "subheader",
};
