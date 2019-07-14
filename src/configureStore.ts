import { configureStore as reduxConfigureStore, getDefaultMiddleware } from "redux-starter-kit";
import { createCycleMiddleware } from 'redux-cycles';
import {run} from '@cycle/run';
import {makeHTTPDriver} from '@cycle/http';
import {timeDriver} from '@cycle/time';

import rootReducer from './reducers';
import rootCycle from './cycles';

export default function configureStore() {
  const cycleMiddleware = createCycleMiddleware();
  const { makeActionDriver, makeStateDriver } = cycleMiddleware;

  
  const store = reduxConfigureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), cycleMiddleware]
  });
  

  run(rootCycle, {
    ACTION: makeActionDriver(),
    STATE: makeStateDriver(),
    Time: timeDriver,
    HTTP: makeHTTPDriver(),
  })

  return store;
}
