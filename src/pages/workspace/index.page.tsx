import type { NextPage } from 'next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
} from '@/services/Apollo/Queries';
import {
  ADD_SANDBOX_TO_WALLET,
  CREATE_WORKSPACES,
  DELETE_NOTES,
  DELETE_PARTNERSHIPS,
  DELETE_ENTITIES,
  RESET_SANDBOX,
  UPDATE_SANDBOX,
} from '@/services/Apollo/Mutations';

import { filterUniqueObjects } from '@/common/utils';
import { bodyText, subText } from '@/theme';
import * as styles from './styles';
const Workspace: NextPage = () => {
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

  const [currentNode, setCurrentNode] = useState(null);
  const [date, setDate] = useState('');
  const [{ data: walletData }] = useAccount();
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);

  const [addSandboxToWallet, { error: addBlockError }] = useMutation(
    ADD_SANDBOX_TO_WALLET,
    {
      refetchQueries: [],
    }
  );
  const [getSandbox, { data: sandboxData, loading }] = useLazyQuery(
    GET_SANDBOX,
    { fetchPolicy: `network-only` }
  );
  const [addBlockToSandbox, { error: addBlockToSandboxError }] = useMutation(
    UPDATE_SANDBOX,
    {
      refetchQueries: [
        {
          query: GET_SANDBOX,
          variables: {
            where: { wallet: { address: walletData?.address } },
            directed: false,
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
  const toast = useToast();
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    const connectOrCreateSandbox = async (walletAddress: string) => {
      const Sandbox = await getSandbox({
        variables: {
          where: { wallet: { address: walletAddress } },
        },
      });
      if (Sandbox.data.sandboxes.length === 0) {
        await addSandboxToWallet({
          variables: {
            where: { address: walletAddress },
            connectOrCreate: {
              sandbox: {
                where: {
                  node: { name: `${walletAddress} Sandbox` },
                },
                onCreate: {
                  node: {
                    name: `${walletAddress} Sandbox`,
                  },
                },
              },
            },
          },
        });
      }
    };
    if (walletData?.address) {
      connectOrCreateSandbox(walletData.address);
    }
  }, [getSandbox, walletData?.address]);

  const entityData = useMemo(
    () => sandboxData?.sandboxes[0]?.entities,
    [sandboxData?.sandboxes[0]?.entities]
  );

  const notesData = useMemo(
    () =>
      sandboxData?.sandboxes[0]?.blocks.filter(
        (i) => i.__typename === 'Note' || i.__typename === 'Partnership'
      ),
    [sandboxData?.sandboxes[0]?.blocks]
  );

  const nodeData = useMemo(
    () => entityData?.concat(notesData),
    [entityData, notesData]
  );

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
  const [deleteNoteBlock, { error: deleteNoteBlockError }] = useMutation(
    DELETE_NOTES,
    {
      refetchQueries: [
        {
          query: GET_ALL_BLOCKS,
          variables: { where: { address: nodeData?.wallet?.address } },
        },
        GET_TAGS_AND_ENTITIES,
        { query: GET_ALL_BLOCKS },
      ],
    }
  );

  const [deletePartnershipBlock, { error: deletePartnershipBlockError }] =
    useMutation(DELETE_PARTNERSHIPS, {
      refetchQueries: [
        {
          query: GET_ALL_BLOCKS,
          variables: { where: { address: nodeData?.wallet?.address } },
        },
        GET_TAGS_AND_ENTITIES,
        { query: GET_ALL_BLOCKS },
      ],
    });

  const [deleteEntity, { error: deleteEntityError }] = useMutation(
    DELETE_ENTITIES,
    {
      refetchQueries: [
        {
          query: GET_ENTITIES_DATA,
          variables: { where: { address: nodeData?.wallet?.address } },
        },
        GET_TAGS_AND_ENTITIES,
      ],
    }
  );

  const deleteBlockHandler = async (block?: any) => {
    try {
      if (block.__typename === 'Note') {
        await deleteNoteBlock({
          variables: {
            where: { uuid: block.uuid },
          },
        });
        toast({
          title: 'Note Block Deleted!',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      } else if (block.__typename === 'Partnership') {
        await deletePartnershipBlock({
          variables: {
            where: { uuid: block.uuid },
          },
        });
        toast({
          title: 'Partnership Block Deleted!',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'There was an error when deleting your block. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
  };

  const deleteEntityHandler = async (block?: any) => {
    console.log('WHAT IS A BLOCK --- ' + JSON.stringify(block));
    try {
      await deleteEntity({
        variables: {
          where: { uuid: block.uuid },
        },
      });
      toast({
        title: 'Entity Block Deleted!',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'There was an error when deleting your entity. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
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
              filterUniqueObjects(tagAndEntitiesData?.tags, 'text')?.map(
                (i) => i.text
              ) || []
            }
            entities={
              filterUniqueObjects(tagAndEntitiesData?.entities, 'name')?.map(
                (i) => i.name
              ) || []
            }
            isOpen={isOpen}
            saveToWorkspaceFn={addBlockToSandboxHandler}
            onClose={(refresh) => {
              onClose();
              if(refresh) getSandbox()
            }}
            blockType={blockType}
            nodeData={currentNode}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Workspace;
