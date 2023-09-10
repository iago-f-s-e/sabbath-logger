import { Logger, LoggerService as ILoggerService } from '@core/interfaces';
import { LoggerService } from '@core/services/logger.service';
import { ErrorMock } from '@fixtures/mock/error.mock';
import { errorPatternMock } from '@fixtures/mock/patterns.mock';

const loggerMock = {
  error: jest.fn()
} as Logger;

describe('LoggerService', () => {
  let loggerService: ILoggerService;

  beforeEach(() => {
    loggerService = LoggerService.getInstance(loggerMock);
  });

  afterEach(() => {
    loggerService.uid = '';
    loggerService.trigger = {};
    loggerService.params = [];
    jest.clearAllMocks();
  });

  describe('LoggerService - error', () => {
    it('should call error log with correct error pattern if all data is given', () => {
      loggerService.uid = errorPatternMock.uid;
      loggerService.params = errorPatternMock.params;
      loggerService.trigger = {
        className: errorPatternMock.trigger.name,
        methodName: errorPatternMock.trigger.method,
        kind: errorPatternMock.error.kind
      };

      loggerService.error(ErrorMock);

      const { timestamp: _, ...expected } = errorPatternMock;

      expect(loggerMock.error).toBeCalledWith({ ...expected, timestamp: expect.any(String) });
      expect(loggerMock.error).toBeCalledTimes(1);
    });

    it('should call error log with default value of missing properties', () => {
      loggerService.error(null);

      expect(loggerMock.error).toBeCalledWith({
        timestamp: expect.any(String),
        uid: '',
        trigger: {
          name: 'unknown',
          method: 'unknown'
        },
        error: {
          name: 'unknown',
          kind: 'unknown',
          message: 'unknown',
          stack: 'unknown'
        },
        params: []
      });
      expect(loggerMock.error).toBeCalledTimes(1);
    });
  });
});
