import {
  Box,
  Center,
  Skeleton,
  Stack,
  SkeletonCircle,
  SkeletonText
} from '@chakra-ui/react';

export default function BlogPostSkeletons({ noOfSkeletons = 5 }) {
  let skeletons = [];
  let numbers = Array(noOfSkeletons);
  for (let index = 0; index < numbers.length; index++) {
    skeletons.push(
      <Center py={6} key={index}>
        <Box
          w={'full'}
          boxShadow={'xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}>
          <Stack>
            <Skeleton height="20px" width="40" />
            <SkeletonText mt="4" noOfLines={2} spacing="2" />
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <SkeletonCircle size="10" />
            <Stack direction={'column'} width="20">
              <SkeletonText noOfLines={2} />
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }

  return skeletons;
}
