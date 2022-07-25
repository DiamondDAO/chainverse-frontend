import {
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,
  Text,
  Box,
  Grid,
  Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
  useToast,
  Button,
  FormControl,FormLabel,FormErrorMessage,FormHelperText,
  Input,
  Select,
} from "@chakra-ui/react";
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';
import React, { FC, useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Pill } from "src/components/Pill";
import { TagIcon } from "src/components/Icons/TagIcon";
import { EntitiesIcon } from "src/components/Icons/EntitiesIcon";
import { LinkSourceModal } from "../LinkSourceModal";
import * as styles from "./styles";
import { bodyText, subText } from "@/theme";
import { getCaretPosition, getCaretCoordinates } from "../utils";

interface INoteBlockModal {
  tags: string[];
  entities: string[];
  isOpen: boolean;
  onClose: () => void;
  nodeData?: any;
  saveToWorkspaceFn?: (data: any) => Promise<void>;
  blockType: string[];
}

export const NoteBlockModal: FC<INoteBlockModal> = ({
  tags,
  entities,
  isOpen,
  onClose,
  nodeData,
  saveToWorkspaceFn,
  blockType,
}) => {
  const toast = useToast();

  const [clickedTip, setClickedTip] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogStartPosition, setDialogStartPosition] = useState(0);
  const [activationChar, setActivationChar] = useState("");
  const [sources, setSources] = useState([]);
  const [addingBlock, setAddingBlock] = useState(false);
  const [pillText, setPillText] = useState("");

  const inputRef = useRef<HTMLDivElement>(null);
  const [_, setTextArea] = useState("");

  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) {
      setClickedTip(false);
      setVisible(false);
      setDialogStartPosition(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (nodeData?.sources) {
      setSources(nodeData.sources?.[0]?.source);
    }
  }, [nodeData?.sources]);

  const hashTagListener = (e) => {
    if (
      String.fromCharCode(e.which) === "#" ||
      (String.fromCharCode(e.which) === "@" && !visible)
    ) {
      setActivationChar(String.fromCharCode(e.which));
      setDialogStartPosition(getCaretPosition(inputRef.current));
      position.current = getCaretCoordinates();
      setVisible(true);
    }
  };

  const keyUpListener = (e) => {

    if (
      (visible && e.key === " ") ||
      e.key === "Enter" ||
      ".,?!".includes(e.key) ||
      getCaretPosition(inputRef.current) <= dialogStartPosition
    ) {
      setVisible(false);
      setDialogStartPosition(0);
    }
  };

  const onClickPillHandler = (e) => {

    const autoCompletedText = e.target.innerText;
    const currentTextLength = inputRef.current?.innerText
      .slice(dialogStartPosition)
      .split(" ")[0].length;

    inputRef.current.innerHTML =
      inputRef.current?.innerText.slice(0, dialogStartPosition) +
      activationChar +
      autoCompletedText +
      inputRef.current?.innerText.slice(
        dialogStartPosition + currentTextLength
      );

    setVisible(false);
    setDialogStartPosition(0);
  };
  const closeHandler = () => {
    inputRef.current.innerText = "";
    setSources([]);
    onClose();
  };

  const inputHandler = (e) => {
    if (visible) {
      setPillText(
        inputRef.current?.innerText
          .slice(dialogStartPosition)
          .match(/[@#](?=\S*[-]*)([a-zA-Z0-9'-]+)/g)?.[0]
          ?.slice(1)
      );
    }
    setTextArea(inputRef.current.innerText);
  };
  const tagFuse = new Fuse(tags, {
    includeScore: false,
    threshold: 0.3,
  });
  const entityFuse = new Fuse(entities, {
    includeScore: false,
    threshold: 0.3,
  });

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  const onHandleSaveSource = (sources: string[]) => {
    setSources([...sources])
  }

  return (
    <FormControl>
      <Box sx={styles.EntityTagDialog(position.current, visible)}>
        <Popover placement="bottom-start" isOpen>
          <PopoverTrigger>
            <Box sx={styles.PopoverTrigger(visible)} />
          </PopoverTrigger>
          <PopoverContent sx={styles.PopoverContent}>
            <PopoverHeader border="0">
              <Box sx={styles.PopoverHeader}>
                <Box mr="4px">+ Create</Box>
                <Pill
                  onClick={onClickPillHandler}
                  asButton
                  icon={
                    (activationChar === "@" && <EntitiesIcon />) ||
                    (activationChar === "#" && <TagIcon />)
                  }
                >
                  <Text fontSize={bodyText} fontWeight="400">
                    {pillText}
                  </Text>
                </Pill>
              </Box>
            </PopoverHeader>
            <PopoverBody>
              {activationChar == "@" && (
                <Box fontWeight="400">
                  <Text color="diamond.gray.3" fontSize={subText}>
                    ENTITIES
                  </Text>
                  {entityFuse
                    ?.search(pillText ?? "")
                    .slice(0, 5)
                    .map((i) => i.item)
                    .map((tag: string, idx) => (
                      <Pill
                        key={idx}
                        onClick={onClickPillHandler}
                        asButton
                      >
                        <Text
                          color="diamond.blue.5"
                          fontSize={bodyText}
                        >
                          {tag}
                        </Text>
                      </Pill>
                    ))}
                </Box>
              )}
              {activationChar === "#" && (
                <Box fontWeight="400" mt="15px">
                  <Text color="diamond.gray.3" fontSize={subText}>
                    TAGS
                  </Text>
                  {tagFuse
                    ?.search(pillText ?? "")
                    .slice(0, 5)
                    .map((i) => i.item)
                    .map((tag: string, idx) => (
                      <Pill
                        key={idx}
                        onClick={onClickPillHandler}
                        asButton
                      >
                        <Text
                          color="diamond.blue.5"
                          fontSize={bodyText}
                        >
                          {tag}
                        </Text>
                      </Pill>
                    ))}
                </Box>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <Box
        ref={inputRef}
        onKeyPress={hashTagListener}
        onKeyUp={keyUpListener}
        onInput={inputHandler}
        suppressContentEditableWarning={true}
        contentEditable
        data-placeholder="Type # to insert a tag, or @ to insert an entity or user"
        sx={styles.TextboxStyles}
      >
        {nodeData?.text}
      </Box>
      <LinkSourceModal
        onSave={onHandleSaveSource}
        sources={sources}
      />
    </FormControl>
  );
};
