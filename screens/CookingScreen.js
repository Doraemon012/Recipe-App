import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { theme } from "../Theme";
import { Checkbox } from "react-native-paper";
import { Video } from "expo-av";

const CookingScreen = ({ route }) => {
  const { recipe } = route.params;
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const toggleIngredient = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    if (newCheckedIngredients.includes(index)) {
      const indexToRemove = newCheckedIngredients.indexOf(index);
      newCheckedIngredients.splice(indexToRemove, 1);
    } else {
      newCheckedIngredients.push(index);
    }
    setCheckedIngredients(newCheckedIngredients);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "ingredients":
        return renderIngredients(recipe.ingredients);
      case "instructions":
        return renderInstructions(recipe.instructions);
      default:
        return null;
    }
  };

  const renderIngredients = (ingredients) => (
    <ScrollView>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientListItem} >
          <View style={{flexDirection: 'row', borderWidth:'1px', borderColor:theme.colors.pastelGreen2, padding:0, borderRadius:'100%' }} >
            <Checkbox
              
              style={{alignSelf:'center', borderWidth:'1px', borderColor:'grey'}}
              
              uncheckedColor="grey"
              
            status={
              checkedIngredients.includes(index) ? "checked" : "unchecked"
            }
            // borderWidth:'1px'
            onPress={() => toggleIngredient(index)}
              color={theme.colors.primary}
              
            // initially grey color
            />
            
            </View>
          <Text style={styles.ingredient}>
            {ingredient.name}: {ingredient.quantity}
          </Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderInstructions = (instructions) => {
    const steps = instructions.split(/\r?\n/);
    return (
        <ScrollView>
                      {/* <Text>{recipe.youtube_url}</Text> */}

        {steps.map((step, index) => (
          <View key={index} style={styles.ingredientListItem}>
            <Text key={index} style={styles.step}>
              {step.trim()}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderTabBar = (props) => (
    <View style={{marginBottom:'1rem'}}>
    <TabBar
        {...props}
        indicatorContainerStyle={{backgroundColor: theme.colors.pastelGreen2, borderRadius:19, borderWidth:'1px', borderColor:theme.colors.
          pastelGreen2, display: 'flex', justifyContent: 'space-between',
        marginHorizontal: 36,}}
      
      indicatorStyle={{
        backgroundColor: theme.colors.primary,
        height: 3,
        borderRadius: 16,
        // decrease width, this is going out of the screen
        width: '25%',
        // position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // transform: [{translateX: 45}],
      }}
      style={{ backgroundColor: theme.colors.pastelGreen2 , width:'inherit', borderRadius:19, borderWidth:'1px', borderColor:theme.colors.pastelGreen2, display:'flex', justifyContent:'space-between', }}
      labelStyle={{ fontWeight: "bold", color: theme.colors.text }}
      tabStyle={{ padding:0, margin:0, borderRadius:10,    }} // Adjust the width of the tabs as needed
      scrollEnabled // Enable scrolling for the tabs
      />
      </View>
  );
  

  return (
      <View style={styles.container}>
          {/* <Text>{recipe.youtube_url}</Text> */}
          {/* <video width="320" height="240" controls >
              <source src={recipe.youtube_url} type="video/mp4" />
            </video> */}
          <Video
            source={{ uri: recipe.youtube_url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}/>
      <TabView
        style={{ marginTop: 16, flex: 1 }}
        navigationState={{
          index: 0,
          routes: [
            { key: "ingredients", title: "Ingredients" },
            { key: "instructions", title: "Instructions" },
          ],
        }}
        renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  ingredient: {
    marginBottom: 4,
    marginLeft: 8,
    color: theme.colors.text,
  },
  step: {
    marginBottom: 8,
  },
  ingredientListItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    backgroundColor: theme.colors.white,
    marginVertical: 4,
    },
    video: {
        alignSelf: "stretch",
        height: 200, // Adjust the height of the video player
        backgroundColor: "black",
        borderRadius: 16,
        marginVertical: 16,
      },
});

export default CookingScreen;
