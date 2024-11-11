import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksListScreen from '../screens/BooksListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';

const Stack = createStackNavigator();

export default function HomeStack({ borrowBook, borrowedBooks } ) {
  return (
    <Stack.Navigator 
      initialRouteName="BooksList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7756E0',  
        },
        headerTintColor: 'white', 
        headerTitleStyle: {
          fontWeight: 'bold',  
        },
      }}
    >
      <Stack.Screen 
        name="BooksList" 
        component={BooksListScreen} 
        options={{ title: 'Books List' }} 
      />
      
      <Stack.Screen 
        name="BookDetail"
        options={{ title: 'Book Details' }} 
      >
        {(props) => (
          <BookDetailScreen 
            {...props} 
            borrowBook={borrowBook} 
            borrowedBooks={borrowedBooks} 
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
