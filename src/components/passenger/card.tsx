'use client';

import { FC } from 'react';
import { Passenger } from '../../model/passenger.model';
import { Badge, CheckboxCard, Float, Icon } from '@chakra-ui/react';
import { LuFileArchive } from 'react-icons/lu';
import { PassengerDueTimeProgress } from './due-time.progress';

interface PassengerCardProps {
  passenger: Passenger;
  onTimeout: () => void;
}

export const PassengerCard: FC<PassengerCardProps> = ({
  passenger,
  onTimeout,
}) => {
  return (
    <CheckboxCard.Root
      variant={'surface'}
      colorPalette={'pink'}
      value={passenger._id}
    >
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <Icon size={'2xl'} mr={2}>
            <LuFileArchive />
          </Icon>
          <CheckboxCard.Label>{passenger.originalname}</CheckboxCard.Label>
          <CheckboxCard.Description>
            <Badge>{passenger.mimetype}</Badge>
            <PassengerDueTimeProgress
              createdAt={new Date(passenger.createdAt)}
              onProgressFinished={onTimeout}
            />
          </CheckboxCard.Description>
        </CheckboxCard.Content>
        <Float placement={'top-end'} offset={6}>
          <CheckboxCard.Indicator />
        </Float>
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  );
};
