import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from '../screens/HomeScreen';
import SearchScreen from "../screens/SearchScreen";
// import RecipeDetails from '../screens/RecipeDetails';
import SavedRecipesScreen from "../screens/SavedRecipesScreen";
import "react-native-gesture-handler";
import HomeScreen from "../screens/HomeScreen1";
import RecipeScreen from "../screens/RecipeDetailsScreen1";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

// recipe details stack
// pass the same props as in RecipeCard.js
const RecipeDetailsStack = ({ route: { params } }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeDetails" component={RecipeScreen} />
    </Stack.Navigator>
  );
};
// saved recipes stack
// const SavedRecipesStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="SavedRecipes" component={SavedRecipesScreen} />
//     </Stack.Navigator>
//   );
// }

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="RecipeDetails" component={RecipeDetailsStack} />
      {/* <Tab.Screen name="SavedRecipes" component={SavedRecipesStack} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
