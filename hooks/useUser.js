import { useQuery } from 'react-query'
import { getToken } from '../lib/auth'
import useApi from '../lib/axios'

const getUser = async () => {
  const api = useApi()
  const { data } = await api.get('/users/info')
  return data
}

export default function useUser() {
  const token = getToken()
  return useQuery('user', getUser, {
    enabled: token ? true : false
  })
}
