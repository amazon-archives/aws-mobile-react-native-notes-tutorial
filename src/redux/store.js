import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
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
