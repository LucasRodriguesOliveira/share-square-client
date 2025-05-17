import { createContext } from 'react';
import { Square } from '../model/square.model';
import { Result } from '../api/result';
import { HttpException } from '../exception/http.exception';

export type SquareContextProps = {
  square?: Square;
  connect(otp: string): Promise<Result<Square, HttpException>>;
};

export const SquareContext = createContext<SquareContextProps>({
  connect: async () => ({}),
});
