import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Table } from "./";
import { DrawerModal } from "../Drawer";
import { Box, useDisclosure } from "@chakra-ui/react";

// TODO: Fix this story
export default {
  component: Table,
  title: "Table",
} as ComponentMeta<typeof Table>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Table> = ({ columns, data }) => {
  <Table title={"Active Voters"} columns={columns as any} data={data} />;
};

//👇 Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  columns: [
    {
      Header: "Wallet",
      accessor: "wallet",
      Cell: ({ cell: { value } }: { cell: any }) => (
        <Box color="diamond.link">{value}</Box>
      ),
    },
    {
      Header: "Proposals Submitted",
      accessor: "proposalsSubmitted",
    },
    {
      Header: "Proposals Sponsored",
      accessor: "proposalsSponsored",
    },
    {
      Header: "Proposals Passed",
      accessor: "proposalsPassed",
    },
    {
      Header: "Times Voted",
      accessor: "timesVoted",
    },
  ],
  data: Array.from(Array(9).keys()).map((i) => ({
    wallet: "-",
    proposalsSubmitted: "-",
    proposalsSponsored: "-",
    proposalsPassed: "-",
    timesVoted: "-",
  })),
};
