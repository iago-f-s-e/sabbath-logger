import { CommonOptions } from '@core/types/common-options.types';

export type CatchExceptionOptions = CommonOptions & {
  customErrorInstance?: any;
  bubbleException?: boolean;
  returnOnException?: (
    exception: any,
    context?: any,
    ...params: any[]
  ) => unknown | Promise<unknown>;
  onException?: (exception: any, context?: any) => void | Promise<void>;
};
