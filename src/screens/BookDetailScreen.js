import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { db } from '../../firebaseService';
import { doc, updateDoc, getDocs, query, where, collection, onSnapshot } from 'firebase/firestore';  

const MAX_BORROW_LIMIT = 3;

function BookDetailScreen({ route }) {
    const { bookId } = route.params;
    const [book, setBook] = useState(null);
    const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);

    useEffect(() => {
        const bookRef = doc(db, 'books', bookId);
        const unsubscribeBook = onSnapshot(bookRef, (bookSnapshot) => {
            if (bookSnapshot.exists()) {
                setBook({ id: bookSnapshot.id, ...bookSnapshot.data() });
            } else {
                console.log("No such book!");
            }
        });

        const borrowedBooksQuery = query(
            collection(db, 'books'),
            where('isBorrowed', '==', true)
        );
        const unsubscribeBorrowedCount = onSnapshot(borrowedBooksQuery, (querySnapshot) => {
            setBorrowedBooksCount(querySnapshot.size);
        });


        return () => {
            unsubscribeBook();
            unsubscribeBorrowedCount();
        };
    }, [bookId]);

    const handleBorrow = async () => {
        if (borrowedBooksCount >= MAX_BORROW_LIMIT) {
            Alert.alert('Cannot Borrow', 'You have already borrowed the 3 number of books.');
        } else if (book.isBorrowed) {
            Alert.alert('This book has already been borrowed.');
        } else {
            try {
                await updateDoc(doc(db, 'books', book.id), {
                    isBorrowed: true,
                });
                Alert.alert(`You have successfully borrowed "${book.title}"`)
            } catch (error) {
                Alert.alert('Error', 'Unable to borrow the book');
            }
        }
    };

    if (!book) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.bookName}>{book.title}</Text>
            <Image source={{ uri: book.coverImage }} style={styles.cover} />
            <Text>Author: {book.author}</Text>
            <Text>Rating: {book.rating}</Text>
            <Text>Summary: {book.summary}</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: book.isBorrowed ? '#A1A1D1' : '#7756E0' }]} >
                <Button
                    title={book.isBorrowed ? 'This Book is Borrowed' : 'Borrow this book'}
                    onPress={handleBorrow}
                    disabled={book.isBorrowed}
                    color={'white'}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    cover: {
        width: 150,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    bookName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        margin: 20,
        width: '50%',
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BookDetailScreen;
