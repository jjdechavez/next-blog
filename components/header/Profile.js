import React from 'react'
import Router from 'next/router'
import { useQueryClient } from 'react-query'
import {Menu, MenuButton, Button, MenuList, MenuItem} from '@chakra-ui/react'
import {ChevronDownIcon, InfoOutlineIcon, ArrowBackIcon} from '@chakra-ui/icons'
import {logout} from '../../lib/auth'

export default function ProfileHeader({ profile, loading }) {
  const queryClient = useQueryClient()
  const logoutUser = () => {
    queryClient.resetQueries('user', {
      exact: true
    })
    logout()
  }

  const goToProfile = () => {
    Router.push('/profile')
  }

  if (loading) return <>Loading...</>

  return (
    <Menu>
      <MenuButton 
        as={Button} 
        rightIcon={<ChevronDownIcon />} 
      >
        {profile.name}
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px" icon={<InfoOutlineIcon />} onClick={goToProfile}>
          Profile
        </MenuItem>
        <MenuItem minH="40px" icon={<ArrowBackIcon />} onClick={logoutUser}>
          Logout
        </MenuItem>
        </MenuList>
    </Menu>
  )
}
