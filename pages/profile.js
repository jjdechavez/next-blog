import nextCookie from 'next-cookies'

export default function Profile({token}) {
  console.log('TOken: ', token)
  return <>Profile</>
}

export async function getStaticProps(ctx)  {
  const { token } = nextCookie(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      token
    },
  }
}
