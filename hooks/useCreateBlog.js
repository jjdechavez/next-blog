import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import useApi from '../lib/axios'

const createBlog = async (newBlog) => {
  const api = useApi()
  const { data } = await api.post(`/blogs`, newBlog)
  return data
}

export default function useCreateBlog(onClose) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation((newBlog) => createBlog(newBlog), {
    onSuccess: () => {
      queryClient.invalidateQueries('userTodos')
      toast({
        title: "Blog created.",
        description: "Publishing your blog",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: "Blog failed.",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    },
    onSettled: () => {
      onClose()
    }
  })
}
