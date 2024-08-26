import React from 'react';
import { TextInput } from 'react-native';
import {styles} from '@/app/styles';

interface SearchInputProps {
  isLightMode: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ isLightMode }) => {
  return (
    <TextInput
      style={[styles.searchBox, isLightMode ? styles.lightInput : styles.darkInput]}
      placeholder="Search"
      placeholderTextColor={isLightMode ? "#7C7C7C" : "#CCC"}
    />
  );
};

export default SearchInput;
