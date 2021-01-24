import React from 'react'
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { addTodo, deleteTodo } from '../../state/todo/todoActions'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const TodoScreen = ({ todo_list, addTodo, deleteTodo }) => {

    const handleAddTodo = (task) => {
        addTodo(task)
    }

    const handleDeleteTodo = (id) => {
        deleteTodo(id)
    }

    return ( 
        <SafeAreaView>
            <TodoInput handleAddTodo={handleAddTodo} />
            <TodoList todo_list={todo_list} handleDeleteTodo={handleDeleteTodo} />
        </SafeAreaView>
    )
}


const mapStateToProps = (state, ownPros) => {
    return {
        todo_list: state.todos.todo_list
    }
}

const mapDispatchToProps = { addTodo, deleteTodo }

// const mapDispatchToProps = dispatch => {
//     return {
//         addTodo: () => dispatch(addTodo),
//         deleteTodo: () => dispatch(deleteTodo)
//     }
// }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoScreen)