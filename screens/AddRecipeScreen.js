import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import { theme } from "../Theme";
import { StyleSheet } from "react-native";
// import ImagePicker from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';

import { ScrollView } from "react-native-gesture-handler";
import { addRecipe } from "../firebaseFunctions/firebaseFunctions";

export default function AddRecipeScreen() {
  const [recipe, setRecipe] = useState({
    title: "",
    category: "any",
    area: "any",
    ingredients: [],
    instructions: [], // State for instructions
    photo: null,
  });

  const [ingredientInputs, setIngredientInputs] = useState([""]);
  const [instructionInputs, setInstructionInputs] = useState([""]); // State for instruction inputs

  // const handleSelectPhoto = () => {
  //   ImagePicker.showImagePicker({}, (response) => {
  //     if (!response.didCancel && !response.error) {
  //       setRecipe({ ...recipe, photo: response.uri });
  //     }
  //   });
  // };
  const handleSelectPhoto = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // if (!pickerResult.cancelled) {
      setRecipe({ ...recipe, photo: pickerResult.uri });
    // }
  };

  const handleAddRecipe = async () => {
    try {
      // Check if any required field is empty
      console.log("Recipe:", recipe)
      if (!recipe.title || !recipe.category || !recipe.area || recipe.ingredients.length === 0 || recipe.instructions.length === 0) {
        console.error("Please fill out all fields before adding the recipe.");
        return;
      }
  
      await addRecipe(recipe); // Call the addRecipe function
      console.log("Added Recipe:", recipe);
      setRecipe({
        title: "",
        category: "",
        area: "",
        ingredients: [],
        instructions: [],
        photo: null,
      });
      setIngredientInputs([""]);
      setInstructionInputs([]);
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };
  

  const handleAddIngredientInput = () => {
    setIngredientInputs([...ingredientInputs, ""]);
  };

  const handleAddInstructionInput = () => {
    setInstructionInputs([...instructionInputs, ""]); // Add a new empty instruction input
  };

  const handleIngredientInputChange = (text, index) => {
    const newInputs = [...ingredientInputs];
    newInputs[index] = text;
    setIngredientInputs(newInputs);
  };

  const handleInstructionInputChange = (text, index) => {
    const newInputs = [...instructionInputs];
    newInputs[index] = text;
    setInstructionInputs(newInputs);
  };

  const handleRemoveIngredientInput = (index) => {
    const newInputs = [...ingredientInputs];
    newInputs.splice(index, 1);
    setIngredientInputs(newInputs);
  };

  const handleRemoveInstructionInput = (index) => {
    const newInputs = [...instructionInputs];
    newInputs.splice(index, 1); // Remove the instruction input at the specified index
    setInstructionInputs(newInputs);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Recipe Title"
        value={recipe.title}
        onChangeText={(text) => setRecipe({ ...recipe, title: text })}
      />
      {/* Other input fields for category, area, etc. */}
      {ingredientInputs.map((ingredient, index) => (
        <View style={styles.ingredientContainer} key={index}>
          <TextInput
            style={styles.input}
            placeholder={`Ingredient ${index + 1}`}
            value={ingredient}
            onChangeText={(text) => handleIngredientInputChange(text, index)}
          />
          <Pressable onPress={() => handleRemoveIngredientInput(index)}>
            <Text style={styles.removeButton}>-</Text>
          </Pressable>
        </View>
      ))}
      <Pressable onPress={handleAddIngredientInput}>
        <View style={styles.plusIconContainer}>
          <Text style={styles.plusIcon}>+</Text>
          <Text style={styles.plusIconText}>Add Ingredients</Text>
        </View>
      </Pressable>
      {/* Instructions */}
      {instructionInputs.map((instruction, index) => (
        <View style={styles.instructionContainer} key={index}>
          <TextInput
            style={styles.input}
            placeholder={`Step ${index + 1}`}
            multiline
            value={instruction}
            onChangeText={(text) => handleInstructionInputChange(text, index)}
          />
          <Pressable onPress={() => handleRemoveInstructionInput(index)}>
            <Text style={styles.removeButton}>-</Text>
          </Pressable>
        </View>
      ))}
      <Pressable onPress={handleAddInstructionInput}>
        <View style={styles.plusIconContainer}>
          <Text style={styles.plusIcon}>+</Text>
          <Text style={styles.plusIconText}>Add Instructions</Text>
        </View>
      </Pressable>
      {/* End Instructions */}
      {/* Button to select photo */}
      <Button title="Select Photo" onPress={handleSelectPhoto} />
      {/* Display selected photo */}
      {recipe.photo && (
        <Image source={{ uri: recipe.photo }} style={styles.photo} />
      )}
      {/* Button to add recipe */}
        <Button title="Add Recipe" onPress={handleAddRecipe} />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: theme.borderRadii.small,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeButton: {
    marginLeft: 8,
    fontSize: 20,
    color: "red",
  },
  photo: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  plusIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  plusIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  plusIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
