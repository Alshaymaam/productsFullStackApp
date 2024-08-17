import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"

const ProductSkelton = () => {
  return (
   <Box padding={6} boxShadow="lg" bg="gray.600" rounded={"lg"} >
    <Skeleton height={20}/>
    <SkeletonText mt={4} mx={'auto'} noOfLines={1} spacing={4} maxW={"200px"}/>
    <SkeletonText  mt={4} noOfLines={1} spacing={4}/>
    <SkeletonText mt={4} maxW={"120px"} noOfLines={1} spacing={4}/>
    <Skeleton mt={4} height={50} maxW={"120px"} rounded={"lg"}/>

   </Box>
  )
}

export default ProductSkelton