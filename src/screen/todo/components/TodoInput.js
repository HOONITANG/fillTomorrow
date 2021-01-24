import React, {useState} from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'

export default function TodoInput({ handleAddTodo }) {
    const [text, setText] = useState('');

    const handleChangeText = (text) => {
        setText(text)
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="Add an item!"
                placeholderTextColor={'#999'}
                autoCorrect={false}
                value={text} 
                onChangeText={handleChangeText}/>
            <View style={styles.button}>
                <Button title={'ADD'} onPress={() => handleAddTodo(text)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
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