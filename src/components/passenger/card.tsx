'use client';

import { FC } from 'react';
import { Passenger } from '../../model/passenger.model';
import {
  Badge,
  CheckboxCard,
  Float,
  Icon,
  Menu,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { LuFileArchive } from 'react-icons/lu';
import { PassengerDueTimeProgress } from './due-time.progress';
import { useRouter } from 'next/navigation';

interface PassengerCardProps {
  passenger: Passenger;
  onTimeout: () => void;
}

export const PassengerCard: FC<PassengerCardProps> = ({
  passenger,
  onTimeout,
}) => {
  const router = useRouter();

  const handleSelect = (value: string) => {
    if (value === 'download') {
      router.push(`/passenger/${passenger._id}`);
    }
  }

  return (
    <Menu.Root onSelect={(e) => handleSelect(e.value)}>
      <Menu.ContextTrigger>
        <CheckboxCard.Root
          variant={'surface'}
          colorPalette={'pink'}
          value={passenger._id}
        >
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <Stack direction={'row'}>
                <Icon size={'2xl'} mr={2}>
                  <LuFileArchive />
                </Icon>
                <CheckboxCard.Label>
                  {passenger.originalname}
                </CheckboxCard.Label>
              </Stack>
              <CheckboxCard.Description>
                <Stack>
                  <Badge>{passenger.mimetype}</Badge>
                  <PassengerDueTimeProgress
                    createdAt={new Date(passenger.createdAt)}
                    onProgressFinished={onTimeout}
                  />
                </Stack>
              </CheckboxCard.Description>
            </CheckboxCard.Content>
            <Float placement={'top-end'} offset={6}>
              <CheckboxCard.Indicator />
            </Float>
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      </Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content colorPalette={'pink'}>
            <Menu.Item value='download'>Download</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
