// components/AddButton.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 0,
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
});
