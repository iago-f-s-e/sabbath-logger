import { ErrorPatternDTO } from '@core/dtos';
import { LoggerImp } from '@core/implementations';
import { Logger } from '@core/interfaces';

export class LoggerStdout extends LoggerImp implements Logger {
  public override error(err: ErrorPatternDTO): void {
    console.error(
      `${this.COLOR_DANGER}${this.ERROR_PREFIX} - ${this.stringify(err)}${this.COLOR_END}`
    );
  }
}
