import { Box, Select, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {}

export const DateFilter = (props: Props) => {
  const dates = ["7d", "1mo", "3mo", "All"];
  const [selected, setSelected] = useState("7d");
  const isLarge = useBreakpointValue({ lg: true });
  return (
    <Box
      borderLeft={"0.5px solid"}
      borderColor="diamond.gray.2"
      sx={{
        display: "flex",
        py: "2px",
        pl: "8px",
        pr: "13px",
        alignItems: "center",
      }}
    >
      <Text sx={{ py: "5px", mr: "3px" }}>Date range:</Text>
      {isLarge &&
        dates.map((date) => {
          const isSelected = selected === date;
          return (
            <Box
              key={date}
              background={isSelected ? "diamond.blue.0" : "diamond.white"}
              cursor="pointer"
              sx={{
                px: "4px",
                py: "5px",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              <Text width="35px" onClick={() => setSelected(date)}>
                {date}
              </Text>
            </Box>
          );
        })}
      {!isLarge && (
        <Select
          background={"diamond.blue.0"}
          variant="none"
          size="sm"
          width="max-content"
          sx={{
            "&": {
              paddingRight: "30px",
              paddingLeft: "10px",
              width: "max-content",
            },
            borderRadius: "5px",
          }}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          {dates.map((date) => {
            return (
              <option key={date} value={date}>
                {date}
              </option>
            );
          })}
        </Select>
      )}
    </Box>
  );
};
