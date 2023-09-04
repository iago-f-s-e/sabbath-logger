import { ErrorPatternDTO } from '@domain/dtos';
import { LoggerImp } from '@domain/implementations';
import { Logger } from '@domain/interfaces';

export class LoggerStdout extends LoggerImp implements Logger {
  public override error(err: ErrorPatternDTO): void {
    console.error(
      `${this.COLOR_DANGER}${this.ERROR_PREFIX} - ${this.stringify(err)}${this.COLOR_END}`
    );
  }
}
