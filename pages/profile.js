import React from 'react'
import Router from 'next/router'
import useUser from '../lib/useUser'
import Layout from '../components/layout'
import BlogPost from '../components/blog/Card'
import {getToken} from '../lib/auth'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Profile({ blogs }) {
  const token = getToken()
  const [getUserLoading, getUserError, user] = useUser(token);

  if (getUserLoading || !user) {
    return <>Loading...</>
  }

  if (getUserError) {
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
        </Box>
      </Center>
      {blogs.length > 0 && blogs.map((post, index) => (
        <BlogPost post={post} latest={index} key={post._id} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:5000/todos')
    const blogs = await response.json()

    return {
      props: {
        blogs: blogs || []
      }
    }
  } catch (error) {
    console.error(error)
  }
}
