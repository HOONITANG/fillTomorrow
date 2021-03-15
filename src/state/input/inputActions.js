// action Type Name
export const ADD_NAME = 'ADD_NAME';
export const ADD_TYPE = 'ADD_TYPE';
export const ADD_DATE = 'ADD_DATE';

// action
export const addName = (user_input) => {
    return {
        type: ADD_NAME,
        payload: { user_input },
    }
}

export const addType = (user_input) => {
    return {
        type: ADD_TYPE,
        payload: { user_input },
    }
}

export const addDate = (user_input) => {
    return {
        type: ADD_DATE,
        payload: { user_input },
    }
}

