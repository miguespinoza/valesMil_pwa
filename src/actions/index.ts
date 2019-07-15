import { createAction } from "redux-starter-kit";

export const balanceRequested = createAction("balance/balance_requested");

export const balanceReceived = createAction("balance/balance_received");

export const balanceRequestFailed = createAction("balance/balance_request_failed");

export const cardCreated = createAction("card/card_created");

export const cardDeleted = createAction("card/card_deleted");


