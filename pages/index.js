import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Layout, { siteTitle } from '../components/layout'
import BlogPost from '../components/blog/Card'
import { Heading, Center, Text } from '@chakra-ui/react'

function Home({ blogs }) {

  const availableBlogs = blogs.length > 0
  const Blogs = () => availableBlogs 
    ? blogs.map((post, index) => (
        <BlogPost post={post} latest={index} key={post._id} />
      ))
  : <Center><Text fontSize="2xl" color="gray.700">We don't have blogs right now</Text></Center>

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Center mb="10">
        <Heading fontSize="7xl" textTransform="capitalize">blogs</Heading>
      </Center>
      <Blogs />
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const response = await fetch(process.env.SERVER_HOST + '/blogs')
    const blogs = await response.json()

    return {
      props: {
        blogs
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default Home
