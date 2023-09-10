import { ErrorPatternDTO } from '@domain/dtos';

export interface Logger {
  error(err: ErrorPatternDTO): void;
}
