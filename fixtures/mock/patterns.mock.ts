

export const errorPatternMock = {
  timestamp: new Date().toISOString(),
  trigger: {
    name: 'test',
    method: 'test'
  },
  error: {
    name: 'test',
    kind: 'test',
    message: 'test',
    stack: 'test'
  },
  params: 'test'
};