import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import NoteListItem from './NoteListItem';

const styles = StyleSheet.create({
    flatlistitem: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
        paddingBottom: 2
    }
});

/**
 * Component that implements the functionality of the list of notes
 * on the home page.  This version handles swipe-left to delete and
 * click to navigate.
 * 
 * @class NoteList
 * @extends {React.Component}
 */
class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow: null
        };
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
     * Event handler called when an item in the list is pressed
     * 
     * @param {Object} item the item that was selected
     * @memberof NoteList
     */
    onSelectItem(item) {
        if (this.props.onViewNote) {
            this.props.onViewNote(item);
        }
    }

    /**
     * Event handler called when an item in the list is to be deleted
     * 
     * @param {Object} item the item that is to be deleted
     * @memberof NoteList
     */
    onDeleteItem(item) {
        if (this.props.onDeleteNote) {
            this.props.onDeleteNote(item);
        }
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
                { onPress: () => this.onDeleteItem(item), text: 'Delete', type: 'delete' }
            ],
            rowId: index,
            sectionId: 1,
            style: styles.flatlistitem
        };

        return (
            <Swipeout {...swipeSettings}>
                <NoteListItem item={item} onPress={() => this.onSelectItem(item)}/>
            </Swipeout>
        );
    }

    /**
     * Renders the component
     * 
     * @returns {JSX.Element} the rendered component
     * @memberof NoteList
     */
    render() {
        const flatListParams = {
            data: this.props.notes,
            extraData: this.state.activeRow,
            keyExtractor: (item) => item.noteId,
            renderItem: ({ item, index }) => this.renderItem(item, index)
        };

        return (<FlatList {...flatListParams}/>);
    }
}

export default NoteList;
