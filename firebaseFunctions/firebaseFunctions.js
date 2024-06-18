import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
  where,
  query,
  doc,
  orderBy,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// add
export const addRecipe = async (recipe) => {
  const newRecipe = {
    name: recipe.name,
    image: recipe.image,
    category: recipe.category,
    area: recipe.area,
    instructions: recipe.instructions,
    youtube_url: recipe.youtube_url,
    ingredients: recipe.ingredients,
    created_at: recipe.created_at,
    modified_at: recipe.modified_at,
    created_by: recipe.created_by,
  };
  try {
    const docRef = await addDoc(collection(db, 'recipes'), newRecipe);
    return { id: docRef.id, ...newRecipe };
  } catch (error) {
    console.error('Error adding recipe: ', error);
    throw error;
  }
};

// fetch
export const fetchRecipes = async () => {
  try {
    let recipesRef = collection(db, "recipes");
    const querySnapshot = await getDocs(recipesRef);
    const recipes = [];
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });
    console.log("Fetched recipes: ", recipes);
    return recipes;
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

// edit
export const editRecipe = async (id, recipe) => {
  try {
    let recipesRef = collection(db, "recipes");
    await setDoc(doc(recipesRef, id), recipe, { merge: true });
    console.log(
      "Document with id ",
      id,
      " successfully updated!",
      "updated doc ref: ",
      recipesRef,
    );
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// delete
export const deleteRecipe = async (id) => {
  try {
    let recipesRef = collection(db, "recipes");
    await deleteDoc(doc(recipesRef, id));
    console.log(
      "Doc with id ",
      id,
      " successfully deleted!",
      "deleted doc ref: ",
      recipesRef,
    );
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};

// search
// export const searchRecipes = async (category, area, name) => {
//   try {
//     let recipesRef = collection(db, "recipes");

//     if (category) {
//       recipesRef = query(recipesRef, where("category", "==", category));
//     }
//     if (area) {
//       recipesRef = query(recipesRef, where("area", "==", area));
//     }
//     if (name) {
//       // recipesRef = query(recipesRef, where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
//       // recipesRef = query(recipesRef, where('name', '==', name));

//       const recipesRef = await recipesRef.where("name", "==", name).get();
//     }

//     // Firestore.collection(collectionName).orderBy(field).where(field, ">=", keyword.toUpperCase()).where(field, "<=", keyword.toUpperCase() + "\uf8ff").get()

//     const querySnapshot = await getDocs(recipesRef);
//     const recipes = [];
//     querySnapshot.forEach((doc) => {
//       recipes.push({ id: doc.id, ...doc.data() });
//     });

//     console.log("search results: ", recipes);
//     return recipes;
//   } catch (error) {
//     console.error("Error searching recipes:", error);
//     throw error;
//   }
// };
export const searchRecipes = async (name) => {
  try {
    const recipesRef = collection(db, "recipes");
    let q;

    if (name) {
      q = query(recipesRef, where('name', '>=', name));
    }

    const querySnapshot = await getDocs(q);
    const recipes = [];
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });

    console.log("search results: ", recipes);
    return recipes;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};
// meal planner

export const createMealPlan = async (userId) => {
  const newMealPlan = {
    userId: userId,
    title: "My Meal Plan",
    meals: [],
    created_at: new Date(),
  };
  try {
    const docRef = await addDoc(collection(db, "meal_plans"), newMealPlan);
    return { id: docRef.id, ...newMealPlan };
  } catch (error) {
    console.error("Error adding meal plan: ", error);
    throw error;
  }
};

export const fetchMealPlans = async (userId) => {
  const mealPlanRef = collection(db, "meal_plans");
  const q = query(mealPlanRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const plans = [];
  querySnapshot.forEach((doc) => {
    plans.push({ id: doc.id, ...doc.data() });
  });
  console.log("meals:", plans);
  return plans;
};

export const addUser = async (userId, Uname) => {
  try {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, userId);

    // Set data for the user document using userId and Uname
    const userData = {
      userId: userId,
      Uname: Uname,
      groceryList: "",
    };
    await setDoc(userDocRef, userData);

    // Create a subcollection 'Uname' and add data to it
    const subcollectionRef = collection(userDocRef, "Uname");
    const subcollectionDocRef = await addDoc(subcollectionRef, {
      email: userId,
      name: Uname,
    });

    console.log(
      "Document written with ID: ",
      userDocRef.id,
      "Subcollection document ID: ",
      subcollectionDocRef.id,
    );
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// users > x.@mail {email ,name , grocerylist{{name, quantity}, {name, quantity}}

export const addGroceryList = async (userId, groceryList) => {
  try {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, userId);

    // Set data for the user document using userId and Uname
    const userData = {
      groceryList: groceryList,
    };
    await updateDoc(userDocRef, userData);

    console.log("Document written with ID: ", userDocRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
export const addMealPlan = async (userId, mealPlan) => {
  try {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, userId);

    // Get the existing mealPlan
    const userDoc = await getDoc(userDocRef);
    const existingMealPlan = userDoc.data().mealPlan;

    // Merge the existing mealPlan with the new mealPlan
    const mergedMealPlan = { ...existingMealPlan, ...mealPlan };

    // Set data for the user document using userId and Uname
    const userData = {
      mealPlan: mergedMealPlan,
    };
    await setDoc(userDocRef, userData, { merge: true });

    console.log("Document written with ID: ", userDocRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export default {
  addRecipe,
  fetchRecipes,
  editRecipe,
  deleteRecipe,
  searchRecipes,
};
