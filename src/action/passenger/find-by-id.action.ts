import { instanceToPlain } from 'class-transformer';
import { Result } from '../../api/result';
import { HttpException } from '../../exception/http.exception';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';
import { NotFoundException } from '../../exception/not-found.exception';
import { Passenger } from '../../model/passenger.model';
import { Error } from '../../super-fetch/types/error';
import { HttpStatus } from '../../super-fetch/types/http-status';
import { sp } from '../api';

type FindPassengerByIdActionProps = {
  passengerId: string;
};

export const findPassengerByIdAction = async ({
  passengerId,
}: FindPassengerByIdActionProps): Promise<Result<Passenger, HttpException>> => {
  const response = await sp.get<Passenger>({
    path: `/passenger/${passengerId}`,
  });

  if (!response.ok) {
    const result: Result<Passenger, HttpException> = {
      error: undefined,
    };

    const { statusCode, message }: Error = await response.original.json();

    if (HttpStatus.NOT_FOUND === statusCode) {
      result.error = new NotFoundException(message);
    } else {
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
