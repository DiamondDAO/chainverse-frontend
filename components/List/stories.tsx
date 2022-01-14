import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { List } from "./";

export default {
  component: List,
  title: "List",
} as ComponentMeta<typeof List>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  title: "PROPOSAL",
  listItems: [
    {
      title: "PROPOSAL",
      items: [
        { key: "Posted by", value: "Value" },
        { key: "Publish date", value: "Value" },
        { key: "Sponsored?", value: "Value" },
        { key: "Votes for", value: "Value" },
        { key: "Link to proposal", value: "Link", link: "/link" },
        { key: "Votes against", value: "Value" },
      ],
      col: 4 as 2 | 4,
    },
  ],
};
