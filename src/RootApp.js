
import 'react-native-gesture-handler';
import React, { Component } from 'react'
import configureStore from './state/configureStore';
import { Provider } from 'react-redux';
import App from './App';
import RootNavigator from './navigation';


export default class RootApp extends Component {
    render() {
        return (
            <Provider store={configureStore}>
                <RootNavigator/>
            </Provider>
        )
    }
}
