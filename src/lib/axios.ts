import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },
});

// declare module "axios" {
//   interface AxiosRequestConfig {
//     _retry?: boolean;
//   }

//   interface AxiosResponse<T = any> extends Promise<T> {}

//   interface AxiosInstance {
//     (config: AxiosRequestConfig): AxiosResponse;
//     (url: string, config?: AxiosRequestConfig): AxiosResponse;
//   }

//   interface AxiosStatic extends AxiosInstance {
//     create(config?: AxiosRequestConfig): AxiosInstance;
//   }

//   interface AxiosInterceptorManager<V> {
//     use(
//       onFulfilled?: (value: V) => V | Promise<V>,
//       onRejected?: (error: any) => any
//     ): number;
//     eject(id: number): void;
//   }

//   //axios post is not functioning properly
//   interface AxiosInstance {
//     post<T = any, R = AxiosResponse<T>>(
//       url: string,
//       data?: any,
//       config?: AxiosRequestConfig
//     ): R;
//   }
// }
