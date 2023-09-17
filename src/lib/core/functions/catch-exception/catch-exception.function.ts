import { catchExceptionFactory } from '@core/factories';
import { getLogParams } from '@core/helpers';
import { LoggerService } from '@core/services';
import { CatchExceptionOptions } from '@core/types';

export function catchException<Fn extends (...args: any[]) => any>(
  fn: Fn,
  options?: CatchExceptionOptions,
  logger = LoggerService.getInstance()
): Fn {
  function setTrigger(kind: string): void {
    logger.trigger = {
      kind: options?.kind || kind,
      className: (fn as any).name || 'Anonymous',
      methodName: 'FUNCTIONAL'
    };
  }

  function setParams(args: any[]): void {
    logger.params = getLogParams(args, options);
  }

  function log(error: any): void {
    logger.error(error);
  }

  const factory = catchExceptionFactory(fn, { log, setParams, setTrigger }, options);

  return options?.isSync ? (factory.syncFn as Fn) : (factory.asyncFn as Fn);
}
