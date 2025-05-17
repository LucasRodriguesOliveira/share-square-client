'use client';

import { Box, FileUpload, Icon, useFileUpload } from '@chakra-ui/react';
import { useEffect } from 'react';
import { LuUpload } from 'react-icons/lu';

const KByte = 1024;
const MByte = 1024 * KByte;
const maxSize = 500 * MByte;

interface UploadFileFormProps {
  onUpload: (files: File[]) => void;
}

export default function UploadFileForm({ onUpload }: UploadFileFormProps) {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: maxSize,
  });

  useEffect(() => {
    onUpload(fileUpload.acceptedFiles);
  }, [fileUpload, onUpload]);

  return (
    <FileUpload.RootProvider
      maxW={'xl'}
      alignItems={'stretch'}
      value={fileUpload}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone cursor={'pointer'} _hover={{ shadow: 'md' }}>
        <Icon size={'md'} color={'fg.muted'}>
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color={'fg.muted'}>up to 500mb</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.RootProvider>
  );
}
