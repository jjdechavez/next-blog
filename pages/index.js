import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import BlogPost from '../components/blog/Card'
import BlogPostSkeleton from '../components/blog/CardSkeleton'
import { Heading, Center } from '@chakra-ui/react'
import { displayText } from '../components/utils'

import useBlogs from '../hooks/useBlogs'

function Home() {
  const { isLoading, isError, error, data: blogs } = useBlogs()

  let renderBlogs = null;

  renderBlogs = isLoading 
    ? <BlogPostSkeleton noOfSkeletons={3} />
    : isError ? displayText(error.message)
    : !blogs.length > 0 ? displayText("We don't have blogs right now")
    : blogs.map((post, index) => (
        <BlogPost post={post} latest={index} key={post._id} />
      ))

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Center mb="10">
        <Heading fontSize="7xl" textTransform="capitalize">blogs</Heading>
      </Center>
      {renderBlogs}
    </Layout>
  )
}

export default Home
