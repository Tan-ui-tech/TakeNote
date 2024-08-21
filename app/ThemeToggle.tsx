// ThemeToggle.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

interface ThemeToggleProps {
  isLightMode: boolean;
  toggleSwitch: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isLightMode, toggleSwitch }) => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.switchContainer}>
      <Text style={isLightMode ? styles.lightText : styles.darkText}>Night Mode</Text>
      <Switch
        value={isLightMode}
        onValueChange={toggleSwitch}
        trackColor={{ false: "#767577", true: "#A1CEDC" }}
        thumbColor={isLightMode ? "#f4f3f4" : "#f4f3f4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#FFF',
  },
});

export default ThemeToggle;
