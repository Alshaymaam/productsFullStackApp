'use client'
import {Box,Flex,Avatar,Button,Menu,MenuButton,MenuList,MenuItem,MenuDivider,useColorModeValue,Stack, useColorMode, 
  Center, HStack} from '@chakra-ui/react'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import cookieService from "../services/cookies"
import { useDispatch, useSelector } from 'react-redux'
import { selectCart } from '../app/features/cartSlice'
import { onOpenCartDrawerAction } from '../app/features/globalSlice'
import { AppDispatch } from '../app/store'

interface Props {children: React.ReactNode}
const NavLink = (props: Props) => {
  const { children } = props
  return (
    <Box as="a" px={2} py={1} rounded={'md'} _hover={{textDecoration: 'none',
     bg: useColorModeValue('gray.200', 'gray.700'), }} href={`/${children}`}>
      {children}
    </Box>
  )
}
export default function Nav() {
  const {cartProducts}=useSelector(selectCart)
  const { colorMode, toggleColorMode } = useColorMode()
  const token=cookieService.get("jwt")
  const logoutHandler=()=>{
    cookieService.remove("jwt");
    window.location.reload();
  }
  const dispatch:AppDispatch=useDispatch()
  const OnOpen=()=>{ dispatch(onOpenCartDrawerAction()) }
  const Links = ['Dashboard', 'Products', 'Team']
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={OnOpen}>catr({cartProducts.length})</Button>
                 {token?(<Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                  <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'}/>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar size={'2xl'} src={'https://avatars.dicebear.com/api/male/username.svg'}/>
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>): (  <HStack spacing={8} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => ( <NavLink  key={link}>{link}</NavLink> ))}
            </HStack>
          </HStack>)}
          
              
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
