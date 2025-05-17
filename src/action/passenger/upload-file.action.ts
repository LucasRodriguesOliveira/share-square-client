import { instanceToPlain } from 'class-transformer';
import { Result } from '../../api/result';
import { HttpException } from '../../exception/http.exception';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';
import { UnauthorizedException } from '../../exception/unauthorized.exception';
import { Error } from '../../super-fetch/types/error';
import { sp } from '../api';
import SquareCookie from '../cookie/square.cookie';
import { getSquareByOTPAction } from '../square/get-square-by-otp.action';

interface UploadFileActionProps {
  file: File;
}

export const uploadFileAction = async ({
  file,
}: UploadFileActionProps): Promise<Result<void, HttpException>> => {
  const squareOTP = await SquareCookie.squareOTP.get();

  if (!squareOTP) {
    SquareCookie.squareOTP.clear();
    throw new UnauthorizedException('No OTP found');
  }

  const squareResult = await getSquareByOTPAction(squareOTP);

  if (squareResult.error) {
    SquareCookie.squareOTP.clear();
    throw new UnauthorizedException(
      'OTP is no longer valid, you need to generate another one'
    );
  }

  const response = await sp.sendFile({
    file,
    path: `/passenger/${squareResult.value?._id}`,
  });

  if (!response.ok) {
    const result: Result<void, HttpException> = {
      error: undefined,
    };

    const { message }: Error = await response.original.json();

    result.error = new InternalServerErrorException(message);

    return instanceToPlain(result);
  }

  return {};
};
