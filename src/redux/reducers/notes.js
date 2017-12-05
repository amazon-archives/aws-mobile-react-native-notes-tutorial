import uuid from 'uuid';
import { isFSA } from 'flux-standard-action';

const initialState = [];

const notesReducer = (state = initialState, action) => {
    if (!isFSA(action)) {
        // All of our actions are FSA-compliant, so just skip the entire reducer
        // if the action is not an FSA-compliant action
        return state;
    }

    const payload = action.payload || {};
    switch (action.type) {
        case '@notes:save':
            // Either creates a new record or saves over the old one, depending on whether
            // the noteId exists or not
            if ('noteId' in payload && state.findIndex(n => n.noteId === payload.noteId) >= 0) {
                return state.map(n => n.noteId === payload.noteId ? payload : n);
            } else {
                return [ ...state, payload ];
            }
        case '@notes:delete':
            // Filters the record from the store.
            if ('noteId' in payload) {
                return state.filter(n => n.noteId !== payload.noteId);
            }
            return state;
        default:
            return state;
    }
};

export default notesReducer;
