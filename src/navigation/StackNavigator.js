
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { somethingScreen, somethingScreen } from '../screen';
import { NAVIGATION_INIT } from './routes';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
        initialRouteName={NAVIGATION_INIT}
        >
            <Stack.Screen 
                name={NAVIGATION_INIT}
                component={BottomTabNavigator}
            />
            {/* <Stack.Screen 
                name={NAVIGATION_SomeThing}
                component={SomethingScreen}
            /> */}
            
        </Stack.Navigator>
    )
};

export default StackNavigator;