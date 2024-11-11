// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    if (borrowedBooks.length < 3 && !borrowedBooks.some(b => b.id === book.id)) {
      setBorrowedBooks([...borrowedBooks, book]);
    }
  };

  const returnBook = (bookId) => {
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
  };

  return (
    <NavigationContainer>
      <TabNavigator 
        borrowBook={borrowBook} 
        borrowedBooks={borrowedBooks} 
        returnBook={returnBook} 
      />
    </NavigationContainer>
  );
}
