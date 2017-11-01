import uuid from 'uuid';
import { isFSA } from 'flux-standard-action';
import { storeNote } from '../localStore';

export const createNewNote = (noteId, title, content) => {
    const now = new Date();

    return {
        noteId: noteId,
        created: now.getTime(),
        isDirty: true,
        isDeleted: false,
        title: title || '',
        content: content || ''
    };
};

const initialState = [];

const notesReducer = (state = initialState, action) => {
    if (!isFSA(action)) {
        console.warn(`Invalid action: ${JSON.stringify(action)}`);
        return state;
    }

    if (action.type.startsWith('@@redux')) {
        // Handle redux actions - the specific one to be aware of is @@redux/INIT which
        // is an initialization one
        return state;
    }

    const payload = action.payload || {};
    switch (action.type) {
        case '@notes:hydrate':
            return [ ...state, ...action.payload ];
        case '@notes:upsert':
            if ('noteId' in payload && state.findIndex(n => n.noteId === payload.noteId) >= 0) {
                const newNote = { ...payload, isDirty: true };
                storeNote(newNote); // asynchronous call
                return state.map(n => n.noteId === payload.noteId ? newNote : n);
            } else {
                const newNote = createNewNote(payload.noteId || uuid.v4(), payload.title, payload.content);
                return [ ...state, newNote ];
            }
        case '@notes:delete':
            if ('noteId' in payload) {
                const updatedNote = state.find(n => n.noteId === payload.noteId);
                if (updatedNote) {
                    updatedNote.isDeleted = true;
                    updatedNote.isDirty = true;
                    storeNote(updatedNote);
                    return state.map(n => n.noteId === payload.noteId ? updatedNote: n);
                }
            } 
            console.warn(`Invalid delete operation - no such note ${JSON.stringify(action)}`);
            return state;
        default:
            return state;
    }
};

export default notesReducer;
