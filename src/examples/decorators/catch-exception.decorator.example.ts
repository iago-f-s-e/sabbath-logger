import { CatchException } from '@core/decorators';
import { LoggerService } from '@core/services';
import { randomUUID } from 'crypto';

class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class CatchExceptionDecoratorExample {
  private errorMessage = 'Generic error message';
  private _transactionRollback(origin: any): void {
    console.log(`rollback transaction called by: ${origin}`);
  }
  @CatchException({
    kind: 'Example',
    isSync: true,
    onException: (error, context) => {
      console.log(`[withArrowOnException] ${error.name}`);
      context._transactionRollback('withArrowOnException');
    }
  })
  public withArrowOnException(_arg1: any, _argr2: any): void {
    throw new Error('With Arrow OnException');
  }

  @CatchException({
    kind: 'Example',
    isSync: true,
    onException(error) {
      console.log(`[withFunctionOnException] ${error.name}`);
      (this as any)._transactionRollback('withFunctionOnException');
    }
  })
  public withFunctionOnException(_arg1: any, _argr2: any): void {
    throw new Error('With Function OnException');
  }

  @CatchException({
    kind: 'Example',
    isSync: true,
    returnOnException(_error, context, arg1, arg2) {
      return { status: 500, message: context.errorMessage, params: { name: arg1, address: arg2 } };
    }
  })
  public withReturnOnException(_arg1: any, _arg2: any): any {
    throw new Error('With ReturnOnException');
  }

  @CatchException({
    kind: 'Example',
    isSync: true,
    pipeParams: (name, email, _password) => {
      return { user: { name, email } };
    }
  })
  public withPipeParams(_name: any, _email: any, _password: any): void {
    throw new Error('With PipeParams');
  }

  @CatchException({
    kind: 'Example',
    isSync: true,
    hideParams: true
  })
  public withHideParams(_password: any): void {
    throw new Error('With HideParams');
  }

  @CatchException({
    kind: 'Example',
    isSync: true,
    customErrorInstance: new CustomError('User not found')
  })
  public withCustomError(): void {
    throw new Error('CustomError');
  }
}

const logger = LoggerService.getInstance();
const example = new CatchExceptionDecoratorExample();

logger.uid = randomUUID();

console.log('##############################################################################');
example.withArrowOnException('foo', { bar: 'bar' });

console.log('##############################################################################');
example.withFunctionOnException('foo', { bar: 'bar' });

console.log('##############################################################################');
const withReturn = example.withReturnOnException('John Doe', { city: 'New York' });
console.log(`[withReturnOnException], ${JSON.stringify(withReturn, null, 2)}`);

console.log('##############################################################################');
example.withPipeParams('John Doe', 'john_doe@example.com', '1234567');

console.log('##############################################################################');
example.withHideParams('1234567');

console.log('##############################################################################');
try {
  example.withCustomError();
} catch (e: any) {
  console.log(`[withCustomError] instanfe of CustomError: ${e instanceof CustomError}`);
}

logger.uid = '';
