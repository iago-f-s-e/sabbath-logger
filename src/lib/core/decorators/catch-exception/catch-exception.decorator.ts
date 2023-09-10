import { catchExceptionFactory } from '@core/factories';
import { getLogParams } from '@core/helpers';
import { LoggerService } from '@core/services';
import { CatchExceptionOptions } from '@core/types';

export function CatchException(
  options?: CatchExceptionOptions,
  logger = LoggerService.getInstance()
) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;

    function setTrigger(kind: string): void {
      logger.trigger = {
        kind: options?.kind || kind,
        className: target.constructor.name,
        methodName: methodName
      };
    }

    function setParams(args: any[]): void {
      logger.params = getLogParams(args, options);
    }

    function log(error: any): void {
      logger.error(error);
    }

    const factory = catchExceptionFactory(method, { log, setParams, setTrigger }, options);

    descriptor.value = options?.isSync ? factory.syncFn : factory.asyncFn;

    return descriptor;
  };
}
