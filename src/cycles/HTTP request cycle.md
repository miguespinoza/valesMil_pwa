# HTTP request cycle

This document descrribes a way to execute HTTP requests easily, using the redux actions as triggers and resposnses enabling

- Low logic in the react components
- Easy to test effects.
    - Request
    - Success
    - Failure
- HTTP result will be delivered to the redux store to update the store


## Motivation

HTTP requests represent the bast majority of asyc operations in the UAV web portal, of those the bast majority are simple GET or POST requests.

### Current State

Our Current way to do this uses redux-thunk to execute request promises. It uses two redux middlewares to meke them.

1. Authentication Middleware
    - Ensures that every request have a valid authentication header.
    - Handles Token refresh
    - dispatches a log_out action in case of a session expired
    
2. Reqest middleware
    - Executes the request promisse
    - dispatches actions according to the promise result
    - shows an error popup for failures
    
#### Current State Problems

This approach has some key pain points that make the development harder

- Hard to debugg
    - sometimes it is hard to tell why an error action is being dispatched.
        - When the request is successfull but a bug exist in the reducer, The request middle warewill prevent the error message to reach the console and will just create an error popup
        
- Hard to test
    - The request actions contain a "promisse factory" function, this is hard to mock in the action test.
    - There is no way to generate the SUCCESS or FAILURE actions without mocking the axios library. so testing the reducer for success or error cases is hard


## Service

Services are factories that produce request objects described by the [HTTP driver](https://cycle.js.org/api/http.html) 


HTTP request actions

To execute a request with this cycle Actions must follow this naming convention:

XXX_REQUEST_CYCLE
    Payload
        {
            request: HTTP_driver_request
        }

The cycle will take that action and dispatch one of these according to the HTTP status code

XXX_SUCCESS_CYCLE
    Payload
        An object with the http response and the requested parameters
        {

            response: HTTPRespónse
            // the request object of this response
            request: HTTP_driver_request,
        }

XXX_FAILURE_CYCLE
    Payload
        The HTTP response with the error and the requested parameters
        {
            response: HTTPResponse,
            // the request object of this response
            request: HTTP_driver_request,
        }


## Make HTTP request outside this cycle

You can make any request outside this cycle, you just have to avoid the naming convetion of this.