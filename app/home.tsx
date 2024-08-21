import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeToggle from './ThemeToggle';
import { setIP } from './ipconfig';

export default function HomeScreen() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const toggleSwitch = () => setIsLightMode(!isLightMode);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const response = await fetch(`${setIP}/note/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setNotes(data.data);
          } else {
            Alert.alert('Error', 'Failed to fetch notes');
          }
        } else {
          Alert.alert('Error', 'No token found');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred');
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        console.log('Token:', token); // Check if token is retrieved

        const response = await fetch(`${setIP}/note/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Title here',
            content: 'Description here',
          }), // Send a default note object
        });

        const responseText = await response.text(); // Read response as text for debugging
        console.log('Response:', responseText); // Check response from server

        if (response.ok) {
          const newNote = JSON.parse(responseText); // Parse response
          setNotes([...notes, newNote.data]);
          setTitle('');
          setDescription('');
        } else {
          Alert.alert('Error', 'Failed to add note');
        }
      } else {
        Alert.alert('Error', 'No token found');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setDescription(note.content);
  };

  const handleBack = () => {
    setSelectedNote(null);
    setTitle('');
    setDescription('');
  };

  const handleUpdateNote = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`${setIP}/note/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content: description }), // Ensure the field names match your API
        });

        if (response.ok) {
          const updatedNote = await response.json();
          setNotes(notes.map(note => note.id === updatedNote.data.id ? updatedNote.data : note));
          setSelectedNote(null);
        } else {
          Alert.alert('Error', 'Failed to update note');
        }
      } else {
        Alert.alert('Error', 'No token found');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, isLightMode ? styles.lightBackground : styles.darkBackground]}>
      {!selectedNote ? (
        <>
          <View style={styles.header}>
            <Text style={[styles.title, isLightMode ? styles.lightText : styles.darkText]}>Note Home</Text>
            <ThemeToggle isLightMode={isLightMode} toggleSwitch={toggleSwitch} />
          </View>

          <TextInput
            style={[styles.searchBox, isLightMode ? styles.lightInput : styles.darkInput]}
            placeholder="Search"
            placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
          />

          <FlatList
            data={notes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleNoteClick(item)}
                style={[styles.noteCard, isLightMode ? styles.lightCard : styles.darkCard]}
              >
                <Text style={isLightMode ? styles.lightText : styles.darkText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddNote}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack}>
              <Text style={[styles.title, isLightMode ? styles.lightText : styles.darkText]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUpdateNote(selectedNote.id)}>
              <Text style={[styles.title, isLightMode ? styles.lightText : styles.darkText]}>Save</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.inputBox,
              isLightMode ? styles.lightInput : styles.darkInput,
              { color: isLightMode ? '#000' : '#FFF' } // Set text color based on theme
            ]}
            placeholder="Title"
            placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[
              styles.inputBox,
              isLightMode ? styles.lightInput : styles.darkInput,
              { color: isLightMode ? '#000' : '#FFF', height: 200 } // Set text color based on theme
            ]}
            placeholder="Description"
            placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputBox: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchBox: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  noteCard: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    paddingBottom: 5,
    marginBottom: 25
  },
  addButtonText: {
    fontSize: 36,
    color: '#FFF',
  },
  // Light mode styles
  lightBackground: {
    backgroundColor: '#FFF',
  },
  lightText: {
    color: '#000',
  },
  lightInput: {
    backgroundColor: '#E0E0E0',
  },
  lightCard: {
    backgroundColor: '#F0F0F0',
  },
  // Dark mode styles
  darkBackground: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFF',
  },
  darkInput: {
    backgroundColor: '#2C2C2C',
  },
  darkCard: {
    backgroundColor: '#333',
  },
});
