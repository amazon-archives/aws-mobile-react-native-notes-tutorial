import React from 'react';
import { Platform, StyleSheet, TouchableHighlight, TouchableNativeFeedback, Text, View } from 'react-native';

const Touchable = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableHighlight;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        height: 40,
        marginBottom: 2,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 2
    },
    info: {
        color: '#C0C0C0',
        fontSize: 8
    },
    infoContainer: {
        flexBasis: 'auto'
    },
    title: {
        color: 'black',
        fontSize: 18
    },
    titleContainer: {
        flexGrow: 1
    }
});

const NoteListItem = (props) => {
    const onPress = props.onPress ? props.onPress : () => { /* Do Nothing */ };

    return (
        <Touchable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.item.title}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>{props.item.noteId}</Text>
                </View>
            </View>
        </Touchable>
    );
}

export default NoteListItem;
