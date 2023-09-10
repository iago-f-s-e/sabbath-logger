import { ErrorPatternDTO, TriggerInDTO } from '@core/dtos';

const DEFAULT_VALUE = 'unknown';

export function getErrorPattern(
  error: any,
  trigger: TriggerInDTO,
  uid: string,
  ...params: unknown[]
): ErrorPatternDTO {
  return {
    uid,
    timestamp: new Date().toISOString(),
    trigger: {
      name: trigger?.className || DEFAULT_VALUE,
      method: trigger?.methodName || DEFAULT_VALUE
    },
    params,
    error: {
      name: error?.name || DEFAULT_VALUE,
      message: error?.message || DEFAULT_VALUE,
      stack: error?.stack || DEFAULT_VALUE,
      kind: trigger?.kind || DEFAULT_VALUE
    }
  };
}
