import { getErrorPattern } from '@core/helpers/get-error-pattern/get-error-pattern.helper';
import { ErrorMock } from '@fixtures/mock/error.mock';

const mockTimeStamp = expect.any(String);
const mockUid = expect.any(String);

describe('getErrorPattern', () => {
  it('should return the correct error pattern when receive a valid payload', () => {
    const result = getErrorPattern(
      ErrorMock,
      {
        className: 'test',
        methodName: 'test',
        kind: 'test'
      },
      mockUid,
      { foo: 'foo', bar: { name: 'bar' } },
      'test'
    );

    expect(result).toMatchObject({
      timestamp: mockTimeStamp,
      uid: mockUid,
      trigger: {
        name: 'test',
        method: 'test'
      },
      params: [{ foo: 'foo', bar: { name: 'bar' } }, 'test'],
      error: {
        name: ErrorMock.name,
        stack: ErrorMock.stack,
        message: ErrorMock.message,
        kind: 'test'
      }
    });
  });

  it('should return "unknown" as the default className if it is empty', () => {
    const result = getErrorPattern(
      ErrorMock,
      {
        methodName: 'test',
        kind: 'test'
      } as any,
      mockUid,
      { foo: 'foo', bar: { name: 'bar' } },
      'test'
    );

    expect(result).toMatchObject({
      timestamp: mockTimeStamp,
      uid: mockUid,
      trigger: {
        name: 'unknown',
        method: 'test'
      },
      params: [{ foo: 'foo', bar: { name: 'bar' } }, 'test'],
      error: {
        name: ErrorMock.name,
        stack: ErrorMock.stack,
        message: ErrorMock.message,
        kind: 'test'
      }
    });
  });
  it('should return "unknown" as the default kind if it is empty', () => {
    const result = getErrorPattern(
      ErrorMock,
      {
        className: 'test',
        methodName: 'test'
      } as any,
      mockUid,
      { foo: 'foo', bar: { name: 'bar' } },
      'test'
    );

    expect(result).toMatchObject({
      timestamp: mockTimeStamp,
      uid: mockUid,
      trigger: {
        name: 'test',
        method: 'test'
      },
      params: [{ foo: 'foo', bar: { name: 'bar' } }, 'test'],
      error: {
        name: ErrorMock.name,
        stack: ErrorMock.stack,
        message: ErrorMock.message,
        kind: 'unknown'
      }
    });
  });
  it('should return "unknown" as the default methodName if it is empty', () => {
    const result = getErrorPattern(
      ErrorMock,
      {
        className: 'test',
        kind: 'test'
      } as any,
      mockUid,
      { foo: 'foo', bar: { name: 'bar' } },
      'test'
    );

    expect(result).toMatchObject({
      timestamp: mockTimeStamp,
      trigger: {
        name: 'test',
        method: 'unknown'
      },
      uid: mockUid,
      params: [{ foo: 'foo', bar: { name: 'bar' } }, 'test'],
      error: {
        name: ErrorMock.name,
        stack: ErrorMock.stack,
        message: ErrorMock.message,
        kind: 'test'
      }
    });
  });
  it('should return an empty array to params if it is empty', () => {
    const result = getErrorPattern(
      ErrorMock,
      {
        className: 'test',
        methodName: 'test',
        kind: 'test'
      },
      mockUid
    );

    expect(result).toMatchObject({
      timestamp: mockTimeStamp,
      uid: mockUid,
      trigger: {
        name: 'test',
        method: 'test'
      },
      params: [],
      error: {
        name: ErrorMock.name,
        stack: ErrorMock.stack,
        message: ErrorMock.message,
        kind: 'test'
      }
    });
  });
  it.each([null, undefined, {}, [], false, 1, ''])(
    'should return "unknown" as the default value to all error properties if error is %s',
    value => {
      const result = getErrorPattern(
        value,
        {
          className: 'test',
          methodName: 'test',
          kind: 'test'
        },
        mockUid,
        { foo: 'foo', bar: { name: 'bar' } },
        'test'
      );

      expect(result).toMatchObject({
        timestamp: mockTimeStamp,
        uid: mockUid,
        trigger: {
          name: 'test',
          method: 'test'
        },
        params: [{ foo: 'foo', bar: { name: 'bar' } }, 'test'],
        error: {
          name: 'unknown',
          stack: 'unknown',
          message: 'unknown',
          kind: 'test'
        }
      });
    }
  );
});
