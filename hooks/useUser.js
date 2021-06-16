import { useQuery } from 'react-query'
import useApi from '../lib/axios'

const getUser = async () => {
  const api = useApi()
  const { data } = await api.get('/users/info')
  return data
}

export default function useUser() {
  return useQuery('user', getUser)
}
