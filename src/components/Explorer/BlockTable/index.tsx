import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import { BiDetail } from "react-icons/bi";
import { useAccount } from "wagmi";
import { generateDateString, truncateAddress } from "@/common/utils";
import { Pill } from "@/components/Pill";
import { TagIcon } from "@/components/Icons/TagIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { BlockDrawer } from "@/components/Drawers/BlockDrawer";
import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useLazyQuery } from "@apollo/client";
import { bodyText } from "@/theme";
import { AddWorkspaceType } from "@/common/types";
import { useAddBlockHandler } from "./handlers";

export const BlockTable = ({ data, update, hasMore, walletAddress }) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState({});
  const addBlockHandler = useAddBlockHandler(walletAddress);

  useEffect(() => {
    if (!drawerIsOpen) {
      setSelectedRow({});
    }
  }, [drawerIsOpen]);

  const columns = useMemo(
    () => [
      {
        Header: "Text",
        accessor: "text",
        Cell: ({ value }) => {
          return (
            <Tooltip label={value} placement="top">
              <Box fontSize="12px">
                {value.slice(0, 30)}
                {value.length > 30 && "..."}
              </Box>
            </Tooltip>
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
        Header: "Entities",
        accessor: "entities",
        Cell: ({ value }) => {
          return (
            <>
              {value.map((entity: { name: string }, idx) => (
                <Pill key={idx} asButton icon={<EntitiesIcon />}>
                  <Text color="diamond.blue.5" fontSize={bodyText}>
                    {entity.name}
                  </Text>
                </Pill>
              ))}
            </>
          );
        },
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value }) => {
          if (value.length <= 2) {
            return (
              <>
                {value.map((tag: { tag: string }, idx) => (
                  <Pill key={idx} asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {tag.tag}
                    </Text>
                  </Pill>
                ))}
              </>
            );
          } else {
            const [tag1, tag2, ...rest] = value;
            return (
              <Box
                display="flex"
                alignItems="center"
                position="relative"
                flexWrap="wrap"
              >
                <Box>
                  <Pill asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {tag1.tag}
                    </Text>
                  </Pill>
                </Box>
                <Box>
                  <Pill asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {tag2.tag}
                    </Text>
                  </Pill>
                </Box>
                <Tooltip
                  label={rest.map((i) => i.tag).join(", ")}
                  placement="top"
                >
                  <Box marginTop="-4.5px">
                    <Pill asButton>
                      <Text color="diamond.blue.5" fontSize={bodyText}>
                        +{rest.length}
                      </Text>
                    </Pill>
                  </Box>
                </Tooltip>
              </Box>
            );
          }
        },
      },
      {
        Header: "Wallet",
        accessor: "wallet",
        Cell: ({ value }) => {
          return <Box>{"0x" + truncateAddress(value.address.slice(2), 4)}</Box>;
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
          }, [getWorkspaceOwned, walletData?.address]);
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
                          addBlockHandler(props.row, AddWorkspaceType.Sandbox);
                          close();
                        }}
                      >
                        <Box>Sandbox</Box>
                      </Box>
                      {workspaces?.map((workspace) => {
                        return (
                          <Box
                            onClick={() => {
                              addBlockHandler(
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
    [addBlockHandler, drawerOnOpen]
  );

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <>
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
        <BlockDrawer
          nodeData={selectedRow as any}
          isOpen={drawerIsOpen}
          onClose={drawerOnClose}
          actions={{ addBlockToWorkspace: addBlockHandler }}
        />
      </InfiniteScroll>
    </>
  );
};
