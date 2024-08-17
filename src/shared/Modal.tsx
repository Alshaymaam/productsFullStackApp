import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Button} from '@chakra-ui/react'

const CustomModal=({isOpen,title,cancelText,okText,onOpen,onClose,children,onOkClick,isLoading})=> {
    return (
      <>
       <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
          <ModalOverlay bg={'blackAlph.500'} backdropFilter="blure(5px) hue-rotate(90deg)" />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody> {children} </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                {cancelText}
              </Button>
              <Button variant='ghost' onClick={onOkClick} isLoading={isLoading}>{okText}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default CustomModal;