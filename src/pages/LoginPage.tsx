'use client'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {Flex,Box,FormControl,FormLabel,Input,Checkbox,Stack,Button,Heading,Text,useColorModeValue, InputGroup, InputRightElement, FormHelperText,} from '@chakra-ui/react'
import { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { selectLogin, userLogin } from '../app/features/LoginSlice';
import { AppDispatch } from '../app/store';
import { Navigate } from 'react-router-dom';

const LoginPage=({isAuthenticated})=> {
  if(isAuthenticated) return <Navigate to={"/"} replace/>
const dispatch:AppDispatch=useDispatch();
const {loading}= useSelector(selectLogin)
const [showPassword,setShowPassword]=useState(false)
const[user,setUser]=useState({identifier:'',Password:''})
const [isEmail,setIsEmail]=useState(false)
const [isPassword,setIsPassword]=useState(false)
const onChangeHandler=(e)=>{
  const {name,value}= e.target;
  setUser({...user,[name]:value})
}
 const submitHandler=(e)=>{
      e.preventDefault();
      if(!user.identifier && !user.Password){
        setIsEmail(true);
        setIsPassword(true)
        return;
      }
        if(!user.identifier){
          setIsEmail(true);
          return;
        }
        if(!user.Password){
          setIsPassword(true);
          return;
        }
        setIsEmail(false);
        setIsPassword(false);
        dispatch(userLogin())
 }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box as={'form'} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" isInvalid={isEmail} errorBorderColor='crimson' value={user.identifier} 
              name="identifier" onChange={onChangeHandler}/>
              {isEmail?<FormHelperText color={'red'}>Enter Vaild Email</FormHelperText>:null}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}  value={user.Password} isInvalid={isPassword}
                errorBorderColor='crimson' name='Password' onChange={onChangeHandler}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword?<FormHelperText color={'red'}>password is required</FormHelperText>:null}
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }} type='submit'
              onSubmit={submitHandler} isLoading={loading}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default LoginPage;