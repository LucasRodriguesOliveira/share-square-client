'use client';

import { Button } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { downloadFileAction } from '../../../action/passenger/download-file.action';

interface DownloadPassengerButtonProps {
  otp: string;
  filename: string;
}

export const DownloadPassengerButton = ({
  otp,
  filename,
}: DownloadPassengerButtonProps) => {
  const [fileURL, setFileURL] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const handleDownloadClick = useCallback(async () => {
    setIsLoading(true);
    const file = await downloadFileAction({ otp });
    setFileURL(URL.createObjectURL(file));
    setIsLoading(false);
  }, [otp]);

  useEffect(() => {
    if (fileURL) {
      ref.current?.click();
      URL.revokeObjectURL(fileURL);
    }
  }, [fileURL, ref]);

  return (
    <>
      <Button
        variant={'solid'}
        colorPalette={'pink'}
        size={'lg'}
        onClick={handleDownloadClick}
        loading={isLoading}
        loadingText={'Downloading...'}
      >
        Download
      </Button>
      {fileURL && (
        <NextLink
          href={fileURL}
          download={filename}
          style={{ display: 'none' }}
          ref={ref}
        ></NextLink>
      )}
    </>
  );
};
