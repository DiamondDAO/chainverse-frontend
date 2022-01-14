import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Properties } from "./";

export default {
  component: Properties,
  title: "Properties",
} as ComponentMeta<typeof Properties>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Properties> = (args) => (
  <Properties {...args} />
);

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  title: "Property Title",
  data: [
    {
      title: "Property 1",
      properties: [
        { key: "item1", value: "value1" },
        { key: "item2", value: "Link", link: "/link" },
      ],
    },
    {
      title: "Property 2",
      properties: [
        { key: "item1", value: "value1" },
        { key: "item1", value: "value1" },
        { key: "item1", value: "value1" },
        { key: "item1", value: "value1" },
      ],
    },
    { title: "Property 3", properties: [{ key: "item1", value: "value1" }] },
  ],
};
