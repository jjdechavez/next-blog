import {Menu, MenuButton, Button, MenuList, Image, MenuItem} from '@chakra-ui/react'
import {ChevronDownIcon, InfoOutlineIcon, ArrowBackIcon} from '@chakra-ui/icons'

export default function ProfileHeader() {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
