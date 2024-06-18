// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, SafeAreaView } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import MySearchBar from "../components/SearchBar";
// import { Chip } from "react-native-paper";
// import { theme } from "../Theme";

// const RecipeSearchScreen = () => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   const handleFilterSelection = (filter) => {
//     if (selectedFilters.includes(filter)) {
//       setSelectedFilters(selectedFilters.filter((f) => f !== filter));
//     } else {
//       setSelectedFilters([...selectedFilters, filter]);
//     }
//   };

//   const filterOptions = [
//     "Category",
//     "Area",
//     // Add more filter options here based on your recipe object properties
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inside}>
//       <View style={styles.searchContainer}>
//         <MySearchBar />
//         <Pressable style={styles.filterButton} onPress={toggleFilters}>
//           <MaterialCommunityIcons name="filter" size={24} color="white" />
//           {/* <Text style={styles.filterButtonText}>Filters</Text> */}
//         </Pressable>
//       </View>
//       {showFilters && (
//         <View style={styles.filterSection}>
//           <View style={styles.filterChips}>
//             {filterOptions.map((option) => (
//               <Chip
//                 key={option}
//                 style={[
//                   styles.filterChip,
//                   selectedFilters.includes(option) && styles.filterChipSelected,
//                 ]}
//                 onPress={() => handleFilterSelection(option)}
//               >
//                 <Text style={styles.filterChipText}>{option}</Text>
//               </Chip>
//             ))}
//           </View>
//         </View>
//       )}
//         {/* Implement search results display here */}
//         </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 32,
//     paddingTop: 20,
//     backgroundColor: "#f8f9fa", // Use your theme's background color
//   },
//   inside: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     backgroundColor: theme.colors.background, // Use your theme's background color
//   },
//   searchContainer: {
//     gap: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     // marginBottom: 20,
//   },
//   filterButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: theme.colors.primary, // Use your theme's primary color
//     borderRadius: theme.borderRadii.large,
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     // padd
//     // height: 40,
//     flex:.08
//   },
//   filterButtonText: {
//     color: "white",
//     // marginLeft: 5,
//   },
//   filterSection: {
//     marginTop: 8,
//     flexDirection: "column",
//     // gap: 16,
//     // padding: 10,
//     borderRadius: 5,
//   },
//   filterTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   filterChips: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   filterChip: {
//     borderRadius: 16,
//     backgroundColor: theme.colors.pastelGreen3,

//     marginRight: 10,
//     marginBottom: 10,
//   },
//   filterChipSelected: {
//     backgroundColor: theme.colors.primary, // Background color for selected chip
//   },
//   filterChipText: {
//     color: "black", // Text color for chip
//   },
// });

// export default RecipeSearchScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCard";
// import MySearchBar from "../components/SearchBar";
import { Chip } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { theme } from "../Theme";
import { useRef } from "react";
import { searchRecipes } from "../firebaseFunctions/firebaseFunctions";
const RecipeSearchScreen = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Store search results here
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const handleFilterSelection = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filterOptions = [
    "Category",
    "Area",
    // Add more filter options here based on your recipe object properties
  ];
  const timeoutId = useRef();
  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      if (newQuery.length >= 3) {
        // Here you can call your search function
        console.log("Searching for: ", newQuery);
        searchRecipes(newQuery)
          .then((res) => {
            console.log(res);
            if (res) {
              setSearchResults(res);
            }
          })
          .catch((err) => console.error(err));
      }
    }, 2000);
  };
  const renderRecipeCards = (recipes) => {
    console.log(recipes);
    recipes.map((recipe) => console.log(recipe));
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
      <View style={styles.inside}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchQuery}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{
              borderRadius: theme.borderRadii.large,
              backgroundColor: theme.colors.white, // Use theme background color
              color: theme.colors.text, // Use theme text color
              shadowColor: "#11122E",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 10,
              flex: 1,
              elevation: 2, // For Android
              borderWidth: isFocused ? 2 : 0, // Add border when focused
              borderColor: isFocused ? theme.colors.primary : "transparent", // Primary color when focused
            }}
            inputStyle={{ color: theme.colors.text }} // Use theme text color for input
            placeholderTextColor={theme.colors.textGrey} // Use theme text color for placeholder
            iconColor={theme.colors.text} // Use theme text color for icons
          />{" "}
          <Pressable style={styles.filterButton} onPress={toggleFilters}>
            <MaterialCommunityIcons name="filter" size={24} color="white" />
            {/* <Text style={styles.filterButtonText}>Filters</Text> */}
          </Pressable>
        </View>
        {showFilters && (
          <View style={styles.filterSection}>
            <View style={styles.filterChips}>
              {filterOptions.map((option) => (
                <Chip
                  key={option}
                  style={[
                    styles.filterChip,
                    selectedFilters.includes(option) &&
                      styles.filterChipSelected,
                  ]}
                  onPress={() => handleFilterSelection(option)}
                >
                  <Text style={styles.filterChipText}>{option}</Text>
                </Chip>
              ))}
            </View>
          </View>
        )}

        <View style={styles.recipeContainer}>
          {renderRecipeCards(searchResults)}
        </View>
        {/* Implement search results display here */}
        {/*  */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
    backgroundColor: "#f8f9fa", // Use your theme's background color
  },
  inside: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: theme.colors.background, // Use your theme's background color
  },
  searchContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary, // Use your theme's primary color
    borderRadius: theme.borderRadii.large,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // padd
    // height: 40,
    flex: 0.08,
  },
  filterButtonText: {
    color: "white",
    // marginLeft: 5,
  },
  filterSection: {
    marginTop: 8,
    flexDirection: "column",
    // gap: 16,
    // padding: 10,
    borderRadius: 5,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterChips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterChip: {
    borderRadius: 16,
    backgroundColor: theme.colors.pastelGreen3,

    marginRight: 10,
    marginBottom: 10,
  },
  filterChipSelected: {
    backgroundColor: theme.colors.primary, // Background color for selected chip
  },
  filterChipText: {
    color: "black", // Text color for chip
  },
});

export default RecipeSearchScreen;
