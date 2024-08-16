import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Switch, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import {AsyncStorage} from 'react-native';


const data = Array(10).fill({}).map((_, i) => ({ key: `Note ${i + 1}` }));

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [isLightMode, setIsLightMode] = useState(colorScheme === 'light');

  const toggleSwitch = () => setIsLightMode(!isLightMode);

useEffect(() => {
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key',
        'I like to save it.',
      );
    } catch (error) {
      // Error saving data
    }
  };
},[]);


  return (
    <View style={[styles.container, isLightMode ? styles.lightBackground : styles.darkBackground]}>
      <View style={styles.header}>
        <Text style={[styles.title, isLightMode ? styles.lightText : styles.darkText]}>Note Home</Text>
        <View style={styles.switchContainer}>
          <Text style={isLightMode ? styles.lightText : styles.darkText}>Light Mode</Text>
          <Switch
            value={isLightMode}
            onValueChange={toggleSwitch}
            trackColor={{ false: "#767577", true: "#A1CEDC" }}
            thumbColor={isLightMode ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
      </View>
      
      <TextInput
        style={[styles.searchBox, isLightMode ? styles.lightInput : styles.darkInput]}
        placeholder="Search"
        placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
      />

      <FlatList
        data={data}
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
