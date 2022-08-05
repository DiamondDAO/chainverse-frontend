import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { PlusIcon } from '@/components/Icons/PlusIcon';
import {
  Box,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EntityDrawer } from '../../Drawers/EntityDrawer';
import { useAddEntityHandler } from './handlers';
import * as styles from '../styles';

export const SearchOSTable = ({ data, update, hasMore, walletAddress }) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState({});

  const addEntityHandler = useAddEntityHandler(walletAddress);

  console.log('selectedRow::', selectedRow);
  useEffect(() => {
    if (!drawerIsOpen) {
      setSelectedRow({});
    }
  }, [drawerIsOpen]);
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        style: {
          fontWeight: '500',
          width: '150px',
        },
      },
      {
        Header: '# of Notes relations',
        accessor: 'notesAggregate',
        style: {
          width: '250px',
        },
        Cell: (props) => {
          console.log('notesAggregate', props.value)
          return <>notesAggregate</>;
        },
      },
      {
        Header: '# of Proposals relations',
        accessor: 'proposalsAggregate',
        Cell: (props) => {
          console.log('proposalsAggregate::', props.value)
          return <>proposalsAggregate</>;
        },
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          return <>View More...</>;
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
                    {column.render('Header')}
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
                          row.cells.length !== idx
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
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </Box>
      {drawerIsOpen && (
        <EntityDrawer
          addEntityHandler={addEntityHandler}
          nodeData={(selectedRow as any)?.original}
          isOpen={drawerIsOpen}
          onClose={drawerOnClose}
        />
      )}
    </InfiniteScroll>
  );
};
