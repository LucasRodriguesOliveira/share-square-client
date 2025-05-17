import { instanceToPlain } from 'class-transformer';
import { Result } from '../../api/result';
import { HttpException } from '../../exception/http.exception';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';
import { NotFoundException } from '../../exception/not-found.exception';
import { Passenger } from '../../model/passenger.model';
import { Error } from '../../super-fetch/types/error';
import { HttpStatus } from '../../super-fetch/types/http-status';
import { sp } from '../api';

export const getSquareBusAction = async (
  squareId: string
): Promise<Result<Passenger[], HttpException>> => {
  const response = await sp.get<Passenger[]>({
    path: `/square/${squareId}/bus`,
  });

  if (!response.ok) {
    const result: Result<Passenger[], HttpException> = {
      error: undefined,
    };

    const { statusCode, message }: Error = await response.original.json();

    switch (statusCode) {
      case HttpStatus.UNAUTHORIZED:
        result.error = new NotFoundException(message);
        break;
      default:
        result.error = new InternalServerErrorException(
          Array.isArray(message) ? message.join() : message
        );
    }

    return instanceToPlain(result);
  }

  return {
    value: response.data,
  };
};
