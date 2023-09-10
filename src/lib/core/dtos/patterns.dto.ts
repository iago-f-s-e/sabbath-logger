import { ErrorDTO } from '@core/dtos/error.dto';
import { TriggerOutDTO } from '@core/dtos/trigger.dto';

export type ErrorPatternDTO = Pick<TriggerOutDTO, 'params'> & {
  uid: string;
  timestamp: string;
  trigger: Omit<TriggerOutDTO, 'params'>;
  error: ErrorDTO;
};
