import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Chip, IconButton } from "react-native-paper";
import { theme } from "../Theme";

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  const handleStartCooking = () => {
    navigation.navigate("CookingScreen", { recipe });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.iconContainer1}>
          <IconButton
            icon={() => <MaterialCommunityIcons name="arrow-left" size={24} />}
            onPress={() => navigation.goBack()}
            style={{ zIndex: 1 }}
          />
        </View>
        <Image source={{ uri: recipe.image }} style={styles.photo} />
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="heart-outline"
            color={theme.colors.white}
            size={32}
          />
        </View>
      </View>
      <Text style={styles.title}>{recipe.name}</Text>
      <View style={styles.chipContainer}>
        <Chip icon="earth" style={styles.chip}>{recipe.area}</Chip>
        <Chip icon="cake" style={styles.chip}>{recipe.category}</Chip>
      </View>
      <Pressable onPress={handleStartCooking} style={styles.addButton}>
        <Text style={styles.addButtonText}>Start Cooking</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.screenPadding,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    position: "relative",
  },
  photo: {
    marginVertical: theme.spacing.screenPadding,
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: theme.borderRadii.large,
  },
  iconContainer: {
    position: "absolute",
    top: 25,
    right: 10,
  },
  iconContainer1: {
    position: "absolute",
    top: 25,
    left: 10,
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    marginTop: theme.spacing.medium,
    color: theme.colors.text,
  },
  chipContainer: {
    flexDirection: "row",
    height: "auto",
    gap: 8,
    marginVertical: theme.spacing.medium,
  },
  chip: {
    marginVertical: theme.spacing.medium,
    backgroundColor: theme.colors.pastelGreen2,
    color: theme.colors.text,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.screenPadding,
    borderRadius: theme.borderRadii.large,
    alignItems: "center",
    marginTop: theme.spacing.screenPadding,
  },
  addButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
  },
});

export default RecipeDetailsScreen;
