export type Result<T> = {
  original: Response;
  ok: boolean;
  data: T;
};
