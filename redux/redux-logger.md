

https://github.com/evgenyrodionov/redux-logger


import createLogger from 'redux-logger'

import { createStore, applyMiddleware } from 'redux'


eg:
```
import { applyMiddleware, createStore } from 'redux';

// Logger with default options
import logger from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```

// Note passing middleware as the third argument requires redux@>=3.1.0


eg:

```
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'

const logger = createLogger({
  // ...options
});

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```