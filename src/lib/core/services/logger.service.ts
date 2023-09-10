import { TriggerInDTO } from '@core/dtos';
import { getErrorPattern } from '@core/helpers';
import { Logger, LoggerService as ILoggerService } from '@core/interfaces';
import { LoggerStdout } from '@infra/stdout';

export class LoggerService implements ILoggerService {
  private static instance: ILoggerService;
  private loggerUid = '';
  private loggerErrParams: unknown[] = [];
  private loggerTrigger: TriggerInDTO = {} as TriggerInDTO;

  private constructor(private readonly logger: Logger) {}

  public static getInstance(logger: Logger = new LoggerStdout()): ILoggerService {
    if (!this.instance) {
      this.instance = new LoggerService(logger);
    }

    return this.instance;
  }

  public get trigger(): TriggerInDTO {
    return this.loggerTrigger;
  }

  public set trigger(trigger: Partial<TriggerInDTO>) {
    this.loggerTrigger = trigger as TriggerInDTO;
  }

  public get params(): unknown[] {
    return this.loggerErrParams;
  }

  public set params(params: unknown[]) {
    this.loggerErrParams = params;
  }

  public get uid(): string {
    return this.loggerUid;
  }

  public set uid(uid: string) {
    this.loggerUid = uid;
  }

  public error(error: any): void {
    this.logger.error(getErrorPattern(error, this.trigger, this.uid, ...this.params));
  }
}
