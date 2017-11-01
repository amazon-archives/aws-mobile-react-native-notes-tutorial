import { AsyncStorage } from 'react-native';

const PREFIX = '@note:';

const storeNote = async (note) => {
    const key = `${PREFIX}${note.noteId}`;
    await AsyncStorage.setItem(key, JSON.stringify(note));
};

const getAllNotes = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys.filter(k => k.startsWith(PREFIX)));
    return values.map(v => JSON.parse(v[1]));
};

export {
    storeNote,
    getAllNotes
};
