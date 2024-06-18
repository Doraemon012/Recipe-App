import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../Theme";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const RecipeHeading = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
          <MaterialCommunityIcons name="chevron-right" size={32} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        paddingHorizontal:16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: "#000", // Adjust the color based on your theme
  },
});

export default RecipeHeading;
