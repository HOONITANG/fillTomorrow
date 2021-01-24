import { ADD_TODO, DELETE_TODO } from './todoActions';

const initialState = {
    todo_list: []
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TODO:{
            const {id, task} = action.payload
            return {
                ...state,
                todo_list: [...state.todo_list, {id, task}]
            }
        }
        case DELETE_TODO:
            const { id } = action.payload
            return {
                ...state,
                todo_list: state.todo_list.filter ((todo) => todo.id != id)
            };
        default:
            return state;
    }
}

export default userReducer;