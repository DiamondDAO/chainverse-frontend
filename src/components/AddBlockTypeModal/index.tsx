import {
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,
  Text,
  Box,
  Grid,
  Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
  useToast,
  Button,Input, Select,
  FormControl,FormLabel,FormErrorMessage,FormHelperText,
} from "@chakra-ui/react";
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';
import React, { FC, useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { TipDrawer } from "./TipDrawer";
import { Pill } from "../Pill";
import { TagIcon } from "../Icons/TagIcon";
import { EntitiesIcon } from "../Icons/EntitiesIcon";
import { LinkSourceModal } from "./LinkSourceModal";
import { NoteBlockModal } from "./NoteBlockModal";
import { useAccount } from "wagmi";
import { useMutation } from "@apollo/client";
import {
  CREATE_NOTES, UPDATE_NOTES,
  CREATE_PARTNERSHIPS, UPDATE_PARTNERSHIPS
} from "@/services/Apollo/Mutations";
import {
  GET_ALL_NOTES,GET_NOTES,
  GET_PARTNERSHIPS, GET_ALL_PARTNERSHIPS,
  GET_TAGS_AND_ENTITIES,
} from "@/services/Apollo/Queries";
import { bodyText, subText } from "@/theme";
import { getCaretPosition, getCaretCoordinates } from "./utils";
import * as styles from "./styles";

enum submitBlockAction {
  Add = "add",
  Update = "update",
}

interface IAddBlockTypeModal {
  tags: string[];
  entities: string[];
  isOpen: boolean;
  onClose: () => void;
  nodeData?: any;
  saveToWorkspaceFn?: (data: any) => Promise<void>;
  blockType: string[];
}
export const AddBlockTypeModal: FC<IAddBlockTypeModal> = ({
  tags,
  entities,
  isOpen,
  onClose,
  nodeData,
  saveToWorkspaceFn,
  blockType,
}) => {
  const toast = useToast();
  const [{ data: walletData }] = useAccount();

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

  const [addNoteBlock, { error: addNoteBlockError }] = useMutation(CREATE_NOTES, {
    refetchQueries: [
      {
        query: GET_NOTES,
        variables: { where: { address: walletData?.address } },
      },
      { query: GET_TAGS_AND_ENTITIES },
      { query: GET_ALL_NOTES },
    ],
  });

  const [updateNoteBlock, { error: updateNoteBlockError }] = useMutation(UPDATE_NOTES, {
    refetchQueries: [
      {
        query: GET_NOTES,
        variables: { where: { address: walletData?.address } },
      },
      { query: GET_TAGS_AND_ENTITIES },
      { query: GET_ALL_NOTES },
    ],
  });

  const [addPartnershipBlock, { error: addPartnershipBlockError }] = useMutation(CREATE_PARTNERSHIPS, {
    refetchQueries: [
      {
        query: GET_PARTNERSHIPS,
        variables: { where: { address: walletData?.address } },
      },
      { query: GET_TAGS_AND_ENTITIES },
      { query: GET_ALL_PARTNERSHIPS },
    ],
  });

  const [updatePartnershipBlock, { error: updatePartnershipBlockError }] = useMutation(UPDATE_PARTNERSHIPS, {
    refetchQueries: [
      {
        query: GET_PARTNERSHIPS,
        variables: { where: { address: walletData?.address } },
      },
      { query: GET_TAGS_AND_ENTITIES },
      { query: GET_ALL_PARTNERSHIPS },
    ],
  });

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

  const [partnershipType, setPartnershipType] = useState("");

  const submitBlockHandler = async ({
    action,
  }: {
    action: submitBlockAction;
  }) => {
    // regex for tags & entities in block text
    const tags =
      inputRef.current.innerText
        .match(/#(?=\S*[-]*)([a-zA-Z0-9'-]+)/g)
        ?.map((i) => ({
          where: { node: { tag: i.slice(1) } },
          onCreate: { node: { tag: i.slice(1) } },
        })) || [];
    const entity =
      inputRef.current.innerText
        .match(/@(?=\S*[-]*)([a-zA-Z0-9'-]+)/g)
        ?.map((i) => ({
          where: { node: { name: i.slice(1) } },
          onCreate: { node: { name: i.slice(1) } },
        })) || [];
    const sourceList =
      sources.map((i) => ({
          where: { node: { source: i} },
          onCreate: { node: { source: i} },
        })) || [];
    const partnershipTypeName =
      {where: { node: { partnershipType} }}
    try {
      setAddingBlock(true);
      let blockResult = null;
      if (action === submitBlockAction.Add) {
        // creating block in db
        if (blockType === "Note") {
          blockResult = await addNoteBlock({
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
                  sources: {
                    connectOrCreate: sourceList,
                  },
                },
              ],
            },
          });
        } else if (blockType === "Partnership") {
          blockResult = await addPartnershipBlock({
            variables: {
              input: [
                {
                  text: inputRef.current?.innerText,
                  type: partnershipType,
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
                  sources: {
                    connectOrCreate: sourceList,
                  },
                },
              ],
            },
          });
          console.log("PARNTERSHIP BlockResult ----- " + JSON.stringify(blockResult))
        }
      } else if (action === submitBlockAction.Update) {
        // updating block in db
        if (blockType === "Note") {
          await updateNoteBlock({
            variables: {
              update: {},
              where: { uuid: nodeData.uuid },
              disconnect: {
                tags: [
                  {
                    where: {
                      node_NOT: { uuid: "0" },
                    },
                  },
                ],
                entities: [
                  {
                    where: {
                      node_NOT: { name: "" },
                    },
                  },
                ],
                sources: [
                  {
                    where: {
                      node_NOT: { uuid: "0" },
                    },
                  },
                ],
              },
            },
          });
        } else if (blockType === "Partnership") {
          await updatePartnershipBlock({
            variables: {
              update: {},
              where: { uuid: nodeData.uuid },
              disconnect: {
                tags: [
                  {
                    where: {
                      node_NOT: { uuid: "0" },
                    },
                  },
                ],
                entities: [
                  {
                    where: {
                      node_NOT: { name: "" },
                    },
                  },
                ],
                sources: [
                  {
                    where: {
                      node_NOT: { uuid: "0" },
                    },
                  },
                ],
              },
            },
          });
        }
        blockResult = await updatePartnershipBlock({
          variables: {
            update: {
              text: inputRef.current?.innerText,
              type: partnershipType,
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
              sources: {
                connectOrCreate: sourceList,
              },
            },
            where: { uuid: nodeData.uuid },
          },
        });
      }
      // save block to workspace if fn exists

      if (blockType === "Note") {
        saveToWorkspaceFn &&
          saveToWorkspaceFn({
            ...blockResult?.data?.createNotes?.notes?.[0],
            walletAddress: walletData?.address,
          });
        closeHandler();
      } else if (blockType === "Partnership") {
        saveToWorkspaceFn &&
          saveToWorkspaceFn({
            ...blockResult?.data?.createPartnerships?.partnerships?.[0],
            walletAddress: walletData?.address,
          });
        closeHandler();
      }

      toast({
        title: `Block ${nodeData ? "Saved" : "Created"}!`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: `There was an error when ${
          action === submitBlockAction.Add ? "creating" : "updating"
        }  your block. Please try again.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setAddingBlock(false);
  };
  const [noteEntitySelection, setNoteEntitySelection] = React.useState<Option[]>([]);
  const [noteTagSelection, setNoteTagSelection] = React.useState<Option[]>([]);
  const [partnerEntitySelection, setPartnerEntitySelection] = React.useState<Option[]>([]);
  const [partnerTagSelection, setPartnerTagSelection] = React.useState<Option[]>([]);

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
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
                {nodeData ? "Edit" : "Create"} a {blockType} block
              </Text>
            </ModalHeader>
            <ModalBody padding={0}>
              <Box sx={styles.ModalBodyStyle}>
                <Grid gridTemplateRows={"11fr 1fr"}>
                  {blockType === "Entity" && (
                    <FormControl>
                      <FormLabel htmlFor='entity-name'>Entity name</FormLabel>
                      <Input id='entity-name' sx={styles.InputStyle}/>
                      <FormLabel htmlFor='entity-location'>Entity location</FormLabel>
                      <Input id='entity-location' sx={styles.InputStyle}/>
                    </FormControl>
                  )}
                  {blockType === "Note" && (
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
                        sources={sources}
                      />
                    </FormControl>
                  )}
                  {blockType === "Partnership" && (
                    <FormControl>
                      <FormLabel htmlFor='partner-type'>Partnership Type</FormLabel>
                      <Select
                        value = {partnershipType}
                        placeholder='Select option'
                        sx={styles.InputStyle}
                        onChange={e => setPartnershipType(e.target.value)}>
                          <option value='Financial'>Financial</option>
                          <option value='Integration'>Integration</option>
                          <option value='Marketing'>Marketing</option>
                          <option value='Technological'>Technological</option>
                        >
                      </Select>
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
                        sources={sources}
                      />
                    </FormControl>
                  )}
                </Grid>
              </Box>
            </ModalBody>
            <ModalFooter sx={styles.ModalFooter(clickedTip)}>
              <Button onClick={closeHandler} variant="neutral">
                Cancel
              </Button>
              <Button
                isDisabled={!Boolean(inputRef.current?.innerText)}
                isLoading={addingBlock}
                onClick={() =>
                  submitBlockHandler({
                    action: nodeData
                      ? submitBlockAction.Update
                      : submitBlockAction.Add,
                  })
                }
                variant="primary"
              >
                Save Block
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
