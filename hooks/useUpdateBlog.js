import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import useApi from '../lib/axios'

const updateBlog = async (updatedBlog) => {
  const { _id, ...blog } = updatedBlog
  const api = useApi()
  const { data } = await api.put(`/blogs/${_id}`, blog)
  return data
}

export default function useUpdateBlog(onClose) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation((updatedBlog) => updateBlog(updatedBlog), {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['userTodos', { _id: variables.blogId }], data)
      toast({
        title: "Blog updated.",
        description: "Polishing your blog",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: "Blog update failed.",
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
