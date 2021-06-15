import '../styles/global.css'
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
