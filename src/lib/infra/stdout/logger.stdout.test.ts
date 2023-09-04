import { Logger } from '@domain/interfaces';
import { errorPatternMock } from '@fixtures/mock/patterns.mock';
import { LoggerStdout } from '@infra/stdout/logger.stdout';

describe('LoggerStdout', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new LoggerStdout();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('LoggerStdout - error', () => {
    it('should write the error message to console.error', () => {
      const expected = `\x1b[31m[ERROR] - ${JSON.stringify(errorPatternMock, null, 2)}\x1b[0m`;

      const errorSpy = jest.spyOn(console, 'error').mockImplementation();

      logger.error(errorPatternMock);

      expect(errorSpy).toBeCalled();
      expect(errorSpy).toBeCalledTimes(1);
      expect(errorSpy).toBeCalledWith(expected);
    });
  });
});
