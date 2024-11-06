
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabRoutes from './tab.routes';

export default function Routes(){
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>

    )
}






