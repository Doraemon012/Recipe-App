import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { theme } from '../Theme';

const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <Searchbar
      placeholder="Cheeze Sandwitch..."
      onChangeText={setSearchQuery}
      value={searchQuery}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        marginHorizontal: 16,
        marginVertical:8,
        borderRadius: theme.borderRadii.large,
        backgroundColor: theme.colors.white, // Use theme background color
        color: theme.colors.text, // Use theme text color
        shadowColor: '#11122E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 2, // For Android
        borderWidth: isFocused ? 2 : 0, // Add border when focused
        borderColor: isFocused ? theme.colors.primary : 'transparent', // Primary color when focused
        width: '92%', // Make the search bar full width
      }}
      inputStyle={{ color: theme.colors.text }} // Use theme text color for input
      placeholderTextColor={theme.colors.textGrey} // Use theme text color for placeholder
      iconColor={theme.colors.text} // Use theme text color for icons
    />
  );
};

export default MySearchBar;
