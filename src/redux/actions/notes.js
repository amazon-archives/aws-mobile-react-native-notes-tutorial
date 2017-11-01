import { createAction } from 'redux-actions';

export const upsertNote = createAction('@notes:upsert');
export const deleteNote = createAction('@notes:delete');
export const hydrateNotes = createAction('@notes:hydrate');
