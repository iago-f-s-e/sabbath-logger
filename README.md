# @SABBATH/LOGGER - The best log standardization library
This TypeScript log standardization library offers an easy and flexible way to standardize your application's logs.
It offers the ability to customize the logging behavior of exceptions, transactions and validations, allowing you to adapt the library to the specific needs of your project.

## Installation
To get started, you can install this module via npm or yarn:

```bash
npm install @sabbath/logger
# or
yarn add @sabbath/logger
```

## Main features
- Catch Exception
- Catch Transaction [TODO]
- Validation [TODO]

### Catch exception
We provide two ways to catch exceptions:
- the `CatchException` decorator to use in your methods
- the `catchException` function so that you don't have to use classes to use the library

#### Opções de configuração
| Option              | Type     | Required/Optional | Default value | Description                                                                                                                                                 | Example using function                                                                                                           | Example using decorator                                                                                                           |
|---------------------|----------|-------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| bubbleException     | boolean  | Optional          | true          | If set to true, the original exception will be thrown after logging, allowing the exception to continue its propagation.                                    | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/bubble-exception.function.md)      | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/bubble-exception.decorator.md)      |
| customErrorInstance | object   | Optional          | null          | Allows you to specify a custom error instance to be thrown, useful for customizing the exception that is logged.                                            | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/custom-error-instance.function.md) | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/custom-error-instance.decorator.md) |
| hideParams          | boolean  | Optional          | false         | If set to true, the parameters that have been passed to the method will not be recorded, keeping sensitive data private.                                    | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/hide-params.function.md)           | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/hide-params.decorator.md)           |
| isSync              | boolean  | Optional          | false         | Defines whether the method is synchronous, indicating whether or not it waits for responses from external calls.                                            |                                                                                                                                  |                                                                                                                                   |
| kind                | string   | Optional          | null          | Defines the type of exception to be logged, allowing exceptions to be categorized into different groups or contexts.                                        |                                                                                                                                  |                                                                                                                                   |
| onException         | function | Optional          | null          | It allows you to provide a custom function to handle the registered exception, executing specific actions when an exception occurs.                         | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/on-exception.function.md)          | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/on-exception.decorator.md)          |
| pipeParams          | function | Optional          | null          | It allows you to use a function to process and transform the parameters before they are recorded, adapting them to the desired format.                      | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/pipe-params.function.md)           | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/pipe-params.decorator.md)           |
| returnOnException   | function | Optional          | null          | It offers the ability to provide a custom function to handle the logged exception and return new information or values after the exception has been logged. | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/return-on-exception.function.md)   | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/return-on-exception.function.md)    |

#### Basic usage
##### Decorator:
```typescript
import { CatchException } from '@sabbath/logger';

class UserController {
  @CatchException({
    kind: 'Application',
  })
  public async getById(id: string) {
    // Your logic for getting a user
  }
}
```

#### Function:
```typescript
import { catchException } from '@sabbath/logger';

const getUserById = catchException(async (id: string) => {
  // Your logic for getting a user
}, {
  kind: 'Application',
});
```

```typescript
import { catchException, CatchExceptionOptions } from '@sabbath/logger';

const options: CatchExceptionOptions = {
  kind: 'Application',
}

async function handleGetUserById(id: string) {
  // Your logic for getting a user
}

const getUserById = catchException(handleGetUserById, options);
```

#### Log output
```text
[ERROR] - {
  "uid": "",
  "timestamp": "2023-09-12T22:45:13.468Z",
  "trigger": {
    "name": "UserController",
    "method": "getById"
  },
  "params": ["c4baf266-13c9-4d6e-93a7-ff8dccde0905"],
  "error": {
    "name": "UserServiceError",
    "message": "User is blocked",
    "stack": {ErrorStack},
    "kind": "Application"
  }
}
```

## Contributing
If you want to contribute to the development of this module, feel free to send a pull request to our GitHub repository