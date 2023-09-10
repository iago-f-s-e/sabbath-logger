import {ErrorMock} from "@fixtures/mock/error.mock";

export const errorPatternMock = {
  timestamp: new Date().toISOString(),
  uid: 'test',
  trigger: {
    name: 'test',
    method: 'test'
  },
  error: {
    name: ErrorMock.name,
    kind: 'test',
    message: ErrorMock.message,
    stack: ErrorMock.stack as string
  },
  params: [{ foo: 'foo', bar: { name: 'bar' } }, 'test']
};