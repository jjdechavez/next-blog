import { useMutation, useQueryClient } from 'react-query'
import useApi from '../lib/axios'

const deleteBlog = async (blogId) => {
  const api = useApi()
  const { data } = await api.delete(`/blogs/${blogId}`)
  return data
}

export default function useDeleteBlog(onClose) {
  const queryClient = useQueryClient()
  return useMutation((blogId) => deleteBlog(blogId), {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['userTodos', { _id: variables.blogId }], data)
    },
    onSettled: () => {
      onClose()
    }
  })
}
