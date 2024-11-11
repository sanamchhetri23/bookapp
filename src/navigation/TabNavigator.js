import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import BorrowedBooksScreen from '../screens/BorrowedScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator   
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Borrowed') {
            iconName = focused ? 'book' : 'book-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',  
        tabBarInactiveTintColor: '#A1A1D1',   
        tabBarStyle: {
            backgroundColor: '#7756E0'
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        options={{ headerShown: false, title: 'Home' }}
      >
        {() => <HomeStack />}
      </Tab.Screen>
      <Tab.Screen 
        name="Borrowed" 
        options={{
          headerShown: true,  
          title: 'Borrowed',
          headerStyle: {
            backgroundColor: '#7756E0',  
          },
          headerTintColor: 'white', 
          headerTitleStyle: {
            fontWeight: 'bold',  
          },
        }}
      >
        {() => <BorrowedBooksScreen/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
