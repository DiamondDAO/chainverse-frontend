import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ComingSoonCard } from ".";

export default {
  component: ComingSoonCard,
  title: "ComingSoonCard",
} as ComponentMeta<typeof ComingSoonCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ComingSoonCard> = (args) => (
  <ComingSoonCard {...args} />
);

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {};
