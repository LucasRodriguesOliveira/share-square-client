import {
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  Icon,
  Portal,
  Presence,
  ProgressCircle,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { LuUpload } from 'react-icons/lu';

type MotionPreset =
  | 'slide-in-right'
  | 'slide-in-bottom'
  | 'slide-in-top'
  | 'scale'
  | 'slide-in-left'
  | 'none';

interface ModalProps {
  children: ReactNode;
  motion: MotionPreset;
  title: string;
  form: ReactNode;
  saveButton: ReactNode;
  open: boolean;
  onOpen: (isOpen: boolean) => void;
  isLoading: boolean;
}

export default function Modal({
  children,
  form,
  saveButton,
  motion,
  onOpen,
  open,
  title,
  isLoading,
}: ModalProps) {
  return (
    <Dialog.Root
      motionPreset={motion}
      closeOnInteractOutside={!isLoading}
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger top={0} insetEnd={-12} asChild>
              <CloseButton
                size={'sm'}
                colorPalette={'red'}
                rounded={'full'}
                variant={'ghost'}
                disabled={isLoading}
              />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>
                <HStack color={'teal'}>
                  <Icon size={'lg'}>
                    <LuUpload />
                  </Icon>
                  <Heading size={'2xl'}>{title}</Heading>
                </HStack>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Presence
                present={!isLoading}
                animationName={{
                  _open: 'slide-from-bottom, fade-in',
                  _closed: 'slide-to-bottom, fade-out',
                }}
                animationDuration={'moderate'}
              >
                {form}
              </Presence>
              <Presence
                present={isLoading}
                animationName={{
                  _open: 'slide-from-bottom, fade-in',
                  _closed: 'slide-to-bottom, fade-out',
                }}
                animationDuration={'moderate'}
              >
                <ProgressCircle.Root
                  maxW={'lg'}
                  strokeLinecap={'round'}
                  colorPalette={'teal'}
                  value={null}
                >
                  <ProgressCircle.Circle>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range />
                  </ProgressCircle.Circle>
                </ProgressCircle.Root>
              </Presence>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant={'outline'}
                  colorPalette={'red'}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              {saveButton}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
