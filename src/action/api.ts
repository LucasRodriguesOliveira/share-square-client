import { API_URL } from '../constants/api';
import { SFProxy } from '../super-fetch/proxy';
import { HttpStatus } from '../super-fetch/types/http-status';
import SquareCookie from './cookie/square.cookie';

const onError = async (status: HttpStatus) => {
  // useful for unauthorized errors and cleaning the cookies
  console.log('SFProxy API', { status });

  if (HttpStatus.UNAUTHORIZED === status) {
    await SquareCookie.squareOTP.clear();
  }
};

export const sp = new SFProxy(API_URL, onError);
