
import xs from "xstream";
import {toast} from "react-toastify";



function makeSuccessAction(requestActionType, payload){
  return {
    type: requestActionType.replace("_REQUEST_CYCLE", "_SUCCESS_CYCLE"),
    payload
  }
}

function makeFailureAction(requestActionType, payload){
  return {
    type: requestActionType.replace("_REQUEST_CYCLE", "_FAILURE_CYCLE"),
    payload
  }
}

export function httpRequestCycle(sources) {
  const request_action$ = sources.ACTION.filter(
    action => /_REQUEST_CYCLE$/.test(action.type)
  );

  const HTTPrequest$ = request_action$.map(
    ra => ({ ...ra.payload.request, _CYCLE_ACTION_TYPE: ra.type })
  );

  const HTTPResponseAction$ = sources.HTTP
    .select("http_request_cycle")
    .map((response$) =>
        response$.replaceError((error) =>
          xs.of(error.response)
        ))
    .flatten()
    .map(r => {
      const response = {...r};
      delete response.request;
      const request = Object.assign({}, r.request);
      delete request._CYCLE_ACTION_TYPE;
      if(r.error){
        return makeFailureAction(r.request._CYCLE_ACTION_TYPE, { response, request })
      } else {
        return makeSuccessAction(r.request._CYCLE_ACTION_TYPE, { response, request })
      }
    })

  return {
    ACTION: HTTPResponseAction$,
    HTTP: HTTPrequest$,
  };
}

export default httpRequestCycle;
