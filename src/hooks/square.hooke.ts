'use client';

import { useContext } from 'react';
import { SquareContext } from '../context/square.context';

export const useSquare = () => {
  const { connect, square } = useContext(SquareContext);

  return {
    connect,
    square,
  };
};
