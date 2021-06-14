import React from 'react'
import Router from 'next/router'
import useUser from '../lib/useUser'
import useUserBlogs from '../lib/useUserBlogs'
import Layout from '../components/layout'
import BlogPost from '../components/blog/Card'
import {getToken} from '../lib/auth'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Profile() {
  const token = getToken()
  const [getUserLoading, getUserError, user] = useUser(token);
  const [getUserBlogsLoading, getUserBlogsError, blogs] = useUserBlogs(token);

  if (getUserLoading || !user || getUserBlogsLoading, !blogs) {
    return <>Loading...</>
  }

  if (getUserError || getUserBlogsError) {
    Router.push('/login')
  }

  return (
    <Layout profile>
      <Center py={6}>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'md'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'2xl'}
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {user.name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            @{user.username}
          </Text>
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              flex="1"
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              New Blog
            </Button>
          </Stack>
        </Box>
      </Center>
      {blogs.length > 0 && blogs.map((post, index) => (
        <BlogPost post={post} latest={index} key={post._id} />
      ))}
    </Layout>
  );
}
