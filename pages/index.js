import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Layout, { siteTitle } from '../components/layout'
import BlogPost from '../components/blog/Card'
import { Heading, Center } from '@chakra-ui/react'

      // <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      //   <ul className={utilStyles.list}>
      //     {blogs.map((post) => (
      //       <li className={utilStyles.listItem} key={post._id}>
      //         <Link href={`/posts/${post._id}`}>
      //           <a>{post.name}</a>
      //         </Link>
      //         <br />
      //         {post.description}
      //         <br />
      //         <small className={utilStyles.lightText}>
      //           <Date dateString={post.createdAt} />
      //         </small>
      //       </li>
      //     ))}
      //   </ul>
      // </section>

function Home({ blogs }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Center mb="16">
        <Heading fontSize="7xl" textTransform="capitalize">blogs</Heading>
      </Center>

      {blogs.map((post, index) => (
        <BlogPost post={post} latest={index} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:5000/todos')
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
