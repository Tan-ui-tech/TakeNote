import React from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/app/styles';
import LoadingOverlay from '../LoadingScreen';
import Header from './Header';

interface NoteEditorProps {
  title: string;
  description: string;
  tags: string[];
  isLightMode: boolean;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onTagsChange: (tags: string[]) => void;
  onSavePress: () => void;
  onDeletePress: () => void;
  onBackPress: () => void;
  loading: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  title,
  description,
  isLightMode,
  tags,
  onTitleChange,
  onDescriptionChange,
  onTagsChange,
  onSavePress,
  onDeletePress,
  onBackPress,
  loading
}) => {
  
  // Ensure the tags array contains only strings and convert it to a comma-separated string
  const tagsString = tags.map(tag => String(tag)).join(', ');

  const handleTagsChange = (text: string) => {
    // Convert the comma-separated string back to an array of strings
    const tagArray = text.split(',').map(tag => tag.trim());
    onTagsChange(tagArray);
  };

  return (
    <View style={{ minHeight: '100%' }}>
      <LoadingOverlay message="Loading..." visible={loading} />
      <Header
        toggleSwitch={() => {}}
        title=""
        isLightMode={isLightMode}
        onBackPress={onBackPress}
        onSavePress={onSavePress}
      />
      
      <TextInput
        style={[
          styles.inputBox,
          isLightMode ? styles.lightInput : styles.darkInput,
          { color: isLightMode ? '#000' : '#FFF' }
        ]}
        placeholder="Title"
        placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
        value={title}
        onChangeText={onTitleChange}
      />

      <TextInput
        style={[
          styles.inputBox,
          isLightMode ? styles.lightInput : styles.darkInput,
          { color: isLightMode ? '#000' : '#FFF', height: 300, textAlignVertical: 'top' }
        ]}
        placeholder="Description"
        placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
        value={description}
        onChangeText={onDescriptionChange}
        multiline
      />

      <TextInput
        style={[
          styles.tagBox,
          isLightMode ? styles.lightInput : styles.darkInput,
          { color: isLightMode ? '#000' : '#FFF' }
        ]}
        placeholder="Tags"
        placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
        value={tagsString}  // Use the comma-separated string
        onChangeText={handleTagsChange} // Convert the input back to an array
      />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDeletePress}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteEditor;
