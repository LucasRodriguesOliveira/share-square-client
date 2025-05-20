'use server';

import { API_URL } from '../../constants/api';

interface DownloadFileActionProps {
  otp: string;
}

export const downloadFileAction = async ({
  otp,
}: DownloadFileActionProps): Promise<Blob> => {
  const response = await fetch(`${API_URL}/passenger/${otp}/download`, {
    method: 'GET',
  });

  return response.blob();
};
