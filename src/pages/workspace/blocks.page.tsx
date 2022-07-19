import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import {
  Box,
  StylesProvider,
  Text,
  useDisclosure,
  Menu,MenuButton,MenuDivider,MenuGroup,MenuItem,MenuList,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { bodyText, subText } from "@/theme";
import { Layout } from "@/components/Layout";
import { AddBlockTypeModal } from "@/components/AddBlockTypeModal";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { FilterMenu, FilterTypes } from "@/components/Workspace/FilterMenu";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { EntityDrawer } from "@/components/Drawers/EntityDrawer";
import { NoteBlockDrawer } from "@/components/Drawers/NoteBlockDrawer";
import { PartnershipBlockDrawer } from "@/components/Drawers/PartnershipBlockDrawer";
import { useLazyQuery } from "@apollo/client";
import {
  GET_ALL_BLOCKS,
  GET_ALL_CREATED,
  GET_TAGS_AND_ENTITIES,
} from "@/services/Apollo/Queries";

import { useAddBlock, useDeleteBlock, useTagsAndEntities } from "@/common/hooks";
import { Loader } from "@/components/Loader";
import * as styles from "./styles";

const AllBlocks: NextPage = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: noteBlockDrawerIsOpen,
    onOpen: noteBlockDrawerOnOpen,
    onClose: noteBlockDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: partnershipBlockDrawerIsOpen,
    onOpen: partnershipBlockDrawerOnOpen,
    onClose: partnershipBlockDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: entityDrawerIsOpen,
    onOpen: entityDrawerOnOpen,
    onClose: entityDrawerOnClose,
  } = useDisclosure();

  const [{ data: walletData }] = useAccount();
  const refetch = [
    {
      query: GET_ALL_BLOCKS,
      variables: { where: { address: walletData?.address } }
    },
    GET_TAGS_AND_ENTITIES,
  ]
  const { addBlockHandler } = useAddBlock(walletData);
  const { deleteBlockHandler, deleteEntityHandler } = useDeleteBlock(refetch);
  const { tags, entities } = useTagsAndEntities();
  const [currentNode, setCurrentNode] = useState(null);
  const filteredTagsState = useState<string[]>([]);
  const filteredEntitiesState = useState<string[]>([]);
  
  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState("")
  
  const [getNotes, { data }] = useLazyQuery(GET_ALL_CREATED);
  const blockCount = useMemo(
    () => (data?.wallets[0].blocks.length + data?.wallets[0].entities.length),
    [data]
  );
    
  console.log("WHAT IS DATA?.WALLETS ---" + JSON.stringify(data?.wallets))
    
  useEffect(() => {
    if (walletData?.address) {
      getNotes({ variables: { where: { address: walletData.address } } });
    }
  }, [getNotes, walletData?.address]);

  return (
    <>
      <Layout>
        <Box sx={styles.Container}>
          <Box sx={styles.HeaderContainer}>
            <Text sx={styles.HeaderText}>Your Blocks</Text>
            <Text sx={styles.HeaderSubText}>
              You’ve created a total of {blockCount} blocks.
            </Text>
          </Box>
          <Box sx={styles.WorkspaceBody}>
            <Box sx={styles.WorkspaceSidebar}>
              <WorkspaceNavigator />
              <Menu gutter={15} offset={[15, 12]}>
                <MenuButton sx={styles.MenuButton} as={Box}>
                  <Box sx={styles.MenuContents}>
                    <AddBlockIcon/>
                    <Text ml="4px">Add block</Text>
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuGroup ml="12.8" title="Block types">
                    {blockTypes.map((type, idx) => (
                      <MenuItem key={idx} onClick={() => {
                          setBlockType(type)
                          onOpen()
                        }}>
                        <Box sx={styles.MenuContents}>
                          <Text ml="5px">{type}</Text>
                        </Box>
                      </MenuItem>
                    ))}
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <Box display="flex" sx={{ columnGap: "4px" }}>
                <FilterMenu
                  filteredItemState={filteredTagsState}
                  data={tags}
                  type={FilterTypes.Tags}
                />
                <FilterMenu
                  filteredItemState={filteredEntitiesState}
                  data={entities}
                  type={FilterTypes.Entities}
                />
              </Box>
              <Box>
                <Box sx={styles.BlockPageBody}>
                  {/*{data?.wallets[0].blocks.filter((noteData) => {
                      let tagFlag = true;
                      let entitiyFlag = true;
                      if (filteredTagsState[0].length !== 0) {
                        tagFlag = filteredTagsState[0].reduce(
                          (flag, currentTag) => {
                            return (
                              flag &&
                              noteData.tags
                                .map((i) => i.tag)
                                .includes(currentTag)
                            );
                          },
                          tagFlag
                        );
                      }
                      if (filteredEntitiesState[0].length !== 0) {
                        entitiyFlag = filteredEntitiesState[0].reduce(
                          (flag, currentEntitiy) => {
                            return (
                              flag &&
                              noteData.entities
                                .map((i) => i.name)
                                .includes(currentEntitiy)
                            );
                          },
                          entitiyFlag
                        );
                      }
                      return tagFlag && entitiyFlag;
                    })*/}
                    {data?.wallets[0].blocks
                    .map((block, idx) => {
                      return (
                        <Box
                          onClick={() => {
                            setCurrentNode(block);
                            if (block.__typename === "Note") {noteBlockDrawerOnOpen()}
                            else if (block.__typename === "Partnership") {partnershipBlockDrawerOnOpen()}
                          }}
                          key={idx}
                          sx={styles.BlockItem}
                        >
                          <Box fontSize={bodyText} fontWeight="500" mr="4px">
                            {block.__typename} Block
                          </Box>
                          <Box>
                            <AddPillsToText text={block.text} />
                          </Box>
                        </Box>
                      );
                    })}
                    {data?.wallets[0].entities
                    .map((block, idx) => {
                      return (
                        <Box
                          onClick={() => {
                            setCurrentNode(block);
                            entityDrawerOnOpen()
                          }}
                          key={idx}
                          sx={styles.BlockItem}
                        >
                          <Box fontSize={bodyText} fontWeight="500" mr="4px">
                            {block.__typename}: {block.name}
                          </Box>
                          <Box>
                            Chain: {block.network}
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
          <NoteBlockDrawer
            nodeData={currentNode?.__typename == "Note" && currentNode}
            isOpen={noteBlockDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              noteBlockDrawerOnClose();
            }}
            actions={{
              addBlockToWorkspace: addBlockHandler,
                editBlock: () => {
                  onOpen();
                  setBlockType('Note');
                },
              deleteBlock: deleteBlockHandler }}
          />
          <PartnershipBlockDrawer
            nodeData={currentNode?.__typename == "Partnership" && currentNode}
            isOpen={partnershipBlockDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              partnershipBlockDrawerOnClose();
            }}
            actions={{
              addBlockToWorkspace: addBlockHandler,
                editBlock: () => {
                  onOpen();
                  setBlockType('Partnership');
                },
              deleteBlock: deleteBlockHandler }}
          />
          <EntityDrawer
            nodeData={currentNode?.__typename == "Entity" && currentNode}
            isOpen={entityDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              entityDrawerOnClose();
            }}
              actions={{
                editBlock: () => {
                  onOpen();
                  setBlockType('Entity');
                },
                deleteBlock: deleteEntityHandler
              }}
          />
          <AddBlockTypeModal
            tags={tags}
            nodeData={isOpen && currentNode}
            entities={entities}
            isOpen={isOpen}
            onClose={onClose}
            blockType={blockType}
          />
        </Box>
      </Layout>
    </>
  );
};

export default AllBlocks;
