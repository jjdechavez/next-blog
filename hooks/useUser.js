import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import useApi from '../lib/axios'
import { getToken } from '../lib/auth'

const getUser = async () => {
  const api = useApi()
  const { data } = await api.get('/users/info')
  return data
}

export default function useUser() {
  const router = useRouter()
  const toast = useToast()
  const token = getToken()

  return useQuery('user', getUser, {
    enabled: !!token,
    onError: (error) => {
      toast({
        title: error.response.data.error,
        description: "Please login.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      router.push('/login')
    }
  })
}
