import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../Theme";

const Header = ({ userName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Text style={styles.greeting}>👋 Hello, {userName}!</Text>
        <Text style={styles.subtitle}>What would you like to cook today?</Text>
      </View>
      <Pressable style={styles.profileIcon}>
        <MaterialCommunityIcons name="account-circle" size={36} color={theme.colors.primary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  userSection: {
    flexDirection: "column",
  },
  greeting: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    color: theme.colors.textGrey,
  },
    subtitle: {
      marginTop: 8,
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  profileIcon: {
    marginLeft: "auto",
  },
});

export default Header;
