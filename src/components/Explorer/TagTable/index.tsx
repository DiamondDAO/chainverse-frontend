import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import {
  Box,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

import { generateDateString } from "@/common/utils";
import { Pill } from "@/components/Pill";
import { TagIcon } from "@/components/Icons/TagIcon";
import { RiNodeTree } from "react-icons/ri";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { BiDetail } from "react-icons/bi";
import { TagDrawer } from "../../Drawers/TagDrawer";
import { bodyText } from "@/theme";
import * as styles from "../styles";

export const TagTable = ({ data, update, hasMore, walletAddress }) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState({});
  useEffect(() => {
    if (!drawerIsOpen) {
      setSelectedRow({});
    }
  }, [drawerIsOpen]);
  const columns = useMemo(
    () => [
      {
        Header: "Tags",
        accessor: "tag",
        Cell: ({ value }) => {
          return (
            <>
              <Pill asButton icon={<TagIcon />}>
                <Text color="diamond.blue.5" fontSize={bodyText}>
                  {value}
                </Text>
              </Pill>
            </>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => {
          const dateObj = generateDateString(new Date(value));
          return (
            <Box>{dateObj.month + "/" + dateObj.day + "/" + dateObj.year}</Box>
          );
        },
      },
      {
        Header: "Blocks Connected",
        accessor: "blocksConnection",
        Cell: ({ value }) => {
          return (
            <>
              <Box>{value.totalCount}</Box>
            </>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          return (
            <Box display="flex">
              <Tooltip label="View details" placement="top">
                <Box
                  onClick={() => {
                    drawerOnOpen();
                    setSelectedRow(props.row);
                  }}
                  sx={styles.DetailsTooltip}
                >
                  <BiDetail size="14px" />
                </Box>
              </Tooltip>
              <Tooltip label="Add to workspace" placement="top">
                <Box sx={styles.DetailsTooltip}>
                  <PlusIcon width="14px" />
                </Box>
              </Tooltip>
              {/* <Tooltip label="Go to graph" placement="top">
                <Box
                  sx={{ "& path:nth-of-type(2)": { fill: "diamond.gray.4" } }}
                  _hover={{
                    bg: "diamond.gray.0",
                    "& path:nth-of-type(2)": { fill: "diamond.link" },
                  }}
                  display="flex"
                  justifyContent="center"
                  padding="4px"
                >
                  <RiNodeTree size="14px" />
                </Box>
              </Tooltip> */}
            </Box>
          );
        },
      },
    ],
    [walletAddress]
  );

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={update}
      hasMore={hasMore}
      loader={hasMore ? <h4>Loading more items...</h4> : <></>}
    >
      <Box maxW={["95vw", null, "unset"]} display="flex" alignItems="center">
        {/* set to 99% so we can see left & right borders */}
        <ChakraTable
          sx={{ marginTop: ["24px", "32px", "48px", "84px"] }}
          width="99%"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map((headerGroup, idx) => (
              <Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <Th
                    px="10px"
                    borderBottom="0.5px solid black"
                    borderColor="diamond.gray.4"
                    sx={{ textAlign: "inherit" }}
                    key={idx}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody
            borderLeft="thin solid #616161"
            borderRight="0.5px solid #616161"
            {...getTableBodyProps()}
          >
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr
                  key={i}
                  sx={{
                    ...(i === (selectedRow as any).index && {
                      bg: "rgba(149, 67, 141, 0.1)",
                    }),
                  }}
                  bg="white"
                  {...row.getRowProps()}
                  _hover={{ bg: "diamond.gray.1" }}
                  cursor="pointer"
                >
                  {row.cells.map((cell, idx) => {
                    return (
                      <Td
                        onClick={
                          row.cells.length - 1 !== idx
                            ? () => {
                                drawerOnOpen();
                                setSelectedRow(row);
                              }
                            : () => {}
                        }
                        px="10px"
                        borderBottom="0.5px solid black"
                        borderColor="diamond.gray.4"
                        key={idx}
                        {...cell.getCellProps([
                          {
                            style: (cell.column as any).style,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </Box>
      <TagDrawer
        nodeData={(selectedRow as any).values}
        isOpen={drawerIsOpen}
        onClose={drawerOnClose}
      />
    </InfiniteScroll>
  );
};
