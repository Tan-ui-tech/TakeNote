import React, { useState, useEffect, useRef } from 'react';
import { View, Alert, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteList from '@/components/home/NoteList';
import NoteEditor from '@/components/home/NoteEditor';
import NoteHeader from '@/components/home/Header';
import SearchInput from '@/components/home/SearchInput';
import AddButton from '@/components/home/AddButton';
import { setIP } from './ipconfig';
import { styles } from './styles';
import { Note } from '@/components/home/NoteCard';

export default function HomeScreen() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [notes, setNotes] = useState([] as Note[]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([''] as string[]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([] as Note[]);
  
  const [storedNotes, setStoredNotes] = useState([] as Note[]);

  


  const toggleSwitch = () => setIsLightMode(!isLightMode);
  
  // Initialize both slide and tilt animation values
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const tiltAnim = useRef(new Animated.Value(0)).current;

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
            setStoredNotes(data.data)
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



  const handleNoteClick = (note: Note) => {
    console.log(note,'hellowrldlasdasd');

    setSelectedNote(note);
    setTitle(note.title);
    setDescription(note.content);

    let arrName = note.tags.map(item=> item.name)
    setTags(arrName);


    
    // Animate slide in and tilt
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0, // Move to the screen
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(tiltAnim, {
        toValue: 1, // Max tilt
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);

    const filteredNotes = storedNotes.filter(note => 
    // const filteredNotes = notes.filter(note => 
      note.title.toLowerCase().includes(text.toLowerCase()) || 
      note.tags.some(tag => tag.name.toLowerCase().includes(text.toLowerCase()))
    );

    console.log(filteredNotes, 'filteredNotes') 

    // setSearchResults(filteredNotes);
    if (text === '') setNotes(storedNotes)
    else setNotes(filteredNotes)
  };

  const handleSelectResult = (note: Note) => {
    setQuery('');
    setSearchResults([]);
    handleNoteClick(note);
  };
  

  const handleBack = () => {
    // Animate slide out and tilt reset
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 500, // Move off-screen
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(tiltAnim, {
        toValue: 0, // Reset tilt
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start(() => {
      setSelectedNote(null);
      setTitle('');
      setDescription('');
      setTags(['']);
    });
  };

  const handleAddNote = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`${setIP}/note/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Title here',
            content: 'Description here',
            tags: ['#tags1'],
          }),
        });

        const responseText = await response.text();

        console.log(responseText);

        if (response.ok) {
          const newNote = JSON.parse(responseText);
          // newNote.data.tags = []; //<-  data can't be fetched from server so front-end can call data manually
          setNotes([...notes, newNote.data]);
          setStoredNotes([...storedNotes, newNote.data])  
          setTitle('');
          setDescription('');
          setTags(['']);
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

  const handleUpdateNote = async (id: any) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`${setIP}/note/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content: description, tags }),
        });

        if (response.ok) {
          const updatedNote = await response.json();
          
          setNotes(notes.map(note => note.id === updatedNote.data.id ? updatedNote.data : note));
          setStoredNotes(notes.map(note => note.id === updatedNote.data.id ? updatedNote.data : note))

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
    setLoading(false);
  };

  const handleDeleteNote = async (id: any) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              if (token) {
                setLoading(true);
                const response = await fetch(`${setIP}/note/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                });

                if (response.ok) {
                  setNotes(notes.filter(note => note.id !== id));
                  setStoredNotes(notes.filter(note => note.id !== id))
                  setSelectedNote(null);
                } else {
                  Alert.alert('Error', 'Failed to delete note');
                }
              } else {
                Alert.alert('Error', 'No token found');
              }
            } catch (error) {
              Alert.alert('Error', 'An unexpected error occurred');
              console.error(error);
            }
            setLoading(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Interpolating tilt animation
  const tiltInterpolate = tiltAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '0deg'] // Adjust degrees as needed
  });

  return (
    <View style={[styles.container, isLightMode ? styles.lightBackground : styles.darkBackground]}>
      {!selectedNote ? (
        <View style={{ height: '100%' }}>
          <NoteHeader
            title="Note Home"
            isLightMode={isLightMode}
            toggleSwitch={toggleSwitch}
          />
          <SearchInput
            isLightMode={isLightMode}
            query={query}
            onSearchChange={handleSearchChange}
            searchResults={searchResults}
            onSelectResult={handleSelectResult}
          />
          <NoteList
            notes={notes}
            isLightMode={isLightMode}
            onNotePress={handleNoteClick}
          />
          <AddButton onPress={handleAddNote} />
        </View>
      ) : (
        <Animated.View
          style={[
            {
              transform: [
                { translateY: slideAnim },
                { rotate: tiltInterpolate }
              ]
            }
          ]}
        >
          <NoteEditor
            title={title}
            description={description}
            tags={tags}
            isLightMode={isLightMode}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onTagsChange={setTags}
            onSavePress={() => handleUpdateNote(selectedNote.id)}
            onDeletePress={() => handleDeleteNote(selectedNote.id)}
            onBackPress={handleBack}
            loading={loading}
          />
        </Animated.View>
      )}
    </View>
  );;
}
