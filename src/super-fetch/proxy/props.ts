export type Get = {
  path: string;
  query?: Record<string, string>;
  token?: string;
};

export type Post<T> = {
  path: string;
  data?: T;
  token?: string;
};

export type Put<T> = {
  path: string;
  data?: T;
  token?: string;
};

export type Patch<T> = {
  path: string;
  data?: T;
  token?: string;
};

export type Delete = {
  path: string;
  token?: string;
};

export type FormData = {
  path: string;
  token?: string;
  file: File;
};