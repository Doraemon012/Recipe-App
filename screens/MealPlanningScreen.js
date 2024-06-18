import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import BottomSheet from "react-native-raw-bottom-sheet";

import { db, auth } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { addMealPlan } from "../firebaseFunctions/firebaseFunctions";
import { theme } from "../Theme";
import { Dimensions } from "react-native";
const height = Dimensions.get("window").height;


const MealPlanningScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const bottomSheetRef = useRef(null);
  const [userMail, setUserMail] = useState(null);
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [mealData, setMealData] = useState({});

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
            const { mealPlan } = userData;
            setMealData(mealPlan);
          } else {
            console.log("User document does not exist");
          }
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
        });
    }
  }, [userMail]);

  const renderDay = (date) => {
    const day = new Date(date);
    const dayOfWeek = day.toLocaleDateString("en-US", { weekday: "narrow" });
    const dayOfMonth = day.getDate();
    return (
      <View>
        <Text style={styles.dayName}>{dayOfWeek}</Text>
        <Pressable
          key={date}
          style={[
            styles.day,
            date === selectedDate ? styles.selectedDay : null,
            { backgroundColor: "#fff" },
          ]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={styles.dayText}>{dayOfMonth}</Text>
        </Pressable>
      </View>
    );
  };

  const renderCalendar = () => {
    const calendar = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      calendar.push(renderDay(dateString));
    }
    return calendar;
  };

  const handleAddMeal = () => {
    bottomSheetRef.current.open();
  };

  const handleAddCustomMeal = () => {
    console.log(newmeal);
    const mealPlan = {
      [selectedDate]: {
        breakfast: [breakfast],
        lunch: [lunch],
        dinner: [dinner],
      },
    };
    setMealData({ ...mealData, ...mealPlan });

    console.log(userMail);
    addMealPlan(userMail, mealPlan);
    setBreakfast("");
    setLunch("");
    setDinner("");
    bottomSheetRef.current.close();
  };

  const [newmeal, setnewmeal] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>{renderCalendar()}</View>
      <View style={styles.mealContainer}>
        <Text style={styles.heading}>Your meals for {selectedDate}</Text>
        <View style={styles.meals}>
          {mealData && mealData[selectedDate] ? (
            Object.keys(mealData[selectedDate]).map((mealType) => (
              <View key={mealType} style={styles.mealItem}>
                <Text style={styles.mealHeader}>{mealType}</Text>
                {mealData[selectedDate][mealType].map((meal, index) => (
                  <Text key={index} style={styles.mealText}>
                    {meal}
                  </Text>
                ))}
              </View>
            ))
          ) : (
            <Text>No meals planned for this date</Text>
          )}
        </View>
      </View>

      <Pressable onPress={handleAddMeal} style={styles.addButton1}>
        <Text style={styles.addButtonText}>Add Meal</Text>
      </Pressable>

      <BottomSheet
        height={height / 2}
        
        ref={bottomSheetRef}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        draggable={true}
        customStyles={{
          container: {
            borderTopRightRadius: theme.borderRadii.large,
            borderTopLeftRadius: theme.borderRadii.large,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={styles.bottomSheetContent}>
         
          <Text style={styles.bottomSheetHeading}>Add Your Meal</Text>
          <TextInput
            // placeholderTextColor={"#D3D3D3"}
            style={styles.input}
            placeholder="Enter breakfast"
            value={breakfast}
            onChangeText={setBreakfast}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter lunch"
            // placeholderTextColor={"#D3D3D3"}
            value={lunch}
            onChangeText={setLunch}
          />
          <TextInput
            // placeholderTextColor={"#D3D3D3"}
            style={styles.input}
            placeholder="Enter dinner"
            value={dinner}
            onChangeText={setDinner}
          />
        </View>

        <Pressable style={styles.addButton} onPress={handleAddCustomMeal}>
            <Text style={styles.addButtonText}>Add Meal</Text>
          </Pressable>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  day: {
    alignItems: "center",
    margin: 0,
    paddingHorizontal: 10,
  },
  dayName: {
    alignItems: "center",
    margin: 0,
    paddingHorizontal: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectedDay: {
    margin: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingVertical: 5,
  },
  dayText: {
    fontSize: 16,
  },
  mealContainer: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  meals: {
    flex: 1,
  },
  mealItem: {
    marginVertical: 10,
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: theme.borderRadii.medium,
    // borderColor: theme.colors.primary,
    // borderWidth: 1,
  },
  mealHeader: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mealText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding:8,
    // paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 140,
    marginBottom: 16
  },
  addButton1: {
    backgroundColor: theme.colors.primary,
    padding:8,
    // paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 32,
    marginHorizontal: 140
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  bottomSheetHeading: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.textGrey,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 4,
  },
});

export default MealPlanningScreen;
