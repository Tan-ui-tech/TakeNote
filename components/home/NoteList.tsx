import React from 'react';
import { FlatList, View } from 'react-native';
import NoteCard from '@/components/home/NoteCard';
import { Note } from '@/components/home/NoteCard';
import { styles } from '@/app/styles';

interface NoteListProps {
  notes: Note[];
  isLightMode: boolean;
  onNotePress: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, isLightMode, onNotePress }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <NoteCard
          note={item}
          isLightMode={isLightMode}
          onPress={() => onNotePress(item)}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

export default NoteList;
