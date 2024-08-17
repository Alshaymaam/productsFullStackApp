import { Card, CardBody, Stack, Heading,Image,Text, Button,useColorMode} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const ProductCard = ({attributes}) => {
    const {colorMode}=useColorMode()
  return (
   
<Card border={"1px solid #a8b5c8"} bg={"none"}>
  <CardBody>
    <Image
      src={attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}
      alt='Green double couch with wooden legs'
      borderRadius='50%'
      width={200}
      height={200}
      mx={"auto"}
      objectFit={"cover"}
    />
    <Stack mt='6' spacing='3'>
      <Heading textAlign={"center"} size='md'>{attributes.title}</Heading>
      <Text fontSize={"small"} textAlign={"center"}>
        {attributes.description}
      </Text>
      <Text color='purple.600' fontSize='3xl' textAlign={"center"}>
        $450
      </Text>
    </Stack>
    <Button as={Link} to={`/products/1`} bg={colorMode ==='light'?"#e6f3fd":"#9f7aea"}
    color={colorMode !=='light'?"#e6f3fd":"#9f7aea"} size={"xl"} variant={"outline"} border={"none"} py={5}
    overflow={"hidden"} w={"full"} _hover={{bg:colorMode ==='light'?"#e6f3fd":"#9f7aea",
        color:colorMode !=='light'?"#e6f3fd":"#9f7aea",border:'transparent'}} mt={6}>
            View Details

    </Button>
  </CardBody>
</Card>
  )
}

export default ProductCard