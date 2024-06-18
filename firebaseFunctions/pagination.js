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
} from "firebase/firestore";
import { limit } from "firebase/firestore";
import { db } from "../firebase";
import { startAfter } from "firebase/firestore";

// first batch

export const fetchFirstBatch = async () => {
  try {
    const recipesRef = collection(db, "recipes");
    const q = query(recipesRef, orderBy("name", "desc"), limit(6));
    const querySnapshot = await getDocs(q);
    let recipes = [];
    let lastKey = "";

    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      recipes.push({
        id: doc.id,
        ...doc.data(),
      });
      lastKey = doc.data().name;
    });

    return { recipes, lastKey };
  } catch (error) {
    console.error(error);
  }
};

// next batch

// export const fetchNextBatch = async (lastKey) => {
//   try {
//     const recipesRef = collection(db, 'recipes');
//     let q;

//     console.log(lastKey, `
//     ██████╗░██████╗░██████╗░
//     ██╔══██╗██╔══██╗██╔══██╗
//     ██████╔╝██████╔╝██████╔╝
//     ██╔══██╗██╔══██╗██╔══██╗
//     ██║░░██║██║░░██║██║░░██║
//     ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝`)

//     if (lastKey) {
//       q = query(recipesRef, orderBy("name", "desc"), startAfter(lastKey), limit(6));
//     } else {
//       q = query(recipesRef, orderBy("name", "desc"), limit(6));
//     }

//     const querySnapshot = await getDocs(q);
//     let recipes = [];
//     let newLastKey = "";

//     querySnapshot.forEach((doc) => {
//       recipes.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });

//     // newLastKey = querySnapshot.docs[querySnapshot.docs.length - 1];
//     newLastKey = lastKey.name;
//     console.log(newLastKey, `
//     ███╗░░██╗███╗░░██╗███╗░░██╗
//     ████╗░██║████╗░██║████╗░██║
//     ██╔██╗██║██╔██╗██║██╔██╗██║
//     ██║╚████║██║╚████║██║╚████║
//     ██║░╚███║██║░╚███║██║░╚███║
//     ╚═╝░░╚══╝╚═╝░░╚══╝╚═╝░░╚══╝`);

//     return { recipes, newLastKey };
//   } catch (e) {
//     console.log("Error fetching documents: ", e);
//   }
// };

export const fetchNextBatch = async (lastKey) => {
  try {
    const recipesRef = collection(db, "recipes");
    let q;

    if (lastKey) {
      q = query(
        recipesRef,
        orderBy("name", "desc"),
        startAfter(lastKey),
        limit(6),
      );
    } else {
      q = query(recipesRef, orderBy("name", "desc"), limit(6));
    }

    const querySnapshot = await getDocs(q);
    let recipes = [];
    let newLastKey = "";

    querySnapshot.forEach((doc) => {
      recipes.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Set newLastKey to the name of the last document in the fetched batch
    if (querySnapshot.docs.length > 0) {
      newLastKey =
        querySnapshot.docs[querySnapshot.docs.length - 1].data().name;
    }

    return { recipes, newLastKey };
  } catch (error) {
    console.error("Error fetching next batch of recipes:", error);
    throw error;
  }
};
