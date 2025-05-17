import { instanceToPlain } from 'class-transformer';
import { Result } from '../../api/result';
import { HttpException } from '../../exception/http.exception';
import { Square } from '../../model/square.model';
import { sp } from '../api';
import { Error } from '../../super-fetch/types/error';
import { HttpStatus } from '../../super-fetch/types/http-status';
import { NotFoundException } from '../../exception/not-found.exception';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';
import SquareCookie from '../cookie/square.cookie';

export const getSquareByOTPAction = async (
  otp: string
): Promise<Result<Square, HttpException>> => {
  const response = await sp.get<Square>({
    path: `/square/${otp}`,
  });

  if (!response.ok) {
    const result: Result<Square, HttpException> = {
      error: undefined,
    };

    const { statusCode, message }: Error = await response.original.json();

    switch (statusCode) {
      case HttpStatus.NOT_FOUND:
        result.error = new NotFoundException(message);
        break;
      default:
        result.error = new InternalServerErrorException(
          Array.isArray(message) ? message.join() : message
        );
    }

    return instanceToPlain(result);
  }

  const cookieExists = await SquareCookie.squareOTP.get();

  if (!cookieExists) {
    await SquareCookie.squareOTP.set(otp);
  }

  return {
    value: response.data,
  };
};
