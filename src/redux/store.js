import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

// For hydrating the notes
import { getAllNotes } from './localStore';
import { hydrateNotes } from './actions/notes';

const middleware = applyMiddleware(
    promiseMiddleware,
    loggerMiddleware
);

const store = createStore(reducers, middleware);
getAllNotes().then(notes => {
    store.dispatch(hydrateNotes(notes));
});

export default store;
