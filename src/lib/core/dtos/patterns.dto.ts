import { ErrorDTO } from '@domain/dtos/error.dto';
import { TriggerDTO } from '@domain/dtos/trigger.dto';

export type ErrorPatternDTO = Pick<TriggerDTO, 'params'> & {
  timestamp: string;
  trigger: Omit<TriggerDTO, 'params'>;
  error: ErrorDTO;
};
