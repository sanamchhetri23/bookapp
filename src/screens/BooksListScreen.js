import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { db } from '../../firebaseService';
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

function BooksListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, 'books');
        const booksSnapshot = await getDocs(booksCollection);
        const booksData = booksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books: ", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
          >
            <View style={styles.bookContent}>
              {!item.coverImage ? (
                <Text style={styles.altText}>No Image Available</Text>
              ) : (
                <Image
                  source={{ uri: item.coverImage }}
                  style={styles.coverImage}
                />
              )}

              <View style={styles.bookDetails}>
                <Text style={styles.bookName}>{item.title}</Text>
                <Text>{item.author}</Text>
              </View>
              <Icon
                name="chevron-right"
                size={24}
                color="gray"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookItem: {
    marginBottom: 22,
  },
  bookContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  coverImage: {
    width: 75,
    height: 110,
    resizeMode: 'contain',
    marginRight: 20,
  },
  bookDetails: {
    flex: 1,
  },
  bookName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  altText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  
  icon: {
    marginLeft: 10,
  },
});

export default BooksListScreen;
