import { combineCycles } from "redux-cycles";

import fetchBalanceByCard from "./fetchBalanceByCardCycle";

import saveCard from "./saveCardCycle";

export default combineCycles(fetchBalanceByCard, saveCard);
