import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { Heading, Center } from '@chakra-ui/react'

      // <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      //   <h2 className={utilStyles.headingLg}>Blog</h2>
      //   <ul className={utilStyles.list}>
      //     {allPostsData.map(({ id, date, title }) => (
      //       <li className={utilStyles.listItem} key={id}>
      //         <Link href={`/posts/${id}`}>
      //           <a>{title}</a>
      //         </Link>
      //         <br />
      //         {id}
      //         <br />
      //         <small className={utilStyles.lightText}>
      //           <Date dateString={date} />
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
        <Heading fontSize="7xl">BLOGS</Heading>
      </Center>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {blogs.map((post) => (
            <li className={utilStyles.listItem} key={post._id}>
              <Link href={`/posts/${post._id}`}>
                <a>{post.name}</a>
              </Link>
              <br />
              {post.description}
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={post.createdAt} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:5000/todos')
    const blogs = await response.json()
    console.log('blogs: ', blogs)

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
