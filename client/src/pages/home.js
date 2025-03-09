import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://ey-gds-mern-recipe-app-backend.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    const fetchSavedRecipes = async () => {
      if (!userID) return; // Avoid calling if userID is not available
      try {
        const response = await axios.get(
          `https://ey-gds-mern-recipe-app-backend.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]); // Added userID as a dependency

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://ey-gds-mern-recipe-app-backend.onrender.com/recipes/save", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      <h3 className="text-center">👨‍🍳 The Perfect Nest for Every Chef to Create, Share 🍽️</h3>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div className="recipe-card" key={index}>
            <img src={recipe.image} alt={recipe.title} />
            <h5>{recipe.title}</h5>
            <p>{recipe.description}</p>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              className="save-btn"
            >
              {isRecipeSaved(recipe._id) ? "Saved ✅" : "Save Recipe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
