'use client';

import { FC, useCallback, useState } from 'react';
import {
  Button,
  Card,
  Heading,
  HStack,
  Separator,
  Stack,
} from '@chakra-ui/react';
import { LuMapPin, LuUpload } from 'react-icons/lu';
import { PassengerList } from '../passenger/list';
import { Passenger } from '../../model/passenger.model';
import { Square } from '../../model/square.model';
import UploadFileModal from '../modal/upload-file.modal';

interface SquareDetailsCardProps {
  square: Square;
  passengers: Passenger[];
}

export const SquareDetailsCard: FC<SquareDetailsCardProps> = ({
  square,
  passengers,
}) => {
  const [passengerList, setPassengerList] = useState(passengers);

  const handleTimeout = useCallback((passengerId: string) => {
    const passengerIndex = passengerList.findIndex((passenger) => {
      return passenger._id === passengerId;
    })

    const newPassengerList = passengerList.splice(passengerIndex, 1);

    setPassengerList(newPassengerList);
  }, [passengerList]);

  return (
    <Card.Root
      maxW={{ base: '400px', md: '80vw' }}
      minW={{ md: '60vw' }}
      variant={'elevated'}
    >
      <Card.Header p={6}>
        <Card.Title
          userSelect={'none'}
          color={'teal'}
          fontWeight={'bold'}
          fontSize={'2xl'}
        >
          <HStack>
            <LuMapPin />
            {square?.name}
          </HStack>
        </Card.Title>
      </Card.Header>
      <Separator />
      <Card.Body gap={5}>
        <Stack direction={'row'} justifyContent={'center'} w={'full'}>
          <UploadFileModal>
            <Button colorPalette={'teal'} minW={'200px'} maxW={'320px'}>
              <LuUpload />
              Add file
            </Button>
          </UploadFileModal>
        </Stack>
        <Heading color={'fg.muted'}>All the passengers for this bus</Heading>
        <PassengerList passengers={passengers} onTimeout={handleTimeout} />
      </Card.Body>
    </Card.Root>
  );
};
