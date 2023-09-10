import { TriggerInDTO } from '@core/dtos';

export interface LoggerService {
  get trigger(): TriggerInDTO;
  set trigger(trigger: Partial<TriggerInDTO>);

  get params(): unknown[];
  set params(params: unknown[]);

  get uid(): string;
  set uid(uid: string);

  error(error: any): void;
}
