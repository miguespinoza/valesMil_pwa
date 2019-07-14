import * as actions from "../actions";

import { combineCycles } from "redux-cycles";
const realAPI =
  "http://private-094e16-valesmil.apiary-mock.com/api/valesmil?code=1EcCTvok6a9XXKd6CjzoV2dziSIJgONKHQo5RTg105hnFPDTVTgT6g==";

export function fetchBalanceByCard(sources) {
  const balanceRequest$ = sources.ACTION.filter(
    action => action.type === actions.balanceRequested.toString()
  );

  const balanceHTTPRequest$ = balanceRequest$.map(r => {
    const { cardId, password } = r.payload;
    return {
      url: realAPI,
      method: "POST",
      send: { card: cardId, password },
      category: "balance"
    };
  });

  const balanceHTTPResponse$ = sources.HTTP.select("balance")
    .flatten()
    .map(r => {
      return { cardId: r.request.send.card, balance: r.text };
    })
    .map(actions.balanceReceived);

  return {
    ACTION: balanceHTTPResponse$,
    HTTP: balanceHTTPRequest$
  };
}

export default combineCycles(fetchBalanceByCard);
