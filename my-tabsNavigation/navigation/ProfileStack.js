import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/profile';
import Detail from '../screens/detail';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f8f8f8',
        },
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={Profile} 
        options={{ 
          title: 'Profile',
          headerShown: false // Ocultar header en Profile principal
        }}
      />
      <Stack.Screen 
        name="Detail" 
        component={Detail} 
        options={{ 
          title: 'Detalle',
          headerBackTitle: 'MainTabs'
        }}
      />
    </Stack.Navigator>
  );
}