import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Layout } from '@/components/Layout';
import { AddBlockTypeModal } from '@/components/AddBlockTypeModal';
import { CreateSnapshotIcon } from '@/components/Icons/CreateSnapshotIcon';
import { AddBlockIcon } from '@/components/Icons/AddBlockIcon';
import { WorkspaceNavigator } from '@/components/Workspace/WorkspaceNavigator';
import { Flow } from '@/components/Workspace/Flow';
import { NoteBlockDrawer } from '@/components/Drawers/NoteBlockDrawer';
import { PartnershipBlockDrawer } from '@/components/Drawers/PartnershipBlockDrawer';
import { EntityDrawer } from '@/components/Drawers/EntityDrawer';
import { Block } from '@/common/types';

import {
  GET_ALL_NOTES,
  GET_NOTES,
  GET_ALL_BLOCKS,
  GET_SANDBOX,
  GET_ENTITIES_DATA,
  GET_TAGS_AND_ENTITIES,
  GET_WORKSPACE_OWNED,
  GET_ALL_CREATED,
} from '@/services/Apollo/Queries';
import {
  ADD_SANDBOX_TO_WALLET,
  CREATE_WORKSPACES,
  DELETE_ENTITIES,
  DELETE_NOTES,
  DELETE_PARTNERSHIPS,
  RESET_SANDBOX,
  UPDATE_SANDBOX,
} from '@/services/Apollo/Mutations';

import { filterUniqueObjects } from '@/common/utils';
import { useDelete } from '@/common/hooks';
import { useGetSandboxData } from '@/common/hooks';
import { bodyText, subText } from '@/theme';
import * as styles from './styles';

const Workspace: NextPage = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  
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
  
  const [currentNode, setCurrentNode] = useState(null);
  const [date, setDate] = useState('');
  const [{ data: walletData }] = useAccount();
  const { nodeData, loading } = useGetSandboxData(walletData);
  const { deleteEntityHandler, deleteBlockHandler } = useDelete(walletData);
  console.log('nodeData::', nodeData)
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);

  // const [addSandboxToWallet, { error: addBlockError }] = useMutation(
  //   ADD_SANDBOX_TO_WALLET,
  //   {
  //     refetchQueries: [],
  //   }
  // );
  const [addBlockToSandbox, { error: addBlockToSandboxError }] = useMutation(
    UPDATE_SANDBOX,
    {
      refetchQueries: [
        {
          query: GET_SANDBOX,
          variables: {
            where: { wallet: { address: walletData?.address } },
            // directed: false,
          },
        },
      ],
    }
  );
  const [createWorkspace, { error: createWorkspaceError }] =
    useMutation(CREATE_WORKSPACES);
  const [resetSandbox, { error: resetSandboxError }] = useMutation(
    RESET_SANDBOX,
    {
      refetchQueries: [
        {
          query: GET_SANDBOX,
          variables: {
            where: { wallet: { address: walletData?.address } },
            directed: false,
          },
        },
        {
          query: GET_WORKSPACE_OWNED,
          variables: { where: { wallet: { address: walletData?.address } } },
        },
      ],
    }
  );

  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState('');

  const [rfInstance, setRfInstance] = useState(null);
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  const workspaceNameRef = useRef(null);
  const [isSavingWorkspace, setIsSavingWorkspace] = useState(false);

  const saveWorkspaceHandler = async () => {
    setIsSavingWorkspace(true);
    try {
      await createWorkspace({
        variables: {
          input: [
            {
              name: workspaceNameRef.current.innerText || '',
              rfObject: JSON.stringify(rfInstance?.toObject()),
              blocks: {
                Note: {
                  connect: {
                    where: {
                      node: {
                        uuid_IN: nodeData
                          .filter((node) => node.__typename === 'Note')
                          .map((node) => node.uuid),
                      },
                    },
                  },
                },
                Partnership: {
                  connect: {
                    where: {
                      node: {
                        uuid_IN: nodeData
                          .filter((node) => node.__typename === 'Partnership')
                          .map((node) => node.uuid),
                      },
                    },
                  },
                },
              },
              entities: {
                connect: {
                  where: {
                    node: {
                      uuid_IN: nodeData
                        .filter((node) => node.__typename === 'Entity')
                        .map((node) => node.uuid),
                    },
                  },
                },
              },
              wallet: {
                connect: { where: { node: { address: walletData?.address } } },
              },
            },
          ],
        },
      });
      await resetSandbox({
        variables: {
          disconnect: {
            blocks: {
              Note: [
                {
                  where: {
                    node: {
                      uuid_NOT: 0,
                    },
                  },
                },
              ],
              Partnership: [
                {
                  where: {
                    node: {
                      uuid_NOT: 0,
                    },
                  },
                },
              ],
            },
            entities: [
              {
                where: {
                  node: {
                    name_NOT: null,
                  },
                },
              },
            ],
          },
        },
      });
      toast({
        title: `Workspace ${workspaceNameRef.current.innerText} Created!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'There was an error when creating your workspace. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    setIsSavingWorkspace(false);
  };
  
  const addBlockToSandboxHandler = async (data?: any) => {
    try {
      if (data.__typename == 'Note') {
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: data?.walletAddress,
              },
            },
            connect: {
              blocks: {
                Note: [
                  {
                    where: {
                      node: {
                        uuid: data?.uuid,
                      },
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (data.__typename == 'Partnership') {
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: data?.walletAddress,
              },
            },
            connect: {
              blocks: {
                Partnership: [
                  {
                    where: {
                      node: {
                        uuid: data?.uuid,
                      },
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (data.__typename == 'Entity') {
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: data?.walletAddress,
              },
            },
            connect: {
              entities: [
                {
                  where: {
                    node: {
                      uuid: data?.uuid,
                    },
                  },
                },
              ],
            },
          },
        });
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <Layout>
        {/* Graph */}
        <Box sx={styles.GraphContainer}>
          {loading && <Box sx={styles.GraphLoading}>Loading...</Box>}
          {nodeData && (
            <Flow
              currentNode={currentNode}
              nodeData={nodeData}
              onInit={setRfInstance}
              setCurrentNode={(value) => {
                setCurrentNode(value);
                if (value.__typename === 'Note') {
                  noteBlockDrawerOnOpen();
                } else if (value.__typename === 'Partnership') {
                  partnershipBlockDrawerOnOpen();
                } else if (value.__typename === 'Entity') {
                  entityDrawerOnOpen();
                }
              }}
            />
          )}
        </Box>
        <Box sx={styles.Container}>
          <Box sx={styles.HeaderContainer}>
            <Text
              ref={workspaceNameRef}
              suppressContentEditableWarning={true}
              contentEditable
              sx={styles.HeaderText}
            >
              Your Sandbox
            </Text>

            <Text sx={styles.HeaderSubText} fontSize={subText}>
              Last updated: {date}
            </Text>
          </Box>
          <Box sx={styles.WorkspaceBody}>
            <Box sx={styles.WorkspaceSidebar}>
              <WorkspaceNavigator />
              <Menu gutter={15} offset={[15, 12]}>
                <MenuButton sx={styles.MenuButton} as={Box}>
                  <Box sx={styles.MenuContents}>
                    <AddBlockIcon />
                    <Text ml="4px">Add block</Text>
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuGroup ml="12.8" title="Block types">
                    {blockTypes.map((type, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          setBlockType(type);
                          onOpen();
                        }}
                      >
                        <Box sx={styles.MenuContents}>
                          <Text ml="5px">{type}</Text>
                        </Box>
                      </MenuItem>
                    ))}
                  </MenuGroup>
                </MenuList>
              </Menu>
              <Box mt="20px">
                <Button
                  isLoading={isSavingWorkspace}
                  isDisabled={isSavingWorkspace}
                  sx={styles.ButtonStyle}
                  onClick={saveWorkspaceHandler}
                  leftIcon={<CreateSnapshotIcon />}
                  variant="primary"
                >
                  Save as workspace
                </Button>
              </Box>
            </Box>
          </Box>
          <NoteBlockDrawer
            nodeData={currentNode?.__typename == 'Note' && currentNode}
            isOpen={noteBlockDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              noteBlockDrawerOnClose();
            }}
            actions={{
              editBlock: () => {
                onOpen();
                setBlockType('Note');
              },
              deleteBlock: deleteBlockHandler,
            }}
          />
          <PartnershipBlockDrawer
            nodeData={currentNode?.__typename == 'Partnership' && currentNode}
            isOpen={partnershipBlockDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              partnershipBlockDrawerOnClose();
            }}
            actions={{
              editBlock: () => {
                onOpen();
                setBlockType('Partnership');
              },
              deleteBlock: deleteBlockHandler,
            }}
          />
          <EntityDrawer
            nodeData={currentNode?.__typename == 'Entity' && currentNode}
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
              deleteBlock: deleteEntityHandler,
            }}
          />
          <AddBlockTypeModal
            tags={
              filterUniqueObjects(tagAndEntitiesData?.tags, 'tag')?.map(
                (i) => i.tag
              ) || []
            }
            entities={
              filterUniqueObjects(tagAndEntitiesData?.entities, 'name')?.map(
                (i) => i.name
              ) || []
            }
            isOpen={isOpen}
            saveToWorkspaceFn={addBlockToSandboxHandler}
            onClose={onClose}
            // onClose={(refresh) => {
            //   onClose();
            //   if(refresh){
            //     setTimeout(() => {
            //       window.location.reload()
            //     }, 700);
            //   }
            // }}
            blockType={blockType}
            nodeData={currentNode}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Workspace;
