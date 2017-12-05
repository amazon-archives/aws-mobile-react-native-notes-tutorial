import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise';

import notesReducer from './reducers/notes';

const persistConfig = {
    key: 'root',
    storage
}

const reducers = {
    notes: notesReducer
};

const persistedReducers = persistCombineReducers(persistConfig, reducers);
const store = createStore(persistedReducers);
const persistor = persistStore(store);

export {
    persistor,
    store
};
