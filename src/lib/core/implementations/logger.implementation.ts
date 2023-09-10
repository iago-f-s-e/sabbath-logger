import { ErrorPatternDTO } from '@domain/dtos';
import { Logger } from '@domain/interfaces';

export abstract class LoggerImp implements Logger {
  protected readonly COLOR_DANGER = '\x1b[31m';
  protected readonly COLOR_SUCCESS = '\x1b[32m';
  protected readonly COLOR_WARN = '\x1b[33m';
  protected readonly COLOR_END = '\x1b[0m';
  protected readonly ERROR_PREFIX = '[ERROR]';

  protected stringify(data: unknown): string {
    return JSON.stringify(data, null, 2);
  }

  public abstract error(err: ErrorPatternDTO): void;
}
