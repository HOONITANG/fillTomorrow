import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import todoReducer from './todo/todoReducer';

const rootReducer = combineReducers({
    todos: todoReducer,
})

const configureStore = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default configureStore;