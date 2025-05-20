'use client';

import { Progress } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';

interface PassengerDueTimeProgressProps {
  createdAt: Date;
  onProgressFinished: () => void;
}

const PROGRESS_STEP_SIZE = 2;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const MAX_FILE_TTL = 5 * MINUTE; // future versions: this info comes from the passenger

export const PassengerDueTimeProgress: FC<PassengerDueTimeProgressProps> = ({
  createdAt,
  onProgressFinished,
}) => {
  const dueDate = useMemo(() => {
    return new Date(createdAt.getTime() + MAX_FILE_TTL);
  }, [createdAt]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (progress <= 100) {
        const now = Date.now();
        const maxDuration = dueDate.getTime() - createdAt.getTime();
        const currentDuration = dueDate.getTime() - now;

        const newProgress = (maxDuration - currentDuration) / maxDuration * 100;

        setProgress(newProgress);
      } else {
        onProgressFinished();
      }
    }, PROGRESS_STEP_SIZE * SECOND);

    return () => {
      clearInterval(timerId);
    };
  }, [progress, onProgressFinished, createdAt, dueDate]);

  return (
    <Progress.Root
      size={'sm'}
      strokeLinecap={'round'}
      colorPalette={'red'}
      value={progress}
    >
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
};
