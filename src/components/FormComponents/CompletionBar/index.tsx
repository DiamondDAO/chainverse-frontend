import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

import * as styles from "./styles";

const Diamond = ({ complete }: { complete: boolean }) => (
  <Box
    sx={styles.DiamondSVGStyle}
    as="svg"
    viewBox="0 0 57 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.1494 3.21682L12.0593 16.0701L28.5858 39.9075C28.591 39.9151 28.6029 39.9114 28.6029 39.9021V16.0701L19.1494 3.21682Z"
      stroke={complete ? "#1C4265" : "#9B9B9B"}
      strokeWidth="3"
    />
    <path
      d="M38.4507 3.21682L45.5408 16.1412L29.0144 40.1102C29.0091 40.1178 28.9972 40.1141 28.9972 40.1048V16.1412L38.4507 3.21682Z"
      stroke={complete ? "#1C4265" : "#9B9B9B"}
      strokeWidth="3"
    />
    <path
      d="M29.588 43.9895L3 15.6578L14.6199 2H28.8002"
      stroke={complete ? "#1C4265" : "#9B9B9B"}
      strokeWidth="3"
    />
    <path
      d="M28.0119 43.9895L54.5999 15.6578L42.9799 2H28.7997"
      stroke={complete ? "#1C4265" : "#9B9B9B"}
      strokeWidth="3"
    />
    <path
      d="M3 15.5873L54.2065 15.1851"
      stroke={complete ? "#1C4265" : "#9B9B9B"}
      strokeWidth="3"
    />
    <rect
      x="28.5969"
      y="44.5978"
      width="0.405713"
      height="0.402168"
      fill="#1C4265"
    />
  </Box>
);
interface ICompletionBar {
  stepArray: string[];
  currentStep: number;
}
export const CompletionBar: FC<ICompletionBar> = ({
  stepArray,
  currentStep,
}) => {
  return (
    <Box sx={styles.CompletionBarContainer}>
      {stepArray.map((title, idx) => (
        <React.Fragment key={idx}>
          {idx !== 0 && <Box as="span" sx={styles.CompletionBarLine} />}
          <Diamond complete={idx <= currentStep} />
          <Box sx={styles.CompletionBarText(idx, currentStep)}>{title}</Box>
        </React.Fragment>
      ))}
    </Box>
  );
};
