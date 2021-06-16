import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {Container, Center, Button} from '@chakra-ui/react'
import ProfileHeader from './header/Profile'

import styles from './layout.module.css'
import useUser from '../lib/useUser'
import { getToken } from '../lib/auth'

export const siteTitle = 'Blogs'

export default function Layout({ children, home, profile }) {
  const router = useRouter()
  // const {
  //   isLoading: isUserLoading,
  //   data: user
  // } = useUser(profile);
  const token = getToken()
  const [getUserLoading, getUserError, user] = useUser(token)

  const hasUserOnPage = user && !profile
  const displayHeaderBtn = hasUserOnPage 
    ? <ProfileHeader profile={user} loading={getUserLoading} /> 
    : !user && <Button onClick={() => router.push('/login')}>Login</Button>

  return (
    <Container maxW="container.md" mt="12" mb="16">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Center mb="12">
        {displayHeaderBtn}
      </Center>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </Container>
  )
}
