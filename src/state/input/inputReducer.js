import { ADD_NAME, ADD_TYPE, ADD_DATE } from './inputActions';

const initialState = {
    input_name: '',
    input_type: '',
    input_date: ''
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_NAME:{
            const { user_input } = action.payload
            return {
                ...state,
                input_name: user_input
            }
        }
        case ADD_TYPE:{
            const { user_input } = action.payload
            return {
                ...state,
                input_type: user_input
            }
        }
        case ADD_DATE:{
            const { user_input } = action.payload
            return {
                ...state,
                input_date: user_input
            }
        }
        default:
            return state;
    }
}

export default userReducer;