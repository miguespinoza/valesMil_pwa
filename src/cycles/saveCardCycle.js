import * as actions from "../actions";
import { $put } from "cycle-idb";

export function saveCard(sources) {
  const card$ = sources.ACTION.filter(
    action => action.type === actions.cardCreated.toString()
  );

  const fetchBalanceAction$ = card$.map(cardCreatedAction =>
    actions.balanceRequested({
      cardId: cardCreatedAction.payload.id,
      password: cardCreatedAction.payload.password
    })
  );

  const cardInsertion$ = card$.map(cardCreatedAction => {
    const card = cardCreatedAction.payload;
    return $put("CardStore", { card });
  });

  return {
    ACTION: fetchBalanceAction$,
    IDB: cardInsertion$
  };
}

export default saveCard;