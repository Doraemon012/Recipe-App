import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { addGroceryList } from "../firebaseFunctions/firebaseFunctions";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { theme } from "../Theme";
import { IconButton } from "react-native-paper";

const GroceryListScreen = () => {
  const [showInput, setShowInput] = useState(false);
  const [userMail, setUserMail] = useState(null);
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const checkLocalUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserMail(user.email);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLocalUser();

    if (userMail) {
      const usersSnapshot = collection(db, "users");
      const userSnapshot = doc(usersSnapshot, userMail);
      getDoc(userSnapshot)
        .then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            const { groceryList } = userData;
            setGroceryList(groceryList);
          } else {
            console.log("User document does not exist");
          }
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
        });
    }
  }, [userMail]);
  
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
  });

  

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleChangeName = (text) => {
    setNewIngredient({ ...newIngredient, name: text });
  };

  const handleChangeQuantity = (text) => {
    setNewIngredient({ ...newIngredient, quantity: text });
  };
  const handleToggleCheckbox = (index) => {
    const updatedList = [...groceryList];
    updatedList[index].checked = !updatedList[index].checked;
    setGroceryList(updatedList);
  };
  
  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setGroceryList([...groceryList, newIngredient]);
      setNewIngredient({ name: "", quantity: "" });
      addGroceryList(userMail, [...groceryList, newIngredient]);
    }
  };

  const handleRemoveIngredient = (index) => {
    const newGroceryList = [...groceryList];
    newGroceryList.splice(index, 1);
    setGroceryList(newGroceryList);
    addGroceryList(userMail, newGroceryList);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>

      <View style={styles.itemContent}>
      <Pressable
        onPress={() => handleToggleCheckbox(index)}
        style={styles.checkbox}
      >
        {item.checked ? (
          <MaterialIcons name="check" size={28} color="green" />
        ) : (
          <MaterialIcons name="check-box-outline-blank" size={28} color={theme.colors.textGrey} />
        )}
      </Pressable>
        <Text style={styles.text}>
          {item.name}: {item.quantity}
        </Text>
      </View>
      <Pressable onPress={() => handleRemoveIngredient(index)} style={styles.removeButton}>
        <MaterialIcons name="delete" size={24} color="white" />
      </Pressable>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <Pressable onPress={handleToggleInput} style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="white" />
        </Pressable>
      </View>
      {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingredient"
            style={styles.input}
            value={newIngredient.name}
            onChangeText={handleChangeName}
          />
          <TextInput
            placeholder="Quantity"
            style={styles.input}
            value={newIngredient.quantity}
            onChangeText={handleChangeQuantity}
          />
          <Pressable
            onPress={handleAddIngredient}
            style={styles.addIngredientButton}
          >
            <Text style={styles.addIngredientText}>Add Ingredient</Text>
          </Pressable>
        </View>
      )}
      <FlatList
        data={groceryList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    padding: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical:10
  },
  addIngredientButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  addIngredientText: {
    color: "white",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexGrow: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems:'center'
  },
  checkbox: {
    marginRight: 10,
  },
  
  text: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#FA7070",
    borderRadius: 30,
    padding: 5,
  },
  removeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GroceryListScreen;
