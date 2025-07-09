import { } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationTabs from './NavigationTabs';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* màn hình chính: chứa bottom tab để vào các màn hình của tab */}
        <Stack.Screen name='MainTab' component={NavigationTabs}/>

        {/* các màn hình không thuộc bottom tab */}
        
    </Stack.Navigator>
  )
}

export default RootNavigator