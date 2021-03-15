import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './StackNavigator';

const Stack = createStackNavigator();

// Drawer, AlertDialog, MediaViewer.. 등 화면 모든 곳에서 사용되는 Navigation 추가.
const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                mode="modal"
                headerMode="none"
                screenOptions={{
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: false,
                }}
            >
                <Stack.Screen
                    name="Root"
                    component={StackNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;