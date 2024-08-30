// components/NoteCard.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


export type Note = {
    id: string;
    title: string;
    content: string;
    tags: [{'id':number, 'name': string}];
  }
type NoteCardProps = {
  note: Note;
  isLightMode: boolean;
  onPress: () => void;
};

export default function NoteCard({ note, isLightMode, onPress }: NoteCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.noteCard, isLightMode ? styles.lightCard : styles.darkCard]}
    >
      <Text style={isLightMode ? styles.lightText : styles.darkText}>{note.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  lightCard: {
    backgroundColor: '#F0F0F0',
  },
  darkCard: {
    backgroundColor: '#333',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#FFF',
  },
});
