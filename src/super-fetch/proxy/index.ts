import { SuperFetch, SuperFetchFormData } from '../super-fetch';
import { HttpStatus } from '../types/http-status';
import { HttpVerbs } from '../types/http-verbs';
import { Result } from '../types/result';
import * as ProxyProps from './props';

export class SFProxy {
  constructor(
    private readonly baseURL: string,
    private readonly onError: (status: HttpStatus) => void
  ) {}

  public async get<T>({
    path,
    query,
    token,
  }: ProxyProps.Get): Promise<Result<T>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: HttpVerbs.GET,
      query: query ? new URLSearchParams(query) : undefined,
      token,
      onError: this.onError,
    });
  }

  public async post<T, U>({
    path,
    data,
    token,
  }: ProxyProps.Post<T>): Promise<Result<U>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: HttpVerbs.POST,
      data,
      token,
      onError: this.onError,
    });
  }

  public async patch<T, U>({
    path,
    data,
    token,
  }: ProxyProps.Patch<T>): Promise<Result<U>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: HttpVerbs.PATCH,
      data,
      token,
      onError: this.onError,
    });
  }

  public async put<T, U>({
    path,
    data,
    token,
  }: ProxyProps.Patch<T>): Promise<Result<U>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: HttpVerbs.PUT,
      data,
      token,
      onError: this.onError,
    });
  }

  public async delete<T>({
    path,
    token,
  }: ProxyProps.Delete): Promise<Result<T>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: HttpVerbs.DELETE,
      token,
      onError: this.onError,
    });
  }

  public async sendFile<T>({
    file,
    path,
    token,
  }: ProxyProps.FormData): Promise<Result<T>> {
    const data = new FormData();
    data.append('file', file);

    return SuperFetchFormData({ path: `${this.baseURL}${path}`, token, data });
  }
}
