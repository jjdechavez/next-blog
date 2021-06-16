import {
  Box,
  Center,
  Stack,
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

export default function ProfileHeaderSkeleton() {
  return (
    <Center py={6}>
      <Box
        w={'full'}
        boxShadow={'md'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Stack direction="column" justifyContent="center" alignItems="center">
          <SkeletonCircle size="32" mb={4} />
          <Skeleton height="5" width="2xs" />
          <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
            <SkeletonText width="2" noOfLines={1} />
            <SkeletonText width="28" noOfLines={1} />
          </Stack>
        </Stack>
        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            isLoading
            flex="1"
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.300'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
          >
            New Blog
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}

