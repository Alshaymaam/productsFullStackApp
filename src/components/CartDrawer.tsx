import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader,
 DrawerBody,DrawerFooter,Text} from "@chakra-ui/react"
import { useRef } from "react"

import { onCloseCartDrawerAction, selectGlobal } from "../app/features/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import CartDrawerItem from "./CartDrawerItem";
import { selectCart,clearCart} from "../app/features/cartSlice";

const CartDrawer=()=> {
    const { onOpen} = useDisclosure()
    const dispatch:AppDispatch=useDispatch()
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const {isOpenCartDrawer}=useSelector(selectGlobal)
    const {cartProducts}=useSelector(selectCart)
    const OnClose=()=>{
        dispatch(onCloseCartDrawerAction())
    }

    return (
      <>
       <Button ref={buttonRef} colorScheme='teal' onClick={onOpen}>   Open    </Button>
        <Drawer isOpen={isOpenCartDrawer} placement='right' onClose={OnClose} finalFocusRef={buttonRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Shopping Cart</DrawerHeader>
  
            <DrawerBody>
              {cartProducts.length ? cartProducts.map(item=><CartDrawerItem key={item.id} {...item}/>)
              :(<Text>Your Cart Is Empty</Text>)}
              
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' colorScheme="red" mr={3} onClick={()=>{dispatch(clearCart())}}>
                Clear All
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  export default CartDrawer;