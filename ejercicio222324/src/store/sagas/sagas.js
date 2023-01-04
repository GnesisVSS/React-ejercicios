import {takeLatest, call,put} from 'redux-saga/effects'
import { API_CALL_REQ } from '../actions/actions'
import axios from 'axios';

export function* watcherSaga(){
    yield takeLatest(API_CALL_REQ,LoginSaga)
}

export function* LoginSaga(action){
    try {
        const response = yield call(fetchHttp(action.payload.request))
        const token = response.data.token;

        yield put({
            type: action.payload.okAction,
            payload: {
                token: token
            }
        });

    } catch (error) {
        yield put({
            type: action.payload.failAction,
            payload: {
                error:error
            }
        })
    }
}

function fetchHttp(request){
    return function(){
        return(axios(request))
    }
}