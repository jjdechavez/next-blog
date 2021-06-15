import React, {useState} from 'react'
import Router from 'next/router'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Link
} from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import fetch from 'isomorphic-unfetch'

import { register } from '../lib/auth'

const initialValues = {
  username: '',
  name: '',
  password: ''
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  name: Yup.string()
    .required('Name is required'),
  password: Yup.string()
    .required('Password is required')
})

export default function Register() {
  const [networkErrors, setNetworkErrors] = useState(false)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Register a new account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'} onClick={() => Router.push('/')}>blogs</Link> ✌️
          </Text>
        </Stack>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={async (values, actions) => {
            try {
              setNetworkErrors(false)

              const response = await fetch("http://localhost:5000/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: values.username,
                  name: values.name,
                  password: values.password
                })
              })

              if (response.status === 201) {
                const { token } = await response.json();
                register({ token });
              } else {
                console.log("Register failed");
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
              }
            } catch (error) {
              console.error(
                "You have an error in your code or there are network issues.",
                error
              )
              setNetworkErrors(true)
            } finally {
              actions.setSubmitting(false)
            }
          }}
        >
          {formik => (
            <Form
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              p={8}
            > <Stack spacing={4}>
                <Field as="input" name="username">
                  {({field, form}) => (
                    <FormControl id="username" isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel>Username</FormLabel>
                      <Input {...field} />
                      <ErrorMessage name="username">
                        {msg => <Text fontSize="sm" pt="1.5" color="red.500">{msg}</Text>}
                      </ErrorMessage>
                    </FormControl>
                  )}
                </Field>
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
                <Field as="input" name="password">
                  {({field, form}) => (
                    <FormControl id="password" isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>Password</FormLabel>
                      <Input {...field} type="password" />
                      <ErrorMessage name="password">
                        {msg => <Text fontSize="sm" pt="1.5" color="red.500">{msg}</Text>}
                      </ErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Stack spacing={10}>
                  <Button type="submit" isLoading={formik.isSubmitting}>
                    Register
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
        {networkErrors && (
          <Center>One of us is experiencing network errors 😞</Center>
        )}
        <Center>
          <Text fontSize={'md'} color={'gray.600'}>
            Already have an account? <Link color="blue.400" onClick={() => Router.push('/login')}>Login</Link>
          </Text>
        </Center>
      </Stack>
    </Flex>
  );
}
