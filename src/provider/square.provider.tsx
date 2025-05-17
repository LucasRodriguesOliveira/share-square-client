'use client';

import { FC, ReactNode, useCallback, useState } from 'react';
import { SquareContext } from '../context/square.context';
import { Square } from '../model/square.model';
import { getSquareByOTPAction } from '../action/square/get-square-by-otp.action';
import { Result } from '../api/result';
import { HttpException } from '../exception/http.exception';

type SquareProviderProps = {
  children: ReactNode;
};

export const SquareProvider: FC<SquareProviderProps> = ({ children }) => {
  const [square, setSquare] = useState<Square>();

  const connect = useCallback(async (otp: string) => {
    const result: Result<Square, HttpException> = await getSquareByOTPAction(otp);

    setSquare(result?.value);

    return result;
  }, []);

  return (
    <SquareContext.Provider value={{
      square,
      connect,
    }}>
      {children}
    </SquareContext.Provider>
  );
};
