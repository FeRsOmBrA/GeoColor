import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import MainScreen from '../screens/MainScreen'

const Stack = createStackNavigator()
const screenOptions =  {
    headerShown : false 
}
const Navigation = () => {
  return (
     <Stack.Navigator screenOptions={screenOptions}> 
        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name ="MainScreen" component={MainScreen}/> 
      
   
     </Stack.Navigator>

  )
}

export default Navigation