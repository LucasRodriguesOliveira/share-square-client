'use client';

import { ReactNode, useCallback, useState } from 'react';
import Modal from '.';
import UploadFileForm from '../form/upload-file.form';
import { Button } from '@chakra-ui/react';
import { uploadFileAction } from '../../action/passenger/upload-file.action';
import { toaster } from '../ui/toaster';

interface UploadFileModalProps {
  children: ReactNode;
}

export default function UploadFileModal({ children }: UploadFileModalProps) {
  const [file, setFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpload = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      return;
    }

    setFile(null);
  }, []);

  const handleSaveClick = useCallback(() => {
    if (file) {
      setIsLoading(true);
      uploadFileAction({ file }).then((result) => {
        if (result?.error) {
          toaster.error({
            title: 'Oops!',
            description: result.error.message,
          });
        }

        setIsLoading(false);
      });
    }
  }, [file]);

  return (
    <Modal
      open={open}
      onOpen={setOpen}
      motion={'scale'}
      form={<UploadFileForm onUpload={handleUpload} />}
      title={'Upload file'}
      saveButton={
        <Button
          colorPalette={'teal'}
          disabled={!file || isLoading}
          onClick={handleSaveClick}
        >Upload</Button>
      }
      isLoading={isLoading}
    >{children}</Modal>
  );
}
