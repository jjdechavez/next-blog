import { useQuery } from 'react-query'
import useApi from '../lib/axios'

const getUserBlogs = async () => {
  const api = useApi()
  const { data } = await api.get('/blogs/user')
  return data
}

export default function useUserBlogs() {
  return useQuery('userBlogs', getUserBlogs, {
    refetchInterval: 1000
  })
}
