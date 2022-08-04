import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import reactStringReplace from "react-string-replace";
import { EntitiesIcon } from "../Icons/EntitiesIcon";
import { TagIcon } from "../Icons/TagIcon";
import { Pill } from "../Pill";
import balanced from './../../common/utils/balanced'

interface IAddPillsToText {
  text: string;
}

export const AddPillsToText: FC<IAddPillsToText> = ({ text }) => {
  return (
    <Box>
      {reactStringReplace(
        reactStringReplace(text, /#(?=\S*[-]*)([a-zA-Z0-9'-]+)/g, (match, i) => (
          <Pill
            verticalAlign="middle"
            m="1px"
            icon={<TagIcon />}
            key={i + match}
          >
            {match}
          </Pill>
        )),
        /[[][[](?=\S*[-]*)([a-zA-Za\szA\sZ0-9'-]+)]]/g, (match, i) => (
          <Pill 
            verticalAlign="middle"
            m="1px"
            icon={<EntitiesIcon />}
            key={i + match}
          >
            {match}
          </Pill>
        )
      )}
    </Box>
  );
};
