import React, { FC } from "react";
import reactStringReplace from "react-string-replace";
import { EntitiesIcon } from "../Icons/EntitiesIcon";
import { TagIcon } from "../Icons/TagIcon";
import { Pill } from "../Pill";

interface IAddPillsToText {
  text: string;
}

export const AddPillsToText: FC<IAddPillsToText> = ({ text }) => {
  return (
    <>
      {reactStringReplace(
        reactStringReplace(text, /#(?=\S*[-]*)([a-zA-Z-]+)/g, (match, i) => (
          <Pill sx={{ p: 0 }} icon={<TagIcon />} key={i + match}>
            {match}
          </Pill>
        )),
        /@(?=\S*[-]*)([a-zA-Z-]+)/g,
        (match, i) => (
          <Pill icon={<EntitiesIcon />} key={i + match}>
            {match}
          </Pill>
        )
      )}
    </>
  );
};
