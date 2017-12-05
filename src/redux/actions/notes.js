import { createAction } from 'redux-actions';

export const saveNote = createAction('@notes:save');
export const deleteNote = createAction('@notes:delete');
