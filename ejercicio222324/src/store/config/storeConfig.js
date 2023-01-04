import createSagaMiddleware from 'redux-saga'
import {configureStore} from '@reduxjs/toolkit'
import { rootReducer } from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import { watcherSaga } from '../sagas/sagas';

export const createAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    let store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(sagaMiddleware),
        devTools: composeWithDevTools()
    }
    );

    sagaMiddleware.run(watcherSaga);
    return store;
}