import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Card, Title, IconButton } from 'react-native-paper';
import { theme } from '../Theme';

const windowWidth = Dimensions.get('window').width;

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <Card mode="elevated" elevation={2} style={styles.card}>
        <Card.Cover source={{ uri: recipe.image }} style={styles.image} />
      </Card>
      <Card style={styles.cardContent} mode="contained">

        <Card.Content style={styles.cardRow}>
          <Title style={styles.cardTitle}>{recipe.name}</Title>
        </Card.Content>
        <View style={styles.buttonContainer}>
          <IconButton icon="heart" color={theme.colors.text} size={18} />
          <Text style={styles.likeCount}>1</Text>
          <IconButton icon="bookmark" color={theme.colors.text} size={18} />
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth / 2.3,
    flexDirection: 'column',
    marginVertical: 10,
    columnGap: 10,
    rowGap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    borderColor: "rgba(0, 10, 0, 0.3)",
    borderWidth: 2,
    borderRadius: theme.borderRadii.extraLarge + 3,
    shadowColor: '#11122E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2, // For Android
  },
  likeCount: {
    color: theme.colors.text,
    marginTop: 3,
    marginLeft: -12,
  },
  image: {
    width: '100%',
    height: windowWidth / 2.3,
    borderRadius: theme.borderRadii.extraLarge,
    },


    cardContent: {
      borderColor:"rgba(0, 0, 0, 0.2)",
    width: windowWidth / 2.3,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadii.extraLarge,
    shadowColor: '#11122E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2, // For Android
  },
  cardRow: {},
  cardTitle: {
    width: '100%',
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 5,
  },
});

export default RecipeCard;
