'use server';

import { cookies as NextCookies } from 'next/headers';

export const getCookie = async (key: string): Promise<string | undefined> => {
  return (await NextCookies()).get(key)?.value;
};

export const clearCookie = async (key: string): Promise<void> => {
  (await NextCookies()).delete(key);
};

export const setCookie = async (key: string, value: string): Promise<void> => {
  (await NextCookies()).set(key, value, { httpOnly: true, maxAge: 3600 });
};
