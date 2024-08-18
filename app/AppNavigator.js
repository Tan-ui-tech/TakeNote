import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigatorContainer } from '@react-navigation/native';
import Login from './login';
import Home from './home';

const Stack = createStackNavigator();

export default function AppNavigator() {
    (
        <NavigatorContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigatorContainer>
    )
}