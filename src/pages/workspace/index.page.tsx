import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';

import { GET_SANDBOX } from '@/services/Apollo/Queries';

import { Layout } from '@/components/Layout';
import { AddBlockTypeModal } from '@/components/AddBlockTypeModal';
import { CreateSnapshotIcon } from '@/components/Icons/CreateSnapshotIcon';
import { AddBlockIcon } from '@/components/Icons/AddBlockIcon';
import { WorkspaceNavigator } from '@/components/Workspace/WorkspaceNavigator';
import { Flow } from '@/components/Workspace/Flow';
import { NoteBlockDrawer } from '@/components/Drawers/NoteBlockDrawer';
import { PartnershipBlockDrawer } from '@/components/Drawers/PartnershipBlockDrawer';
import { EntityDrawer } from '@/components/Drawers/EntityDrawer';

import {
  useDeleteBlock,
  useGetSandboxData,
  useCreateWorkspace,
  useAddBlockToSandbox,
  useTagsAndEntities,
} from '@/common/hooks';
import { subText } from '@/theme';
import * as styles from './styles';
import { Loader } from '@/components/Loader';

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
  const { 
    workspaceNameRef,
    setRfInstance,
    isSavingWorkspace,
    createWorkspaceHandler
  } = useCreateWorkspace(walletData);
  const { nodeData, loading } = useGetSandboxData(walletData);
  const refetch = [
    {
      query: GET_SANDBOX,
      variables: {
        where: { wallet: { address: walletData?.address } },
        directed: false,
      }
    },
  ]
  const { addBlockToSandboxHandler } = useAddBlockToSandbox(refetch);
  const { deleteEntityHandler, deleteBlockHandler } = useDeleteBlock(refetch);
  const { tags, entities } = useTagsAndEntities();

  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState('');
  
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

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
                  onClick={createWorkspaceHandler}
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
            tags={tags}
            entities={entities}
            isOpen={isOpen}
            saveToWorkspaceFn={addBlockToSandboxHandler}
            // onClose={onClose}
            onClose={(refresh) => {
              onClose();
              if(refresh){
                setTimeout(() => {
                  window.location.reload()
                }, 700);
              }
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
