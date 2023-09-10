import { ErrorPatternDTO } from '@core/dtos';

export interface Logger {
  error(err: ErrorPatternDTO): void;
}
