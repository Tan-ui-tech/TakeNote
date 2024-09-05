// components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ThemeToggle from '../../app/ThemeToggle';

type HeaderProps = {
  title: string;
  isLightMode: boolean;
  toggleSwitch: () => void;
  onBackPress?: () => void;
  onSavePress?: () => void;
};

export default function Header({ title, isLightMode, toggleSwitch, onBackPress, onSavePress }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Text style={[styles.title, isLightMode ? styles.lightText : styles.darkText]}>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.title, isLightMode ? styles.lightText : styles.darkText]}>{title}</Text>
      {onSavePress && (
        <TouchableOpacity onPress={onSavePress}>
          <Text style={[styles.title, isLightMode ? styles.lightText : styles.darkText]}>Save</Text>
        </TouchableOpacity>
      )}
      {!onBackPress && <ThemeToggle isLightMode={isLightMode} toggleSwitch={toggleSwitch} />}
    </View>
  );
}

const styles = StyleSheet.create({
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
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#FFF',
  },
});
