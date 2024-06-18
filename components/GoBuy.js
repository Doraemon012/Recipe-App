import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { theme } from '../Theme';


const GoBuy = ({ shoppingList, navigation }) => {
  const itemsToShow = shoppingList.ingredients.slice(0, 3);

  return (
    <Pressable
      style={styles.container}
          onPress={() => {
          navigation.navigate("GroceryListScreen")
      }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>🥙 Your need to buy...</Text>
        <View style={styles.itemContainer}>
          {itemsToShow.map((item, index) => (
            <Text key={index} style={styles.item}>
              {item}
            </Text>
          ))}
          {/* Link to GroceryListScreen */}
          <Pressable onPress={() => {
            // Navigate to the GroceryListScreen on click
            // Implement navigation logic here
          }}>
            <Text style={styles.moreLink}>+{shoppingList.ingredients.length - 3} more</Text>
          </Pressable>
        </View>
      </View>
      <MaterialIcons name="shopping-cart" size={24} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container: {
    // backgroundColor
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.pastelGreen2,
    borderRadius:theme.borderRadii.large,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.pastelGreen1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  moreLink: {
    marginTop: 8,
    // color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default GoBuy;
