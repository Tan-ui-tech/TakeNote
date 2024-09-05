import React, { useEffect, useState } from 'react';
import { TextInput, View, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import { styles } from '@/app/styles';
import { Note } from '@/components/home/NoteCard';

interface SearchInputProps {
  isLightMode: boolean;

  
  query: string;
  onSearchChange: (text: string) => void;
  searchResults: Note[];
  onSelectResult: (note: Note) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ isLightMode, query, onSearchChange, searchResults, onSelectResult }) => {
  const [localQuery, setLocalQuery] = useState(query);

  // const handleSearch = () => {
  //   onSearchChange(localQuery);
  // };

  useEffect(() => {
    onSearchChange(localQuery);
  }, [localQuery])

  return (
    <View>
      <TextInput
        style={[styles.searchBox, isLightMode ? styles.lightInput : styles.darkInput]}
        placeholder="Search by title or tags"
        placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
        value={localQuery}
        onChangeText={setLocalQuery}
      />
      {/* <Button title="Search" onPress={handleSearch} /> */}

      {/* {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectResult(item)}>
              <View style={styles.resultContainer}>
                <Text style={[styles.resultText, isLightMode ? styles.lightText : styles.darkText]}>
                  {item.title}
                </Text>
                <View style={styles.tagsContainer}>
                  {item.tags.map((tag, index) => (
                    <Text
                      key={index}
                      style={[styles.tagText, isLightMode ? styles.lightTagText : styles.darkTagText]}
                    >
                      {tag.name}
                    </Text>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
          style={[styles.dropdown, { backgroundColor: isLightMode ? '#F0F0F0' : '#2C2C2C' }]}
        />
      )} */}
    </View>
  );
};

export default SearchInput;
