import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { NavBar } from ".";

export default {
  component: NavBar,
  title: "NavBar",
} as ComponentMeta<typeof NavBar>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

//👇 Each story then reuses that template
export const Default = Template.bind({});

let pathname = "/overview";

Default.args = {};
Default.parameters = {
  nextRouter: {
    pathname: pathname,
    asPath: pathname,
  },
};
