import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import todoReducer from './todo/todoReducer';
import inputReducer from './input/inputReducer';

const rootReducer = combineReducers({
    todos: todoReducer,
    inputs: inputReducer,
})

const configureStore = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default configureStore;