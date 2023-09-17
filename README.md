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

### Catch exceptions
We provide two ways to catch exceptions:
- the `CatchException` decorator to use in your methods
- the `catchException` function so that you don't have to use classes to use the library

#### Opções de configuração
| Option              | Type     | Required/Optional | Default value | Description                                                                                                                                                       | Example using function                                                                                                           | Example using decorator                                                                                                           |
|---------------------|----------|-------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| bubbleException     | boolean  | Optional          | true          | Se definido como true, a exceção original será lançada após o registro, permitindo que a exceção continue sua propagação.                                         | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/bubble-exception.function.md)      | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/bubble-exception.decorator.md)      |
| customErrorInstance | object   | Optional          | null          | Permite especificar uma instância personalizada de erro para ser lançada, útil para personalizar a exceção que é registrada.                                      | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/custom-error-instance.function.md) | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/custom-error-instance.decorator.md) |
| hideParams          | boolean  | Optional          | false         | Se definido como true, os parâmetros que foram passados para o método não serão registrados, mantendo a privacidade dos dados sensíveis.                          | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/hide-params.function.md)           | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/hide-params.decorator.md)           |
| isSync              | boolean  | Optional          | false         | Define se o método é síncrono, indicando se ele espera ou não por respostas de chamadas externas.                                                                 |                                                                                                                                  |                                                                                                                                   |
| kind                | string   | Optional          | null          | Define o tipo de exceção a ser registrada, permitindo categorizar as exceções em diferentes grupos ou contextos.                                                  |                                                                                                                                  |                                                                                                                                   |
| onException         | function | Optional          | null          | Permite fornecer uma função personalizada para manipular a exceção registrada, executando ações específicas quando uma exceção ocorre.                            | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/on-exception.function.md)          | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/on-exception.decorator.md)          |
| pipeParams          | function | Optional          | null          | Possibilita o uso de uma função para processar e transformar os parâmetros antes de serem registrados, adequando-os ao formato desejado.                          | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/pipe-params.function.md)           | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/pipe-params.decorator.md)           |
| returnOnException   | function | Optional          | null          | Oferece a capacidade de fornecer uma função personalizada para manipular a exceção registrada e retornar novas informações ou valores após o registro da exceção. | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/return-on-exception.function.md)   | [Example](https://github.com/iago-f-s-e/sabbath-logger/blob/main/doc/examples/catch-exception/return-on-exception.function.md)    |

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