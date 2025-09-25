/**
 * Network client interface for dependency injection
 * Platform-agnostic HTTP client interface
 */

import { BaseResponse, Optional } from '../common';

interface NetworkRequestOptions {
  method: Optional<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>;
  headers: Optional<Record<string, string>>;
  body: Optional<string | FormData | Blob>;
  signal: Optional<AbortSignal>;
  timeout: Optional<number>;
}

interface NetworkResponse<T = unknown> extends BaseResponse<T> {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

interface NetworkClient {
  /**
   * Make a network request
   */
  request<T = unknown>(
    url: string,
    options: Optional<NetworkRequestOptions>
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a GET request
   */
  get<T = unknown>(
    url: string,
    options: Optional<Omit<NetworkRequestOptions, 'method' | 'body'>>
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a POST request
   */
  post<T = unknown>(
    url: string,
    body: Optional<unknown>,
    options: Optional<Omit<NetworkRequestOptions, 'method'>>
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a PUT request
   */
  put<T = unknown>(
    url: string,
    body: Optional<unknown>,
    options: Optional<Omit<NetworkRequestOptions, 'method'>>
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a DELETE request
   */
  delete<T = unknown>(
    url: string,
    options: Optional<Omit<NetworkRequestOptions, 'method' | 'body'>>
  ): Promise<NetworkResponse<T>>;
}

class NetworkError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly response: Optional<unknown>;

  constructor(
    message: string,
    status: number,
    statusText: string,
    response: Optional<unknown>
  ) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}

export {
  type NetworkClient,
  type NetworkResponse,
  type NetworkRequestOptions,
  NetworkError,
};
