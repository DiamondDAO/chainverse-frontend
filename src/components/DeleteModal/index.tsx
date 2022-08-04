import React, { FC } from "react";

import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface IDeleteModal {
  isOpen: boolean;
  onClose: () => void;
  deleteFn: () => void;
  isDeleting: boolean;
  title: string;
  subtitle: string;
}

export const DeleteModal: FC<IDeleteModal> = ({
  isOpen,
  onClose,
  deleteFn,
  isDeleting,
  title,
  subtitle,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{subtitle}</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="primary" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            isDisabled={isDeleting}
            isLoading={isDeleting}
            variant="outline"
            colorScheme="red"
            onClick={deleteFn}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
