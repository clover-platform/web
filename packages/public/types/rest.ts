import {RestResult as _RestResult} from "@clover/public/utils/rest";

export type RestResult<T> = _RestResult<T>;

export type PageResult<T> = RestResult<{
  total: number;
  data: T[];
}>
