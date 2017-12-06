import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/**
 * Component to display a loading screen
 *
 * @param {Props} props the properties for this object
 */
const Loading = (props) => {
    return (<View style={styles.container}><Text>Loading...</Text></View>);
};

export default Loading;

