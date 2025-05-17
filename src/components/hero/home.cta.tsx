'use client';

import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  VStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BiLogoDiscordAlt, BiKey } from 'react-icons/bi';
import { RandomItems } from './random-items/random-items';
import { options } from './random-items/options';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function HomeCallToAction() {
  const router = useRouter();

  const handleConnectClick = useCallback(() => {
    router.push('/connect');
  }, [router]);

  return (
    <Container maxW={'3xl'}>
      <Stack
        textAlign={'center'}
        gap={{ base: 8, md: 14 }}
        py={{ base: 16, md: 30 }}
      >
        <Heading
          fontWeight={'semibold'}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          color={'fg.muted'}
        >
          Welcome to <br />
          <Text as={'span'} color={'teal'}>
            Share Square
          </Text>
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}>
          The best place to share private files with your friends in your
          Discord server
        </Text>
        <Stack direction={'row'} justify={'center'}>
          <Text color={'fg.muted'} fontSize={'lg'}>
            Get started with sharing
          </Text>
          <RandomItems options={options} />
        </Stack>
        <VStack gap={3} align={'center'} alignSelf={'center'}>
          <ButtonGroup
            colorPalette={'teal'}
            rounded={'full'}
            px={6}
            size={'lg'}
          >
            <Button variant={'solid'} onClick={handleConnectClick}>
              Connect to your Square <BiKey />
            </Button>
            <Button variant={'subtle'} disabled>
              Add to your server <BiLogoDiscordAlt />
            </Button>
          </ButtonGroup>
        </VStack>
      </Stack>
    </Container>
  );
}
