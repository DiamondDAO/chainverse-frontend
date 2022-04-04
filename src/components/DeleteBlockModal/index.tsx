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
import React from "react";

export const DeleteModal = ({
  isOpen,
  onClose,
  actionHandler,
  deleting,
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
            isDisabled={deleting}
            isLoading={deleting}
            variant="outline"
            colorScheme="red"
            onClick={() => actionHandler()}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
