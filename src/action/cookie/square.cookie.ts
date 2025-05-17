import { SQUARE_TOKEN } from '../../constants/cookie.token';
import { clearCookie, getCookie, setCookie } from '.';

export const getSquareOTP = async (): Promise<string | undefined> => {
  return getCookie(SQUARE_TOKEN.description!);
};

export const clearSquareOTP = async (): Promise<void> => {
  return clearCookie(SQUARE_TOKEN.description!);
};

export const setSquareOTP = async (squareOTP: string): Promise<void> => {
  await setCookie(SQUARE_TOKEN.description!, squareOTP);
};

const SquareCookie = {
  squareOTP: {
    get: getSquareOTP,
    clear: clearSquareOTP,
    set: setSquareOTP,
  },
};

export default SquareCookie;
