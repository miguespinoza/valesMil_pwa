import * as actions from "../actions";

import xs from "xstream";
import balanceService from "../services/balanceService"
import {toast} from "react-toastify";
import { $add } from 'cycle-idb'

export function fetchBalanceByCard(sources) {
  const card$ = sources.ACTION.filter(
    action => action.type === actions.balanceRequested.toString()
  );

  const balanceHTTPRequest$ = card$.map(r => {
    const { cardId, password } = r.payload;
    return balanceService.makeBalanceRequest({card: cardId, password})
  });

  const balanceHTTPResponse$ = sources.HTTP
    .select("balance")
    .map((response$) =>
        response$.replaceError((error) =>
          xs.of(error.response)
        ))
    .flatten()

  const balanceUpdateAction$ = balanceHTTPResponse$
    .map(r => {
      debugger;
      if(r.error){
        toast.error(r.text)
        return actions.balanceRequestFailed({ cardId: r.request.send.card, error: r})
      } else {
        return actions.balanceReceived({ cardId: r.request.send.card, balance: r.text })
      }
    })


  const balanceInsertions$ = balanceHTTPResponse$.map(r => {
    return $add("BalanceStore",{ id: r.request.send.card, balance: r.text})
  });
    
  const dbOperations$ = xs.merge(balanceInsertions$).debug(console.log);

  const dbErrors$ = sources.IDB.error$
    .addListener({
      error: e => {  console.log(e)}
    })

  return {
    ACTION: balanceUpdateAction$,
    HTTP: balanceHTTPRequest$,
    IDB: dbOperations$,
  };
}

export default fetchBalanceByCard;
