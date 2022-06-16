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
import * as styles from "../styles";

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
      // {
      //   Header: "ID",
      //   accessor: "id",
      // },
      // { Header: "Network", accessor: "network" },
      // { Header: "Only Members?", accessor: "onlyMembers" },
      // { Header: "Symbol", accessor: "symbol" },
      // {
      //   Header: "YTD Proposal",
      //   accessor: "proposalsAggregate",
      //   Cell: ({ value }) => {
      //     return <>{value.count}</>;
      //   },
      // },
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
                  sx={styles.DetailsTooltip}
                >
                  <BiDetail size="14px" />
                </Box>
              </Tooltip>
              <Popover isOpen={isOpen} onClose={close}>
                <PopoverTrigger>
                  <Tooltip label="Add to workspace" placement="top">
                    <Box onClick={open} sx={styles.DetailsTooltip}>
                      <PlusIcon width="14px" />
                    </Box>
                  </Tooltip>
                </PopoverTrigger>
                <PopoverContent>
                  <Box p="12px">
                    <Text sx={styles.SelectWorkspaceText}>
                      SELECT A WORKSPACE
                    </Text>
                    <Box sx={styles.WorkspaceModalBodyBorder} />
                    <Box sx={styles.WorkspaceContainer}>
                      <Box
                        sx={styles.SandboxStyle}
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
                            sx={styles.WorkspaceStyle}
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
      <Box sx={styles.TableContainer}>
        {/* set to 99% so we can see left & right borders */}
        <ChakraTable sx={styles.TableStyles} {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, idx) => (
              <Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <Th
                    sx={styles.TableHead}
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
                  sx={styles.TableRow(i === (selectedRow as any).index)}
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
                        sx={styles.TableCell}
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
