import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import useApi from '../lib/axios'

const getUser = async () => {
  const api = useApi()
  const { data } = await api.get('/users/info')
  return data
}

export default function useUser(atProfile) {
  const router = useRouter()

  return useQuery('user', getUser)
}
