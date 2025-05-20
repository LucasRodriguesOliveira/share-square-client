import { Card, HStack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export default function DownloadPassengerCardSkeleton() {
  return (
    <Card.Root
      maxW={{ base: '400px', md: '80vw' }}
      minW={{ md: '60vw' }}
      variant={'elevated'}
    >
      <Card.Header p={6}>
        <Card.Title
          userSelect={'none'}
          color={'pink'}
          fontWeight={'bold'}
          fontSize={'2xl'}
        >
          <HStack w={'full'}>
            <SkeletonCircle size={10} />
            <SkeletonText noOfLines={1} />
          </HStack>
        </Card.Title>
      </Card.Header>
    </Card.Root>
  );
}
