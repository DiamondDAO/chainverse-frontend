import { Box, Grid, Text } from "@chakra-ui/react";
import React, { FC, useMemo, useState } from "react";
import { borderStyles, scrollStyles } from "../../common/theme";
import { truncateAddress } from "../../common/utils";
import { Properties } from "../Properties";
import { Table } from "../Table";
import { InspectorCard } from "./Card";

interface IInspector {
  title: string;
  data: {
    name: string;
    Y: number;
    N: number;
    timeRemain: number;
    particaptionRate: number;
    voteCastPercentage: number;
    proposalLink: string;
    voters: {
      wallet: string;
      vote: string;
      votes: string;
      votingPower: number;
    }[];
  }[];
}

export const Inspector: FC<IInspector> = ({ title, data }) => {
  // index for now, we can use id once data API is finalized
  const [selected, setSelected] = useState(0);

  const selectedData = useMemo(() => {
    return data[selected];
  }, [selected, data]);

  const propertiesData = useMemo(
    () => [
      {
        properties: [
          {
            key: "Votes",
            value: `${selectedData.Y + selectedData.N} (${selectedData.Y}Y - ${
              selectedData.N
            }N)`,
          },
          {
            key: "Num Votes",
            value: `${selectedData.voters.length}`,
          },
          {
            key: "% Voter Participation Rate",
            value: `${selectedData.particaptionRate}%`,
          },
          {
            key: "% Eligible Votes Cast",
            value: `${selectedData.voteCastPercentage}%`,
          },
          {
            key: "Link",
            value: "Open",
            link: selectedData.proposalLink,
          },
        ],
      },
    ],
    [selectedData]
  );

  const voterColumns = [
    {
      Header: "Wallet",
      accessor: "wallet",
      Cell: ({ cell: { value } }: { cell: any }) => (
        <Box color="diamond.link">{truncateAddress(value)}</Box>
      ),
    },
    {
      Header: "Vote",
      accessor: "vote",
      Cell: ({ cell: { value } }: { cell: any }) => (
        <Text color={value === "Yes" ? "chart.green" : "chart.red"}>
          {value}
        </Text>
      ),
    },
    { Header: "Votes", accessor: "votes" },
    { Header: "Voting Power", accessor: "votingPower" },
  ];
  const voterRowData = selectedData.voters.map((voter) => {
    return {
      wallet: voter.wallet,
      vote: voter.vote,
      votes: voter.votes,
      votingPower: voter.votingPower,
    };
  });
  return (
    <Box gridColumn="span 3" {...borderStyles} width="100%">
      <Box bg="diamond.blue.0" width="100%">
        <Box
          fontSize="sm"
          display="flex"
          width="100%"
          px="17px"
          pt="12px"
          pb="14px"
        >
          <Text fontWeight="bold" flexGrow="1">
            {title}
          </Text>
        </Box>
      </Box>
      <Grid templateColumns="1fr 2fr" height="417px">
        <Box
          borderTop="1px solid"
          borderRight="1px solid"
          borderColor="diamond.gray.2"
          sx={{ ...scrollStyles, overflow: "unset", overflowY: "scroll" }}
        >
          {data.map((item, idx) => {
            const voteString = `${item.Y + item.N} (${item.Y}Y - ${item.N}N)`;
            const timeString = `${item.timeRemain} hours`;
            return (
              <Box
                key={`${item.name}-${idx}`}
                onClick={() => setSelected(idx)}
                cursor="pointer"
              >
                <InspectorCard
                  title={item.name}
                  info={[
                    { key: "Votes", value: voteString },
                    { key: "Time Remain", value: timeString },
                  ]}
                  selected={idx == selected}
                />
              </Box>
            );
          })}
        </Box>
        <Box sx={{ ...scrollStyles, overflow: "unset", overflowY: "scroll" }}>
          <Box p="20px">
            <Text mb="20px">{selectedData.name}</Text>
            <Properties title="Properties" data={propertiesData} />
            <Box mt="20px">
              <Table<{
                wallet: string;
                vote: string;
                votes: string;
                votingPower: number;
              }>
                title={"Voters"}
                columns={voterColumns as any}
                data={voterRowData}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
