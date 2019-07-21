import { combineCycles } from "redux-cycles";

import fetchBalanceByCard from "./fetchBalanceByCardCycle";

import httpRequestCycle from "./HttpRequestCycle";

import saveCard from "./saveCardCycle";

export default combineCycles(fetchBalanceByCard, saveCard, httpRequestCycle);
