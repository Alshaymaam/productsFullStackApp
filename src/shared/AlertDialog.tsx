import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,
    AlertDialogCloseButton,Button} from '@chakra-ui/react'
import React from 'react'
const AppAlertDialog=({ isOpen,title,description,cancelText,okText,onOpen,isLoading, onClose,onOkHandler})=> {
const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  
return (
  <>
  <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
    <AlertDialogOverlay bg={'blackAlph.500'} backdropFilter="blure(5px) hue-rotate(90deg)"/>
      <AlertDialogContent>
      <AlertDialogHeader>{title}</AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>{description}</AlertDialogBody>
      <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>{cancelText}</Button>
          <Button colorScheme='red' ml={3} onClick={onOkHandler()} isLoading={isLoading}>{okText}</Button>
      </AlertDialogFooter>
      </AlertDialogContent>
  </AlertDialog>
  </>
        )}
  export default AppAlertDialog;