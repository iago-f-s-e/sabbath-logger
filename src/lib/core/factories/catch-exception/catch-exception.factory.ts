import { Factory } from '@core/interfaces';
import { CatchExceptionFactoryCallbacks, CatchExceptionOptions } from '@core/types';

export function catchExceptionFactory(
  method: any,
  callbacks: CatchExceptionFactoryCallbacks,
  options?: CatchExceptionOptions
): Factory {
  return {
    syncFn(...args): any {
      callbacks.setTrigger((this as any)?.__kind);
      callbacks.setParams(args);

      try {
        return method.apply(this, args);
      } catch (e) {
        callbacks.log(e);

        if (options?.returnOnException) {
          return options?.returnOnException.call(this, e, this, ...args);
        }

        if (options?.onException) {
          options.onException.call(this, e, this);
        }

        if (options?.customErrorInstance || options?.bubbleException) {
          throw options?.customErrorInstance || e;
        }
      }
    },

    async asyncFn(...args): Promise<any> {
      callbacks.setTrigger((this as any)?.__kind);
      callbacks.setParams(args);

      try {
        return await method.apply(this, args);
      } catch (e) {
        callbacks.log(e);

        if (options?.returnOnException) {
          return options?.returnOnException.call(this, e, this, ...args);
        }

        if (options?.onException) {
          await options.onException.call(this, e, this);
        }

        if (options?.customErrorInstance || options?.bubbleException) {
          throw options?.customErrorInstance || e;
        }
      }
    }
  };
}
