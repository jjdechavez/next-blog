import Link from 'next/link'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import Date from '../date'

export default function BlogPost({ post, latest }) {
  return (
    <Center py={6}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          {latest === 0 && (
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              Latest
            </Text>
          )}
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
            isTruncated
          >
            <Link href={`/blogs/${post._id}`}>
              <a>{post.name}</a>
            </Link>
          </Heading>
          <Text color={'gray.500'} noOfLines="2">
          {post.description}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{post.user.name}</Text>
            <Text color={'gray.500'}>
              <Date dateString={post.createdAt} /> · 6min read
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
