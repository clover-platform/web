import {AxiosResponse} from "axios";

export type RestConfig = {
  onResponse?: (data: RestResult<any>, response: AxiosResponse) => void;
}

export type CancellablePromise<T> = Promise<T> & { cancel: () => void };

export type RestResult<T> = {
  success?: boolean;
  code?: number;
  message?: string;
  data?: T;
}

export type PageData<T> = {
  total: number;
  data: T[];
}

export type PageResult<T> = RestResult<PageData<T>>


