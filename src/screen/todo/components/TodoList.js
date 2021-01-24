import React from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'

export default function TodoList({ todo_list, handleDeleteTodo }) {
    const renderTodoList = () => {
        const renderItem = ({ item, index }) => {
            const { task, id } = item;
            return (
                <View style={styles.listContainer}>
                    <Text>{id}</Text>
                    <Text>{task}</Text>
                    <View style={styles.button}>
                        <Button title={'삭제'} onPress={() => handleDeleteTodo(id)} />
                    </View>
                </View>
            )
        }
        return (
            <FlatList
                renderItem= { renderItem }
                data= {todo_list}
                keyExtractor={(item, index) => item.id.toString()}
            />
        )
    }

    return (
        renderTodoList()
    )
}

const styles = StyleSheet.create({
    listContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      padding: 20,
      borderBottomColor: '#bbb',
      borderBottomWidth: 1,
      fontSize: 24,
      marginLeft: 20,
    },
    button: {
      marginRight: 10,
    },
});