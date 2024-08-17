import { Button,Image,Stack,Text,Flex,Divider } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice";

const CartDrawerItem = ({id,attributes:{thumbnail,title,price},quantity}) => {
    const dispatch=useDispatch();
    
  return (
    <>
    <Flex alignItems={"center"} justifyContent={'space-between'} mb={3} py={3}>
        <Image src={`${import.meta.env.VITE_SERVER_KEY}${thumbnail?.data?.attributes?.url}`}
         alt={title} w={'60px'} h={'60px'} rounded="full" objectFit={"cover"} mr={2}/>
        <Stack>
            <Text fontSize={'small'}>{title}</Text>
            <Text fontSize={'small'}>Price:{price}</Text>
            <Text fontSize={'small'}>Quantity:{quantity}</Text>
            <Button leftIcon={<BsTrash/>} variant="outline" colorScheme={'red'} size={'xs'} w={'fit-content'}
            onClick={()=>dispatch(removeFromCart(id))}>
            Remove
            </Button>
        </Stack>
    </Flex>    
    <Divider/>
    </>
  )
}

export default CartDrawerItem