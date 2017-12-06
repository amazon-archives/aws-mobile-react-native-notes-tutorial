import React from 'react';
import {
    Button,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Swipeout from 'react-native-swipeout';
import Loading from './Loading';
import theme from '../theme';
import uuid from 'uuid';

// BEGIN-REDUX
import { connect } from 'react-redux';
import actions from '../redux/actions';
// END-REDUX

// Platform-dependent Touchable component
const Touchable = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableHighlight;

// Stylesheet for the NoteList component
const styles = StyleSheet.create({
    addItemButton: {
        fontSize: 28
    },
    iosAddItemIcon: {
        fontSize: 20,
        color: '#A0A0A0',
        marginRight: 8
    },
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    flatlistitem: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
        paddingBottom: 2
    }
});

// Stylesheet for the individual note items in the note list.
const noteItemStyles = StyleSheet.create({
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

/**
 * Component for displaying a textual icon that is touchable in the top header bar
 *
 * @param {Props} props properties for this component
 */
const HeaderButton = (props) => {
    return (
        <TouchableOpacity onPress={(event) => props.onPress(event)}>
            <Text style={props.style}>{props.children}</Text>
        </TouchableOpacity>
    );
};

/**
 * Component for displaying an individual row of the NoteList
 *
 * @param {Props} props properties for this component
 */
const NoteListItem = (props) => {
    const onPress = props.onPress ? props.onPress : () => { /* Do Nothing */ };

    return (
        <Touchable onPress={onPress}>
            <View style={noteItemStyles.container}>
                <View style={noteItemStyles.titleContainer}>
                    <Text style={noteItemStyles.title}>{props.item.title}</Text>
                </View>
                <View style={noteItemStyles.infoContainer}>
                    <Text style={noteItemStyles.info}>{props.item.noteId}</Text>
                </View>
            </View>
        </Touchable>
    );
}

/**
 * The Home Screen - this is a container component built on top of
 * the React Navigation system that is fed the list of notes to be
 * displayed
 *
 * @class NoteList
 * @extends {React.Component}
 */
class NoteList extends React.Component {
    /**
     * Initial state for the component.  The activeRow is the object that has an open
     * drawer for swiping.  Only one drawer can be open at any time.  It is null to
     * indicate no open drawer.
     */
    state = {
        activeRow: null
    };

    /**
     * Options for react-navigation
     *
     * @static
     * @memberof NoteList
     */
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Notes',
            headerStyle: {
                backgroundColor: theme.headerBackgroundColor
            },
            headerTintColor: theme.headerForegroundColor,
            headerRight: (Platform.OS === 'ios')
                ? <HeaderButton style={styles.iosAddItemIcon} onPress={() => NoteListScreen.onAddNote(navigation.navigate)}>+</HeaderButton>
                : false
        }
    };

    /**
     * This has to be a static method because it is called in two places - by the floating
     * action button on Android and by the navigation options on iOS.
     * @param {Function} navigate method to call to navigate to a new screen
     * @memberof NoteList
     */
    static onAddNote(navigate) {
        navigate('details', { noteId: uuid.v4() });
    }

    /**
     * Event handler called when the user swipes-left.
     *
     * @param {any} item the item that was swiped
     * @param {any} rowId the rowId of the item that was swiped
     * @param {any} dir the direction that was swiped
     * @memberof NoteList
     */
    onSwipeOpen(item, rowId, dir) {
        this.setState({ activeRow: item.noteId });
    }

    /**
     * Event handler called when the system closes the swipe-drawer (either
     * because the user clicked elsewhere or the item was deleted)
     *
     * @param {any} item the item that was swiped
     * @param {any} rowId the rowId of the item that was swiped
     * @param {any} dir the direction that was swiped
     * @memberof NoteList
     */
    onSwipeClose(item, rowId, dir) {
        if (item.noteId === this.state.activeRow && typeof dir !== 'undefined') {
            this.setState({ activeRow: null });
        }
    }

    /**
     * Event handler called when a user tries to press a note.
     *
     * @param {String} noteId the id of the note to be selected
     * @memberof NoteList
     */
    onViewNote(item) {
        const { navigate } = this.props.navigation;
        navigate('details', { noteId: item.noteId });
    }

    /**
     * Event handler called when a user tries to delete a note.
     *
     * @param {String} noteId the id of the note to be deleted
     * @memberof NoteList
     */
    onDeleteNote(item) {
        this.props.deleteNote(item.noteId);
    }

    /**
     * Renders a single element in the list
     * @param {Object} item the item to be rendered
     * @param {number} index the rowId of the item to be rendered
     * @returns {JSX.Element} the rendered list element
     * @memberof NoteList
     */
    renderItem(item, index) {
        const swipeSettings = {
            autoClose: true,
            close: item.noteId !== this.state.activeRow,
            onClose: (secId, rowId, dir) => this.onSwipeClose(item, rowId, dir),
            onOpen: (secId, rowId, dir) => this.onSwipeOpen(item, rowId, dir),
            right: [
                { onPress: () => this.onDeleteNote(item), text: 'Delete', type: 'delete' }
            ],
            rowId: index,
            sectionId: 1,
            style: styles.flatlistitem
        };

        return (
            <Swipeout {...swipeSettings}>
                <NoteListItem item={item} onPress={() => this.onViewNote(item)}/>
            </Swipeout>
        );
    }

    /**
     * Part of the React lifecycle that actually renders the component.
     *
     * @returns {JSX.Element} a component tree rendered in JSX
     * @memberof NoteList
     */
    render() {
        const params = {
            noteList: {
                data: this.props.notes,
                extraData: this.state.activeRow,
                keyExtractor: (item) => item.noteId,
                renderItem: ({ item, index }) => this.renderItem(item, index)
            },
            actionButton: {
                buttonColor: theme.actionButtonColor,
                onPress: () => NoteListScreen.onAddNote(this.props.navigation.navigate)
            }
        }

        if (this.props.loading) {
            return <Loading/>;
        }

        return (
            <View style={styles.container}>
                <FlatList {...params.noteList} />
                {(Platform.OS === 'android') && <ActionButton {...params.actionButton} />}
            </View>
        );
    }
}

// BEGIN-REDUX
/**
 * Maps the redux store state to properties required by this container
 * component.  In this case, we only want to see the records that are
 * not deleted.
 *
 * @param {Object} state the redux store state
 */
const mapStateToProps = (state) => {
    return {
        notes: state.notes
    };
};

/**
 * Maps the dispatch method to dispatch the appropriate actions based
 * on the events that will be generated by this container component.
 *
 * @param {Function} dispatch the dispatcher from redux
 */
const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (noteId) => dispatch(actions.notes.deleteNote({ noteId }))
    };
};
const NoteListScreen = connect(mapStateToProps, mapDispatchToProps)(NoteList);

// END-REDUX

export default NoteListScreen;
