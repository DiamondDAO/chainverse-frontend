import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import {
  Box,
  Button,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BiDetail } from "react-icons/bi";
import { RiNodeTree } from "react-icons/ri";
import { DetailDrawer } from "../DetailsDrawer";

export const EntityTable = ({ data, update, hasMore }) => {
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
        Header: "Entitiy Name",
        accessor: "name",
        style: {
          fontWeight: "500",
        },
      },
      {
        Header: "ID",
        accessor: "id",
      },
      { Header: "Network", accessor: "network" },
      { Header: "Only Members?", accessor: "onlyMembers" },
      { Header: "Symbol", accessor: "symbol" },
      {
        Header: "YTD Proposal",
        accessor: "proposalsAggregate",
        Cell: ({ value }) => {
          return <>{value.count}</>;
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
                  sx={{ "& path": { fill: "diamond.gray.4" } }}
                  _hover={{
                    bg: "diamond.gray.0",
                    "& path": { fill: "diamond.link" },
                  }}
                  display="flex"
                  justifyContent="center"
                  padding="4px"
                >
                  <BiDetail size="14px" />
                </Box>
              </Tooltip>
              <Tooltip label="Add to workspace" placement="top">
                <Box
                  sx={{ "& *": { fill: "diamond.gray.4" } }}
                  _hover={{
                    bg: "diamond.gray.0",
                    "& path": { fill: "diamond.link" },
                  }}
                  display="flex"
                  justifyContent="center"
                  padding="4px"
                >
                  <PlusIcon width="14px" />
                </Box>
              </Tooltip>
              <Tooltip label="Go to graph" placement="top">
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
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    []
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
      <DetailDrawer
        rowData={selectedRow}
        isOpen={drawerIsOpen}
        onClose={drawerOnClose}
      />
    </InfiniteScroll>
  );
};
