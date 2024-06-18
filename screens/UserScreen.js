import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { auth } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../Theme";

const UserScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkLocalUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserName(user.email);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLocalUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{userName}</Text>

      <Pressable style={styles.button} onPress={handleSignOut}>
        <MaterialCommunityIcons name="logout" size={24} color="white" />
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
      <View style={styles.options}>
        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("MealPlanning")}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="white" />
          <Text style={styles.optionText}>Meal Planner</Text>
        </Pressable>

        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("RecipeCollections")}
        >
          <MaterialCommunityIcons name="book" size={24} color="white" />
          <Text style={styles.optionText}>Recipe Collections</Text>
        </Pressable>

        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("Favorites")}
        >
          <MaterialCommunityIcons name="heart" size={24} color="white" />
          <Text style={styles.optionText}>Favorites</Text>
        </Pressable>

        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("GroceryList")}
        >
          <MaterialCommunityIcons name="cart" size={24} color="white" />
          <Text style={styles.optionText}>Grocery List</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    padding: 10,
    backgroundColor: theme.colors.primary,
borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },  
  buttonText: {
    color: "white",

    marginLeft: 8,
    fontSize: 18,
  },
  options: {
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    color: "white",
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  optionText: {
    color: "white",

    marginLeft: 8,
    fontSize: 18,
  },
});

export default UserScreen;
