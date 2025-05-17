'use client';

import {
  Button,
  Card,
  Container,
  PinInput,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ToggleTip } from '@/components/ui/toggle-tip';
import { BiInfoCircle, BiRocket } from 'react-icons/bi';
import { useCallback, useMemo, useState } from 'react';
import { useSquare } from '../../hooks/square.hooke';
import { toaster } from '../ui/toaster';
import { useRouter } from 'next/navigation';

const OTP_LENGTH = 5;

export function ConnectToSquare() {
  const [squareOTP, setSquareOTP] = useState(new Array(OTP_LENGTH).fill(''));
  const { connect } = useSquare();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const userOTPLength = useMemo(() => {
    return squareOTP.filter((item) => !!item).length;
  }, [squareOTP]);

  const handleGoForItClick = useCallback(() => {
    setIsLoading(true);
    connect(squareOTP.join('')).then((result) => {
      setIsLoading(false);

      if (result?.error) {
        toaster.error({
          title: result.error.name,
          description: result.error.message,
        });
        return;
      }

      toaster.success({
        title: `Connected to square [${result.value?.name}]`,
      });
      router.push(`/square/${squareOTP.join('')}`);
    });
  }, [connect, squareOTP, router]);

  return (
    <Container maxW={'3xl'} p={{ base: 12, sm: 4, md: 20 }}>
      <Card.Root
        variant={'subtle'}
        w={{ base: 'xl', sm: '2xl', md: 'xl' }}
        bg={'bg'}
      >
        <Card.Header
          textAlign={'center'}
          fontSize={'2xl'}
          fontWeight={'bold'}
          color={'teal'}
        >
          Connect to your Square
        </Card.Header>
        <Card.Body gap={4}>
          <Stack
            alignItems={'center'}
            justify={'center'}
            gap={1}
            color={'fg.muted'}
          >
            <Button
              as={'span'}
              variant={'ghost'}
              colorPalette={'yellow'}
              disabled
            >
              {"Didn't installed the bot yet?"}
            </Button>
          </Stack>
          <Stack
            justifyContent={'center'}
            align={'center'}
            direction={'column'}
            w={'full'}
          >
            <Stack direction={'row'} gap={2} align={'center'}>
              <Text color={'teal'} fontSize={'xl'}>
                One Time Password
              </Text>
              <ToggleTip
                content={'Generate an otp using `/share` in you discord server'}
              >
                <Button size={'xs'} variant={'ghost'}>
                  <BiInfoCircle />
                </Button>
              </ToggleTip>
            </Stack>
            <PinInput.Root
              otp
              value={squareOTP}
              onValueChange={(e) => setSquareOTP(e.value)}
              disabled={isLoading}
            >
              <PinInput.HiddenInput />
              <PinInput.Control>
                {squareOTP.map((_, index) => (
                  <PinInput.Input index={index} key={index} />
                ))}
              </PinInput.Control>
            </PinInput.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent={'center'}>
          <Button
            size={'lg'}
            colorPalette={'green'}
            onClick={handleGoForItClick}
            disabled={userOTPLength !== OTP_LENGTH || isLoading}
          >
            Go for it <BiRocket />
          </Button>
        </Card.Footer>
      </Card.Root>
    </Container>
  );
}
