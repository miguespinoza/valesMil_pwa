
import { createReducer, combineReducers } from "redux-starter-kit";

import { balanceReceived, balanceRequested, cardCreated } from "../actions"


const balanceReducer = createReducer({}, {
  [balanceReceived.toString()]: (state: any, action: any) => {
    const {cardId, balance} = action.payload;
    state[cardId] = balance;
    return state;
  } 
})

const isLoadingReducer = createReducer({}, {
  [balanceReceived.toString()]: (state: any, action: any) => {
    const {cardId} = action.payload;
    state[cardId] = false;
    return state;
  },
  [balanceRequested.toString()]: (state: any, action: any) => {
    const {cardId} = action.payload;
    state[cardId] = true;
    return state;
  }  
})

const cardsReducer = createReducer({}, {
  [cardCreated.toString()]: (state: any, action: any) => {
    const {id, password, name} = action.payload;
    state[id] = {id, password, name};
    return state;
  } 
})


export default combineReducers({balance: balanceReducer, isLoading: isLoadingReducer, cards: cardsReducer})