import React, {useState} from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
})

export default function SimpleCard() {
  const [loading, setLoading] = useState(false)
  const [networkErrors, setNetwokErrors] = useState(false)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>blogs</Link> ✌️
          </Text>
        </Stack>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {formik => (
            <Form
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              p={8}
            >
              <Stack spacing={4}>
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
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
