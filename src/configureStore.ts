import { configureStore as reduxConfigureStore, getDefaultMiddleware } from "redux-starter-kit";
import { createCycleMiddleware } from 'redux-cycles';
import {run} from '@cycle/run';
import {makeHTTPDriver} from '@cycle/http';
import {timeDriver} from '@cycle/time';
import makeIdbDriver from 'cycle-idb'

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
    IDB: makeIdbDriver('cards-db', 1, (upgradeDb: any) => {
      // Creates a new store in the database
      upgradeDb.createObjectStore('CardStore', {keyPath: "id"})
      const balanceStore = upgradeDb.createObjectStore("BalanceStore", {autoIncrement: true})
      balanceStore.createIndex('cardId', 'cardId', {unique: false});
  })
  })

  return store;
}
