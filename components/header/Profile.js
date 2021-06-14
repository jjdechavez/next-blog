import React from 'react'
import Router from 'next/router'
import {Menu, MenuButton, Button, MenuList, MenuItem} from '@chakra-ui/react'
import {ChevronDownIcon, InfoOutlineIcon, ArrowBackIcon} from '@chakra-ui/icons'
import fetch from 'isomorphic-unfetch'
import jsCookie from 'js-cookie'
import {logout} from '../../lib/auth'

export default function ProfileHeader(props) {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  console.log('props: ', props)

  React.useEffect(() => {
    async function user() {
      const token = jsCookie.get('token')

      setUser(null)
      setError(null)
      setLoading(true)

      try {
        const response = await fetch('http://localhost:5000/users/info', {
          credentials: 'include',
          headers: {
            authorization: token
          }
        })

        if (response.ok) {
          const user = await response.json()
          setUser(user)
        } else {
          logout()
        }
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    user()
  }, [])

  if (!user || error || loading) {
    return <Button onClick={() => Router.push('/login')}>Login</Button>
  }

  return (
    <Menu>
      <MenuButton 
        as={Button} 
        rightIcon={<ChevronDownIcon />} 
      >
        {user.name}
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px" icon={<InfoOutlineIcon />}>
          Profile
        </MenuItem>
        <MenuItem minH="40px" icon={<ArrowBackIcon />} onClick={logout}>
          Logout
        </MenuItem>
        </MenuList>
    </Menu>
  )
}

// export async function getStaticProps(ctx) {
//   try {
//     const response = await fetch('http://localhost:5000/todos')
//     console.log('response========', response)
//     if (response.ok) {
//       const data = await response.json()
//       console.log('props: ', props)
//       return {
//         props: { data }
//       }
//     } else {
//       return logout()
//     }
//   } catch (error) {
//     return logout()
//   }
// }
