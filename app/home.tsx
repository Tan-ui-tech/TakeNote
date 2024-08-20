import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeToggle from './ThemeToggle';
import { setIP } from './ipconfig';

export default function HomeScreen() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [notes, setNotes] = useState([]); 

  const toggleSwitch = () => setIsLightMode(!isLightMode);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token)
        if (token) {
          const response = await fetch(`${setIP}/note/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          // console.log(response);
          if (response.ok) {
            const data = await response.json();
            setNotes(data.data); // Update state with fetched notes
            
          } else {
            
            Alert.alert('Error', 'Failed to fetch protected data');
          }
        } else {
          Alert.alert('Error', 'No token found');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred');
        console.error(error);
        
      }
      
    };

    fetchProtectedData();
  }, []);

  return (
    <View style={[styles.container, isLightMode ? styles.lightBackground : styles.darkBackground]}>
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
        data={notes} // Use state notes here
        keyExtractor={item => item.id} // Unique key for each item
        renderItem={({ item }) => (
          <View style={[styles.noteCard, isLightMode ? styles.lightCard : styles.darkCard]}>
            <Text style={isLightMode ? styles.lightText : styles.darkText}>{item.key}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
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
