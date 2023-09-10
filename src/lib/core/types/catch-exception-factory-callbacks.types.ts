import { CommonFactoryCallbacks } from '@core/types/common-factory-callbacks.types';

export type CatchExceptionFactoryCallbacks = CommonFactoryCallbacks & {
  log(error: any): void;
};
