import { Heading, Center, Text } from '@chakra-ui/react'

export function displayText(text) {
  return (
  <Center>
    <Text fontSize="2xl" color="gray.700">
      {text}
    </Text>
  </Center>
  )
}
