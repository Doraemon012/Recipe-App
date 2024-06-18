import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../Theme';

const TodaysMealPlanCard = ({ mealPlan }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Meal Plan</Text>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTitle}>Breakfast:</Text>
        <Text style={styles.mealDetail}>{mealPlan.breakfast}</Text>
      </View>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTitle}>Lunch:</Text>
        <Text style={styles.mealDetail}>{mealPlan.lunch}</Text>
      </View>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTitle}>Dinner:</Text>
        <Text style={styles.mealDetail}>{mealPlan.dinner}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadii.medium,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#11122E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mealContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  mealTitle: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  mealDetail: {
    flex: 1,
  },
});

export default TodaysMealPlanCard;
