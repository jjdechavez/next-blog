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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  description: ''
}

const CreateBlogSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string()
    .required('Description is required'),
})

export default function Profile() {
  const token = getToken()
  const [getUserLoading, getUserError, user] = useUser(token);
  const [getUserBlogsLoading, getUserBlogsError, blogs, {refetchBlogs}] = useUserBlogs(token);
  const {isOpen, onOpen, onClose} = useDisclosure()

  if (getUserLoading || !user || getUserBlogsLoading, !blogs) {
    return <>Loading...</>
  }

  if (getUserError || getUserBlogsError) {
    Router.push('/login')
  }

  const availableBlogs = blogs.length > 0
  const Blogs = () => availableBlogs 
    ? blogs.map((post, index) => (
        <BlogPost post={post} latest={index} key={post._id} />
      ))
  : <Center mt="10" color="gray.500"><Text fontSize="2xl">You don't any blogs right now, Try to create</Text></Center>

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
              onClick={onOpen}
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
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>New Blog</DrawerHeader>
          <DrawerBody>
            <Formik
              initialValues={initialValues}
              validationSchema={CreateBlogSchema}
              onSubmit={async (values, actions) => {
                try {
                  const response = await fetch("http://localhost:5000/todos", {
                    method: 'POST',
                    headers: { 
                      'Content-Type': 'application/json',
                      authorization: token
                    },
                    body: JSON.stringify({
                      name: values.name,
                      description: values.description
                    })
                  })

                  if (response.status === 201) {
                    refetchBlogs(token)
                    onClose()
                  }  
                  
                  if (response.status === 500) {
                    console.log("Create Blog failed")
                    let error = new Error(response.statusText)
                    error.response = response
                    throw error
                  }

                } catch (error) {
                  console.error(
                    "You have an error in your code or there are network issues.",
                    error
                  )
                } finally {
                  actions.setSubmitting(false)
                }
              }}
            >
              {formik => (
                <Form
                  id="create-blog-form"
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  p={8}
                > <Stack spacing={4}>
                    <Field as="input" name="name">
                      {({field, form}) => (
                        <FormControl id="name" isInvalid={form.errors.name && form.touched.name}>
                          <FormLabel>Name</FormLabel>
                          <Input {...field} />
                          <ErrorMessage name="name">
                            {msg => <Text fontSize="sm" pt="1.5" color="red.500">{msg}</Text>}
                          </ErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field as="input" name="description">
                      {({field, form}) => (
                        <FormControl id="description" isInvalid={form.errors.description && form.touched.description}>
                          <FormLabel>Description</FormLabel>
                          <Input {...field} />
                          <ErrorMessage name="description">
                            {msg => <Text fontSize="sm" pt="1.5" color="red.500">{msg}</Text>}
                          </ErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                </Form>
              )}
            </Formik>
          </DrawerBody>
          <DrawerFooter>
            <Button type="submit" form="create-blog-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Blogs />
    </Layout>
  );
}
