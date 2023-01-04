import { API_CALL_FAIL, API_CALL_SUC, API_CALL_REQ } from "../actions/actions";

const initalState = {
    fetching: false,
    token: null,
    error: null,
    loged: false
}

export const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case API_CALL_REQ:
            return {
                ...state,
                fetching: true,
                token: null,
                error: null,
                loged: false
            }

        case API_CALL_SUC:
            return {
                ...state,
                fetching: false,
                token: action.payload.token,
                error: null,
                loged: true
            }

        case API_CALL_FAIL:
            return {
                ...state,
                fetching: false,
                token: null,
                error: action.payload.error,
                loged: false
            }

        default:
            return state;
    }
}