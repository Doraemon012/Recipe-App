// // Import the fetchRecipes function
// import { fetchRecipes } from "./fetch";

// // Define a function to fetch recipes and log the result
// const testFetchRecipes = async () => {
//     try {
//         // Fetch the initial batch of recipes
//         let recipesResult = await fetchRecipes(); // Fetch initial batch without providing a lastRecipe

//         // Log the recipes and the lastRecipe from the initial batch
//         console.log("Initial Recipes:", recipesResult.recipes);
//         console.log("Last Recipe from Initial Batch:", recipesResult.lastRecipe.data());

//         // Fetch the next batch of recipes using the lastRecipe from the initial batch
//         let nextRecipesResult = await fetchRecipes(recipesResult.lastRecipe);

//         // Log the recipes and the lastRecipe from the next batch
//         console.log("Next Recipes:", nextRecipesResult.recipes);
//         console.log("Last Recipe from Next Batch:", nextRecipesResult.lastRecipe.data());
//     } catch (error) {
//         console.error("Error:", error);
//     }
// };

// // Call the testFetchRecipes function
// console.log("hello")
// testFetchRecipes();
