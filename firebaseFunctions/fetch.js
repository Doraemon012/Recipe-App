import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetchRecipes = async (lastRecipe = null) => {
  try {
    const recipesRef = collection(db, "recipes");
    let q;

    if (lastRecipe) {
      q = query(
        recipesRef,
        orderBy("name", "desc"),
        startAfter(lastRecipe),
        limit(2),
      );
    } else {
      q = query(recipesRef, orderBy("name", "desc"), limit(1));
    }

    const querySnapshot = await getDocs(q);
    let newRecipes = [];

    querySnapshot.forEach((doc) => {
      newRecipes.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      recipes: newRecipes,
      lastRecipe: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
