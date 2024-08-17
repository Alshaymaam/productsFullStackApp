import { Box, Button, Card, CardBody, Flex, Heading, Stack, Text, useColorMode,Image, Divider, CardFooter } from "@chakra-ui/react"
import axios from "axios"
import { useQuery } from "react-query"
import ProductSkelton from "../components/ProductSkelton"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { addToCart } from "../app/features/cartSlice"
import { AppDispatch } from "../app/store"

const Products = () => {
  const{id}=useParams();
  const navigate=useNavigate();
  const{colorMode}=useColorMode()
  const dispatch:AppDispatch=useDispatch();
    
  const getProductList=async()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_SERVER_KEY}
        /api/products/${id}?populate=thumbnail,category&fields=title&fields=description&fields=price`)
      return data;
    }
  const addToCartHandler=()=>{
    dispatch(addToCart(data.data))
  }
  const {isLoading,data}=useQuery(["products",id],getProductList)
  const goBack= ()=>navigate(-1);
  useEffect(()=>{
    document.title=`Product ${data?.data?.attributes?.title} Page`
  },[])
    if(isLoading) return <Box maxW={"sm"} mx={"auto"} my={20}> <ProductSkelton/></Box>
  return (<>
  <Flex alignItems={'center'} maxW={"sm"} mx={"auto"} my={7} fontSize={"large"} cursor={"pointer"} onClick={goBack}>
    <BsArrowLeft/>
    <Text ml={2}>Back</Text>
  </Flex>
  <Card maxW={"small"} border={"1px solid #a8b5c8"} bg={"none"}>
  <CardBody>
    <Image
      src={`${import.meta.env.VITE_SERVER_KEY}${data?.data?.attributes?.thumbnail?.data?.attributes?.url}`}
      alt={data?.data?.attributes?.title} borderRadius='50%' width={200} height={200} mx={"auto"}
      objectFit={"cover"} />
    <Stack mt='6' spacing='3'>
      <Heading textAlign={"center"} size='md'>
        {data?.data?.attributes?.title}
      </Heading>
      <Text fontSize={"small"} textAlign={"center"}>
        {data?.data?.attributes?.description}
      </Text>
      <Text fontSize={"small"} textAlign={"center"}>
        {data?.data?.attributes?.category?.data?.attributes?.title}
      </Text>
      
      <Text color='purple.600' fontSize='3xl' textAlign={"center"}>
        {data?.data?.attributes?.price}
      </Text>
    </Stack>
  </CardBody>
  <Divider/>
  <CardFooter>
  <Button colorScheme="purple" bg={colorMode ==='light'?"#e6f3fd":"#9f7aea"}
    color={colorMode !=='light'?"#e6f3fd":"#9f7aea"} size={"lg"} variant={"solid"} p={8} textTransform={'uppercase'}
    w={"full"} _hover={{bg:colorMode ==='light'?"#e6f3fd":"#9f7aea", 
        color:colorMode !=='light'?"#e6f3fd":"#9f7aea",border:'transparent'}}
        onClick={addToCartHandler}>
            add to cart

    </Button>
    </CardFooter>
</Card>
  </>
  )
}

export default Products