import { Badge, Card, HStack } from '@chakra-ui/react';
import { findPassengerByIdAction } from '../../../action/passenger/find-by-id.action';
import { LuFile } from 'react-icons/lu';
import { notFound } from 'next/navigation';
import { DownloadPassengerButton } from './dowload-button';

interface DownloadPassengerCardProps {
  passengerId: string;
}

export default async function DownloadPassengerCard({
  passengerId,
}: DownloadPassengerCardProps) {
  const passengerResult = await findPassengerByIdAction({ passengerId });

  if (passengerResult.error) {
    const { error } = passengerResult;
    console.log(DownloadPassengerCard.name, error);
    notFound();
  }

  const passenger = passengerResult.value!;

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
          <HStack>
            <LuFile />
            {passenger.originalname}
            <Badge colorPalette={'pink'}>{passenger.mimetype}</Badge>
          </HStack>
        </Card.Title>
        <Card.Body justifyContent={'center'} alignItems={'center'} p={10}>
          <DownloadPassengerButton
            filename={passenger.originalname}
            otp={passenger.otp}
          />
        </Card.Body>
      </Card.Header>
    </Card.Root>
  );
}
