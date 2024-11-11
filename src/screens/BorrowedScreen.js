import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../../firebaseService';  
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';  // Firestore methods
import { TouchableOpacity } from 'react-native';

function BorrowedBooksScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowedBooks = () => {
    try {
      const q = query(collection(db, 'books'), where('isBorrowed', '==', true));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const books = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setBorrowedBooks(books);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching borrowed books: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = fetchBorrowedBooks();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);  

  const handleReturn = async (bookId) => {
    try {
        
      await updateDoc(doc(db, 'books', bookId), {
        isBorrowed: false,
      });
    } catch (error) {
      console.error("Error returning book: ", error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <Text>No books borrowed yet.</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookName}>{item.title}</Text>
              <Text>By: {item.author}</Text>
              <TouchableOpacity style = {styles.button}>
              <Button
                title="Return"
                onPress={() => handleReturn(item.id)}
                color={'white'}
              />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  button: {
    backgroundColor: '#7756E0',
    width: '30%',
    borderRadius: 6,
    marginTop: 16,
    alignSelf: 'flex-end'
  },
  bookItem: {
    marginBottom: 12,
    padding: 20,
    backgroundColor: 'rgba(211, 211, 211, 0.5)', 
    borderRadius: 8
  },
  bookName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BorrowedBooksScreen;
