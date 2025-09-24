/**
 * Network client interface for dependency injection
 * Platform-agnostic HTTP client interface
 */

import { BaseResponse } from '../common';

interface NetworkRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string | FormData | Blob;
  signal?: AbortSignal;
  timeout?: number;
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
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a GET request
   */
  get<T = unknown>(
    url: string,
    options?: Omit<NetworkRequestOptions, 'method' | 'body'>
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a POST request
   */
  post<T = unknown>(
    url: string,
    body?: unknown,
    options?: Omit<NetworkRequestOptions, 'method'>
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a PUT request
   */
  put<T = unknown>(
    url: string,
    body?: unknown,
    options?: Omit<NetworkRequestOptions, 'method'>
  ): Promise<NetworkResponse<T>>;

  /**
   * Make a DELETE request
   */
  delete<T = unknown>(
    url: string,
    options?: Omit<NetworkRequestOptions, 'method' | 'body'>
  ): Promise<NetworkResponse<T>>;
}

class NetworkError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly response?: unknown;

  constructor(
    message: string,
    status: number,
    statusText: string,
    response?: unknown
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
