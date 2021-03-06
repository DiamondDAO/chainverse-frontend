import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Box,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SaveBlockButton } from "../Buttons/SaveBlockButton";
import Fuse from "fuse.js";

import { TipDrawer } from "./TipDrawer";
import { Pill } from "../Pill";
import { TagIcon } from "../Icons/TagIcon";
import { EntitiesIcon } from "../Icons/EntitiesIcon";
import { LinkSourceModal } from "./LinkSourceModal";
import { useAccount } from "wagmi";
import { useMutation } from "@apollo/client";
import { CREATE_NOTES } from "@/services/Apollo/Mutations";
import { GET_NOTES, GET_TAGS_AND_ENTITIES } from "@/services/Apollo/Queries";

// node_walk: walk the element tree, stop when func(node) returns false
function node_walk(node, func) {
  var result = func(node);
  for (
    node = node.firstChild;
    result !== false && node;
    node = node.nextSibling
  )
    result = node_walk(node, func);
  return result;
}

// getCaretPosition: return [start, end] as offsets to elem.textContent that
//   correspond to the selected portion of text
//   (if start == end, caret is at given position and no text is selected)
function getCaretPosition(elem) {
  var sel = window.getSelection();
  var cum_length = [0, 0];
  //@ts-ignore
  if (sel.anchorNode == elem) cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    //@ts-ignore

    var nodes_to_find = [sel.anchorNode, sel.extentNode];
    //@ts-ignore

    if (!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
      return undefined;
    else {
      var found = [0, 0];
      var i;
      node_walk(elem, function (node) {
        for (i = 0; i < 2; i++) {
          if (node == nodes_to_find[i]) {
            //@ts-ignore

            found[i] = true;
            if (found[i == 0 ? 1 : 0]) return false; // all done
          }
        }

        if (node.textContent && !node.firstChild) {
          for (i = 0; i < 2; i++) {
            if (!found[i]) cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      //@ts-ignore

      cum_length[1] += sel.extentOffset;
    }
  }
  if (cum_length[0] <= cum_length[1]) return cum_length[1];
  return cum_length[1];
}

const getCaretCoordinates = () => {
  let x, y;
  const selection = window.getSelection();
  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    let rect = range.getClientRects()[0];
    if (!rect) {
      // when range is empty, we need to set something so that a rect exists
      try {
        range?.setEnd(selection.anchorNode, 1);
      } catch (e) {}
      rect = range.getClientRects()[0];
    }
    x = rect?.left;
    y = rect?.top || 149;
    return { x, y };
  }
};
export const AddBlockModal = ({ tags, entities, isOpen, onClose }) => {
  // States
  const [clickedTip, setClickedTip] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setClickedTip(false);
      setVisible(false);
      setDialogStartPosition(0);
    }
  }, [isOpen]);

  // Animations

  const position = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [dialogStartPosition, setDialogStartPosition] = useState(0);
  const [activationChar, setActivationChar] = useState("");
  const [source, setSource] = useState("");
  const [_, setTextArea] = useState("");
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
  const [pillText, setPillText] = useState("");
  const inputRef = useRef(null);

  const [{ data: walletData }] = useAccount();
  const [addBlock, { error }] = useMutation(CREATE_NOTES, {
    refetchQueries: [GET_NOTES, GET_TAGS_AND_ENTITIES],
  });
  const [addingBlock, setAddingBlock] = useState(false);
  const toast = useToast();

  const submitBlockHandler = async () => {
    const tags =
      inputRef.current.innerText
        .match(/#(?=\S*[-]*)([a-zA-Z'-]+)/g)
        ?.map((i) => ({
          where: { node: { text: i.slice(1) } },
          onCreate: { node: { text: i.slice(1) } },
        })) || [];

    const entity =
      inputRef.current.innerText
        .match(/@(?=\S*[-]*)([a-zA-Z'-]+)/g)
        ?.map((i) => ({
          where: { node: { name: i.slice(1) } },
          onCreate: { node: { name: i.slice(1) } },
        })) || [];
    try {
      setAddingBlock(true);
      await addBlock({
        variables: {
          input: [
            {
              text: inputRef.current?.innerText,
              wallet: {
                connect: {
                  where: {
                    node: {
                      address: walletData?.address,
                    },
                  },
                },
              },
              entities: {
                connectOrCreate: entity,
              },

              tags: {
                connectOrCreate: tags,
              },
              ...(source && {
                sources: {
                  connectOrCreate: {
                    where: { node: { url: source } },
                    onCreate: { node: { url: source } },
                  },
                },
              }),
            },
          ],
        },
      });
      inputRef.current.innerText = "";
      setSource("");
      onClose();
      toast({
        title: "Block created!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "There was an error when creating your block. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setAddingBlock(false);
  };

  const inputHandler = (e) => {
    if (visible) {
      setPillText(
        inputRef.current?.innerText
          .slice(dialogStartPosition)
          .match(/[@#](?=\S*[-]*)([a-zA-Z'-]+)/g)?.[0]
          ?.slice(1)
      );
    }
    setTextArea(inputRef.current.innerText);
  };
  const tagFuse = new Fuse(tags, {
    includeScore: false,
  });
  const entityFuse = new Fuse(entities, {
    includeScore: false,
  });

  return (
    <>
      <Modal
        onEsc={onClose}
        blockScrollOnMount={false}
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        useInert={false}
      >
        <ModalOverlay bg="rgba(67, 108, 146, 0.8)" />
        <ModalContent alignItems={"center"} bg="transparent" boxShadow="none">
          <Box>
            <ModalHeader px="0">
              <Text fontWeight="500" fontSize="1.25rem" color="diamond.white">
                Create a knowledge block
              </Text>
            </ModalHeader>
            <ModalBody padding={0}>
              <Box
                position="relative"
                width={["90vw", null, "600px"]}
                height="300px"
                bg="diamond.white"
                border="1px solid black"
                borderRadius="5px"
                boxShadow={"0px 8px 20px rgba(0, 0, 0, 0.15)"}
                p="24px"
              >
                <Grid gridTemplateRows={"11fr 1fr"}>
                  <Box
                    position="fixed"
                    top={position.current?.y + 10}
                    left={position.current?.x}
                    display={visible ? "block" : "none"}
                  >
                    <Popover placement="bottom-start" isOpen>
                      <PopoverTrigger>
                        <Box
                          display={visible ? "flex" : "none"}
                          position="fixed"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        border="1px solid #C3C3C3"
                        borderRadius={"5px"}
                        boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.25)"}
                        p="12px"
                      >
                        <PopoverHeader border="0">
                          <Box
                            display="flex"
                            alignItems="center"
                            fontWeight="500"
                            fontSize="16px"
                            color="diamond.blue.5"
                          >
                            <Box mr="4px">+ Create</Box>
                            <Pill
                              onClick={onClickPillHandler}
                              asButton
                              icon={
                                (activationChar === "@" && <EntitiesIcon />) ||
                                (activationChar === "#" && <TagIcon />)
                              }
                            >
                              <Text fontSize="14px" fontWeight="400">
                                {pillText}
                              </Text>
                            </Pill>
                          </Box>
                        </PopoverHeader>
                        <PopoverBody>
                          {activationChar == "@" && (
                            <Box fontWeight="400">
                              <Text color="diamond.gray.3" fontSize="10px">
                                ENTITIES
                              </Text>
                              {entityFuse
                                ?.search(pillText ?? "")
                                .map((i) => i.item)
                                .map((tag: string) => (
                                  <Pill
                                    key={tag}
                                    onClick={onClickPillHandler}
                                    asButton
                                    icon={<EntitiesIcon />}
                                  >
                                    <Text
                                      color="diamond.blue.5"
                                      fontSize="14px"
                                    >
                                      {tag}
                                    </Text>
                                  </Pill>
                                ))}
                            </Box>
                          )}
                          {activationChar === "#" && (
                            <Box fontWeight="400" mt="15px">
                              <Text color="diamond.gray.3" fontSize="10px">
                                TAGS
                              </Text>
                              {tagFuse
                                ?.search(pillText ?? "")
                                .map((i) => i.item)
                                .map((tag: string) => (
                                  <Pill
                                    key={tag}
                                    onClick={onClickPillHandler}
                                    asButton
                                    icon={<TagIcon />}
                                  >
                                    <Text
                                      color="diamond.blue.5"
                                      fontSize="14px"
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
                    contentEditable
                    p="0"
                    pb="4px"
                    resize="none"
                    border="none"
                    width="100%"
                    height="100%"
                    maxH="250px"
                    overflow="scroll"
                    _focus={{ border: "none", outline: "none" }}
                    placeholder="Type # to insert"
                    fontSize=".875rem"
                  />

                  <LinkSourceModal
                    source={source}
                    setSource={setSource}
                    textAreaValue={inputRef.current?.innerText}
                  />
                </Grid>
              </Box>
            </ModalBody>
            <ModalFooter px="0" display={clickedTip ? "none" : "flex"}>
              <SaveBlockButton
                isLoading={addingBlock}
                onClick={submitBlockHandler}
                bg={
                  inputRef.current?.innerText
                    ? "diamond.blue.5"
                    : "diamond.gray.2"
                }
              />
            </ModalFooter>
          </Box>
        </ModalContent>
        <TipDrawer clickedTip={clickedTip} setClickedTip={setClickedTip} />
      </Modal>
    </>
  );
};
