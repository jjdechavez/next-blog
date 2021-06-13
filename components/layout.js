import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {Container, Center} from '@chakra-ui/react'
import ProfileHeader from './header/Profile'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'Jerald'
export const siteTitle = 'Jerald Sample Website'

export default function Layout({ children, home }) {
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
      <Center>
        {home ? (<ProfileHeader />
        ) : (<>
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>)}
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



          // <div className={styles.profile}>
          //   <Image
          //     priority
          //     src="/images/profile.jpg"
          //     className={utilStyles.borderCircle}
          //     height={25}
          //     width={25}
          //     alt={name}
          //   />
          //   <h1 className={utilStyles.headingXl}>{name}</h1>
          // </div>
