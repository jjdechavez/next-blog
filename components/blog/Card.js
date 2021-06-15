import Link from 'next/link'
import React from 'react'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
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
  Textarea,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { SettingsIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Date from '../date'

const CreateBlogSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string()
    .required('Description is required'),
})

export default function BlogPost({ post, latest, ownerId, refetchBlogs, token }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isDeleteAlertOpen, onOpen: onDeleteAlertOpen, onClose: onDeleteAlertClose } = useDisclosure()
  const cancelRef = React.useRef()

  const deleteBlog = async (postId, token) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${postId}`, {
        method: 'DELETE',
        headers: { 
          authorization: token
        },
      })

      if (response.status === 200) {
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
    }  
  }

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
          <Flex justifyContent="space-between" alignItems="center">
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
            <span />
            {post.user._id === ownerId && (
              <Flex justifyContent="flex-end">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<SettingsIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem icon={<EditIcon />} onClick={onOpen}>
                      Edit
                    </MenuItem>
                    <MenuItem icon={<DeleteIcon />} onClick={onDeleteAlertOpen}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
                <AlertDialog
                  motionPreset="slideInBottom"
                  leastDestructiveRef={cancelRef}
                  onClose={onDeleteAlertClose}
                  isOpen={isDeleteAlertOpen}
                  isCentered
                >
                  <AlertDialogOverlay />

                  <AlertDialogContent>
                    <AlertDialogHeader>Delete Blog</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onDeleteAlertClose}>
                        No
                      </Button>
                      <Button colorScheme="red" ml={3} onClick={() => deleteBlog(post._id, token)}>
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Flex>
            )}
          </Flex>
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
            name={post.user.name}
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
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Blog</DrawerHeader>
          <DrawerBody>
            <Formik
              initialValues={{
                name: post.name,
                description: post.description
              }}
              validationSchema={CreateBlogSchema}
              onSubmit={async (values, actions) => {
                try {
                  const response = await fetch(`http://localhost:5000/todos/${post._id}`, {
                    method: 'PUT',
                    headers: { 
                      'Content-Type': 'application/json',
                      authorization: token
                    },
                    body: JSON.stringify({
                      name: values.name,
                      description: values.description
                    })
                  })

                  if (response.status === 200) {
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
                  id="update-blog-form"
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
                          <Textarea {...field} resize="vertical" />
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
            <Button type="submit" form="update-blog-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Center>
  );
}
