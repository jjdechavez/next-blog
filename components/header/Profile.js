import {Menu, MenuButton, Button, MenuList, Image, MenuItem} from '@chakra-ui/react'
import {ChevronDownIcon, InfoOutlineIcon, ArrowBackIcon} from '@chakra-ui/icons'
import nextCookies from 'next-cookies'
import fetch from 'isomorphic-unfetch'
import { logout, withAuthSync } from '../../lib/auth'

function ProfileHeader() {
  return (
    <Menu>
      <MenuButton 
        as={Button} 
        rightIcon={<ChevronDownIcon />} 
      >
        John Jerald De Chavez
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px" icon={<InfoOutlineIcon />}>
          Profile
        </MenuItem>
        <MenuItem minH="40px" icon={<ArrowBackIcon />}>
          Logout
        </MenuItem>
        </MenuList>
    </Menu>
  )
}

ProfileHeader.getInitialProps = async (ctx) => {
  const { token } = nextCookies(ctx)
  try {
    const response = await fetch(process.env.SERVER_HOST + '/users/info', {
      credentials: 'include',
      headers: {
        authorization: JSON.stringify({ token })
      }
    })
    console.log('response', await response.json())
  } catch (error) {
    return logout()
  }
}

export default withAuthSync(ProfileHeader)
