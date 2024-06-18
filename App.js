import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import RecipeDetailsScreen from "./screens/RecipeDetailsScreen";
import RecipeSearchScreen from "./screens/RecipeSearchScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import UserScreen from "./screens/UserScreen";
import MealPlanningScreen from "./screens/MealPlanningScreen";
import RecipeCollectionsScreen from "./screens/RecipeCollectionsScreen";
import FavoritesScreen from "./screens/FavouritesScreen";
import GroceryListScreen from "./screens/GroceryListScreen";
import LoginScreen from "./screens/LoginScreen";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import CookingScreen from "./screens/CookingScreen";
import { StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { theme } from "./Theme";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="User"
      component={UserScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="MealPlanning" component={MealPlanningScreen} />
    <Stack.Screen
      name="RecipeCollections"
      component={RecipeCollectionsScreen}
    />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="GroceryList" component={GroceryListScreen} />
  </Stack.Navigator>
);

const MainStack = createStackNavigator();
const color = theme.colors.primary;

const MainTabNavigator = () => (
  <Tab.Navigator
    // active tab col
    >

    <Tab.Screen
      name="Home"
      component={HomeScreen}
      
      options={{
        
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="home-outline" color={theme.colors.primary} size={size} />
        ),
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {display: 'none'},
        

        
      }}
      tabBarOptions={{
        
        activeTintColor: '#90D26D', // Color for the selected tab icon
        inactiveTintColor: '#999999', // Color for the unselected tab icons
      }}
    />

    <Tab.Screen
      name="RecipeSearch"
      component={RecipeSearchScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="search-outline" color={color} size={size} />
        ),
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {display: 'none'},
        
      }}
    />

    <Tab.Screen
      name="AddRecipe"
      component={AddRecipeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="add-circle-outline" color={color} size={size} />
        ),
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {display: 'none'},
        
      }}
    />

    <Tab.Screen
      name="User"
      component={UserStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" color={color} size={size} />
        ),
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {display: 'none'},
        
      }}
    />

  </Tab.Navigator>
);

export default function App() {
  const [user, setUser] = useState(null);

  const checkLocalUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLocalUser();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      AsyncStorage.setItem("user", JSON.stringify(user));
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainStack.Navigator
        screenOptions={{
          user: user, // Pass the user state to all screens
        }}
      >
        {user ? (
          <MainStack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
        <MainStack.Screen
          name="RecipeDetails"
          component={RecipeDetailsScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="CookingScreen"
          component={CookingScreen}
          options={{ headerShown: true, headerTitle: "Cook" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
