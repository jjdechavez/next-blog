import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { Center } from '@chakra-ui/react'

export default function Post({ blog }) {
  return (
    <Layout>
      <Head>
        <title>{blog.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{blog.name}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={blog.createdAt} />
        </div>
      <Center>
        {blog.description}
      </Center>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/todos')
  const blogs = await res.json()
  console.log('blogs: ', blogs)

  const paths = blogs.map(blog => ({
    params: { id: blog._id }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  console.log('getStaticProps: ', params)
  const res = await fetch(`http://localhost:5000/todos/${params.id}`)
  const blog = await res.json()

  return {
    props: {
      blog
    }
  }
}
