import { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import * as styles from './styles';

interface INodeMenu {
  visible: boolean;
  node: string
  coords: {x:number, y:number};
  onClose: () => void;
  ref: any;
}

export const NodeMenu: FC<INodeMenu> = ({ coords, visible, onClose, node, ref }) => {
  return (
    <>
      <Box zIndex={100} ref={ref} bg='white' w='20%' p={4} h='auto' sx={styles.NodeBox(coords, visible)}>
        <div className="flex-column w-full border border-red-800 p-4 space-y-5">
          <div className=''> {node} Options </div>
          <div>
            <button className='w-full border border-gray-200'> option 1</button><br/>
            <button className='w-full border border-gray-200'> option 2</button><br/>
            <button className='w-full border border-gray-200'> option 3</button><br/>
            <button className='w-full border border-gray-200'> option 4</button><br/>
            <button className='w-full border border-gray-200'> option 5</button><br/>
          </div>
          <div className='w-full'>
            <Button
              className='w-full p-3 border border-gray-200'
              onClick={onClose}
            >
              cancel
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};
