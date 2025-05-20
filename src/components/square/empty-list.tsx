import { EmptyState, VStack } from '@chakra-ui/react';
import { LuFile } from 'react-icons/lu';

export const EmptyPassengerList = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuFile />
        </EmptyState.Indicator>
        <VStack textAlign={'center'}>
          <EmptyState.Title>There are no files on this square</EmptyState.Title>
          <EmptyState.Description>Consider uploading a new file</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
