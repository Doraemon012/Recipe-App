import React from "react";
import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";
import RecipeCard from "../components/RecipeCard";
import MySearchBar from "../components/SearchBar";
import { fetchRecipes } from "../firebaseFunctions/fetch";
import { StyleSheet } from "react-native";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";
import RecipeHeading from "../components/Heading";
import Header from "../components/Header";
import GoBuy from "../components/GoBuy";

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [lastRecipe, setLastRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const shoppingList = {
    createdAt: 'March 17, 2024 at 1:22:20 PM UTC+5:30',
    ingredients: ['Taco', 'make', 'asd', 'dsa', 'ert', 'trwe', 'sa'],
    modifiedAt: 'March 17, 2024 at 1:22:20 PM UTC+5:30',
    userId: 'dvloperapk@gmail.com',
  };

  const fetchInitialRecipes = async () => {
    try {
      setIsLoading(true);
      const result = await fetchRecipes();
      if (result) {
        const { recipes: initialRecipes, lastRecipe: initialLastRecipe } =
          result;
        console.log(result);
        setRecipes(initialRecipes);
        setLastRecipe(initialLastRecipe);
      }
    } catch (error) {
      console.error("Error fetching initial recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextRecipes = async () => {
    try {
      setIsLoading(true);
      const result = await fetchRecipes(lastRecipe);
      if (result) {
        const { recipes: nextRecipes, lastRecipe: nextLastRecipe } = result;
        const filteredNextRecipes = nextRecipes.filter(
          (recipe) => recipe.id !== lastRecipe.id
        );
        setRecipes((prevRecipes) => [...prevRecipes, ...filteredNextRecipes]);
        setLastRecipe(nextLastRecipe);
      }
    } catch (error) {
      console.error("Error fetching next recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialRecipes();
  }, []);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom) {
      fetchNextRecipes();
    }
  };

  const renderRecipeCards = (recipes) => {
    return recipes.map((recipe) => (
      <RecipeCard
        key={recipe.id}
        recipe={recipe}
        onPress={() => navigation.navigate("RecipeDetails", { recipe })}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        ref={scrollViewRef}
        // contentContainerStyle={{  
        // justifyContent:'center',}}
      >
        <Header userName="User" />
        <MySearchBar />

        <View style={styles.c}>
      <GoBuy shoppingList={shoppingList} />
    </View>
        

        <View style={styles.scrollViewContent}>
          <RecipeHeading title="Explore" />
          <View style={styles.recipeContainer}>
            {renderRecipeCards(recipes)}
          </View>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  c: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  scrollView: {

    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeContainer: {
    paddingHorizontal:16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
  },
});
