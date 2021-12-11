import { Box, Text } from "@chakra-ui/react";
import React, { PropsWithChildren, ReactElement } from "react";
import { TableOptions, useGridLayout, useTable } from "react-table";
import { borderStyles, scrollStyles } from "../../common/theme";

interface ITable<T extends Record<string, unknown>> extends TableOptions<T> {
  title: string;
  minColWidth?: string;
}

export function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<ITable<T>>
): ReactElement {
  const { data, columns, title, minColWidth } = props;

  const { headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useGridLayout
  );

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
          <Text mr="15px">Show: All</Text>
        </Box>
      </Box>
      <Box
        // {...getTableProps()}
        display="grid"
        overflowX="scroll"
        gridTemplateColumns={`repeat(${headerGroups[0].headers.length},minmax(${
          minColWidth ?? "110px"
        },1fr))`}
        width="100%"
        height="320px"
        sx={scrollStyles}
      >
        {headerGroups.map((headerGroup) => {
          return headerGroup.headers.map((column, idx) => {
            return (
              <Box
                {...column.getHeaderProps()}
                key={`${idx}`}
                position="absolute"
                top="-0.001px"
                bg="diamond.gray.0"
                pt="12px"
                pb="12px"
                fontSize="sm"
                borderBottom="0.5px solid"
                borderColor="diamond.gray.3"
                fontWeight="bold"
                sx={{
                  pl: idx === 0 && "17px",
                  pr: idx === headerGroup.headers.length - 1 && "17px",
                }}
              >
                {column.render("Header")}
              </Box>
            );
          });
        })}
        {rows.map((row, i) => {
          prepareRow(row);
          return row.cells.map((cell, idx) => {
            return (
              <Box
                {...cell.getCellProps()}
                key={`${i}-${idx}`}
                sx={{
                  color: "diamond.gray.5",
                  pt: "13px",
                  pb: "13px",
                  pl: idx === 0 && "17px",
                  pr: idx === row.cells.length - 1 && "17px",
                  bg: i % 2 ? "diamond.gray.0" : "diamond.white",
                }}
              >
                {cell.render("Cell")}
              </Box>
            );
          });
        })}
      </Box>
    </Box>
  );
}
