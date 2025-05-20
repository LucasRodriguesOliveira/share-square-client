'use client';

import { FC, useCallback, useState } from 'react';
import { Passenger } from '../../model/passenger.model';
import {
  ActionBar,
  Button,
  CheckboxGroup,
  Portal,
  SimpleGrid,
} from '@chakra-ui/react';
import { PassengerCard } from './card';
import { LuDownload, LuTrash2 } from 'react-icons/lu';

interface PassengerListProps {
  passengers: Passenger[];
  onTimeout: (passengerId: string) => void;
}

export const PassengerList: FC<PassengerListProps> = ({
  passengers,
  onTimeout,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleClearSelectionClick = useCallback(() => {
    setSelected([]);
  }, []);

  const handleDownloadSelectionClick = useCallback(() => {
    console.log('Download request for the files: ', selected);
  }, [selected]);

  return (
    <>
      <CheckboxGroup
        onValueChange={(value) => setSelected(value)}
        value={selected}
      >
        <SimpleGrid minChildWidth={'200px'} gap={2}>
          {passengers.map((passenger) => (
            <PassengerCard
              passenger={passenger}
              key={passenger._id}
              onTimeout={() => {
                handleClearSelectionClick();
                onTimeout(passenger._id);
              }}
            />
          ))}
        </SimpleGrid>
      </CheckboxGroup>
      <ActionBar.Root open={selected.length > 0}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selected.length} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button
                variant={'outline'}
                size={'sm'}
                colorPalette={'red'}
                onClick={handleClearSelectionClick}
              >
                <LuTrash2 />
                Clear selection
              </Button>
              <Button
                variant={'subtle'}
                size={'sm'}
                colorPalette={'teal'}
                onClick={handleDownloadSelectionClick}
              >
                <LuDownload />
                Download selected
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};
