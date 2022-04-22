import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import {
  Box,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Text,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BiDetail } from "react-icons/bi";
import { EntityDrawer } from "../../Drawers/EntityDrawer";
import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useLazyQuery } from "@apollo/client";
import { AddWorkspaceType } from "@/common/types";
import { useAccount } from "wagmi";
import { useAddEntityHandler } from "./handlers";

export const EntityTable = ({ data, update, hasMore, walletAddress }) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState({});

  const addEntityHandler = useAddEntityHandler(walletAddress);

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
          const [{ data: walletData }] = useAccount();
          const [getWorkspaceOwned, { data: workspaceData, loading }] =
            useLazyQuery(GET_WORKSPACE_OWNED);
          useEffect(() => {
            if (walletData?.address) {
              getWorkspaceOwned({
                variables: {
                  where: { wallet: { address: walletData?.address } },
                },
              });
            }
          }, [walletAddress]);
          const workspaces = workspaceData?.workspaces;
          const [isOpen, setIsOpen] = useState(false);
          const open = () => setIsOpen(!isOpen);
          const close = () => setIsOpen(false);

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
              <Popover isOpen={isOpen} onClose={close}>
                <PopoverTrigger>
                  <Tooltip label="Add to workspace" placement="top">
                    <Box
                      onClick={open}
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
                </PopoverTrigger>
                <PopoverContent>
                  <Box p="12px">
                    <Text
                      fontSize="12px"
                      fontWeight="500"
                      color="diamond.blue.3"
                      mb="8px"
                    >
                      SELECT A WORKSPACE
                    </Text>
                    <Box
                      borderTop="0.5px solid black"
                      borderColor="diamond.gray.1"
                    />
                    <Box mt="4px" sx={{ "& > *": { py: "4px" } }}>
                      <Box
                        _hover={{
                          bg: "diamond.gray.1",
                        }}
                        display="flex"
                        justifyContent="space-between"
                        onClick={() => {
                          addEntityHandler(props.row, AddWorkspaceType.Sandbox);
                          close();
                        }}
                      >
                        <Box>Sandbox</Box>
                      </Box>
                      {workspaces?.map((workspace) => {
                        return (
                          <Box
                            onClick={() => {
                              addEntityHandler(
                                props.row,
                                AddWorkspaceType.Workspace,
                                workspace.uuid
                              );
                              close();
                            }}
                            key={workspace.uuid}
                            _hover={{
                              bg: "diamond.gray.1",
                            }}
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Box>{workspace.name}</Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </PopoverContent>
              </Popover>
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
      <EntityDrawer
        addEntityHandler={addEntityHandler}
        nodeData={(selectedRow as any)?.original}
        isOpen={drawerIsOpen}
        onClose={drawerOnClose}
      />
    </InfiniteScroll>
  );
};
