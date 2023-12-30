'use client';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  withCredentials: true,
});

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }

  interface AxiosResponse<T = any> extends Promise<T> {}

  interface AxiosInstance {
    (config: AxiosRequestConfig): AxiosResponse;
    (url: string, config?: AxiosRequestConfig): AxiosResponse;
  }

  interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
  }

  interface AxiosInterceptorManager<V> {
    use(
      onFulfilled?: (value: V) => V | Promise<V>,
      onRejected?: (error: any) => any
    ): number;
    eject(id: number): void;
  }

  //axios post is not functioning properly
  interface AxiosInstance {
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): R;
  }
}
