import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { Center, Heading, Box, Text } from '@chakra-ui/react'

export default function Post({ blog }) {
  return (
    <Layout>
      <Head>
        <title>{blog.name} · {blog.user.name}</title>
      </Head>
      <article>
        <Heading as="h1">{blog.name}</Heading>
        <Box mt="1.5" mb="8">
          <Text fontWeight="semibold">{blog.user.name}</Text>
          <Date dateString={blog.createdAt} className={utilStyles.lightText} />
        </Box>
      <Center>
        {blog.description}
      </Center>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(process.env.SERVER_HOST + '/blogs')
  const blogs = await res.json()

  const paths = blogs.map(blog => ({
    params: { id: blog._id }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.SERVER_HOST}/blogs/${params.id}`)
  const blog = await res.json()

  return {
    props: {
      blog
    }
  }
}
